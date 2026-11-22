import { useState } from 'react'
import { cvLink, github, linkedin, photo } from '../content.ts'

// In page order
const sections = ['About', 'Projects', 'Experience', 'Skills', 'Credentials', 'Contact']

export function Header() {
  const { caption, ...img } = photo
  const [open, setOpen] = useState(false)
  return (
    <header>
      <a className="skip-link visually-hidden" href="#main">Skip to main content</a>
      <div className="bar">
        <nav aria-label="Sections">
          <button type="button" className="menu-button" popoverTarget="section-menu">{open ? 'Close' : 'Menu'}</button>
          <ul
            id="section-menu"
            className="section-menu"
            popover="auto"
            onToggle={(e) => setOpen(e.newState === 'open')}
            // A popover stays open when a link inside it only moves within the page
            onClick={(e) => open && e.target instanceof HTMLAnchorElement && e.currentTarget.hidePopover()}
          >
            {sections.map((s) => <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>)}
          </ul>
        </nav>
        <nav aria-label="Profiles and CV">
          <ul>
            {[github, linkedin, cvLink].map((l) => <li key={l.label}><a href={l.url}>{l.label}</a></li>)}
          </ul>
        </nav>
      </div>
      <div className="intro">
        <h1>Hi, I’m Seanrei Valdeabella.</h1>
        <p className="lead">Computer Science graduate specializing in full-stack development and AI/ML</p>
        <p className="actions">
          <a className="button" href="#projects">See the projects</a>
          <a className="button outline" href={cvLink.url}>Open CV</a>
        </p>
      </div>
      <div className="photo">
        <figure className="print">
          <img {...img} fetchPriority="high" />
          <figcaption className="serif">{caption}</figcaption>
        </figure>
      </div>
    </header>
  )
}
