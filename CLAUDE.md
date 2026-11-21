# Portfolio

This repo holds two things: Seanrei Valdeabella's portfolio documents, and the portfolio website that shows them.

## Layout
- `curriculum_vitae/src/CurriculumVitae.tex`: the CV source (Jake Gutierrez resume template, MIT). The built `CurriculumVitae.pdf` sits next to it and is committed.
- `completions/Course Certificates/`, `completions/Specialization Certificates/`: course and specialization certificates (Meta, Google, IBM, Cisco).
- `certifications/<Name>/`: industry certifications, with score reports where there are any (ITS Software Development).
- `accomplishments/`: awards, OJT, research congress, TOPCIT and similar.
- Website: not built yet. React + Vite (see "Website" below).

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
- _TBD: hosting, and dev/build/test commands. Fill this in when the site is scaffolded._

## Boundaries
- The CV holds personal contact details. Never send its contents, or the PDFs, to outside services unless asked.
- Never commit secrets or `.env` files.
- Ask before adding a dependency to the website.
