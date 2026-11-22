import { email, findMeOnline, writeToMe } from '../content.ts'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h">
      <h2 id="contact-h">Contact me</h2>
      <section>
        <h3>{writeToMe.heading}</h3>
        {writeToMe.items.map((p) => <p key={p}>{p}</p>)}
        <p><a href={`mailto:${email}`}>Email me</a></p>
        <p>{email}</p>
      </section>
      <section>
        <h3>{findMeOnline.heading}</h3>
        {/* Safari drops list semantics once the bullets are styled away */}
        <ul role="list">
          {findMeOnline.items.map((l) => <li key={l.label}><a href={l.url}>{l.label}</a></li>)}
        </ul>
      </section>
    </section>
  )
}
