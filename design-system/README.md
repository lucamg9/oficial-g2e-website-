# G2E Design System

> Waste, transmuted.

G2E is a Mexican technology company that turns municipal organic waste into **hydrochar** — a carbon‑rich material that replaces mineral coal in power generation, regenerates farmland soil, and decarbonizes the steel industry. G2E operates the **world's largest hydrothermal carbonization plant** processing municipal organic waste, working alongside UNAM, the Mexican Federal Government, and international partners.

This design system is the brand & visual operating system for everything G2E ships — investor decks, government‑facing reports, technical one‑pagers, the marketing website, and on‑site signage at the plant.

---

## Audience & brand posture

G2E does not sell to consumers. The audience is small, sophisticated, and consequential:

- **Governments** (federal, state, municipal — Mexico and international counterparts)
- **Private investors & infrastructure funds**
- **Industrial off‑takers** — steel mills, utilities, agri‑coops
- **Scientific & multilateral partners** — UNAM, IDB, World Bank, EU climate orgs

The brand must read as: **exclusive, premium, private, institutional, technically credible.** It is closer to a boutique infrastructure fund or a research‑led climate venture than to a consumer cleantech startup. It should never feel like a consumer SaaS, a "green" lifestyle brand, or an NGO.

---

## Index

| File | What's in it |
|---|---|
| `README.md` | This document — brand context, content + visual foundations, iconography |
| `SKILL.md` | Cross‑compatible Agent Skill manifest |
| `colors_and_type.css` | All CSS variables (color tokens, type tokens, spacing, radii, shadows) |
| `fonts/` | Webfont files (or Google Fonts links — see "Type" below) |
| `assets/` | Logo lockups, monograms, brand imagery, icons |
| `preview/` | Design‑system specimen cards (registered as Assets) |
| `ui_kits/website/` | High‑fidelity marketing site recreation — React JSX components + interactive index |

---

## Source materials provided

The user provided **six reference screenshots** of unrelated sustainability/energy landing pages as inspiration, plus a written brand description. There is **no existing G2E codebase, Figma, or live site** in this project. This design system is therefore an **original proposal** built from the brand description, with visual posture drawn from (and significantly adapted from) the reference set:

- `uploads/Captura de pantalla 2026-05-26 a las 9.31.53.png` — EV Charger landing, lime‑on‑bone, geometric "g" monogram, pill buttons
- `uploads/Captura de pantalla 2026-05-26 a las 9.32.37.png` — TerraElix, large display type, deep green hero
- `uploads/Captura de pantalla 2026-05-26 a las 9.32.58.png` — FlowGen, numbered sections, white circular nav chip, dark feature panels
- `uploads/Captura de pantalla 2026-05-26 a las 9.33.09.png` — FlowGen, alt comp
- `uploads/Captura de pantalla 2026-05-26 a las 9.33.25.png` — FlowGen overview
- `uploads/Captura de pantalla 2026-05-26 a las 9.33.37.png` — Agro Grow, pill nav, clean green primary

**These references are starting points, not destinations.** The directions I've kept: numbered section markers, pill controls, white circular icon chips, large editorial display type, dark feature panels against a warm bone background. The directions I've **deliberately discarded**: stock "happy people" photography, gradient hero blobs, oversaturated "eco green," generic sustainability iconography, and any vibe that reads as consumer or NGO.

---

## CONTENT FUNDAMENTALS

### Tone

Three words, in order: **precise, grounded, consequential.** G2E speaks like an infrastructure operator that has read the science, signed the contract, and is now running the plant. Confidence without bravado. Bilingual fluency between technical and political registers.

- **Plain‑spoken about hard facts.** "We operate the world's largest plant of its kind." Not "we're proud to be a leader."
- **Specific over vague.** Tonnes, megawatt‑hours, hectares, signed partners. Never "many," "several," "lots of."
- **No hype, no doomerism.** The climate crisis is not the lede; the *solution shipping today* is.
- **Bilingual on purpose.** Spanish and English carry equal weight. Spanish never reads as translated‑from‑English.

