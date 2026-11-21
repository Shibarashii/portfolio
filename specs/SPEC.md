# Spec: Portfolio Website

Status: approved 2026-11-21. Intent: [intent/portfolio-sections.md](intent/portfolio-sections.md). Where this spec and the intent differ, this spec wins: subsections replace the Projects filter and the three Skills groups.

## Objective
A single-page portfolio site that:
- shows a recruiter who Seanrei is and the best projects within the first screen or two, and
- holds a complete archive of every project, role, certificate and credential, which the CV is later picked from.

Sections, in order: **About → Projects → Experience → Skills → Credentials**. Every section is split into subsections (`h3`).

### Sections and subsections
The subsection headings below are the defaults. They live in `content.ts`, so renaming or adding one is a data edit, not a code change.

| Section | Subsections | Each entry shows |
|---|---|---|
| **About** | Who I Am, Education | Intro paragraph. School, degree, years. |
| **Projects** | Machine Learning, Web Applications, Hardware & Homelab | Title, summary, stack tags, repo/live links |
| **Experience** | Work & Internships, Leadership | Role, organization, dates, bullets, optional certificate PDF |
| **Skills** | Languages, Web Development, Data & Machine Learning, Developer Tools, Operating Systems | Name list |
| **Credentials** | Certifications, Assessments, Eligibility, Awards & Recognition, Course Completions | Title, issuer, date, PDF links (optional) |

- **Header/nav:** name, a one-line title, and links to each section (`#about` etc.), GitHub, and the CV PDF.
- **Empty subsections** are not rendered. For example, Hardware & Homelab stays hidden until it has a project.
- **Credentials entries without a PDF** render as a card with no link. Civil Service eligibility is one of these.
- **Course Completions** is collapsed by default in a `<details>` element, split into Specializations and Courses, newest first. **It's generated from the file names in `completions/`**, never typed by hand.

### Where the existing PDFs go
| File | Goes to |
|---|---|
| `completions/**` (34) | Credentials → Course Completions (generated) |
| `certifications/ITS Software Development/*` | Credentials → Certifications (certificate + score report) |
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
- Hosting: GitHub Pages via GitHub Actions, at `https://shibarashii.github.io/portfolio/` (Vite `base: '/portfolio/'`). The repo will be public, which Seanrei accepted on 2026-11-21. The certificates are already public on LinkedIn.

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
        ├── main.tsx, App.tsx      ← App renders the five sections in order
        ├── index.css              ← all styles
        ├── content.ts             ← hand-written data, every section as Group[]
        ├── completions.ts         ← pure file-name parser (no Vite APIs, so Node can test it)
        ├── completions.test.ts    ← test for the name parser
        └── sections/              ← About.tsx, Projects.tsx, Experience.tsx, Skills.tsx, Credentials.tsx
```

### Data shape
Every section uses one shape, a list of subsections:
```ts
export type Group<T> = { heading: string; items: T[] }

export type Project = { title: string; summary: string; stack: string[]; repo?: string; link?: string }
export type Role = { role: string; org: string; start: string; end?: string; bullets: string[]; pdf?: string }
export type Credential = { title: string; issuer: string; date: string; pdfs?: { label: string; url: string }[] }

export const projects: Group<Project>[] = [
  { heading: 'Machine Learning', items: [/* Nail Feature Classifier, DAMA Braille Converter */] },
  { heading: 'Web Applications', items: [/* Barangay Clearance, Task Management, Community Feedback */] },
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

Any file that doesn't match is skipped, and the build logs a warning. All 34 current files match. `Programming in Python` was renamed to `Meta Programming in Python` on 2026-11-21.

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
        <section key={g.heading} aria-label={g.heading}>
          <h3>{g.heading}</h3>
          <ul className="cards">
            {g.items.map((p) => (
              <li key={p.title}>
                <h4>{p.title}</h4>
                <p>{p.summary}</p>
                <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                {p.repo && <a href={p.repo}>Source</a>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  )
}
```
- Files are `PascalCase.tsx` for components and `camelCase.ts` for logic and data. Imports keep the `.ts`/`.tsx` extension (Node runs the tests on the same files).
- Use semantic HTML (`section`, `h2`/`h3`, `ul`, `details`, `a`) before ARIA, and native elements before custom widgets.

## Testing Strategy
- **Unit:** `completions.test.ts` checks the file name parser with `node:test` + `node:assert`. It runs on Node 24's native TypeScript support, with no extra dependency. Cases:
  - a valid course,
  - a valid specialization,
  - a missing issuer,
  - a bad date,
  - a non-PDF file,
  - newest-first sorting.
- **Build as a test:** `npm run build` type-checks `content.ts` and fails on a missing PDF import.
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
3. All 5 sections render in order, each with its subsections as `h3` headings in `content.ts` order. Empty subsections are not shown. Nav links jump to each section.
4. Every PDF in the "Where the existing PDFs go" table appears where the table says. Civil Service shows as a card with no link.
5. Course Completions lists every PDF in `completions/` (34 today). Adding a correctly named PDF and pushing makes it appear, with no code change.
6. No horizontal scroll at 375px. Lighthouse Accessibility ≥ 95.
7. The 5 projects, leadership, experience and skills from `CurriculumVitae.tex` are all on the site.

## Open Questions
None blocking. Before the first deploy, two things are Seanrei's to do:
- Make the GitHub repo public.
- Turn on Pages: repo Settings → Pages → Source: GitHub Actions.
