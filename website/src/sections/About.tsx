import { education, whoIAm } from '../content.ts'

export function About() {
  return (
    <section id="about" aria-labelledby="about-h">
      <h2 id="about-h">About</h2>
      <section>
        <h3>{whoIAm.heading}</h3>
        {whoIAm.items.map((p) => <p key={p} className="lead">{p}</p>)}
      </section>
      <section>
        <h3>{education.heading}</h3>
        {education.items.map((s) => (
          <article key={s.school}>
            <h4>{s.school}</h4>
            <p className="small">{s.degree}</p>
            <p className="small">{s.years}</p>
          </article>
        ))}
      </section>
    </section>
  )
}
