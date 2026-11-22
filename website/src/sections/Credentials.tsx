import { listCompletions } from '../completions.ts'

const completions = listCompletions(
  import.meta.glob<string>('../../../completions/**/*.pdf', { query: '?url', import: 'default', eager: true }),
)

const groups = [
  { heading: 'Specializations', items: completions.filter((c) => c.kind === 'specialization') },
  { heading: 'Courses', items: completions.filter((c) => c.kind === 'course') },
]

const formatDate = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-h">
      <h2 id="credentials-h">Credentials</h2>
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
                    <time dateTime={c.date}>{formatDate.format(new Date(c.date))}</time>
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
