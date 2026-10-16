import { PARTNER_FINAL_CTA, PARTNER_META } from '../../data/partnersContent'

export function PartnerFinalCta() {
  return (
    <section
      className="pc-final"
      id="partner-final"
      aria-labelledby="partner-final-heading"
    >
      <div className="pc-final__banner" data-partner-reveal>
        <div className="pc-final__media" aria-hidden>
          <img
            className="pc-final__bg"
            src="/assets/For%20webite.png"
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
          />
          <div className="pc-final__veil" />
        </div>

        <div className="pc-final__content">
          <p className="pc-final__eyebrow">Next step</p>
          <h2 className="pc-final__title" id="partner-final-heading">
            {PARTNER_FINAL_CTA.title}
          </h2>
          <p className="pc-final__copy">{PARTNER_FINAL_CTA.description}</p>
          <div className="pc-final__actions">
            <a className="pc-btn pc-btn--light" href={PARTNER_FINAL_CTA.primaryCta.href}>
              {PARTNER_FINAL_CTA.primaryCta.label}
              <span aria-hidden>→</span>
            </a>
            <a className="pc-btn pc-btn--ghost" href="#partner-categories">
              Explore partner types
            </a>
          </div>
          <p className="pc-final__mail">
            Or email{' '}
            <a href={`mailto:${PARTNER_META.contactEmail}`}>{PARTNER_META.contactEmail}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