### Voice

- **First‑person plural** ("Nosotros / We") when speaking as G2E.
- **Second‑person formal** ("Usted" in Spanish, neutral "you" in English) when addressing partners. Never "tú" outside of internal materials.
- **No exclamation marks.** None. The work is the emphasis.
- **No emoji.** Anywhere. Ever. The reference set used a tiny sprout 🌱 once — we don't.
- **Numerals over words for stats.** "1.2M tonnes" not "one point two million tonnes." Always with units.

### Casing

- **Headlines: sentence case with proper nouns capitalized.** "Waste, transmuted." Not "Waste, Transmuted." Not "WASTE, TRANSMUTED."
- **Section labels & eyebrows: ALL CAPS, tracked +120.** `[ 01 ] FIELD OPERATIONS`
- **Buttons: sentence case.** "Read the white paper." Not "Read White Paper."
- **Product / process names: Capitalized.** Hydrochar, Hydrothermal Carbonization, the Mérida Plant.

### Lexicon — preferred terms

| Use | Don't use |
|---|---|
| Hydrochar | Biochar (different process), "green coal" |
| Hydrothermal carbonization (HTC) | Carbon recycling, eco‑processing |
| Organic waste / municipal organic waste | Garbage, trash, refuse |
| Off‑taker / partner | Customer, client |
| Decarbonize | Go green, save the planet |
| Plant, facility | Factory |
| Operate | Run, do |
| Tonnes (metric) | Tons |

### Examples of voice

**Eyebrow + headline + dek (hero):**

> [ 01 ]  FROM LANDFILL TO MEGAWATT
> Waste, transmuted.
> We process the organic waste that your city already collects, and return it as hydrochar — a drop‑in replacement for mineral coal.

**Statistic block:**

> 1.2M tonnes  ·  processed annually at the Mérida facility
> 78%          ·  reduction in CO₂e versus landfill baseline
> 4            ·  signed off‑take agreements with state utilities

**Partner sentence:**

> Developed in partnership with **UNAM**, deployed in coordination with **SEMARNAT**, and financed alongside **IDB Invest**.

**What we don't write:**

> ~~"We're on a mission to save the planet, one piece of trash at a time! 🌱"~~
> ~~"Our amazing team is super excited to be leading the green revolution."~~

---

## VISUAL FOUNDATIONS

### Color

The palette is built around **three poles** — Bone, Hydrochar, and Moss — with a small set of supporting neutrals and one rare warm accent. The brand runs on ink-on-bone contrast, not a bright spark color.

- **Bone** `#F2EFE7` — the dominant background. Warm, paper‑like, never pure white. Signals premium tactility.
- **Hydrochar** `#11140F` — near‑black with a green undertone. The "ink." Used for type, dark feature panels, and the primary action color. This is **the product itself** rendered as a color.
- **Moss** `#2C4A35` — deep forest green for secondary surfaces, partner panels, and dark CTAs. Reads as institutional, not lifestyle.
- **Clay** `#B8552B` — rare warm accent for Mexican heritage moments and editorial pull‑quotes. Appears in maybe 1 in 10 layouts. Never a UI action color.
- **Lime** — *archived.* Earlier drafts used `#D6FF4A` as a spark accent; it reads flashy and unprofessional for this audience. Tokens remain in `colors_and_type.css` for legacy reasons only — do not consume.

Neutrals graduate from Bone through warm grays to Hydrochar. No cool blues, no pure blacks, no pure whites. See `colors_and_type.css` for the full ramp.

**Usage rule:** ~70% Bone, ~25% Hydrochar/Moss, ~5% supporting neutrals + Clay.

### Type

Two families, both available on Google Fonts.

