# Project cards

**Dropped 2026-11-22.** Seanrei restarted the visual look: too plain or gray, too technical or stiff, too long or text-heavy. Kept as a record only. Don't design or build from it.

Confirmed 2026-11-22.

## Problem Statement
How might we show a recruiter real, working projects at a glance, without falling back on a generic card grid?

## Recommended Direction
Each project is a full-width card between thin rules, grouped by subsection. Three are large: PC Flipper Toolkit, DAMA and Nail Feature Classifier. The first two use a screenshot with up to three numbered pointers, explained in a list beside it. Nail uses its drawn figure, because it has no interface to show.

The other five are small rows. Three have a plain screenshot, while ESPA and Hitboxd get text cards until they have images. Until Barangay Clearance's screenshots are retaken, it gets a text card too.

Each card opens in place, with native `<details>`, for what was built and more screenshots. Links stay visible outside it. Together that is also the full record for writing the CV.

## Key Assumptions to Validate
- [ ] Pointers stay readable on a phone. Test at 375px in Figma.
- [ ] Screenshots don't fight the green. Test real images in both themes.
- [ ] Recruiters understand each project without opening it. Ask one person to skim for 30 seconds.
- [ ] Every screenshot is safe to publish. Check each chosen one at full size.

## MVP Scope
- **In:** three large cards, five small rows, details in place, and real alt text.
- **Out:** everything in "Not Doing".

## Not Doing (and Why)
- **Card grid:** it looks like a template.
- **Pop-up image viewer or carousel:** extra code, and details already hold more images.
- **Pointers on small rows:** too small to read.
- **Recoloring screenshots green:** it misrepresents the work.
- **Drawn figures for PC Flipper and DAMA:** the pointers replace them.

## Open Questions
- Will the barangay and feedback screenshots be retaken with neutral data? Until then, Barangay gets a text card and Community Feedback uses its dashboard screen.
- Can the chosen screenshots be copied into this repo? PC Flipper is already on this machine. The others need downloading.
- What wording can ESPA use?
