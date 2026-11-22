# Tasks: Portfolio Website

Plan: [plan.md](plan.md). Spec: [SPEC.md](SPEC.md). All commands run from `website/`.

## Phase 1: Foundation

### T1: Scaffold the Vite app with a header and CV link, and deploy it to Pages
**Description:** Create `website/` from the `react-ts` template and strip the demo content. Set `base` and `fs.allow`. Render a header with name, title, GitHub, LinkedIn and CV links, where the CV link imports `CurriculumVitae.pdf?url` from outside the root. Add the Pages workflow.

**Acceptance criteria:**
- [ ] `npm run dev` and `npm run build` both work, and the CV link opens the PDF in each
- [ ] Pushing to `main` deploys, and `https://shibarashii.github.io/portfolio/` shows the header with working links
- [ ] `.gitignore` covers `website/dist` and `node_modules`

**Verification:**
- [ ] `npm run build && npm run preview`, then click the CV link
- [ ] Open the live URL after the workflow finishes (needs spec Open Question 1 answered and Pages enabled)

**Dependencies:** None
**Files:** `website/` (template), `website/vite.config.ts`, `website/src/App.tsx`, `website/src/index.css`, `.github/workflows/deploy.yml`
**Scope:** M

### T2: Course completions, generated from file names
**Description:** Write the parser `parseCompletion(path, url)` in `completions.ts` and its test. Add `Credentials.tsx`, which globs `completions/**/*.pdf` and renders a collapsed **Course Completions** `<details>` with Specializations and Courses, newest first.

**Acceptance criteria:**
- [ ] Test covers: a valid course, a valid specialization, a name with only one word after the date, a bad date, a non-PDF file, and newest-first sorting
- [ ] The page lists all 34 PDFs (5 specializations, 29 courses), each linking to its PDF
- [ ] A badly named file is skipped with a `console.warn`, and the build doesn't fail

**Verification:**
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Manual: count the entries and open 3 links, including one with spaces in its name

**Dependencies:** T1
**Files:** `src/completions.ts`, `src/completions.test.ts`, `src/sections/Credentials.tsx`, `src/App.tsx`, `package.json` (test script)
**Scope:** M

## Checkpoint A
- [ ] `npm test && npm run build` pass
- [ ] Live site shows the header, CV link and 34 courses
- [ ] Human review before Phase 2

## Phase 2: Sections

### T3: Content types + Projects section
**Description:** Create `content.ts` with the `Group<T>`, `Project`, `Role` and `Credential` types. Seed `projects` with the 8 projects in the spec's "Projects shown" table, plus an empty Hardware & Homelab group. Render `Projects.tsx` per the spec's code sample, without images (T9 adds them).

**Acceptance criteria:**
- [ ] Web Applications, Machine Learning and Desktop Applications render as `h3` subsections. Each card has a title, a summary, stack, dates, links and details that open on this page.
- [ ] Hardware & Homelab is not rendered while it's empty
- [ ] Summaries and stacks match the repos and `CurriculumVitae.tex`. ESPA has no source link, and its wording is approved by Seanrei.

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: open and close every card's details with the keyboard
- [ ] Manual: all 7 source links and the PC Flipper live link open without being logged in to GitHub

**Dependencies:** T1
**Files:** `src/content.ts`, `src/sections/Projects.tsx`, `src/App.tsx`
**Scope:** S

### T4: About and Contact sections + section nav
**Description:** Add `about` data (an intro paragraph and Education entries from the CV) and `About.tsx` with Who I Am and Education. Add `Contact.tsx` with Write to Me and Find Me Online. Add header nav links to `#about`, `#projects`, `#experience`, `#skills`, `#credentials` and `#contact`.

**Acceptance criteria:**
- [ ] About renders first and Contact last, each with both subsections
- [ ] Contact has LinkedIn, GitHub and CV links, and an email link to the CV's address
- [ ] Each nav link jumps to its section, and sections not built yet are left out of the nav
- [ ] The intro is a draft marked `TODO` for Seanrei to edit

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: click every nav link

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/About.tsx`, `src/sections/Contact.tsx`, `src/App.tsx`
**Scope:** S

### T5: Experience section
**Description:** Add `experience` data (Work & Internships and Leadership from the CV) and `Experience.tsx`. The DOST OJT entry links its certificate PDF.

**Acceptance criteria:**
- [ ] Two `h3` subsections. Entries show role, org, dates and bullets.
- [ ] The OJT entry has a working certificate link
- [ ] Matches the CV's Experience and Leadership sections

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: open the OJT PDF

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/Experience.tsx`, `src/App.tsx`
**Scope:** S

### T6: Skills section
**Description:** Add `skills` data and `Skills.tsx`, each skill a logo sticker with its name, in the eight subsections of the spec's "Skills shown".

**Acceptance criteria:**
- [ ] Eight `h3` subsections in that order
- [ ] Every skill in "Skills shown" appears exactly once

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: compare against "Skills shown"

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/Skills.tsx`, `src/App.tsx`
**Scope:** S

### T7: Hand-listed Credentials subsections
**Description:** Add `credentials` data and render it above Course Completions:
- Certifications: ITS certificate + score report
- Assessments: TOPCIT
- Eligibility: Civil Service card, no PDF
- Awards & Recognition: Research Congress

Also append the hand-listed Introduction to Github entry to Courses.

**Acceptance criteria:**
- [ ] Four `h3` subsections render above Course Completions
- [ ] Every PDF from the spec's "Where the existing PDFs go" table opens from its spot
- [ ] Civil Service renders as a card with no link

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: open each credential PDF

**Dependencies:** T2, T3
**Files:** `src/content.ts`, `src/sections/Credentials.tsx`
**Scope:** S

## Checkpoint B
- [ ] Spec success criteria 3, 4 and 7 met
- [ ] Seanrei reviews the content wording and fills in the `TODO` placeholders

## Phase 3: Polish

### T8: Responsive layout, dark mode, focus styles, Lighthouse a11y ≥ 95
**Description:** Finish `index.css`: a readable max width, the settled look, self-hosted fonts, light and dark themes via `prefers-color-scheme`, and visible `:focus-visible` styles. Fill in the Website commands in CLAUDE.md.

**Acceptance criteria:**
- [ ] No horizontal scroll at 375px. Cards stack on phones.
- [ ] Follows the spec's "Visual design" rules, from `[Ready for dev]` Figma sections only
- [ ] Lighthouse Accessibility ≥ 95 on the live URL
- [ ] CLAUDE.md "Website" lists hosting and the dev/build/test commands

**Verification:**
- [ ] Manual: check at 375px and desktop widths in the browser pane, in both themes
- [ ] Manual: tab through the whole page
- [ ] Run Lighthouse

**Dependencies:** T4–T7
**Files:** `src/index.css`, `CLAUDE.md`
**Scope:** S

### T9: Project images
**Description:** Add project screenshots, and any drawn figure, per `[Ready for dev]` Figma sections and the spec's "Projects: what any layout must do". Rewrite this task once the new look is settled.

**Acceptance criteria:**
- [ ] Every project with a safe screenshot shows it
- [ ] Seanrei has checked every screenshot at full size, and signed off any figure against its project's code
- [ ] Images are readable in both themes and at 375px, and each has alt text

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: check both themes at 375px and desktop widths

**Dependencies:** T3, T8, spec Open Questions 6 and 7
**Files:** `src/screenshots/`, `src/content.ts`, `src/sections/Projects.tsx`, `src/index.css`
**Scope:** M

## Checkpoint C: Complete
- [ ] All 9 spec success criteria met on the live site
