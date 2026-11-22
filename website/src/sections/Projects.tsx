import { projects } from '../content.ts'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h">Projects</h2>
      {projects.filter((g) => g.items.length).map((g) => (
        <section key={g.heading} className={g.heading === 'Desktop Applications' ? 'band' : undefined}>
          <h3>{g.heading}</h3>
          {g.items.map((p) => (
            <article key={p.title} className={`project ${p.size ?? ''}`}>
              <h4>{p.title}</h4>
              <p className={p.size && 'lead'}>{p.summary}</p>
              <p className="small">{p.stack.join(', ')}. {p.dates}</p>
              <div className="links">
                {p.link
                  ? <a className="button" href={p.link}>Open the app<span className="visually-hidden">: {p.title}</span></a>
                  : p.repo && <a className={p.size && 'button'} href={p.repo}>Source<span className="visually-hidden"> of {p.title}</span></a>}
                <details>
                  <summary className={p.size && 'button outline'}>
                    <span className="when-closed">Details</span>
                    <span className="when-open">Close details</span>
                    <span className="visually-hidden"> of {p.title}</span>
                  </summary>
                  <div className="card panel">
                    <h5 className="serif">What I built</h5>
                    <ul role="list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                    {p.link && p.repo && <p><a href={p.repo}>Source on GitHub<span className="visually-hidden"> of {p.title}</span></a></p>}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </section>
      ))}
    </section>
  )
}
