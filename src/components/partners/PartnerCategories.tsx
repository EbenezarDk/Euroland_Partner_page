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
          <p className="pc-caption pc-caption--on-dark">Partner categories</p>
          <h2 className="pc-heading pc-heading--light" id="partner-categories-heading">
            Who we partner with
          </h2>
          <p className="pc-body pc-body--muted">
            Euroland IR collaborates with organisations across the IR ecosystem to deliver
            integrated solutions for listed companies worldwide.
          </p>
        </header>

        <ul className="pc-problems__grid">
          {PARTNER_CATEGORIES.map((category) => (
            <li key={category.id} className="pc-problems__card" data-partner-reveal>
              <article>
                <div className="pc-problems__media">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    width={720}
                    height={480}
                  />
                  <div className="pc-problems__shade" aria-hidden />
                  <div className="pc-problems__overlay">
                    <p className="pc-caption pc-caption--on-dark">{category.caption}</p>
                    <h3 className="pc-problems__title">{category.title}</h3>
                    <p className="pc-body pc-body--muted">{category.description}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
