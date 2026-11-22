const targets = [
  'main :is(h2, h3):not(.postcard *)',
  '#about :is(.lead, article)',
  '.project, .role, .credential, .more, .postcard',
  '.skills li, .courses h4, .stacked li, .courses details',
].join()

// Holds content back until it is scrolled to, then plays its animation once (see Motion in index.css)
export function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      const arrived = entries.filter((e) => e.isIntersecting)
      const onScreen = arrived.filter((e) => e.boundingClientRect.bottom > 0)
      // One by one, but a big group does not take longer than a second to start
      const step = Math.min(110, 900 / onScreen.length)
      for (const { target } of arrived) {
        const el = target as HTMLElement
        el.style.setProperty('--wait', `${Math.max(0, onScreen.findIndex((e) => e.target === el)) * step}ms`)
        el.dataset.reveal = ''
        observer.unobserve(el)
      }
    },
    // A little way into the window. The top margin counts everything a link jumped past as arrived.
    { rootMargin: '1000000px 0px -10% 0px' },
  )
  for (const el of document.querySelectorAll<HTMLElement>(targets)) {
    el.dataset.reveal = 'waiting'
    observer.observe(el)
  }
  addEventListener('load', () => document.documentElement.toggleAttribute('data-loaded'))
  // Keyboard focus never lands on something hidden
  document.addEventListener('focusin', (e) => {
    (e.target as Element).closest('[data-reveal="waiting"]')?.removeAttribute('data-reveal')
  })
}