- **Display — Newsreader** (Regular, Medium, Italic). Structured contemporary serif designed for reading at scale. Used at large sizes (48px+) for headlines, pull quotes, and editorial moments. Set tight: `letter-spacing: -0.025em`, `line-height: 0.95`. Mix Roman and Italic in the same headline — *italic is for the verb*, the action ("transmuted," "operating," "shipping"). Newsreader's italic stays upright and structural rather than calligraphic.
- **Sans — Geist** (300/400/500/600). Precise neo‑grotesque. Used for everything else: body, UI, eyebrows, captions, data.
- **Mono — JetBrains Mono** (400/500). For data tables, technical specs, plant readouts, file names.

**Substitution flag:** I have selected fonts from Google Fonts as a free, open starting point. If G2E licenses a paid family (PP Editorial New, Söhne, ABC Diatype, etc.), swap them in via `colors_and_type.css`. **Please confirm whether you want me to substitute to a licensed pair.**

Type scale is fluid (`clamp()`) and lives in `colors_and_type.css` under `--text-*` tokens.

### Spacing & rhythm

8‑point base grid. Tokens `--space-1` through `--space-16` in `colors_and_type.css`. Section vertical rhythm is generous — typically `--space-12` (96px) or `--space-16` (160px) between major sections on the website. **Whitespace is a material.**

### Layout

- **Bone canvas with floating dark panels.** The page background is Bone; feature panels (project cards, dark CTAs, data readouts) are Hydrochar or Moss with `border-radius: 28px` and sit on top of Bone with generous margin.
- **Numbered section markers.** Every major section opens with `[ 01 ]  SECTION NAME` in mono caps, top‑left.
- **Asymmetric editorial grids.** 12‑col grid; content rarely spans the full width. Headlines may run 7–9 cols and stop short. Right‑rail eyebrows, left‑aligned heros.
- **No centered hero text** unless it is a pull quote. Marketing heros are left‑aligned, editorial style.

### Backgrounds & imagery

- **No gradient blobs, no abstract shapes, no SVG illustrations of leaves.**
- **Photography** — full‑bleed, warm‑toned, slightly desaturated. Aerial shots of the plant, close‑ups of hydrochar pellets in‑hand, Mexican landscapes (cenotes, milpa, sierra), industrial detail (pipes, reactors, conveyors). Treat photography like *National Geographic*, not stock library.
- **One illustrative system, kept rare:** thin‑line technical diagrams of the HTC process, drawn with 1px hairlines on Bone. These appear on technical pages only.
- **Grain / paper texture allowed** at 3–5% opacity on Bone surfaces for tactility. Never on Hydrochar.

### Animation

- **Restrained, premium, slow.** Default easing is `cubic-bezier(0.22, 1, 0.36, 1)` (custom expo‑out) over `320ms`.
- **Fades and tiny translations only.** Translate distance is small — `8–16px`. No bouncing, no spring overshoots, no parallax theatrics.
- **Type reveals** are stagger fades on words (not letters), 40ms apart.
- **Hover is decisive, not playful.** Buttons darken by ~8% (Bone surfaces) or lighten by ~8% (Hydrochar surfaces). Pill buttons may extend their arrow icon by 4px on hover.
- **Press states** dim by ~14% and use `scale(0.985)` for 80ms. Never larger.

### Borders, shadows, radii

- **Radii:** `8px` (inputs, small chips), `16px` (cards), `28px` (large panels), `999px` (pills, monograms). The website's signature shape is the 28px‑radius dark panel floating on Bone.
- **Borders:** hairline `1px solid rgba(17, 20, 15, 0.10)` on Bone surfaces. On Hydrochar surfaces use `1px solid rgba(242, 239, 231, 0.10)`.
- **Shadows are minimal.** A single soft shadow token (`--shadow-card`) — `0 1px 2px rgba(17,20,15,0.04), 0 8px 24px -8px rgba(17,20,15,0.08)`. Floating dark panels get `--shadow-panel` which is slightly deeper. **No coloured shadows. No double shadows.**
- **No "left‑border accent" cards.** Forbidden.

### Transparency & blur

