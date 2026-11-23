# Tasks: Portfolio Website

Plan: [plan.md](plan.md). Spec: [SPEC.md](SPEC.md). All commands run from `website/`.

## Phase 1: Foundation

### T1: Scaffold the Vite app with a header and CV link, and deploy it to Pages
**Description:** Create `website/` from the `react-ts` template and strip the demo content. Set `base` and `fs.allow`. Render a header with name, title, GitHub, LinkedIn and CV links, where the CV link imports `CurriculumVitae.pdf?url` from outside the root. Add the Pages workflow.

**Acceptance criteria:**
- [x] `npm run dev` and `npm run build` both work, and the CV link opens the PDF in each
- [x] Pushing to `main` deploys, and `https://shibarashii.github.io/portfolio/` shows the header with working links
- [x] `.gitignore` covers `website/dist` and `node_modules`

**Verification:**
- [x] `npm run build && npm run preview`, then click the CV link
- [x] Open the live URL after the workflow finishes (needs Pages enabled)

**Dependencies:** None
**Files:** `website/` (template), `website/vite.config.ts`, `website/src/App.tsx`, `website/src/components/Header.tsx`, `website/src/index.css`, `.github/workflows/deploy.yml`
**Scope:** M

### T2: Course completions, generated from file names
**Description:** Write the parser `parseCompletion(path, url)` in `completions.ts` and its test. Add `Credentials.tsx`, which globs `completions/**/*.pdf` and renders a collapsed **Course Completions** `<details>` with Specializations and Courses, newest first.

**Acceptance criteria:**
- [x] Test covers: a valid course, a valid specialization, a name with only one word after the date, a bad date, a non-PDF file, and newest-first sorting
- [x] The page lists all 34 PDFs (5 specializations, 29 courses), each linking to its PDF
- [x] A badly named file is skipped with a `console.warn`, and the build doesn't fail
- [x] Sections render inside one `<main>`, the Course Completions `h3` is outside the `<summary>`, and unstyled lists have `role="list"`

**Verification:**
- [x] `npm test` passes
- [x] `npm run build` passes
- [x] Manual: count the entries and open 3 links, including one with spaces in its name

**Dependencies:** T1
**Files:** `src/completions.ts`, `src/completions.test.ts`, `src/sections/Credentials.tsx`, `src/App.tsx`, `package.json` (test script), `tsconfig.app.json`, `tsconfig.node.json`
**Scope:** M

## Checkpoint A
- [x] `npm test && npm run build` pass
- [x] Live site shows the header, CV link and 34 courses
- [x] Human review before Phase 2

## Phase 2: Sections

### T3: Content types + Projects section
**Description:** Create `content.ts` with the `Group<T>`, `Project`, `Role` and `Credential` types. Seed `projects` with the 8 projects in the spec's "Projects shown" table, plus an empty Hardware & Homelab group. Render `Projects.tsx` per the spec's code sample, without images (T9 adds them).

**Acceptance criteria:**
- [x] Web Applications, Machine Learning and Desktop Applications render as `h3` subsections. Each card has a title, a summary, stack, dates, links and details that open on this page.
- [x] Hardware & Homelab is not rendered while it's empty
- [x] No two links with the same name go to different places, via a `visually-hidden` class in `index.css`
- [ ] Summaries and stacks match the repos and `CurriculumVitae.tex`. ESPA has no source link, and its wording is approved by Seanrei. (Only ESPA is left: its card says `TODO` in `content.ts`. Replace it before the next push.)

**Verification:**
- [x] `npm run build` passes
- [x] Manual: open and close every card's details with the keyboard
- [x] Manual: all 7 source links and the PC Flipper live link open without being logged in to GitHub

**Dependencies:** T1
**Files:** `src/content.ts`, `src/sections/Projects.tsx`, `src/App.tsx`, `src/index.css`
**Scope:** S

### T4: About and Contact sections + section nav
**Description:** Add `about` data (an intro paragraph and Education entries from the CV) and `About.tsx` with Who I Am and Education. Add `Contact.tsx` with Write to Me and Find Me Online. Add header nav links to `#about`, `#projects`, `#experience`, `#skills`, `#credentials` and `#contact`.

**Acceptance criteria:**
- [x] About renders first and Contact last, each with both subsections
- [x] Contact has LinkedIn, GitHub and CV links, and an email link to the CV's address
- [x] Each nav link jumps to its section, and sections not built yet are left out of the nav
- [x] The intro is a draft marked `TODO` for Seanrei to edit
- [x] A skip link goes to the main content, and the section nav has its own name
- [x] The hero photo has alt text, `width`, `height` and `fetchpriority="high"`, and isn't lazy-loaded
- [x] On phones the nav is a button that opens a native popover (`Nav/Menu`). Where popover is missing, the links show.

