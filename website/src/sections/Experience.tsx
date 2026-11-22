import { experience } from '../content.ts'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-h">
      <h2 id="experience-h">Experience</h2>
      {experience.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {g.items.map((r) => (
            <article key={r.role} className="role card">
              <div>
                <h4>{r.role}</h4>
                <p className="strong">{r.org}</p>
                <ul>{r.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                {r.pdf && <p><a href={r.pdf}>Certificate (PDF)<span className="visually-hidden">, {r.role}</span></a></p>}
              </div>
              <div className="postmark">
                <span className={`stamp serif ${r.stamp.color ?? ''}`} aria-hidden="true">{r.stamp.text}</span>
                <p>{r.start} to {r.end ?? 'present'}</p>
              </div>
            </article>
          ))}
        </section>
      ))}
    </section>
  )
}
