import { useState } from 'react'
import { cvLink, github, linkedin } from '../content.ts'

// Only the sections that are built, in page order
const sections = ['About', 'Projects', 'Experience', 'Credentials', 'Contact']

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header>
      <a className="skip-link visually-hidden" href="#main">Skip to main content</a>
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
      <h1>Seanrei Valdeabella</h1>
      <p>Computer Science graduate specializing in full-stack development and AI/ML</p>
    </header>
  )
}
