---
name: g2e-design
description: Use this skill to generate well-branded interfaces and assets for G2E, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# G2E Design System — Agent Skill

G2E is a Mexican technology company that turns municipal organic waste into **hydrochar** — a drop‑in coal replacement. The brand serves governments, private investors, and industrial off‑takers, so every artifact must read as **premium, exclusive, private, and institutional** — never consumer, NGO, or lifestyle.

## Where things live

- **`README.md`** — full brand context, content fundamentals, visual foundations, iconography. **Read this first.**
- **`colors_and_type.css`** — every CSS variable (color tokens, type tokens, spacing, radii, shadows, motion). Import this in any new HTML you generate.
- **`assets/`** — logo lockups (`logo-mark.svg`, `logo-horizontal.svg`, `logo-wordmark.svg`, `logo-mark-dark.svg`). Copy out, don't redraw.
- **`ui_kits/website/`** — high‑fidelity marketing site recreation. The components in `components/*.jsx` are reference implementations of Nav, Hero, SectionMarker, Process, Plants (with detail overlay), Stats, Partners, PressPullQuote, CTAPanel, Footer. Copy patterns from here.
- **`preview/`** — 32 specimen cards demonstrating individual tokens / components.
- **`SKILL.md`** — this file.

## How to use this skill

1. **Read `README.md` end to end** before touching any pixels. The brand has strong opinions about tone, casing, lexicon, and visual restraint.
2. **Import `colors_and_type.css`** in every new HTML file. Use semantic tokens (`var(--ink)`, `var(--bg)`, `var(--accent)`) — never raw hex values.
3. **Copy assets from `assets/`** for any logo / mark usage. Never redraw.
4. **Use Lucide icons via CDN** (`https://unpkg.com/lucide@latest`) at 1.5px stroke. No emoji. No unicode glyphs as icons.
5. **Follow the lexicon strictly**: hydrochar (not biochar), tonnes (not tons), off‑taker (not customer), partner (not client), decarbonize (not "go green").
6. **Mix Roman + Italic in display type** — italic is for the verb.
7. **Lead with ink + bone contrast.** No lime, no neon. Clay only for rare heritage moments.
8. **No exclamation marks. No emoji. No hype.**

## If creating visual artifacts

Build static HTML files for the user to view. Compose using:
- `Newsreader` for display (Google Fonts)
- `Geist` for sans (Google Fonts)
- `JetBrains Mono` for data, eyebrows, technical readouts
- Numbered section markers: `[ 01 ]  SECTION NAME`
- Pill buttons (ink primary on bone, bone secondary on dark, outline tertiary)
- 28px‑radius dark panels floating on Bone
- Circular icon chips in bone or hydrochar (never lime)
- Generous whitespace (sections separated by `--space-12` or `--space-16`)

## If working on production code

Lift the CSS variables from `colors_and_type.css` directly into your stylesheet, copy the JSX patterns from `ui_kits/website/components/*` as starting points, and use the README's content guidelines as copy rules.

## If invoked without further guidance

Ask the user what they want to build. Likely candidates:
- Investor deck or government‑facing one‑pager
- New marketing page (case study, plant detail, white paper landing)
- Technical fact sheet or process diagram
- Partner/press kit material
- Spanish‑language twin of an existing English asset

Then ask the standard questions about audience (government vs investor vs industrial), tone register, length, and required content blocks. Act as an expert designer who outputs HTML artifacts **or** production code, depending on the need.

## Hard constraints — do not violate

- No emoji, ever.
- No exclamation marks.
- No "save the planet" copy.
- No bicolor or gradient icons.
- No "cards with left‑border accent color."
- No centered hero text (heroes are left‑aligned, editorial).
- No pure white backgrounds (use Bone `#F2EFE7`).
- No pure black ink (use Hydrochar `#11140F`).
- No lime, no neon, no bright accents. The system runs on ink-on-bone contrast.
