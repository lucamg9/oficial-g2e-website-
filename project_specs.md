# G2E Website — Project Specs
> Last updated: 2026-05-28

---

## What the app does

Public-facing corporate website for G2E — Green to Energy, a Mexican clean-tech company
that turns municipal organic waste into hydrochar. The site is a business development and
stakeholder trust tool targeting governments, investors, and industrial off-takers.
Primary goal: contact-first conversion. Secondary: scientific credibility, SEO, and
investor/stakeholder readiness.

---

## Who it is for

| Audience | Priority |
|---|---|
| Private investors & infrastructure funds | 1 |
| Government and institutional stakeholders | 1 |
| Industrial off-takers (steel, agriculture) | 2 |
| Scientific & multilateral partners (UNAM, IDB, World Bank) | 2 |
| Journalists and researchers | 3 |
| General public / discovery traffic | 3 |

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SEO, image/video optimisation |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS v4 + CSS Variables | G2E design system tokens in `globals.css` |
| UI Components | shadcn/ui | base primitives only |
| Scroll narrative | GSAP + ScrollTrigger | scroll-driven video scrubbing |
| Smooth scroll | Lenis | luxury momentum feel |
| Micro-animations | Framer Motion | fade-ins, section reveals |
| Deployment | Vercel | standard |
| Package manager | npm | |

---

## Design System — Source of Truth

All visual decisions are governed by the design system extracted to `/design-system/`.

### Palette (semantic tokens)
| Token | Value | Role |
|---|---|---|
| `--bg` / Bone | `#F2EFE7` | Primary canvas — 70% of the site |
| `--bg-dark` / Hydrochar | `#11140F` | Dark panels, hero, footer — 25% |
| `--bg-moss` / Moss | `#2C4A35` | Secondary surfaces, pull quotes |
| `--ink` | `#11140F` | All body text on Bone |
| `--ink-inverse` | `#F2EFE7` | All text on dark surfaces |

**No pure white. No pure black. No lime. No neon. No Clay except rare heritage moments.**

### Typography
| Role | Font | Weight |
|---|---|---|
| Display / headlines | Newsreader (serif) | 400 Regular + 400 Italic |
| Body / UI / eyebrows | Geist (sans) | 300/400/500/600 |
| Data / specs / mono | JetBrains Mono | 400/500 |

Sentence-case headlines. Italic = the verb. Section eyebrows: `[ 01 ] SECTION NAME` ALL CAPS +120 tracking.

### Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out)
- Duration: 160ms fast / 320ms base / 600ms slow
- Translation distance: 8–16px max. No spring overshoots. No bouncing.
- Scroll narrative: GSAP ScrollTrigger (video scrubbing). Lenis for smooth momentum.

### Logo
Four lockups in `/design-system/assets/`:
- `logo-mark.svg` — hydrochar disc with bone `g`
- `logo-mark-dark.svg` — bone disc with hydrochar `g` (on dark surfaces)
- `logo-horizontal.svg` — disc + wordmark
- `logo-wordmark.svg` — wordmark only (footer)

---

## Hero — Scroll Narrative Architecture

The entry experience is a dark cinematic section built from 4 GIF clips (1280×720).
GIFs must be converted to WebM (Chrome/Edge) + MP4 (Safari) for web-optimised video scrubbing.

| Scene | GIF | Scroll % | Description |
|---|---|---|---|
| Section 1 — Carbon Rock | `1.gif` | 0–15% | Static floating rock. Mouse-follow parallax. |
| Section 2 — The Fall | `2.gif` | 15–30% | Rock descends Y-axis. BG transitions Bone→Hydrochar. |
| Section 3 — Soil Impact | `3.gif` | 30–50% | Pinned container. Video scrubs frame by frame. |
| Section 4 — Growth | `4.gif` | 50–90% | Plant emerges. Editorial copy triggered at frame intervals. |
| Section 5 — Transition | (canvas) | 90–100% | Zoom into texture → transitions into Bone editorial layout. |

