import { listCompletions } from '../completions.ts'
import { credentials, introToGithub } from '../content.ts'

const completions = listCompletions(
  import.meta.glob<string>('../../../completions/**/*.pdf', { query: '?url', import: 'default', eager: true }),
)

const groups = [
  { heading: 'Specializations', items: completions.filter((c) => c.kind === 'specialization') },
  // Older than every course in completions/, so it goes last
  { heading: 'Courses', items: [...completions.filter((c) => c.kind === 'course'), introToGithub] },
]

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

function Day({ date }: { date: string }) {
  return <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
}

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-h">
      <h2 id="credentials-h">Credentials</h2>
      <div className="credentials">
        {credentials.filter((g) => g.items.length).map((g) => {
          const cards = g.items.filter((c) => c.pdf || c.cover)
          const rest = g.items.filter((c) => !c.pdf && !c.cover)
          return (
            <section key={g.heading}>
              <div className="group">
                <h3>{g.heading}</h3>
                {cards.map((c) => (
                  <article key={c.title} className="credential">
                    {c.pdf
                      ? <div className="print" aria-hidden="true"><div className="paper" /></div>
                      : <div className="cover band serif" aria-hidden="true">{c.cover}</div>}
                    <div>
                      <h4>{c.title}</h4>
                      <p className="small">{c.issuer}</p>
                      {c.date && <p className="small"><Day date={c.date} /></p>}
                      {c.pdf && <p><a href={c.pdf}>Certificate (PDF)<span className="visually-hidden">, {c.title}</span></a></p>}
                    </div>
                  </article>
                ))}
              </div>
              {rest.length > 0 && (
                <div className="more">
                  <h4>More awards</h4>
                  {/* Safari drops list semantics once the bullets are styled away */}
                  <ul role="list">
                    {rest.map((c) => (
                      <li key={c.title}>
                        <p className="serif">{c.title}</p>
                        <p className="small">{c.issuer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )
        })}
      </div>
      <section>
        <h3>Course Completions</h3>
        <details className="courses card">
          <summary>
            <span className="serif">{groups.map((g) => `${g.items.length} ${g.heading.toLowerCase()}`).join(' and ')}</span>
            <span className="when-closed">Show all</span>
            <span className="when-open">Hide</span>
          </summary>
          {groups.map((g) => (
            <section key={g.heading}>
              <h4>{g.heading}</h4>
              {/* Safari drops list semantics once the bullets are styled away */}
              <ul role="list">
                {g.items.map((c) => (
                  <li key={c.url}>
                    {/* The issuer is in the link because two issuers share a title */}
                    <a href={c.url}>{c.issuer} {c.title}</a>{' '}
                    <span className="small"><Day date={c.date} /></span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </details>
      </section>
    </section>
  )
}
