import { useEffect, useState } from 'react'
import { cvLink, github, linkedin, photo } from '../content.ts'

// Devicon v2.17.0 (MIT), see logos/LICENSES.txt
const profiles = [
  [github, 'M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z'],
  [linkedin, 'M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z'],
] as const

// In page order
const sections = ['About', 'Projects', 'Experience', 'Skills', 'Credentials', 'Contact']

// index.html sets it from localStorage before the page paints. index.css reads it.
const schemeMeta = () => document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')!

// Switches to the theme not on screen. Picking the device's own theme forgets the choice, so the device decides again.
function toggleTheme() {
  const device = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const shown = schemeMeta().content === 'light dark' ? device : schemeMeta().content
  const next = shown === 'dark' ? 'light' : 'dark'
  schemeMeta().content = next === device ? 'light dark' : next
  try {
    if (next === device) localStorage.removeItem('color-scheme')
    else localStorage.setItem('color-scheme', next)
  } catch {
    // Site data blocked: switched, just not remembered
  }
}

export function Header() {
  const { caption, ...img } = photo
  const [open, setOpen] = useState(false)
  // Which way the page last scrolled. Off the top, the bar floats as a card and hides while scrolling down.
  const [scroll, setScroll] = useState<'top' | 'up' | 'down'>('top')
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      // Clamped, so the bounce past either end doesn't count as a change of direction
      const y = Math.max(0, Math.min(scrollY, document.documentElement.scrollHeight - innerHeight))
      // Small moves don't count, such as the page settling after the menu closes
      if (y > 0 && Math.abs(y - last) < 10) return
      setScroll(y === 0 ? 'top' : y > last ? 'down' : 'up')
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  // The theme button was pressed in another tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'color-scheme' || e.key === null) schemeMeta().content = e.newValue ?? 'light dark'
    }
    addEventListener('storage', onStorage)
    return () => removeEventListener('storage', onStorage)
  }, [])
  return (
    <header>
      <a className="skip-link visually-hidden" href="#main">Skip to main content</a>
      {/* Holds the bar's place, so nothing moves when the bar floats */}
      <div className="bar-slot">
        <div className="bar" data-floating={scroll !== 'top' || undefined} data-hidden={scroll === 'down' || undefined}>
          <nav aria-label="Sections">
            {/* The title is the name and the tooltip */}
            <button type="button" className="menu-button" popoverTarget="section-menu" title={open ? 'Close' : 'Menu'}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d={open ? 'M5 5l14 14M19 5L5 19' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
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
              {profiles.map(([l, icon]) => (
                <li key={l.label}>
                  <a className="icon-link" href={l.url} title={l.label}>
                    <svg aria-hidden="true" viewBox="0 0 128 128" width="24" height="24" fill="currentColor"><path fillRule="evenodd" d={icon} /></svg>
                  </a>
                </li>
              ))}
              <li><a href={cvLink.url} title="Curriculum vitae (PDF)">{cvLink.label}</a></li>
              {/* After a divider, so it doesn't read as one more profile link. index.css shows the icon of the theme on screen. */}
              <li className="theme-item">
                <button type="button" className="icon-link theme-button" onClick={toggleTheme}>
                  <span className="when-light" title="Switch to dark theme">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="5" stroke="none" />
                      <path fill="none" d="M12 1v2.5M12 20.5V23M1 12h2.5M20.5 12H23M4.2 4.2 6 6M18 18l1.8 1.8M4.2 19.8 6 18M18 6l1.8-1.8" />
                    </svg>
                    <span className="visually-hidden">Switch to dark theme</span>
                  </span>
                  <span className="when-dark" title="Switch to light theme">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M10.83 3.08A9 9 0 1 0 20.92 13.17 7.5 7.5 0 0 1 10.83 3.08z" />
                    </svg>
                    <span className="visually-hidden">Switch to light theme</span>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
