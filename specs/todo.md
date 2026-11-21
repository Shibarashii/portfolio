# Tasks: Portfolio Website

Plan: [plan.md](plan.md). Spec: [SPEC.md](SPEC.md). All commands run from `website/`.

## Phase 1: Foundation

### T1: Scaffold the Vite app with a header and CV link, and deploy it to Pages
**Description:** Create `website/` from the `react-ts` template and strip the demo content. Set `base` and `fs.allow`. Render a header with name, title, GitHub link and CV link, where the CV link imports `CurriculumVitae.pdf?url` from outside the root. Add the Pages workflow.

**Acceptance criteria:**
- [ ] `npm run dev` and `npm run build` both work, and the CV link opens the PDF in each
- [ ] Pushing to `main` deploys, and `https://shibarashii.github.io/portfolio/` shows the header with working links
- [ ] `.gitignore` covers `website/dist` and `node_modules`

**Verification:**
- [ ] `npm run build && npm run preview`, then click the CV link
- [ ] Open the live URL after the workflow finishes (needs the repo public and Pages enabled)

**Dependencies:** None
**Files:** `website/` (template), `website/vite.config.ts`, `website/src/App.tsx`, `website/src/index.css`, `.github/workflows/deploy.yml`
**Scope:** M

### T2: Course completions, generated from file names
**Description:** Write the parser `parseCompletion(path, url)` in `completions.ts` and its test. Add `Credentials.tsx`, which globs `completions/**/*.pdf` and renders a collapsed **Course Completions** `<details>` with Specializations and Courses, newest first.

**Acceptance criteria:**
- [ ] Test covers: a valid course, a valid specialization, a missing issuer, a bad date, a non-PDF file, and newest-first sorting
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
**Description:** Create `content.ts` with the `Group<T>`, `Project`, `Role` and `Credential` types. Seed `projects` with the 5 CV projects in Machine Learning and Web Applications, plus an empty Hardware & Homelab group. Render `Projects.tsx` per the spec's code sample.

**Acceptance criteria:**
- [ ] Machine Learning and Web Applications render as `h3` subsections with cards (title, summary, stack tags, Source link)
- [ ] Hardware & Homelab is not rendered while it's empty
- [ ] Summaries and stacks match `CurriculumVitae.tex`

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: all 5 repo links open

**Dependencies:** T1
**Files:** `src/content.ts`, `src/sections/Projects.tsx`, `src/App.tsx`
**Scope:** S

### T4: About section + section nav
**Description:** Add `about` data (an intro paragraph and Education entries from the CV) and `About.tsx` with Who I Am and Education. Add header nav links to `#about`, `#projects`, `#experience`, `#skills` and `#credentials`.

**Acceptance criteria:**
- [ ] About renders first, with both subsections
- [ ] Each nav link jumps to its section, and sections not built yet are left out of the nav
- [ ] The intro is a draft marked `TODO` for Seanrei to edit

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: click every nav link

**Dependencies:** T3
**Files:** `src/content.ts`, `src/sections/About.tsx`, `src/App.tsx`
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
**Description:** Add `skills` data and `Skills.tsx` with five subsections: Languages, Web Development, Data & Machine Learning, Developer Tools, and Operating Systems.

**Acceptance criteria:**
- [ ] Five `h3` subsections in that order
- [ ] Every skill on the CV appears exactly once

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: compare against the CV's Technical Skills

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
**Description:** Finish `index.css`: a readable max width, card grid, light and dark themes via `prefers-color-scheme`, and visible `:focus-visible` styles. Fill in the Website commands in CLAUDE.md.

**Acceptance criteria:**
- [ ] No horizontal scroll at 375px. Cards stack on phones.
- [ ] Lighthouse Accessibility ≥ 95 on the live URL
- [ ] CLAUDE.md "Website" lists hosting and the dev/build/test commands

**Verification:**
- [ ] Manual: check at 375px and desktop widths in the browser pane, in both themes
- [ ] Manual: tab through the whole page
- [ ] Run Lighthouse

**Dependencies:** T4–T7
**Files:** `src/index.css`, `CLAUDE.md`
**Scope:** S

## Checkpoint C: Complete
- [ ] All 7 spec success criteria met on the live site
