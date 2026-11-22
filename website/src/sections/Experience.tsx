import { experience } from '../content.ts'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-h">
      <h2 id="experience-h">Experience</h2>
      {experience.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {g.items.map((r) => (
            <article key={r.role} className="entry">
              <h4>{r.role}</h4>
              <p>{r.org}</p>
              <p>{r.start} to {r.end ?? 'present'}</p>
              <ul>{r.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              {r.pdf && <p><a href={r.pdf}>Certificate (PDF)<span className="visually-hidden">, {r.role}</span></a></p>}
            </article>
          ))}
        </section>
      ))}
    </section>
  )
}
