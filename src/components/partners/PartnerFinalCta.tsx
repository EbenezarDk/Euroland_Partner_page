import { PARTNER_FINAL_CTA, PARTNER_META } from '../../data/partnersContent'

export function PartnerFinalCta() {
  return (
    <section
      className="pc-final"
      id="partner-final"
      aria-labelledby="partner-final-heading"
    >
      <div className="pc-shell pc-final__inner" data-partner-reveal>
        <p className="pc-caption pc-caption--on-dark">Next step</p>
        <h2 className="pc-heading pc-heading--light" id="partner-final-heading">
          {PARTNER_FINAL_CTA.title}
        </h2>
        <p className="pc-body pc-body--muted">{PARTNER_FINAL_CTA.description}</p>
        <div className="pc-final__actions">
          <a className="pc-btn pc-btn--light" href={PARTNER_FINAL_CTA.primaryCta.href}>
            {PARTNER_FINAL_CTA.primaryCta.label}
            <span aria-hidden>→</span>
          </a>
          <a className="pc-btn pc-btn--ghost" href={PARTNER_FINAL_CTA.secondaryCta.href}>
            {PARTNER_FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <p className="pc-final__mail">
          <a href={`mailto:${PARTNER_META.contactEmail}`}>{PARTNER_META.contactEmail}</a>
        </p>
      </div>
    </section>
  )
}
