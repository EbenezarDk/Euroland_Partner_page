import { PARTNER_CREDIBILITY, PARTNER_OFFICES } from '../../data/partnersContent'

export function PartnerAbout() {
  return (
    <section
      className="pc-about"
      id="partner-about"
      aria-labelledby="partner-about-heading"
    >
      <div className="pc-about__watermark" aria-hidden>
        ABOUT
      </div>

      <div className="pc-shell pc-about__inner">
        <div className="pc-about__copy" data-partner-reveal>
          <p className="pc-caption">About Euroland IR</p>
          <h2 className="pc-heading" id="partner-about-heading">
            Partnerships that strengthen investor communication
          </h2>
          <p className="pc-body">
            Euroland IR provides investor relations solutions that help listed companies
            communicate effectively with investors and strengthen investor engagement. We work
            with leading data providers, distribution networks, technology vendors, and stock
            exchanges to deliver a complete, integrated IR solution worldwide.
          </p>
          <p className="pc-body">
            With offices in {PARTNER_OFFICES}, we support listed companies across Asia, Europe,
            and the Middle East — combining best-practice IR with innovative financial technology.
          </p>
        </div>

        <ul className="pc-about__stats" data-partner-reveal>
          {PARTNER_CREDIBILITY.map((item) => (
            <li key={item.id} className="pc-about__stat">
              <p className="pc-about__value">{item.value}</p>
              <p className="pc-about__label">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
