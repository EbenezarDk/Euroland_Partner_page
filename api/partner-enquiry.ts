/**
 * Vercel Node serverless handler for partnership enquiries.
 * Configure ONE of:
 *   PARTNER_ENQUIRY_WEBHOOK_URL  — HTTPS endpoint (CRM / Zapier / Make / custom)
 *   RESEND_API_KEY + PARTNER_ENQUIRY_TO_EMAIL — email via Resend
 * Without configuration the handler returns 503 (never pretends success).
 */

type Body = {
  name?: string
  email?: string
  company?: string
  role?: string
  partnerType?: string
  location?: string
  countryCode?: string
  phone?: string
  message?: string
  website?: string
  companyUrl?: string
  source?: string
  submittedAt?: string
}

type VercelReq = {
  method?: string
  body?: Body | string
  headers: Record<string, string | string[] | undefined>
}

type VercelRes = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => VercelRes
  json: (body: Record<string, unknown>) => void
  end: () => void
}

const ALLOWED_TYPES = new Set([
  'data-providers',
  'distribution',
  'technology',
  'exchanges',
  'other',
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const rateBucket = new Map<string, number[]>()

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

function clientIp(req: VercelReq) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim()
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0].split(',')[0].trim()
  return 'unknown'
}

function rateLimited(ip: string) {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const stamps = (rateBucket.get(ip) ?? []).filter((ts) => now - ts < windowMs)
  if (stamps.length >= 8) {
    rateBucket.set(ip, stamps)
    return true
  }
  stamps.push(now)
  rateBucket.set(ip, stamps)
  return false
}

function parseBody(req: VercelReq): Body {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Body
    } catch {
      return {}
    }
  }
  return {}
}

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  if (rateLimited(clientIp(req))) {
    res.status(429).json({
      ok: false,
      code: 'rate_limit',
      message: 'Too many requests. Please try again later.',
    })
    return
  }

  const body = parseBody(req)

  if (clean(body.companyUrl, 200)) {
    res.status(200).json({ ok: true })
    return
  }

  const payload = {
    name: clean(body.name, 100),
    email: clean(body.email, 254).toLowerCase(),
    company: clean(body.company, 150),
    role: clean(body.role, 100),
    partnerType: clean(body.partnerType, 40),
    location: clean(body.location, 100),
    countryCode: clean(body.countryCode, 8),
    phone: clean(body.phone, 24),
    message: clean(body.message, 2000),
    website: clean(body.website, 200),
    source: clean(body.source, 64) || 'become-a-partner',
    submittedAt: clean(body.submittedAt, 40) || new Date().toISOString(),
  }

  if (payload.name.length < 2 || !EMAIL_RE.test(payload.email) || payload.company.length < 2) {
    res.status(400).json({ ok: false, message: 'Missing or invalid required fields.' })
    return
  }
  if (!ALLOWED_TYPES.has(payload.partnerType) || !payload.location || !payload.phone) {
    res.status(400).json({ ok: false, message: 'Missing or invalid required fields.' })
    return
  }

  const webhook = process.env.PARTNER_ENQUIRY_WEBHOOK_URL?.trim()
  const resendKey = process.env.RESEND_API_KEY?.trim()
  const toEmail =
    process.env.PARTNER_ENQUIRY_TO_EMAIL?.trim() || 'partners@euroland.com'
  const fromEmail =
    process.env.PARTNER_ENQUIRY_FROM_EMAIL?.trim() || 'onboarding@resend.dev'

  if (!webhook && !resendKey) {
    res.status(503).json({
      ok: false,
      code: 'not_configured',
      message:
        'Partnership form delivery is not configured yet. Please email partners@euroland.com.',
    })
    return
  }

  try {
    if (webhook) {
      const upstream = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!upstream.ok) {
        res.status(502).json({
          ok: false,
          message: 'Upstream partnership endpoint rejected the enquiry.',
        })
        return
      }
      res.status(200).json({ ok: true })
      return
    }

    const subject = `Partnership enquiry — ${payload.company}`
    const text = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Role: ${payload.role || '—'}`,
      `Partner type: ${payload.partnerType}`,
      `Location: ${payload.location}`,
      `Phone: ${payload.countryCode} ${payload.phone}`,
      `Website: ${payload.website || '—'}`,
      `Source: ${payload.source}`,
      `Submitted: ${payload.submittedAt}`,
      '',
      payload.message || '(no message)',
    ].join('\n')

    const mail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject,
        text,
      }),
    })

    if (!mail.ok) {
      res.status(502).json({
        ok: false,
        message: 'Email delivery failed. Please email partners@euroland.com.',
      })
      return
    }

    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({
      ok: false,
      message: 'Unexpected server error. Please email partners@euroland.com.',
    })
  }
}
