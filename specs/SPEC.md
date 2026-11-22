# Spec: Portfolio Website

Status: approved 2026-11-21. Revision (8 projects, screenshots, Family album look) approved 2026-11-22. Intent: [portfolio-sections](intent/portfolio-sections.md). The visual direction is Family album (see Visual design). Where this spec and the sections intent differ, this spec wins: subsections replace the Projects filter and the three Skills groups.

## Objective
A single-page portfolio site that:
- shows a recruiter who Seanrei is and the best projects within the first screen or two, and
- holds a complete archive of every project, role, certificate and credential, which the CV is later picked from.

Sections, in order: **About → Projects → Experience → Skills → Credentials → Contact**. Every section is split into subsections (`h3`).

### Sections and subsections
The subsection headings below are the defaults. They live in `content.ts`, so renaming or adding one is a data edit, not a code change.

| Section | Subsections | Each entry shows |
|---|---|---|
| **About** | Who I Am, Education | Intro paragraph. School, degree, years. |
| **Projects** | Web Applications, Machine Learning, Desktop Applications, Hardware & Homelab | A card: title, summary, stack, dates, links, an image where there is one, and details that open on this page |
| **Experience** | Work & Internships, Leadership | Role, organization, dates, bullets, optional certificate PDF |
| **Skills** | Languages, Frontend, Backend, Databases, Data & Machine Learning, Deployment, Developer Tools, Operating Systems | A logo sticker with the name under it, one line per skill in "Skills shown". The logo is decorative (`aria-hidden`); no logo means a lettered sticker |
| **Credentials** | Certifications, Assessments, Eligibility, Awards & Recognition, Course Completions | Title, issuer, date, PDF links (optional) |
| **Contact** | Write to Me, Find Me Online | Email link (the CV's address). LinkedIn, GitHub and CV links. |

- **Header/nav:** name, a one-line title, and links to each section (`#about` etc.), GitHub, [LinkedIn](https://www.linkedin.com/in/seanrei-valdeabella), and the CV PDF.
- **Hero:** personal photos only, no project images.
- **Contact** is the last section of the page, not a separate page. It has links, not a form: a form on a static host would need an outside service.
- **Empty subsections** are not rendered. For example, Hardware & Homelab stays hidden until it has a project.
- **Credentials entries without a PDF** render as a card with no link. Civil Service eligibility is one of these.
- **Course Completions** is collapsed by default in a `<details>` element (its `h3` sits outside the `<summary>`), split into Specializations and Courses, newest first. **It's generated from the file names in `completions/`**, never typed by hand.

### Skills shown
Regrouped 2026-11-22. This list replaces the CV's Technical Skills. Each skill appears once.

| Subsection | Skills, in order |
|---|---|
| Languages | Python, JavaScript, TypeScript, C#, SQL |
| Frontend | HTML, CSS, Bootstrap, Tailwind CSS, React, Vite |
| Backend | Node.js, Express.js, Django, .NET, Kafka |
| Databases | PostgreSQL, MySQL, SQLite, Neon |
| Data & Machine Learning | PyTorch, scikit-learn, pandas, NumPy, Matplotlib |
| Deployment | Docker, Vercel, Render |
| Developer Tools | Git, VS Code, Visual Studio, Claude Code, Antigravity, Postman, Figma, Google Colab |
| Operating Systems | Windows, Linux, Ubuntu, Linux Mint, Arch Linux, Fedora Linux |

Desktop pairs the first six subsections, two to a row. The last two take a row each. Mobile stacks all eight.

Logos: Devicon v2.17.0 (MIT), except Claude Code and Antigravity (LobeHub Icons v1.101.0, MIT), Neon and Render (Simple Icons v16.20.0, CC0), and SQL (letters). Linux is Devicon's SVG resized to a WebP, since the SVG is 194 kB. Matplotlib is Devicon's plain version, as in Figma. Brand logos stay their owners' trademarks. Licenses are in `src/logos/LICENSES.txt`.

### Projects shown
These 8 are the full list, in this order. Facts come from each repo, checked on 2026-11-22.

| Subsection | Project | Stack | Dates | Links |
|---|---|---|---|---|
| Web Applications | PC Flipper Toolkit | React, TypeScript, Django REST Framework, PostgreSQL | 2026 | [source](https://github.com/Shibarashii/pc-flipper-toolkit), [live](https://pc-flipper-toolkit.vercel.app) |
| Web Applications | ESPA | TODO | 2026 | None: private repo (see Open Questions) |
| Web Applications | Hitboxd | Python, Django | 2026 | [source](https://github.com/Shibarashii/hitboxd) |
| Machine Learning | Nail Feature Classifier | Python, PyTorch, Grad-CAM | Sep to Nov 2025 | [source](https://github.com/Shibarashii/nail-feature-classifier) |
| Machine Learning | DAMA Braille Converter | Python, YOLO, Flask, OpenCV, LLM | Dec 2025 | [source](https://github.com/Shibarashii/DAMA-Filipino-Braille-Converter) |
| Desktop Applications | Automated Barangay Clearance System | C#, .NET, Windows Forms, SQLite | Dec 2024 | [source](https://github.com/Shibarashii/automated-barangay-clearance-system) |
| Desktop Applications | Task Management System | C#, .NET, Windows Forms, MySQL, SendGrid | Dec 2023 | [source](https://github.com/Shibarashii/task-management-system) |
| Desktop Applications | Community Suggestion and Feedback System | C#, .NET, Windows Forms, MySQL | Dec 2023 | [source](https://github.com/Shibarashii/community-suggestion-and-feedback-system) |

The last three were listed as web applications before this revision. They are Windows Forms apps.

### Projects: what any layout must do
- Projects are cards with real screenshots where there are any. The layout is `Card/Project large` and `Card/Project small` in Figma.
- Two or three projects are large and the rest are small.
- Details open on this page, and are also the full record for writing the CV.
- A drawn figure is used only where a screenshot can't show the work (Nail Feature Classifier). ESPA and Hitboxd have no screenshots yet.
- Screenshots live in `src/screenshots/` and are imported, so a missing one fails the build. Each has alt text, `width` and `height`, and loads lazily unless it shows on the first screen.
- **Privacy:** Seanrei checks each screenshot at full size before it ships. No real names, emails or addresses.

### Visual design
**Direction chosen 2026-11-22: Family album** (Figma: Foundations, Components and Designs). Sage, leaf green, guava red and sun yellow. Projects and credentials are photo prints, roles are postcards. Fonts: Young Serif and Hanken Grotesk. Colors are the Figma variables `color/*` (collection Theme, modes Light and Dark), which become `--color-*`. Sizes are in the collections Size and Breakpoint (modes Desktop and Mobile). All three are `[Ready for dev]` (2026-11-22). It replaces the technical-manual look ([old intent](intent/visual-design.md)), which was too plain or gray, too technical or stiff, and too long or text-heavy. From the original request, the site should look professional but not plain, not generic or vibe coded, and green. These hold whatever the look is:
- Text meets WCAG AA (4.5:1) in light and dark themes.
- Fonts are woff2 files served from the site, with no request to Google and no npm package.
- No emojis.

### Where the existing PDFs go
| File | Goes to |
|---|---|
| `completions/**` (34) | Credentials → Course Completions (generated) |
| `certifications/ITS Software Development/ITS Software Development Certification.pdf` | Credentials → Certifications |
| ITS score report (gitignored, local only) | Nowhere. It holds personal details (decided 2026-11-22) |
| `accomplishments/TOPCIT Certificate.pdf` | Credentials → Assessments |
| `accomplishments/2026 Intercollegiate Student Research Congress.pdf` | Credentials → Awards & Recognition |
| `accomplishments/DOST OJT Certificate of Completion.pdf` | Experience → Work & Internships (the OJT entry's PDF link) |
| `accomplishments/Introduction to Github.pdf` | Credentials → Course Completions → Courses (hand-listed, since its name has no date) |
| _(no file)_ Civil Service Professional | Credentials → Eligibility (card, no PDF) |
| `curriculum_vitae/src/CurriculumVitae.pdf` | Header "CV" link |

## Tech Stack
- React 19 + TypeScript + Vite (the `react-ts` template). Node 24 / npm 12.
- Plain CSS in one file. Light and dark themes via `prefers-color-scheme`.
- No router, no UI library, no Markdown renderer, no test framework.
- Hosting: GitHub Pages via GitHub Actions, at `https://shibarashii.github.io/portfolio/` (Vite `base: '/portfolio/'`). The repo is public, which Seanrei accepted on 2026-11-21. The certificates are already public on LinkedIn.

## Commands
All of these run from `website/`:
```
Install:    npm ci
Dev:        npm run dev           # http://localhost:5173/portfolio/
Build:      npm run build         # tsc -b && vite build → website/dist
Preview:    npm run preview
Lint:       npm run lint
Test:       npm test              # node --test 'src/**/*.test.ts'
```
Deploy: push to `main`, and `.github/workflows/deploy.yml` builds and publishes to Pages.

## Project Structure
```
portfolio/
├── completions/, certifications/, accomplishments/, curriculum_vitae/   ← documents
├── specs/                         ← intents, this spec, plans (agent markdown)
├── .github/workflows/deploy.yml   ← build + deploy to GitHub Pages
└── website/
    ├── vite.config.ts             ← base '/portfolio/', server.fs.allow ['..']
    └── src/
        ├── main.tsx, App.tsx      ← App renders the six sections in order
        ├── index.css              ← all styles
        ├── content.ts             ← hand-written data, every section as Group[]
        ├── components/            ← Figma components and anything used in more than one place (Header.tsx)
        ├── completions.ts         ← pure file-name parser (no Vite APIs, so Node can test it)
        ├── completions.test.ts    ← test for the name parser
        ├── figures/               ← drawn SVG figures, only where a screenshot can't show the work
        ├── screenshots/           ← project screenshots
        ├── fonts/                 ← woff2 files
        ├── logos/                 ← skill logos (sources in "Skills shown")
        └── sections/              ← About.tsx, Projects.tsx, Experience.tsx, Skills.tsx, Credentials.tsx, Contact.tsx
```

### Data shape
Every section uses one shape, a list of subsections:
```ts
export type Group<T> = { heading: string; items: T[] }

export type Project = {
  title: string; summary: string; stack: string[]; dates: string
  repo?: string; link?: string
  // Image fields are added in T9
  built: string[]         // inside Details
}
export type Role = { role: string; org: string; start: string; end?: string; bullets: string[]; pdf?: string }
export type Credential = { title: string; issuer: string; date: string; pdfs?: { label: string; url: string }[] }

export const projects: Group<Project>[] = [
  { heading: 'Web Applications', items: [/* PC Flipper Toolkit, ESPA, Hitboxd */] },
  { heading: 'Machine Learning', items: [/* Nail Feature Classifier, DAMA Braille Converter */] },
  { heading: 'Desktop Applications', items: [/* Barangay Clearance, Task Management, Community Feedback */] },
  { heading: 'Hardware & Homelab', items: [] },
]
```

### How PDFs reach the site
- **Completions:** `Credentials.tsx` calls `import.meta.glob('../../../completions/**/*.pdf', { query: '?url', import: 'default', eager: true })`. Vite bundles each PDF and returns its URL. The parser turns each path into `{ date, issuer, title, kind, url }`.
- **Everything else:** explicit `?url` imports in `content.ts`, e.g. ``import topcit from '../../accomplishments/TOPCIT Certificate.pdf?url'``. A missing or renamed file fails the build instead of producing a dead link.
- Known limit: bundled PDFs get hashed file names, so their URLs change when the file changes. Link to the site, not to individual PDFs. If stable PDF URLs are ever needed, copy them into `public/`.

### Course file name rule
`YYYY-MM-DD. Issuer Title.pdf` parses as follows:
- the date is the completion date,
- the issuer is the first word,
- the title is the rest,
- the kind comes from the folder (`Specialization Certificates` → specialization, `Course Certificates` → course).

A name needs at least two words after the date (issuer and title). Any file that doesn't match is skipped with a `console.warn`. All 34 current files match. `Programming in Python` was renamed to `Meta Programming in Python` on 2026-11-21.

## Code Style
Function components, named exports, no wrapper abstractions. Each section maps its groups to `h3` subsections:

```tsx
// sections/Projects.tsx
import { projects } from '../content.ts'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h">Projects</h2>
      {projects.filter((g) => g.items.length).map((g) => (
        <section key={g.heading}>
          <h3>{g.heading}</h3>
          {g.items.map((p) => (
            <article key={p.title} className="entry">
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <dl>
                <dt>Stack</dt><dd>{p.stack.join(', ')}</dd>
                <dt>Dates</dt><dd>{p.dates}</dd>
                {p.repo && <><dt>Source</dt><dd><a href={p.repo}>GitHub<span className="visually-hidden"> source of {p.title}</span></a></dd></>}
              </dl>
              <details>
                <summary>Details of {p.title}</summary>
                <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
              </details>
            </article>
          ))}
        </section>
      ))}
    </section>
  )
}
```
- Files are `PascalCase.tsx` for components and `camelCase.ts` for logic and data. Imports keep the `.ts`/`.tsx` extension (Node runs the tests on the same files).
- Use semantic HTML (`section`, `h2`/`h3`, `ul`, `details`, `a`) before ARIA, and native elements before custom widgets.
- All six sections sit in one `<main>`. Only they are labelled, since a label makes a `section` a landmark. Subsections have just their `h3`.
- Links that go to different places have different names. Add visually hidden text where the visible text repeats.
- A list outside `nav` that loses its bullets or becomes flex or grid needs `role="list"`, because Safari stops announcing it as a list.

## Testing Strategy
- **Unit:** `completions.test.ts` checks the file name parser with `node:test` + `node:assert`. It runs on Node 24's native TypeScript support, with no extra dependency. Cases:
  - a valid course,
  - a valid specialization,
  - a name with only one word after the date,
  - a bad date,
  - a non-PDF file,
  - newest-first sorting.
- **Build as a test:** `npm run build` type-checks `content.ts` and fails on a missing PDF or screenshot import.
- **Manual / browser:**
  - Check the site at phone (375px) and desktop widths.
  - Check that keyboard tab order reaches every link and button.
  - Lighthouse Accessibility should be ≥ 95.
- No component tests. Sections are mostly markup, so the build and a visual check cover them.

## Boundaries
- **Always:**
  - Run `npm test && npm run build` before committing website changes.
  - Use semantic HTML, alt text, and visible focus styles.
  - List course completions from the file names.
- **Ask first:**
  - Adding any npm dependency.
  - Renaming or moving PDFs.
  - Downloading or adding a screenshot or logo.
  - Changing the hosting or `base` path.
  - Changing the section order.
- **Never:**
  - Commit secrets or `.env` files.
  - Hand-copy the course list into code.
  - Send CV contents or PDFs to outside services.
  - Commit `website/dist` or `node_modules`.

## Success Criteria
1. `npm run build` passes, and `npm test` passes with the parser cases above.
2. The deployed site loads at `https://shibarashii.github.io/portfolio/`, and every PDF link opens.
3. All 6 sections render in order, each with its subsections as `h3` headings in `content.ts` order. Empty subsections are not shown. Nav links jump to each section.
4. Every PDF in the "Where the existing PDFs go" table appears where the table says. Civil Service shows as a card with no link.
5. Course Completions lists every PDF in `completions/` (34 today). Adding a correctly named PDF and pushing makes it appear, with no code change.
6. No horizontal scroll at 375px. Lighthouse Accessibility ≥ 95.
7. The 8 projects in "Projects shown", the leadership and experience from `CurriculumVitae.tex`, and the skills in "Skills shown" are all on the site.
8. The visual design rules above hold in both themes, every text color pair meets 4.5:1, and Seanrei has signed off each figure and screenshot.
9. Every project's details open with the keyboard.

## Open Questions
Before the first **push** (the GitHub repo is already public, and nothing has been pushed yet):
1. **Phone number.** Decided 2026-11-22: it comes off the CV, and the email stays public. It is out of `CurriculumVitae.tex` and the rebuilt `CurriculumVitae.pdf`. The initial commit was redone on 2026-11-22, before any push, so it is out of git history too.

Before T3:
2. **ESPA is a private repo**, so a source link would be a dead end for recruiters. Default: list it with no source link. Seanrei approves the summary and stack wording, since it describes private work. The spec holds none of its details.
3. **Hitboxd's README only says "Hello."** Anyone who follows the source link lands there. Default: list it, and Seanrei writes the README before launch.
4. **DAMA:** the link is Seanrei's fork, as asked. The CV links the original repo. The CV says YOLOv8, but `braille_app/app.py` loads YOLOv11s, so the site says "YOLO" until Seanrei confirms.
5. **Job title** for the top of the page. Decided 2026-11-22: "Computer Science graduate specializing in full-stack development and AI/ML", since Seanrei has no job yet.

Before T9:
6. **Retake the Barangay and Community Feedback screenshots** with neutral data? Barangay's use joke entries with celebrity names and show what look like officials' names. The feedback inbox shows Gmail addresses. Default: Barangay shows no screenshot, and Community Feedback uses its dashboard screen.
7. **Copying screenshots into this repo.** PC Flipper's are in the local clone. The others need downloading, which needs Seanrei's OK on a file list.

Before T6:
8. **Adding the 41 skill logos to this repo.** Decided 2026-11-22: approved and added in T6.
9. **The CV lists fewer skills than the site.** 15 of the skills added 2026-11-22 aren't on the CV, and the CV's "SQL (Postgres)" is two entries here: SQL and PostgreSQL. Decided 2026-11-22: leave the CV as it is for now.

Before T4:
10. **Hero photo.** Decided 2026-11-22: T4 adds it, with `fetchpriority="high"` and no lazy loading. Still open: which photo. Using one needs Seanrei's OK for that file.
11. **Mobile menu.** Decided 2026-11-22: T4 builds `Nav/Menu` with the browser's built-in popover.
12. **Browser support policy.** Decided 2026-11-22: no polyfills, and plain links where popover is missing. The policy is in CLAUDE.md.

Before T8:
13. **Role cards.** Figma's `Card/Role` shows a summary and a Details link. The spec and the CV have bullets and no summary, so T5 shows the bullets. Still open: write a one-line summary per role and collapse the bullets, or change the card.

Before the first deploy, Seanrei turns on Pages: repo Settings → Pages → Source: GitHub Actions.