**Scrubbing logic:** `scrollProgress (0→1)` mapped to `video.currentTime`.  
**Easing:** Lerp inertia — not 1:1 jerkiness.  
**Mobile fallback:** Auto-playing loops. No scrubbing. Standard vertical scroll narrative.

### Required asset prep (user task — before video scrubbing can be built):
1. Install ffmpeg: `brew install ffmpeg`
2. Convert GIFs: `ffmpeg -i 1.gif -c:v libvpx-vp9 -pix_fmt yuva420p 1.webm`
   Repeat for `2.gif`, `3.gif`, `4.gif`
3. MP4 fallback: `ffmpeg -i 1.gif -movflags faststart -pix_fmt yuv420p 1.mp4`
4. Text masking: Use `overflow: hidden` + `object-position` to crop any third-party branding from clip edges
5. Place converted files in `/public/videos/`

---

## Pages and Routes

### Public pages
| Route | Purpose | Priority |
|---|---|---|
| `/` | Home — hero scroll narrative + key sections | P0 |
| `/technology` | HTC process, scientific credibility, white papers | P1 |
| `/solutions` | What G2E solves for industry and cities | P1 |
| `/impact` | Environmental and social impact with data | P1 |
| `/projects` | Current and pipeline G2E plants | P1 |
| `/demo-center` | Demonstration station + visit CTA | P2 |
| `/carbon-credits` | Hydrochar → premium carbon credits | P2 |
| `/about` | Team, values, history, company story | P2 |
| `/presence` | Articles, PDFs, media mentions, social proof | P3 |
| `/contact` | Contact form (name, email, phone, location, message) | P0 |

### Home page section flow
1. **Hero Scroll Narrative** — Hydrochar dark, full-bleed (GSAP + Lenis)
2. **What is Hydrochar** — transition to Bone canvas, quick explainer
3. **The Process** `[ 02 ]` — HTC 4-step diagram (from UI kit: Process.jsx)
4. **Our Plants** `[ 03 ]` — Plant cards with detail overlay (Plants.jsx)
5. **By the Numbers** `[ 04 ]` — Stats row (Stats.jsx)
6. **Partners** `[ 05 ]` — Partner logo wall (Partners.jsx)
7. **Press / Pull Quote** `[ 06 ]` — Moss-background editorial moment
8. **Work With Us** `[ 07 ]` — Hydrochar CTA panel (CTAPanel.jsx)
9. **Footer** — Hydrochar with nav links

### Primary user flows
**Investor:** Home → Impact → Plants → Carbon Credits → Contact
**Government:** Home → Technology → Projects → Demo Center → Contact
**Industrial:** Home → Solutions → Technology → Contact

---

## File Structure

```
/app
  layout.tsx              ← root layout, metadata, fonts, global CSS
  page.tsx                ← Home (hero + all sections)
  /technology/page.tsx
  /solutions/page.tsx
  /impact/page.tsx
  /projects/page.tsx
  /demo-center/page.tsx
  /carbon-credits/page.tsx
  /about/page.tsx
  /presence/page.tsx
  /contact/page.tsx

/components
  /sections               ← page sections (Hero, Process, Plants, Stats, etc.)
    HeroScroll.tsx        ← GSAP ScrollTrigger video scrub narrative
    Process.tsx
    Plants.tsx
    Stats.tsx
    Partners.tsx
    PullQuote.tsx
    CTAPanel.tsx
  /ui                     ← shadcn/ui primitives
  /layout                 ← Nav, Footer, ContactFab

/lib
  utils.ts                ← cn() and helpers
  lenis.ts                ← Lenis smooth scroll initialisation

/public
  /videos                 ← converted WebM + MP4 clips (user must add)
    1.webm / 1.mp4
    2.webm / 2.mp4
    3.webm / 3.mp4
    4.webm / 4.mp4
  /assets                 ← logo SVGs (copied from /design-system/assets/)
    logo-horizontal.svg
    logo-mark.svg
    logo-mark-dark.svg
    logo-wordmark.svg

/design-system            ← source of truth (do not edit — reference only)

project_specs.md
CLAUDE.md
```

