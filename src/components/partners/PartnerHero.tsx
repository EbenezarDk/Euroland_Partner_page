import type { RefObject } from 'react'
import { PARTNER_HERO, PARTNER_META } from '../../data/partnersContent'

type PartnerHeroProps = {
  sectionRef: RefObject<HTMLElement | null>
}

export function PartnerHero({ sectionRef }: PartnerHeroProps) {
  return (
    <section
      className="pc-hero"
      id="partner-hero"
      ref={sectionRef}
      aria-labelledby="partner-hero-heading"
    >
      <div className="pc-hero__media" aria-hidden>
        <img
          src="/assets/For%20webite.png"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="pc-shell pc-hero__content">
        <p className="pc-hero__eyebrow">{PARTNER_HERO.eyebrow}</p>
        <h1 className="pc-hero__title" id="partner-hero-heading">
          {PARTNER_HERO.title}
        </h1>
        <p className="pc-hero__subtitle">{PARTNER_HERO.subtitle}</p>
        <div className="pc-hero__actions">
          <a className="pc-btn pc-btn--light" href={PARTNER_HERO.primaryCta.href}>
            {PARTNER_HERO.primaryCta.label}
            <span aria-hidden>→</span>
          </a>
          <a className="pc-btn pc-btn--ghost" href={PARTNER_HERO.secondaryCta.href}>
            {PARTNER_HERO.secondaryCta.label}
          </a>
        </div>
        <p className="pc-hero__mail">
          Or email{' '}
          <a href={`mailto:${PARTNER_META.contactEmail}`}>{PARTNER_META.contactEmail}</a>
        </p>
      </div>
    </section>
  )
}
