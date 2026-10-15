import { PARTNER_META, PARTNER_TYPE_OPTIONS } from '../data/partnersContent'

export type PartnerEnquiryPayload = {
  name: string
  email: string
  company: string
  role: string
  partnerType: string
  location: string
  countryCode: string
  phone: string
  message: string
  website: string
  /** Honeypot — must remain empty */
  companyUrl: string
}

export type PartnerEnquiryResult =
  | { ok: true }
  | { ok: false; code: 'validation' | 'rate_limit' | 'network' | 'server' | 'not_configured'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()./+-]{6,24}$/
const MAX = {
  name: 100,
  email: 254,
  company: 150,
  role: 100,
  location: 100,
  countryCode: 8,
  phone: 24,
  message: 2000,
  website: 200,
} as const

const RATE_KEY = 'euroland_partner_enquiry_ts'
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 3

function clean(value: string, max: number) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

export function validatePartnerEnquiry(
  raw: PartnerEnquiryPayload,
): { ok: true; data: PartnerEnquiryPayload } | { ok: false; message: string } {
  if (raw.companyUrl.trim()) {
    return { ok: false, message: 'Unable to submit this enquiry.' }
  }

  const data: PartnerEnquiryPayload = {
    name: clean(raw.name, MAX.name),
    email: clean(raw.email, MAX.email).toLowerCase(),
    company: clean(raw.company, MAX.company),
    role: clean(raw.role, MAX.role),
    partnerType: clean(raw.partnerType, 40),
    location: clean(raw.location, MAX.location),
    countryCode: clean(raw.countryCode, MAX.countryCode),
    phone: clean(raw.phone, MAX.phone),
    message: clean(raw.message, MAX.message),
    website: clean(raw.website, MAX.website),
    companyUrl: '',
  }

  if (!data.name || data.name.length < 2) {
    return { ok: false, message: 'Please enter your name (at least 2 characters).' }
  }
  if (!EMAIL_RE.test(data.email)) {
    return { ok: false, message: 'Please enter a valid work email address.' }
  }
  if (!data.company || data.company.length < 2) {
    return { ok: false, message: 'Please enter your company name.' }
  }
  if (!PARTNER_TYPE_OPTIONS.some((option) => option.id === data.partnerType)) {
    return { ok: false, message: 'Please select a partner category.' }
  }
  if (!data.location) {
    return { ok: false, message: 'Please select your location.' }
  }
  if (!data.countryCode.startsWith('+') || data.countryCode.length < 2) {
    return { ok: false, message: 'Please enter a valid country calling code.' }
  }
  if (!PHONE_RE.test(data.phone)) {
    return { ok: false, message: 'Please enter a valid phone number.' }
  }
  if (data.website && !/^https?:\/\/.+/i.test(data.website) && !/^[a-z0-9.-]+\.[a-z]{2,}/i.test(data.website)) {
    return { ok: false, message: 'Please enter a valid website URL, or leave it blank.' }
  }

  return { ok: true, data }
}

function readRateStamps(): number[] {
  try {
    const raw = sessionStorage.getItem(RATE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    const now = Date.now()
    return parsed.filter((ts): ts is number => typeof ts === 'number' && now - ts < RATE_WINDOW_MS)
  } catch {
    return []
  }
}

function writeRateStamp() {
  try {
    const stamps = [...readRateStamps(), Date.now()]
    sessionStorage.setItem(RATE_KEY, JSON.stringify(stamps))
  } catch {
    /* private mode / blocked storage */
  }
}

export function isPartnerEnquiryRateLimited() {
  return readRateStamps().length >= RATE_MAX
}

function resolveEndpoint() {
  const configured = import.meta.env.VITE_PARTNER_ENQUIRY_ENDPOINT
  if (typeof configured === 'string' && configured.trim()) {
    return configured.trim()
  }
  return '/api/partner-enquiry'
}

export async function submitPartnerEnquiry(
  raw: PartnerEnquiryPayload,
): Promise<PartnerEnquiryResult> {
  const validated = validatePartnerEnquiry(raw)
  if (!validated.ok) {
    return { ok: false, code: 'validation', message: validated.message }
  }

  if (isPartnerEnquiryRateLimited()) {
    return {
      ok: false,
      code: 'rate_limit',
      message: `Too many attempts. Please wait before trying again, or email ${PARTNER_META.contactEmail}.`,
    }
  }

  const endpoint = resolveEndpoint()
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...validated.data,
        source: 'become-a-partner',
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      credentials: 'omit',
      mode: 'cors',
    })

    let body: { ok?: boolean; message?: string; code?: string } = {}
    try {
      body = (await response.json()) as typeof body
    } catch {
      body = {}
    }

    if (
      response.status === 503 ||
      response.status === 404 ||
      body.code === 'not_configured'
    ) {
      return {
        ok: false,
        code: 'not_configured',
        message:
          body.message ??
          `Partnership form delivery is not configured yet. Please email ${PARTNER_META.contactEmail}.`,
      }
    }

    if (response.status === 429) {
      return {
        ok: false,
        code: 'rate_limit',
        message:
          body.message ??
          `Too many requests. Please try again later or email ${PARTNER_META.contactEmail}.`,
      }
    }

    if (!response.ok || body.ok === false) {
      return {
        ok: false,
        code: 'server',
        message:
          body.message ??
          `We could not send your enquiry. Please email ${PARTNER_META.contactEmail}.`,
      }
    }

    writeRateStamp()
    return { ok: true }
  } catch {
    return {
      ok: false,
      code: 'network',
      message: `We could not reach the submission service. Please email ${PARTNER_META.contactEmail} directly.`,
    }
  } finally {
    window.clearTimeout(timeout)
  }
}