---

## Third-Party Services

- Vercel — hosting and deployment
- Google Fonts — Newsreader, Geist, JetBrains Mono (via `next/font`)
- GSAP CDN or npm — ScrollTrigger scroll narrative
- Lenis npm — smooth scroll
- Lucide — icons (1.5px stroke, 24px, via `lucide-react`)
- shadcn/ui registry — base component primitives
- Contact form — Vercel Function or Formspree (TBD)

---

## Content & Copy Rules

From the design system README:

- **No hype.** "We operate the world's largest plant of its kind." Not "we're proud to be leaders."
- **Specific over vague.** Tonnes, megawatt-hours, signed partners. Never "many" or "several."
- **No exclamation marks.** None. The work is the emphasis.
- **No emoji.** Anywhere. Ever.
- **Preferred terms:** Hydrochar / Hydrothermal Carbonization / organic waste / off-taker / decarbonize / plant / tonnes
- **Avoid:** biochar / garbage / customer / "go green" / factory / tons

---

## Data / Content

- All copy is placeholder-driven initially (marked `// TODO: real copy`)
- Stats used in `Stats.tsx`: 1.2M tonnes / 78% CO₂e reduction / 99.4% uptime / 4 off-take agreements
  **These are design-system numbers — confirm with client before launch**
- Plant data: Mérida (operating, 450K t/yr), Monterrey (permitting, 320K t/yr), Guadalajara (permitting, 280K t/yr)
  **Confirm with client**
- Contact form endpoint: TBD (Vercel Function recommended)
- No CMS at this stage

---

## Definition of Done — Phase 1 (Boilerplate + Hero Shell)

- [ ] Next.js 15 App Router project initialised with TypeScript
- [ ] Tailwind CSS v4 configured with G2E design system tokens in `globals.css`
- [ ] Google Fonts (Newsreader, Geist, JetBrains Mono) loaded via `next/font`
- [ ] Logo SVGs copied to `/public/assets/`
- [ ] GSAP + ScrollTrigger + Lenis installed
- [ ] Nav component built (pill nav, blurred bone glass, `logo-horizontal`)
- [ ] Footer component built (hydrochar background, nav links)
- [ ] `ContactFab` component (bottom-right pill, appears after hero scroll)
- [ ] HeroScroll shell built (Hydrochar full-bleed, video placeholder, GSAP wired up)
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` passes without errors

## Definition of Done — Phase 2 (Full Home Page)

- [ ] Process section (4-step HTC diagram)
- [ ] Plants section (plant cards + detail overlay)
- [ ] Stats section (4-number row)
- [ ] Partners section (logo wall)
- [ ] Pull Quote section (Moss panel)
- [ ] CTA Panel section (Hydrochar, request briefing CTA)
- [ ] Full scroll narrative wired to actual video files (after ffmpeg conversion)

---

## TODOs — Require Client Input

- [ ] Confirm stats (1.2M tonnes, 78%, etc.) against actual plant data
- [ ] Confirm plant data (Monterrey, Guadalajara — names, capacities, timelines)
- [ ] Real plant photography (aerial, on-site, material detail — Mérida plant)
- [ ] Team photos and bios (for /about)
- [ ] Press kit / PDF links (white papers, lifecycle analysis)
- [ ] Contact form destination (email or service)
- [ ] Legal pages (if required)
- [ ] Spanish-language twin (Phase 3)
- [ ] Convert GIFs → WebM/MP4 (requires ffmpeg — user must do this step)
- [ ] Confirm if "Pioneer" / "Lovable" text exists in any of the 4 GIFs (check before masking)
