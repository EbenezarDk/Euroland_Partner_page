import { PARTNER_GROW } from '../../data/partnersContent'

export function PartnerGrowTogether() {
  return (
    <section
      className="pc-section pc-grow"
      id="partner-grow"
      aria-labelledby="partner-grow-heading"
    >
      <div className="pc-shell pc-grow__layout">
        <div className="pc-grow__copy" data-partner-reveal>
          <h2 className="pc-heading" id="partner-grow-heading">
            {PARTNER_GROW.title}
          </h2>
          <p className="pc-body">{PARTNER_GROW.description}</p>
          <div className="pc-grow__actions">
            <a className="pc-btn pc-btn--light pc-grow__cta" href={PARTNER_GROW.primaryCta.href}>
              {PARTNER_GROW.primaryCta.label}
              <span aria-hidden>→</span>
            </a>
            <a className="pc-btn pc-btn--ghost pc-grow__cta-secondary" href={PARTNER_GROW.secondaryCta.href}>
              {PARTNER_GROW.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="pc-grow__media" data-partner-reveal>
          <img
            src={PARTNER_GROW.image}
            alt={PARTNER_GROW.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
