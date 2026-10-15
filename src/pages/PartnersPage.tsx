import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Footer } from '../components/Footer'
import { Faq } from '../components/Faq'
import { PartnerChrome } from '../components/partners/PartnerChrome'
import { PartnerHero } from '../components/partners/PartnerHero'
import { PartnerLogoStrip } from '../components/partners/PartnerLogoStrip'
import { PartnerAbout } from '../components/partners/PartnerAbout'
import { PartnerCategories } from '../components/partners/PartnerCategories'
import { PartnerCollaborate } from '../components/partners/PartnerCollaborate'
import { PartnerProcess } from '../components/partners/PartnerProcess'
import { PartnerEnquiryForm } from '../components/partners/PartnerEnquiryForm'
import { PartnerFinalCta } from '../components/partners/PartnerFinalCta'
import { PARTNER_FAQS, PARTNER_META } from '../data/partnersContent'
import { scrubRevealIn } from '../hooks/useProductScrollReveal'

gsap.registerPlugin(ScrollTrigger)

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function PartnersPage() {
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const enquiryRef = useRef<HTMLElement>(null)
  const enquiryFormRef = useRef<HTMLFormElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLElement>(null)
  const [headerSolid, setHeaderSolid] = useState(false)

  useEffect(() => {
    const origin = window.location.origin
    const url = `${origin}/`
    const previousTitle = document.title

    document.title = PARTNER_META.title
    upsertMeta('name', 'description', PARTNER_META.description)
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', PARTNER_META.title)
    upsertMeta('property', 'og:description', PARTNER_META.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', 'Euroland IR')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', PARTNER_META.title)
    upsertMeta('name', 'twitter:description', PARTNER_META.description)
    upsertLink('canonical', url)
    upsertJsonLd('partner-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Euroland IR',
          url: 'https://www.euroland.com',
          email: PARTNER_META.contactEmail,
          sameAs: [
            'https://twitter.com/eurolandir',
            'https://www.facebook.com/eurolandir',
            'https://www.linkedin.com/company/eurolandir',
          ],
        },
        {
          '@type': 'WebPage',
          name: PARTNER_META.title,
          description: PARTNER_META.description,
          url,
          isPartOf: { '@type': 'WebSite', name: 'Euroland IR', url: origin },
          about: {
            '@type': 'Thing',
            name: 'Investor relations partnerships',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: PARTNER_FAQS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    })

    return () => {
      document.title = previousTitle
      document.getElementById('partner-jsonld')?.remove()
    }
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace(/^#/, '')
      const target = document.getElementById(id)
      if (target) {
        const timers = [0, 120, 400].map((ms) =>
          window.setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, ms),
        )
        return () => timers.forEach((timer) => window.clearTimeout(timer))
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      setHeaderSolid(hero.getBoundingClientRect().bottom <= 88)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const compact = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(page.querySelectorAll<HTMLElement>('[data-partner-reveal]'))

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.from(targets, {
          opacity: 0,
          y: 12,
          duration: 0.3,
          stagger: 0.04,
          scrollTrigger: { trigger: page, start: 'top 90%' },
        })
        return
      }
      targets.forEach((el, index) => {
        scrubRevealIn(el, {
          y: compact ? 16 + (index % 3) * 2 : 24 + (index % 4) * 4,
          compact,
        })
      })
    }, page)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])

  return (
    <main className="partners-page" ref={pageRef}>
      <PartnerChrome headerRef={headerRef} isSolid={headerSolid} />
      <PartnerHero sectionRef={heroRef} />
      <PartnerLogoStrip />
      <PartnerAbout />
      <PartnerCategories />
      <PartnerCollaborate />
      <PartnerProcess />
      <PartnerEnquiryForm sectionRef={enquiryRef} formRef={enquiryFormRef} />
      <Faq items={PARTNER_FAQS} />
      <PartnerFinalCta />
      <Footer sectionRef={footerRef} />
    </main>
  )
}