**Verification:**
- [x] `npm run build` passes
- [x] Manual: click every nav link, and open and close the mobile menu with the keyboard

**Dependencies:** T3. The photo needs spec Open Question 10.
**Files:** `src/content.ts`, `src/components/Header.tsx`, `src/sections/About.tsx`, `src/sections/Contact.tsx`, `src/App.tsx`, `src/main.tsx`, `src/index.css`
**Scope:** M

### T5: Experience section
**Description:** Add `experience` data (Work & Internships and Leadership from the CV) and `Experience.tsx`. The DOST OJT entry links its certificate PDF.

**Acceptance criteria:**
- [x] Two `h3` subsections. Entries show role, org, dates and bullets.
- [x] The OJT entry has a working certificate link
- [x] Matches the CV's Experience and Leadership sections
- [x] Its nav link is added to `Header.tsx`

**Verification:**
- [x] `npm run build` passes
- [x] Manual: open the OJT PDF

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/Experience.tsx`, `src/App.tsx`, `src/components/Header.tsx`
**Scope:** S

### T6: Skills section
**Description:** Add `skills` data and `Skills.tsx`, each skill a logo sticker with its name, in the eight subsections of the spec's "Skills shown".

**Acceptance criteria:**
- [x] Eight `h3` subsections in that order
- [x] Every skill in "Skills shown" appears exactly once
- [x] Each sticker list has `role="list"`
- [x] Its nav link is added to `Header.tsx`

**Verification:**
- [x] `npm run build` passes
- [x] Manual: compare against "Skills shown"

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/Skills.tsx`, `src/logos/`, `vite.config.ts`, `src/App.tsx`, `src/components/Header.tsx`
**Scope:** S

### T7: Hand-listed Credentials subsections
**Description:** Add `credentials` data and render it above Course Completions:
- Certifications: ITS certificate
- Assessments: TOPCIT
- Eligibility: Civil Service card, no PDF
- Awards & Recognition: Research Congress, plus the awards in the CV's Education section

Also append the hand-listed Introduction to Github entry to Courses.

**Acceptance criteria:**
- [x] Four `h3` subsections render above Course Completions
- [x] Every PDF from the spec's "Where the existing PDFs go" table opens from its spot
- [x] Civil Service renders as a card with no link

**Verification:**
- [x] `npm run build` passes
- [x] Manual: open each credential PDF

**Dependencies:** T2, T3
**Files:** `src/content.ts`, `src/sections/Credentials.tsx`
**Scope:** S

## Checkpoint B
- [ ] Spec success criteria 3, 4 and 7 met
- [ ] Seanrei reviews the content wording and fills in the `TODO` placeholders

## Phase 3: Polish

### T8: Responsive layout, dark mode, focus styles, Lighthouse a11y ≥ 95
**Description:** Finish `index.css`: a readable max width, the Family album look, self-hosted fonts, light and dark themes via `prefers-color-scheme`, and visible `:focus-visible` styles. Fill in the Website commands in CLAUDE.md.

**Acceptance criteria:**
- [x] No horizontal scroll at 375px. Cards stack on phones.
- [x] Follows the spec's "Visual design" rules, from `[Ready for dev]` Figma sections only
- [x] Lighthouse Accessibility ≥ 95 on the live URL (100 on mobile and desktop, 2026-11-22)
- [x] Dark mode switches the `--color-*` variables with `prefers-color-scheme`
- [x] Prints tilt with the `rotate` property, and hover sets `rotate: 0deg`. No transitions under `prefers-reduced-motion: reduce`.
- [x] Focus rings use `outline`, with at least 3:1 contrast
- [x] Text set in a web font has `font-size-adjust: from-font`
- [x] CLAUDE.md "Website" lists hosting and the dev/build/test commands

**Verification:**
- [x] Manual: check at 375px and desktop widths in the browser pane, in both themes
- [x] Manual: tab through the whole page
- [x] Run Lighthouse

**Dependencies:** T4–T7
**Files:** `src/index.css`, `CLAUDE.md`
**Scope:** S

### T9: Project images
**Description:** Add project screenshots, and any drawn figure, as `Print`s per the `[Ready for dev]` Figma sections and the spec's "Projects: what any layout must do".

**Acceptance criteria:**
- [x] Every project with a safe screenshot shows it
- [x] Seanrei has checked every screenshot at full size, and signed off any figure against its project's code
- [x] Images are readable in both themes and at 375px, and each has alt text
- [x] Screenshots load lazily, except any that show on the first screen

**Verification:**
- [x] `npm run build` passes
- [x] Manual: check both themes at 375px and desktop widths

