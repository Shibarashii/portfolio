import { skills } from '../content.ts'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h">
      <h2 id="skills-h">Skills</h2>
      {skills.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {/* Safari drops list semantics once the bullets are styled away */}
          <ul role="list" className="skills">
            {g.items.map((s) => (
              <li key={s.name}>
                <span className="sticker serif" aria-hidden="true">
                  {s.logo ? <img src={s.logo} alt="" width="54" height="54" loading="lazy" /> : s.name}
                </span>
                {s.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  )
}
