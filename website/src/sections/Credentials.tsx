import { listCompletions, type Completion } from '../completions.ts'
import { credentials, introToGithub } from '../content.ts'
import drawnCertificate from '../figures/certificate.svg'

const completions = listCompletions(
  import.meta.glob<string>('../../../completions/**/*.pdf', { query: '?url', import: 'default', eager: true }),
  {
    ...import.meta.glob<string>('../../../completions/Specialization Certificates/*.pdf', { query: '?preview=560', import: 'default', eager: true }),
    ...import.meta.glob<string>('../../../completions/Course Certificates/*.pdf', { query: '?preview=264', import: 'default', eager: true }),
  },
)

const specializations = completions.filter((c) => c.kind === 'specialization')
// Older than every course in completions/, so it goes last
const courses = [...completions.filter((c) => c.kind === 'course'), introToGithub]

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

function Day({ date }: { date: string }) {
  return <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
}

// The frame is Letter sized, and other pages fit inside it uncropped. The title next to it says what it is.
function Preview({ src }: { src: string }) {
  return <img className="preview" src={src} alt="" width="280" height="216" loading="lazy" decoding="async" />
}

function Courses({ items, className }: { items: Completion[]; className?: string }) {
  return (
    // Safari drops list semantics once the bullets are styled away
    <ul role="list" className={className}>
      {items.map((c) => (
        <li key={c.url}>
          <a className="course" href={c.url}>
            {c.preview && <Preview src={c.preview} />}
            <div>
              <p className="serif">{c.title}</p>{' '}
              <p className="small">{c.issuer}, <Day date={c.date} /></p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-h">
      <h2 id="credentials-h">Credentials</h2>
      <div className="credentials">
        {credentials.filter((g) => g.items.length).map((g) => {
          const cards = g.items.filter((c) => c.pdf || c.preview)
          const rest = g.items.filter((c) => !c.pdf && !c.preview)
          return (
            <section key={g.heading}>
              <div className="group">
                <h3>{g.heading}</h3>
                {cards.map((c) => (
                  <article key={c.title} className="credential">
                    <div className="print"><Preview src={c.preview ?? drawnCertificate} /></div>
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
      <section className="courses">
        <h3>Course Completions</h3>
        <section>
          <h4>Specializations</h4>
          <Courses items={specializations} className="stacked" />
        </section>
        <section>
          <h4>Courses</h4>
          <details>
            <summary className="card">
              <span className="serif">{courses.length} courses</span>
              <span className="when-closed">Show all</span>
              <span className="when-open">Hide</span>
            </summary>
            <Courses items={courses} />
          </details>
        </section>
      </section>
    </section>
  )
}
