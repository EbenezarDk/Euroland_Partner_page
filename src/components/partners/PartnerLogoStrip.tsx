const LOGOS = [
  { src: '/assets/clients/carlsberg.png', alt: 'Carlsberg' },
  { src: '/assets/clients/santander.png', alt: 'Santander' },
  { src: '/assets/clients/rio-tinto.png', alt: 'Rio Tinto' },
  { src: '/assets/clients/experian.png', alt: 'Experian' },
  { src: '/assets/clients/ing.png', alt: 'ING' },
  { src: '/assets/clients/sony.png', alt: 'Sony' },
] as const

export function PartnerLogoStrip() {
  return (
    <section className="pc-logos" aria-label="Companies that work with Euroland IR">
      <div className="pc-shell pc-logos__row">
        {LOGOS.map((logo) => (
          <img
            key={logo.alt}
            className="pc-logos__item"
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            height={36}
          />
        ))}
      </div>
    </section>
  )
}
