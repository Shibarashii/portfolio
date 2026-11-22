# Figma Workflow

File: https://www.figma.com/design/zS6WnE2UAjd8LnLRyVCu8D/Portfolio. The full guide is on its **README** page. This file records only the parts code depends on.

## Pages, in flow order
Cover · README · Moodboard → Explorations → Wireframes → Foundations + Components → Designs · Archive

## Handoff contract (Figma → `website/`)
- **Status tag at the start of every Section name:** `[To do]`, `[WIP]`, `[Ready for dev]`, `[Built]`. Only code visual design from `[Ready for dev]` sections, and retag them `[Built]` once shipped.
- **Breakpoints:** Desktop 1440 and Mobile 375 (the spec's 375px check). Frames are named `Home / Desktop 1440` and `Home / Mobile 375`.
- **Variables map 1:1 to CSS custom properties:** `color/bg` → `--color-bg`, `space/16` → `--space-16`. Light/Dark modes map to `prefers-color-scheme`.
- **Component names match React components:** each component's description in Figma names its React component (`Card/Project large` and `Card/Project small` → `ProjectCard`, `Tag/Skill` → `SkillTag`, `Nav/Header` → `Header`).
- **Content stays in the repo.** Figma shows one example of each card. `content.ts` and the PDFs in this repo are the source of truth for what's listed.
- **No emojis** in page, section or layer names, or in file copy.

## Effect on the plan
Structure tasks (T1–T7 in [todo.md](todo.md)) can go ahead while design is in progress. T8 (styling) builds from the `[Ready for dev]` sections in Designs, which are ready as of 2026-11-22.

## Design system
The look is Family album: photo prints, postcards, stamps and stickers on sage, leaf green, guava red and sun yellow.

| What | Where in Figma |
|---|---|
| Colors | Collection Theme, modes Light and Dark. Page colors are `color/bg`, `color/text`, `color/accent` and so on. Illustration colors are `color/art-*` |
| Spacing and radius | Collection Size: `space/4` to `space/112`, `radius/print`, `card`, `button`, `sticker` |
| Responsive values | Collection Breakpoint, modes Desktop and Mobile: `layout/gutter`, `layout/section-y`, and the font sizes behind each text style |
| Type | Young Serif for Heading, Title and Caption styles. Hanken Grotesk for Body and Label styles |
| Shadows | `shadow/print`, `shadow/lifted`, `shadow/sticker`, `shadow/stack` |
| Components | Button, Link, Nav/Link, Nav/Header, Nav/Menu, Stamp, Art/*, Print, Logo/*, Tag/Skill, Card/Project large, Card/Project small, Education entry, Card/Role, Card/Credential, Course summary, Card/Course, Details panel, Card/Contact |

Every frame sets its Theme and Breakpoint mode. Dark frames are copies with Theme set to Dark, and their names end in `/ Dark`.

- **Pictures** go in a `Print`, through its Artwork property. Set Seanrei's photo once, as the fill of `Art/Photo of you`.
- **No picture or preview:** use `Art/App window` for a project and `Art/Certificate` for a credential. `Card/Credential` Print=None is no longer used.
- **Project tilt** comes from the card's Layout or Tilt property. Hover straightens a print and uses `shadow/lifted`.
- **Adding a skill:** add it to "Skills shown" in the spec, make a 54 px `Logo/Name` component (Devicon first, then Simple Icons or LobeHub Icons, pinned to a version), and add a `Tag/Skill` in all four frames. Cycle its Tilt: Left, Right, Small left. With no logo, use letters like `Logo/SQL`. On desktop the paired groups fit 5 stickers on the left and 6 on the right.

## Checks before asking for `[Ready for dev]`
- No raw colors outside `Logo/*`, every text layer has a text style, and nothing overflows its frame.
- Text contrast is at least 4.5:1 in light and dark, measured on the real background. The desktop header's right-hand links sit on the green panel.
- Every interactive component has a focus state. Touch targets are 44 px or taller.
- Look at all four frames. Compare counts with the repo (skills with the spec, courses with `completions/`).

## Privacy
- From the CV, only skill names are approved for Figma. Other CV text stays a placeholder. The email in Figma is `name@example.com`.
- Uploading a screenshot or photo needs Seanrei's OK for that file. Approved so far: PC Flipper's `build-page.png` and `light-and-dark.png`, and the skill logos. The logos are also approved for this repo (2026-11-22).

## Plugin API traps we hit
- Setting `textDecoration` on styled text changes the shared style. Use the `Label/Button hover` and `Label/Nav hover` styles.
- Give a paint its real color before binding a variable, or it can render black.
- Swapping a Print's artwork keeps old fill overrides. Call `resetOverrides()` on the artwork instance.
- A group changed from a row to a column keeps its children's FILL height. Set it back to HUG or stickers get cut off.
- Call `setCurrentPageAsync` once per script and load other pages with `loadAsync()`. A failed script has changed nothing so far, but check before retrying.
