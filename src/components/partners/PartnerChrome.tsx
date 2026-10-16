import type { RefObject } from 'react'

type PartnerChromeProps = {
  headerRef: RefObject<HTMLElement | null>
  isSolid?: boolean
}

export function PartnerChrome({ headerRef, isSolid = false }: PartnerChromeProps) {
  return (
    <header className={`pc-header${isSolid ? ' pc-header--solid' : ''}`} ref={headerRef}>
      <a
        className="pc-header__brand"
        href="#partner-hero"
        aria-label="Euroland IR — Become a Partner"
        onClick={(event) => {
          event.preventDefault()
          window.location.hash = 'partner-hero'
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <img
          className="pc-header__logo pc-header__logo--white"
          src="/assets/logo-white.svg"
          alt="Euroland IR"
          width={220}
          height={28}
        />
        <img
          className="pc-header__logo pc-header__logo--blue"
          src="/assets/logo-blue.svg"
          alt=""
          aria-hidden
          width={220}
          height={28}
        />
      </a>

      <div className="pc-header__actions">
        <a className="pc-btn pc-btn--light" href="#partner-enquiry">
          Become a Partner
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  )
}
