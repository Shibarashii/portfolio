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
      {credentials.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {g.items.map((c) => (
            <article key={c.title} className="entry">
              <h4>{c.title}</h4>
              <p>{c.issuer}</p>
              {c.date && <p><Day date={c.date} /></p>}
              {c.pdf && <p><a href={c.pdf}>Certificate (PDF)<span className="visually-hidden">, {c.title}</span></a></p>}
            </article>
          ))}
        </section>
      ))}
      <section>
        <h3>Course Completions</h3>
        <details>
          <summary>{groups.map((g) => `${g.items.length} ${g.heading.toLowerCase()}`).join(' and ')}</summary>
          {groups.map((g) => (
            <section key={g.heading}>
              <h4>{g.heading}</h4>
              {/* Safari drops list semantics once the bullets are styled away */}
              <ul role="list">
                {g.items.map((c) => (
                  <li key={c.url}>
                    {/* The issuer is in the link because two issuers share a title */}
                    <a href={c.url}>{c.issuer} {c.title}</a>{' '}
                    <Day date={c.date} />
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
