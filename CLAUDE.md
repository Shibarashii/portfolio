# Portfolio

This repo holds two things: Seanrei Valdeabella's portfolio documents, and the portfolio website that shows them.

## Layout
- `curriculum_vitae/src/CurriculumVitae.tex`: the CV source (Jake Gutierrez resume template, MIT). The built `CurriculumVitae.pdf` sits next to it and is committed.
- `completions/Course Certificates/`, `completions/Specialization Certificates/`: course and specialization certificates (Meta, Google, IBM, Cisco).
- `certifications/<Name>/`: industry certifications (ITS Software Development). Score reports hold personal details, so they are gitignored and never published (decided 2026-11-22).
- `accomplishments/`: awards, OJT, research congress, TOPCIT and similar.
- `website/`: the website. React + Vite (see "Website" below).

## Conventions
- Certificate files are named `YYYY-MM-DD. Issuer Title.pdf`, where the date is the completion date. The website should parse its listings from these names, not from a hand-kept copy.
- Folder names are `snake_case`. File names are left human-readable.
- Agent-written markdown (intents, specs, plans, ADRs) goes in `specs/`, never `docs/`. When a skill says `docs/...`, use `specs/...` instead (e.g. `docs/intent/x.md` becomes `specs/intent/x.md`). This also applies to `tasks/`: the plan is `specs/plan.md` and the task list is `specs/todo.md`.
- PDFs are the source of truth. Don't rename or move them without asking, because the website and outside links may point at them.

## Commands
- Build the CV: `cd curriculum_vitae/src && latexmk -pdf CurriculumVitae.tex` (pdflatex, TeX Live).
- Clean the CV build files: `latexmk -c`. Build output other than the PDF is gitignored.

## Website
- Stack: React + Vite (decided 2026-11-21).
- Design: Figma file `zS6WnE2UAjd8LnLRyVCu8D`. Read [specs/figma-workflow.md](specs/figma-workflow.md) before coding any visual design. The direction is Family album (chosen 2026-11-22). It is built in Foundations, Components and Designs, light and dark, all tagged `[Ready for dev]` (2026-11-22). `specs/intent/visual-design.md` and `specs/ideas/project-cards.md` are dropped, so don't build from them. Only build from sections tagged `[Ready for dev]`. No emojis in Figma names or copy.
- Hosting: GitHub Pages via GitHub Actions, at `https://shibarashii.github.io/portfolio/` (see `specs/SPEC.md`).
- Browser support (decided 2026-11-22): newer browser features are fine if the page still works without them. No polyfills. Where popover is missing, the mobile menu falls back to plain links.
- Commands, all from `website/`: `npm ci` (install), `npm run dev` (http://localhost:5173/portfolio/), `npm run build`, `npm run preview` (http://localhost:4173/portfolio/), `npm run lint`, `npm test`. Run `npm test && npm run build` before committing website changes. `dev` and `build` need `pdftoppm` (poppler) for the certificate previews.

## Starting a Figma design session
Do this before changing anything in the Figma file, so new work matches what is there.
1. Read [specs/figma-workflow.md](specs/figma-workflow.md), the file's README page, and the "Visual design" and "Skills shown" parts of `specs/SPEC.md`.
2. Load the `figma-use` skill, plus `figma-generate-library` for components or `figma-generate-design` for pages. Call `create_session` once and pass its ID on every call.
3. Read the current state first (section tags, component names, the frames you will touch). Seanrei may have edited the file by hand, so never rebuild from memory or from an old session's notes.
4. Reuse before making anything: `color/*`, `space/*`, `radius/*` and `layout/*` variables, the text and effect styles, and the components. No raw hex, no one-off text sizes, no detached instances. Brand logos keep their own colors.
5. New ideas go in Explorations and wait for Seanrei's pick. Approved work goes Foundations, then Components, then Designs.
6. Page layout changes are made in four frames: desktop and mobile, each in light and dark. Component changes reach all four on their own.
7. Finish with the checks in figma-workflow.md. Retag a section `[Ready for dev]` only on Seanrei's OK.
8. Update `specs/SPEC.md`, `specs/todo.md` and this file if a decision changed.

## Boundaries
- The CV holds personal contact details. Never send its contents, or the PDFs, to outside services unless asked.
- Never commit secrets or `.env` files.
- Ask before adding a dependency to the website.