**Dependencies:** T3, T8, spec Open Questions 6 and 7
**Files:** `src/screenshots/`, `src/content.ts`, `src/sections/Projects.tsx`, `src/index.css`
**Scope:** M

### T10: Certificate previews and course cards
**Description:** Show the first page of each certificate on its card, and replace the course list with `Card/Course`, per the Figma sections once they are `[Ready for dev]`. Previews are drawn from the PDFs at build time with `pdftoppm`, with no npm dependency.

**Acceptance criteria:**
- [x] Every credential with a PDF shows its first page, uncropped. TOPCIT shows a plain cover with its PDF link
- [x] Specializations are always visible, and courses are cards inside `<details>`
- [x] A new PDF in `completions/` gets a card and a preview with no code change
- [x] Previews have `width` and `height` and load lazily, and each card has one link with a unique name
- [x] Seanrei has checked the previews at full size (2026-11-22)

**Verification:**
- [x] `npm test && npm run build` passes
- [x] Manual: check both themes at 375px and desktop widths

**Dependencies:** T8, Seanrei's OK on the Figma sections

### T11: Placeholders for empty cards
**Description:** Projects with no picture (ESPA and Hitboxd today) and certificates with no preview (TOPCIT and Civil Service) get a default picture. Three options were drawn in Figma, Explorations, Round 5 (2026-11-22). Seanrei picked B: a drawn app window or certificate. It is in Components and Designs.

**Acceptance criteria:**
- [x] Seanrei has picked an option
- [x] Seanrei has OK'd the Figma sections, and they are `[Ready for dev]`
- [x] Small projects with no picture show the app window print beside their text, per `Card/Project small` Layout=Row and Mobile
- [x] TOPCIT and Civil Service show the drawn certificate, and TOPCIT keeps its PDF link
- [x] Both drawings are hidden from screen readers

**Dependencies:** T10

### T12: Animations
**Description:** Scroll reveal, picked by Seanrei from a demo on 2026-11-22: fade up, plays once, one by one, bold. No dependency. Images already load lazily, so nothing is split per section.

**Acceptance criteria:**
- [x] Content fades up once on scroll, prints and stamps follow their card, and all end in their designed state
- [x] Nothing moves under `prefers-reduced-motion: reduce`, and printing shows everything
- [x] Section links land on their section, with nothing hidden on screen or above it, and keyboard focus never lands on something hidden
- [x] No sideways scroll, and Lighthouse is no lower than before (97, 100, 100, 91 on mobile, 2026-11-22)
- [x] Seanrei likes how it moves (2026-11-22)

**Dependencies:** T8, T10, T11
**Files:** `src/reveal.ts`, `src/main.tsx`, `src/index.css`

### T13: Header icons and logo stamps
**Description:** Figma Round 6, picked by Seanrei on 2026-11-23 (A, A, A). GitHub and LinkedIn become icons, the mobile Menu becomes a hamburger that turns into an X, and the Experience stamps show the DOST and LSPU seals on paper. The Contact "Hello" stamp stays text.

**Acceptance criteria:**
- [x] GitHub and LinkedIn are icons only, 44px wide, and screen readers still hear their names. CV stays a word
- [x] The menu button shows a hamburger, then an X while open, and is named "Menu" or "Close"
- [x] Each role stamp is cream paper with the seal, and its dashed edge and frame line take the leaf, red or sun tone
- [x] Matches the Figma bars and stamps at 320 to 1440 px, light and dark, with no sideways scroll
- [ ] Seanrei checks it on the live site

**Dependencies:** T8, T11
**Files:** `src/components/Header.tsx`, `src/sections/Experience.tsx`, `src/content.ts`, `src/index.css`, `src/logos/`

## Checkpoint C: Complete
- [ ] All 9 spec success criteria met on the live site

### T14: Bar comes back on scroll up
**Description:** Picked by Seanrei on 2026-11-23: behaviour A (hide on scroll down, back on scroll up) and look C from Figma Round 7 (a floating card, `Nav/Floating bar`). At the top of the page the bar is as before. A scroll listener in `Header.tsx` sets the state, so Safari and Firefox match Chrome. No dependency.

**Acceptance criteria:**
- [x] Scrolling down hides the bar, scrolling up brings it back as a card inset like Figma, and at the top it is the bar from before
- [x] Nothing on the page moves when the bar floats or hides, and there is no sideways scroll from 320 to 1920 px, light and dark
- [x] A hidden bar comes back when keyboard focus moves into it, and the phone menu opens from the floating bar as before
- [x] After a jump up to a section, its heading is not under the bar
- [ ] Seanrei checks it on the live site

**Dependencies:** T13
**Files:** `src/components/Header.tsx`, `src/index.css`
