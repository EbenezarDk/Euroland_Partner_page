import { PARTNER_COLLABORATIONS } from '../../data/partnersContent'

export function PartnerCollaborate() {
  return (
    <section
      className="pc-section pc-collaborate"
      id="partner-collaborate"
      aria-labelledby="partner-collaborate-heading"
    >
      <div className="pc-shell">
        <header className="pc-collaborate__header" data-partner-reveal>
          <h2 className="pc-heading" id="partner-collaborate-heading">
            Why Euroland IR?
          </h2>
        </header>

        <ul className="pc-collaborate__grid">
          {PARTNER_COLLABORATIONS.map((item) => (
            <li key={item.id} className="pc-collaborate__stat" data-partner-reveal>
              <p className="pc-collaborate__value">{item.value}</p>
              <p className="pc-collaborate__label">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
