import { PARTNER_COLLABORATIONS } from '../../data/partnersContent'

export function PartnerCollaborate() {
  return (
    <section
      className="pc-section pc-collaborate"
      id="partner-collaborate"
      aria-labelledby="partner-collaborate-heading"
    >
      <div className="pc-shell pc-collaborate__layout">
        <header data-partner-reveal>
          <p className="pc-caption">Collaboration</p>
          <h2 className="pc-heading" id="partner-collaborate-heading">
            Where partnerships create value
          </h2>
          <p className="pc-body">
            Partnership conversations focus on how organisations contribute to integrated IR
            delivery — across data, websites, and digital tools.
          </p>
        </header>

        <ol className="pc-collaborate__list">
          {PARTNER_COLLABORATIONS.map((item, index) => (
            <li key={item.id} className="pc-collaborate__item" data-partner-reveal>
              <span className="pc-collaborate__index" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="pc-collaborate__title">{item.title}</h3>
                <p className="pc-body">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
