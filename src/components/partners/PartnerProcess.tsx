import { PARTNER_PROCESS } from '../../data/partnersContent'

export function PartnerProcess() {
  return (
    <section
      className="pc-section pc-process"
      id="partner-process"
      aria-labelledby="partner-process-heading"
    >
      <div className="pc-shell">
        <header className="pc-section__header" data-partner-reveal>
          <p className="pc-caption">How it works</p>
          <h2 className="pc-heading" id="partner-process-heading">
            A clear three-step path
          </h2>
        </header>

        <ol className="pc-process__grid">
          {PARTNER_PROCESS.map((step) => (
            <li key={step.step} className="pc-process__card" data-partner-reveal>
              <span className="pc-process__step" aria-hidden>
                {step.step}
              </span>
              <h3 className="pc-process__title">{step.title}</h3>
              <p className="pc-body">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
