# Implementation Plan: Portfolio Website

Spec: [SPEC.md](SPEC.md) (approved 2026-11-21, revision approved 2026-11-22). Tasks: [todo.md](todo.md). This plan lives in `specs/`, not `tasks/`, per CLAUDE.md.

## Overview
A one-page React + TS + Vite site in `website/`, deployed to GitHub Pages. The riskiest parts are bundling PDFs from outside the Vite root and the `/portfolio/` base path on Pages, so they go first. After that, each task adds one section end to end (data → component → visible on the page).

## Architecture Decisions
- **The parser is separate from the glob.** `completions.ts` is a pure function with no Vite APIs, so `node --test` can import it. `import.meta.glob` lives in `Credentials.tsx`.
- **One data shape:** every section is a `Group<T>[]` in `content.ts`. Subsection headings are data, not code.
- **PDFs are imported, not copied.** Explicit `?url` imports make a missing PDF fail the build.
- **Deploy in Task 1.** A wrong `base` path or a broken asset URL shows up on day one, not at the end.
- **Template dependencies are the approved stack** (react, react-dom, vite, typescript, oxlint). Anything beyond `npm create vite` output needs asking first.

## Dependency Graph
```
T1 scaffold + deploy ─┬─ T2 course completions (parser, test, Credentials shell)
                      └─ T3 content.ts + Projects ─┬─ T4 About, Contact + nav
                                                   ├─ T5 Experience
                                                   ├─ T6 Skills
                                                   └─ T7 hand-listed Credentials (needs T2 too)
                                     T4–T7 ──────── T8 polish + a11y + CLAUDE.md commands ── T9 project images
```
T4–T7 don't depend on each other, but they all edit `content.ts` and `App.tsx`, so they run **one after another**, not in parallel.

## Task List
### Phase 1: Foundation (risky parts first)
- [x] T1: Scaffold the Vite app with a header and CV link, and deploy it to Pages
- [x] T2: Course completions, generated from file names

### Checkpoint A
- [x] `npm test` and `npm run build` pass
- [x] The live Pages URL shows the header, a working CV link, and 34 courses
- [x] Human review

### Phase 2: Sections
- [ ] T3: Content types + Projects section
- [ ] T4: About and Contact sections + section nav
- [x] T5: Experience section
- [x] T6: Skills section
- [x] T7: Hand-listed Credentials subsections

### Checkpoint B
- [ ] Spec success criteria 3, 4 and 7 met
- [ ] Human review of the content wording

### Phase 3: Polish
- [ ] T8: Responsive layout, dark mode, focus styles, Lighthouse a11y ≥ 95 (designs are `[Ready for dev]`)
- [x] T9: Project images
- [x] T10: Certificate previews and course cards
- [x] T11: Placeholders for empty cards
- [x] T12: Animations
- [ ] T13: Header icons and logo stamps
- [ ] T14: Bar comes back on scroll up
- [ ] T15: Theme button

### Checkpoint C: Complete
- [ ] All 9 spec success criteria met on the live site

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Vite won't serve or bundle PDFs outside `website/` | High | `server.fs.allow: ['..']`. T1 tests it with the CV link before anything else depends on it. |
| Wrong `base` path breaks assets on Pages | High | `base: '/portfolio/'`, checked on the live URL in T1 |
| Node can't run the parser test (TS syntax, `.ts` imports) | Med | Parser uses erasable TS only (no enums), and imports keep `.ts` extensions |
| The first push publishes the CV's personal details | High | Decided 2026-11-22 (spec Open Question 1): the phone number is out of the CV and git history, and the email stays public. |
| Pages isn't turned on | Med | Seanrei sets Pages Source to GitHub Actions before T1's deploy check |
| A drawn figure shows something the project doesn't do | Med | Draw from the code, and Seanrei signs off each one (T9) |
| A screenshot shows someone's personal data | High | Seanrei checks each one at full size before it ships (T9). No screenshot until then. |
| File names with spaces and dots break URLs | Low | Vite hashes and encodes asset names. T2 opens a few links to check. |

## Open Questions
These are content Seanrei needs to supply. Tasks use placeholders marked `TODO` until then:
- **Who I Am** intro paragraph (T4). I'll draft one from the CV for you to edit.
- **Hardware & Homelab** projects, e.g. the home server (T3). Hidden until added.
- **Civil Service** exam date (T7).
- Dates and details for ITS, TOPCIT and Research Congress (T7). I'll read them from the PDFs, and you confirm.
