import { projects } from '../content.ts'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h">Projects</h2>
      {projects.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {g.items.map((p) => (
            <article key={p.title} className="entry">
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <dl>
                <dt>Stack</dt><dd>{p.stack.join(', ')}</dd>
                <dt>Dates</dt><dd>{p.dates}</dd>
                {p.repo && <><dt>Source</dt><dd><a href={p.repo}>GitHub<span className="visually-hidden"> source of {p.title}</span></a></dd></>}
                {p.link && <><dt>Live</dt><dd><a href={p.link}>Open the app<span className="visually-hidden">: {p.title}</span></a></dd></>}
              </dl>
              <details>
                <summary>Details of {p.title}</summary>
                <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
              </details>
            </article>
          ))}
        </section>
      ))}
    </section>
  )
}
