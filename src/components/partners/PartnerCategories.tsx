import { PARTNER_CATEGORIES } from '../../data/partnersContent'

export function PartnerCategories() {
  return (
    <section
      className="pc-problems"
      id="partner-categories"
      aria-labelledby="partner-categories-heading"
    >
      <div className="pc-shell">
        <header className="pc-problems__header" data-partner-reveal>
          <p className="pc-caption pc-caption--on-dark">Why Partner with Euroland IR?</p>
          <h2 className="pc-heading pc-heading--light" id="partner-categories-heading">
            Partnering with Euroland IR gives you access to proven IR software and technology,
            industry expertise and ongoing support to help grow your business.
          </h2>
        </header>

        <ul className="pc-problems__grid">
          {PARTNER_CATEGORIES.map((item, index) => (
            <li key={item.id} className="pc-problems__tile" data-partner-reveal>
              <article className="pc-problems__tile-inner">
                <span className="pc-problems__num" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="pc-problems__tile-body">
                  <h3 className="pc-problems__title">{item.title}</h3>
                  <p className="pc-body pc-body--muted">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