- **Sticky nav** uses `backdrop-filter: blur(20px)` over `rgba(242, 239, 231, 0.72)` — Bone, 72%.
- **Image overlays** for legibility use `rgba(17, 20, 15, 0.45)` (Hydrochar 45%). Never a black‑to‑transparent gradient.
- **Glass cards** (floating chips on photography) use `backdrop-filter: blur(18px) saturate(140%)` with `rgba(242,239,231,0.6)`. Used sparingly — partner logos, location chips.

### Cards

Three card archetypes — and only these three:

1. **Bone card** — `background: var(--bone)`, `border: 1px solid var(--line)`, `border-radius: 16px`, `--shadow-card`. Default content card.
2. **Hydrochar panel** — `background: var(--hydrochar)`, `color: var(--bone)`, `border-radius: 28px`, `--shadow-panel`. Featured project / dark CTA.
3. **Glass chip** — overlay floating on photography, `backdrop-filter`, sized small (max ~320px wide). Partner logos, stats, location.

### Fixed elements

- **Sticky top nav** — full width, 72px tall, blurred Bone background.
- **Bottom‑right contact pill** on the marketing site — "Get in touch →" appears after the hero scrolls out of view.

---

## ICONOGRAPHY

### Approach

G2E iconography is **functional, never decorative.** Icons exist to label data, mark navigation states, and tag categories. They never carry illustration weight — that role belongs to photography.

- **Single icon family: Lucide** (1.5px stroke, rounded line caps, 24×24 default). Loaded via CDN: `https://unpkg.com/lucide@latest`.
- **Why Lucide:** open license, neutral institutional feel, comprehensive coverage of industrial/technical concepts (factory, leaf, gauge, truck, flask, recycle, etc.), and pairs cleanly with Geist + Instrument Serif.
- **Stroke + color:** icons inherit `currentColor`. On Bone surfaces they sit at `--ink` (Hydrochar). On Hydrochar surfaces they sit at `--bone`.
- **Sizes:** 16, 20, 24, 32. Never below 16. Never above 32 — beyond that, switch to photography or a thin‑line diagram.
- **No emoji.** The TerraElix reference used a 🌱; we explicitly do not.
- **No unicode glyphs as icons** (no `→`, no `★`). Use the Lucide equivalents (`arrow-up-right`, `star`) for visual consistency.
- **No flat colored "sticker" icons.** No gradients on icons. No bicolor icons. Strict monoline only.

### Substitution flag

Lucide is a **substitution** — G2E has no existing icon library. If the brand later licenses a custom or premium set (Phosphor Duotone, Iconoir Pro, hand‑drawn marks from a Mexican illustrator, etc.), update this section and re‑swap. **Please advise.**

### Logo system

The G2E mark is a **lowercase `g` in a hydrochar disc** — ink-on-bone contrast, no neon. The wordmark "g2e" sets in Newsreader with a tabular `2` and lowercase descender on the `g`.

Three lockups live in `assets/`:
- `logo-mark.svg` — the hydrochar disc with the bone `g` glyph
- `logo-mark-dark.svg` — inverted: bone disc with hydrochar `g` (for use on dark surfaces)
- `logo-horizontal.svg` — disc + wordmark, horizontal
- `logo-wordmark.svg` — wordmark only, no disc (for footers, partner walls)

Clear space around the mark is equal to the height of the lowercase `g`. Minimum size: 24px tall for the mark, 96px wide for the horizontal lockup.

---

## What's not built yet

- **Real plant photography.** Placeholder photo slots are marked clearly. The brand will only fully come alive with actual aerial, on‑site, and material‑detail shots from the Mérida facility. **Please share existing photography or commission a shoot.**
- **Slide deck templates.** No deck was provided as a starting point, so `slides/` is intentionally absent. If you want investor or government deck templates, ask and I'll build them on this foundation.
- **Spanish‑language UI kit.** The current website kit is in English. The Spanish twin is a 1‑day follow‑up.

See `SKILL.md` for how to invoke this system as an Agent Skill.
