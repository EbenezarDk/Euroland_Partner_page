export function PartnerAbout() {
  return (
    <section
      className="pc-about"
      id="partner-about"
      aria-labelledby="partner-about-heading"
    >
      <div className="pc-shell pc-about__inner">
        <div className="pc-about__layout">
          <div className="pc-about__media" data-partner-reveal>
            <img
              src="/assets/Professionals_shaking_hands_2K_20261016154222.jpg"
              alt="Business partners shaking hands"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="pc-about__copy" data-partner-reveal>
            <p className="pc-caption">
              Euroland IR Global Partner Network: Investor Relations Partner Program
            </p>
            <h2 className="pc-heading" id="partner-about-heading">
              Connecting Expertise. Creating Value together
            </h2>
            <p className="pc-body">
              Join Euroland IR&apos;s international partner network and expand your offerings with
              trusted Investor Relations technology and services, including investor relations
              software for listed companies.
            </p>
            <p className="pc-body">
              By combining your expertise and client relationships with our innovative IR
              solutions, we can create new business opportunities, strengthen client relationships
              and deliver greater value to listed companies worldwide, from large caps to small and
              mid-cap companies across Europe, the Nordics and beyond.
            </p>
            <a className="pc-btn pc-btn--light pc-about__cta" href="#partner-enquiry">
              Become a Partner
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
