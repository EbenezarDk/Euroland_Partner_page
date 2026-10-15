import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from 'react'
import { COUNTRY_DIAL_CODES } from '../../data/countryDialCodes'
import { PARTNER_META, PARTNER_TYPE_OPTIONS } from '../../data/partnersContent'
import {
  submitPartnerEnquiry,
  type PartnerEnquiryResult,
} from '../../lib/submitPartnerEnquiry'

type PartnerEnquiryFormProps = {
  sectionRef: RefObject<HTMLElement | null>
  formRef: RefObject<HTMLFormElement | null>
}

function normalizeDialCode(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const digits = trimmed.replace(/[^\d+]/g, '')
  if (!digits) return ''
  return digits.startsWith('+') ? digits : `+${digits.replace(/^\+*/, '')}`
}

const COUNTRY_NAMES = Array.from(new Set(COUNTRY_DIAL_CODES.map((c) => c.name)))

export function PartnerEnquiryForm({ sectionRef, formRef }: PartnerEnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [dialCode, setDialCode] = useState('+91')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [dialOpen, setDialOpen] = useState(false)
  const [dialSearch, setDialSearch] = useState('')
  const [locationCountry, setLocationCountry] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [partnerType, setPartnerType] = useState('')

  const dialRef = useRef<HTMLDivElement>(null)
  const dialSearchRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const locationSearchRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const listId = useId()
  const searchId = useId()
  const locationListId = useId()
  const locationSearchId = useId()
  const typeId = useId()

  const selected =
    COUNTRY_DIAL_CODES.find((country) => country.name === selectedCountry) ??
    COUNTRY_DIAL_CODES.find((country) => country.code === normalizeDialCode(dialCode)) ??
    COUNTRY_DIAL_CODES[0]

  const orderedCountries = useMemo(() => {
    const query = dialSearch.trim().toLowerCase()
    const matches = (country: (typeof COUNTRY_DIAL_CODES)[number]) => {
      if (!query) return true
      return (
        country.code.toLowerCase().includes(query) ||
        country.name.toLowerCase().includes(query)
      )
    }
    const selectedFirst = COUNTRY_DIAL_CODES.filter(
      (country) => country.name === selected.name && matches(country),
    )
    const rest = COUNTRY_DIAL_CODES.filter(
      (country) => country.name !== selected.name && matches(country),
    )
    return [...selectedFirst, ...rest]
  }, [dialSearch, selected.name])

  const orderedLocationCountries = useMemo(() => {
    const query = locationSearch.trim().toLowerCase()
    const matches = (name: string) => !query || name.toLowerCase().includes(query)
    const selectedFirst = locationCountry && matches(locationCountry) ? [locationCountry] : []
    const rest = COUNTRY_NAMES.filter((name) => name !== locationCountry && matches(name))
    return [...selectedFirst, ...rest]
  }, [locationCountry, locationSearch])

  useEffect(() => {
    if (!dialOpen) {
      setDialSearch('')
      return
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!dialRef.current?.contains(event.target as Node)) setDialOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDialOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [dialOpen])

  useEffect(() => {
    if (!locationOpen) {
      setLocationSearch('')
      return
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!locationRef.current?.contains(event.target as Node)) setLocationOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLocationOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [locationOpen])

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusRef.current?.focus()
    }
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return

    const form = event.currentTarget
    const formData = new FormData(form)

    setFieldError(null)
    setStatus('loading')
    setStatusMessage('Sending your enquiry…')

    const result: PartnerEnquiryResult = await submitPartnerEnquiry({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      role: String(formData.get('role') ?? ''),
      partnerType,
      location: locationCountry,
      countryCode: normalizeDialCode(dialCode) || selected.code,
      phone: String(formData.get('phone') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
      companyUrl: String(formData.get('companyUrl') ?? ''),
    })

    if (result.ok) {
      setStatus('success')
      setStatusMessage('Thank you — your partnership enquiry was sent. We will be in touch.')
      form.reset()
      setPartnerType('')
      setLocationCountry('')
      setDialCode('+91')
      setSelectedCountry('India')
      return
    }

    setStatus('error')
    setStatusMessage(result.message)
    if (result.code === 'validation') setFieldError(result.message)
  }

  return (
    <section
      className="pc-section pc-enquiry"
      id="partner-enquiry"
      ref={sectionRef}
      aria-labelledby="partner-enquiry-heading"
    >
      <div className="pc-shell pc-enquiry__layout">
        <header className="pc-enquiry__intro" data-partner-reveal>
          <p className="pc-caption">Contact</p>
          <h2 className="pc-heading" id="partner-enquiry-heading">
            Partnership enquiry
          </h2>
          <p className="pc-body">
            Tell us about your organisation. Required fields are marked with an asterisk.
            You can also email{' '}
            <a href={`mailto:${PARTNER_META.contactEmail}`}>{PARTNER_META.contactEmail}</a>.
          </p>
        </header>

        <form
          className="pc-enquiry__form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          data-partner-reveal
        >
          <input
            className="pc-enquiry__honeypot"
            name="companyUrl"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            aria-hidden="true"
          />

          <div className="pc-enquiry__fields">
            <div className="pc-enquiry__row">
              <label className="field">
                <span className="field__label">
                  Name <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Ex. Alex Morgan"
                  disabled={status === 'loading'}
                />
              </label>
              <label className="field">
                <span className="field__label">
                  Work email <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Ex. alex@company.com"
                  disabled={status === 'loading'}
                />
              </label>
            </div>

            <div className="pc-enquiry__row">
              <label className="field">
                <span className="field__label">
                  Company <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="company"
                  type="text"
                  required
                  maxLength={150}
                  autoComplete="organization"
                  placeholder="Ex. Contoso Markets"
                  disabled={status === 'loading'}
                />
              </label>
              <label className="field">
                <span className="field__label">Your role</span>
                <input
                  className="field__input"
                  name="role"
                  type="text"
                  maxLength={100}
                  autoComplete="organization-title"
                  placeholder="Ex. Partnerships Manager"
                  disabled={status === 'loading'}
                />
              </label>
            </div>

            <div className="pc-enquiry__row">
              <fieldset className="field">
                <legend className="field__label" id={typeId}>
                  Partner category <span className="field__req">*</span>
                </legend>
                <div className="pc-enquiry__types" role="group" aria-labelledby={typeId}>
                  {PARTNER_TYPE_OPTIONS.map((option) => (
                    <label key={option.id} className="pc-enquiry__type">
                      <input
                        type="radio"
                        name="partnerType"
                        value={option.id}
                        checked={partnerType === option.id}
                        onChange={() => setPartnerType(option.id)}
                        required
                        disabled={status === 'loading'}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <span className="field__label" id={`${locationListId}-label`}>
                  Location <span className="field__req">*</span>
                </span>
                <div
                  className={`field__location${locationOpen ? ' field__location--open' : ''}`}
                  ref={locationRef}
                >
                  <input type="hidden" name="location" value={locationCountry} required />
                  <button
                    type="button"
                    className="field__location-trigger"
                    aria-labelledby={`${locationListId}-label`}
                    aria-haspopup="listbox"
                    aria-expanded={locationOpen}
                    aria-controls={locationListId}
                    aria-required="true"
                    disabled={status === 'loading'}
                    onClick={() => {
                      setLocationOpen((open) => !open)
                      setDialOpen(false)
                      if (!locationOpen) {
                        requestAnimationFrame(() => locationSearchRef.current?.focus())
                      }
                    }}
                  >
                    <span
                      className={`field__location-value${locationCountry ? '' : ' field__location-value--placeholder'}`}
                    >
                      {locationCountry || 'Select country'}
                    </span>
                    <span className="field__location-caret" aria-hidden>
                      <img src="/assets/caret-down.svg" alt="" />
                    </span>
                  </button>

                  {locationOpen ? (
                    <div className="field__location-menu" id={locationListId}>
                      <div className="field__dial-search">
                        <label className="sr-only" htmlFor={locationSearchId}>
                          Search country
                        </label>
                        <input
                          ref={locationSearchRef}
                          id={locationSearchId}
                          className="field__dial-search-input"
                          type="search"
                          value={locationSearch}
                          onChange={(event) => setLocationSearch(event.target.value)}
                          placeholder="Search country"
                          autoComplete="off"
                        />
                      </div>
                      <ul className="field__dial-list" role="listbox" aria-label="Countries">
                        {orderedLocationCountries.map((name) => (
                          <li key={name} role="option" aria-selected={name === locationCountry}>
                            <button
                              type="button"
                              className={`field__dial-option field__location-option${name === locationCountry ? ' field__dial-option--active' : ''}`}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => {
                                setLocationCountry(name)
                                const match = COUNTRY_DIAL_CODES.find((c) => c.name === name)
                                if (match) {
                                  setDialCode(match.code)
                                  setSelectedCountry(match.name)
                                }
                                setLocationOpen(false)
                              }}
                            >
                              <span className="field__dial-option-code">{name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="pc-enquiry__row">
              <fieldset className="field field--phone">
                <legend className="field__label">
                  Phone number <span className="field__req">*</span>
                </legend>
                <div className="field__phone">
                  <div
                    className={`field__dial${dialOpen ? ' field__dial--open' : ''}`}
                    ref={dialRef}
                  >
                    <div className="field__dial-trigger">
                      <input
                        className="field__dial-input"
                        type="text"
                        inputMode="tel"
                        autoComplete="tel-country-code"
                        aria-label="Country code"
                        aria-haspopup="listbox"
                        aria-expanded={dialOpen}
                        aria-controls={listId}
                        value={dialCode}
                        disabled={status === 'loading'}
                        onChange={(event) => {
                          setDialCode(event.target.value)
                          setDialOpen(true)
                          const normalized = normalizeDialCode(event.target.value)
                          const match = COUNTRY_DIAL_CODES.find((c) => c.code === normalized)
                          if (match) {
                            setSelectedCountry(match.name)
                            setLocationCountry(match.name)
                          }
                        }}
                        onFocus={() => {
                          setDialOpen(true)
                          setLocationOpen(false)
                        }}
                        onBlur={() => {
                          const normalized = normalizeDialCode(dialCode)
                          if (normalized) setDialCode(normalized)
                        }}
                        placeholder="+91"
                      />
                      <button
                        type="button"
                        className="field__dial-caret"
                        aria-label={dialOpen ? 'Hide country codes' : 'Show country codes'}
                        tabIndex={-1}
                        disabled={status === 'loading'}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setDialOpen((open) => !open)
                          setLocationOpen(false)
                          requestAnimationFrame(() => dialSearchRef.current?.focus())
                        }}
                      >
                        <img src="/assets/caret-down.svg" alt="" aria-hidden />
                      </button>
                    </div>

                    {dialOpen ? (
                      <div className="field__dial-menu" id={listId}>
                        <div className="field__dial-search">
                          <label className="sr-only" htmlFor={searchId}>
                            Search country or code
                          </label>
                          <input
                            ref={dialSearchRef}
                            id={searchId}
                            className="field__dial-search-input"
                            type="search"
                            value={dialSearch}
                            onChange={(event) => setDialSearch(event.target.value)}
                            placeholder="Search country or code"
                            autoComplete="off"
                          />
                        </div>
                        <ul className="field__dial-list" role="listbox" aria-label="Country codes">
                          {orderedCountries.map((country) => (
                            <li
                              key={`${country.code}-${country.name}`}
                              role="option"
                              aria-selected={country.name === selected.name}
                            >
                              <button
                                type="button"
                                className={`field__dial-option${country.name === selected.name ? ' field__dial-option--active' : ''}`}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                  setDialCode(country.code)
                                  setSelectedCountry(country.name)
                                  setLocationCountry(country.name)
                                  setDialOpen(false)
                                }}
                              >
                                <span className="field__dial-option-code">{country.code}</span>
                                <span className="field__dial-option-name">{country.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <input
                    className="field__phone-input"
                    name="phone"
                    type="tel"
                    required
                    maxLength={24}
                    autoComplete="tel-national"
                    placeholder="1234 567 890"
                    aria-label="Phone number"
                    disabled={status === 'loading'}
                  />
                </div>
              </fieldset>

              <label className="field">
                <span className="field__label">Company website</span>
                <input
                  className="field__input"
                  name="website"
                  type="url"
                  maxLength={200}
                  autoComplete="url"
                  placeholder="https://example.com"
                  disabled={status === 'loading'}
                />
              </label>
            </div>

            <label className="field">
              <span className="field__label">How would you like to collaborate?</span>
              <textarea
                className="field__textarea"
                name="message"
                maxLength={2000}
                rows={5}
                placeholder="Share a short overview of your organisation and partnership interest."
                disabled={status === 'loading'}
              />
            </label>
          </div>

          {fieldError ? (
            <p className="pc-enquiry__field-error" role="alert">
              {fieldError}
            </p>
          ) : null}

          <div className="pc-enquiry__actions">
            <button
              className="pc-btn pc-btn--accent"
              type="submit"
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Submit enquiry'}
              {status === 'loading' ? null : (
                <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
              )}
            </button>
          </div>

          {status !== 'idle' ? (
            <p
              ref={statusRef}
              className={`pc-enquiry__status pc-enquiry__status--${status}`}
              role="status"
              tabIndex={-1}
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
