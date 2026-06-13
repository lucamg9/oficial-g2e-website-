# CLAUDE.md — G2E Website Project Constitution

> **READ THIS FILE ENTIRELY BEFORE WRITING A SINGLE LINE OF CODE.**
> This is the single source of truth for the G2E website. Every decision — layout, copy, color,
> animation, component name, file path — must be validated against this document first.
> If anything is ambiguous, ask before building.

---

## 0. Project Identity

| Field              | Value                                                                 |
|--------------------|-----------------------------------------------------------------------|
| Client             | G2E                                                                   |
| Full name          | G2E (brand name used as-is — no longer form on the site)             |
| Country            | Mexico (Mexico City — Bordo Poniente facility)                        |
| Industry           | Clean-tech / Environmental Technology / Circular Economy              |
| Core activity      | Transforms organic urban waste into hydrochar/biochar                 |
| Build environment  | Antigravity (AI-assisted coding environment — NOT a brand concept)   |
| Visual generation  | Higgsfield (AI visual/3D tool — abstract visuals only — see Section 10.4) |
| Developer          | Luca Mendieta Studio                                                  |
| Deployment target  | [PLACEHOLDER: confirm hosting platform — Vercel, Netlify, Hostinger, etc.] |
| Project value      | $5,000 USD — premium quality expected at every layer                  |

---

## 1. The Mission in One Sentence

> G2E transforms organic waste from Mexican cities into carbon-rich materials
> that improve soil, support agriculture under climate stress, reduce methane
> emissions, and build measurable environmental infrastructure at industrial scale.

This sentence is the north star. Every section, every headline, every animation
must ultimately serve this idea.

---

## 2. Absolute Non-Negotiable Rules

These override all other instructions. Violating any of these is a hard stop.

### 2.1 Never invent content
- **No invented metrics.** If a number isn't provided, write `[PLACEHOLDER: actual figure]`.
- **No fake partners, clients, or certifications.** Use `[PLACEHOLDER: partner logo]`.
- **No fabricated press coverage.** Use `[PLACEHOLDER: press mention]`.
- **No hallucinated scientific claims.** Only describe what the client has confirmed.

### 2.2 Never use greenwashing language
**Forbidden words and phrases:**
- "revolutionary", "game-changing", "saving the planet"
- "eco-friendly magic", "the future of sustainability"
- "carbon neutral" (unless verified and documented)
- "we are changing the world", "transforming everything"
- Any superlative not backed by real data

### 2.3 Never break the color system
- No blues, no oranges, no purples
- No neon greens, no lime, no electric tones
- No pure black (#000000), no pure white (#FFFFFF)
- Only the 7 colors defined in Section 5

### 2.4 Never build the full site in one shot
Build one section at a time. Always confirm before proceeding to the next section.
See Section 9 for the exact build order.

### 2.5 Real imagery only
The client will provide real photos via Google Drive. Never use:
- Generic stock photos
- AI-generated nature visuals
- "Hands holding glowing Earth" type imagery
- Overly messy garbage imagery
- Neon green leaf photos
- Unrealistic futuristic lab visuals

---

## 3. Who This Website Is For

This is **not** a consumer product page or a startup landing page.
Primary audiences:
- Institutional investors
- Government stakeholders and environmental agencies
- Agricultural sector partners
- Industrial collaborators
- Environmental/scientific organizations
- Serious sustainability decision-makers

The site must communicate credibility, scientific rigour, and execution capacity
to people who are skeptical of greenwashing and demand substance.

---

## 4. Brand Identity

### 4.1 The Mood

> "If Apple designed a company that brought nature indoors."
> "If a Scandinavian architecture studio and a luxury landscape designer
>  created a startup together."

**It's cultivated nature — not wild forests, not luxury marble, not futuristic chrome.**

The feeling is:
- Nature carefully curated by humans
- Calm
- Premium
- Architectural
- Organic
- Sophisticated

**Brand keywords:** Organic luxury · Architectural nature · Refined sustainability ·
Minimal biophilic design · Premium calm · Soft modernism

### 4.2 What the site MUST feel like
✓ A premium corporate presentation for serious investors
✓ A credible scientific/environmental company with measurable impact
✓ Mexican clean-tech at global quality level
✓ Confident, grounded, and real

### 4.3 What the site must NEVER feel like
✗ A generic SaaS startup landing page
✗ An ecommerce product catalog
✗ A flashy tech demo
✗ A dark cyberpunk / AI / crypto aesthetic
✗ A basic waste-management company page
✗ A brochure full of empty claims
✗ An art project with no clarity
✗ Anything that makes G2E look like a school project

---

## 5. Design System

### 5.1 Color Palette

| Token Name     | Hex       | Primary Use                                          |
|----------------|-----------|------------------------------------------------------|
| Moss Green     | `#7A8F5A` | Main accent, highlights, hover states, statistics    |
| Sage Mist      | `#AEB79D` | Cards, secondary sections, soft backgrounds          |
| Stone Ivory    | `#F4F2ED` | Main background, large content sections              |
| Warm Limestone | `#D7D1C7` | Borders, glassmorphism, secondary UI                 |
| Forest Shadow  | `#2E372A` | Main text, headings, dark sections                   |
| Deep Moss      | `#49553D` | CTA backgrounds, footer, nav states                  |
| Fog White      | `#FAFAF7` | Text on dark backgrounds, cards, contrast            |

**Visual Hierarchy Rule (60/20/10/7/3):**
- 60% → Stone Ivory `#F4F2ED` (main canvas)
- 20% → Fog White `#FAFAF7` (surfaces, cards)
- 10% → Forest Shadow `#2E372A` (dark anchors)
-  7% → Moss Green `#7A8F5A` (signature accent)
-  3% → Deep Moss `#49553D` (dark green anchor)

**The palette tells a single story: stone, moss, light, and tranquility.**
Any color outside this system breaks the narrative.

**CTA Button Style:**
```
background:        #2E372A (Forest Shadow)
color:             #FAFAF7 (Fog White)
hover background:  #49553D (Deep Moss)
accent element:    #7A8F5A (Moss Green) — for icon, underline, or micro-detail
```

### 5.2 Typography

| Element    | Font          | Weight | Size Desktop | Size Mobile |
|------------|---------------|--------|--------------|-------------|
| H1         | Space Grotesk | 700    | 72px         | 40px        |
| H2         | Space Grotesk | 600    | 48px         | 30px        |
| H3         | Space Grotesk | 600    | 32px         | 24px        |
| Paragraph  | Inter         | 400    | 18px         | 16px        |
| Small Text | Inter         | 300    | 14px         | 13px        |
| CTA        | Space Grotesk | 600    | 16px         | 15px        |

**Typography rules:**
- Headings on light bg → Forest Shadow `#2E372A`
- Headings on dark bg → Fog White `#FAFAF7`
- Body text → Forest Shadow at 80% opacity on light backgrounds
- Never justify text — left-align or center only
- Letter spacing on H1: `-0.02em` | H2: `-0.015em` | H3: `-0.01em`
- Line height: H1 `1.05` | H2 `1.1` | H3 `1.2` | Body `1.7` | Small `1.6`

### 5.3 Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'moss':        '#7A8F5A',
        'sage-mist':   '#AEB79D',
        'stone-ivory': '#F4F2ED',
        'limestone':   '#D7D1C7',
        'forest':      '#2E372A',
        'deep-moss':   '#49553D',
        'fog-white':   '#FAFAF7',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body':    ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2': ['48px', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'h3': ['32px', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'small': ['14px', { lineHeight: '1.6' }],
        'cta': ['16px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      spacing: {
        'section': '120px',  // desktop vertical section padding
        'section-sm': '72px', // mobile vertical section padding
      },
    },
  },
  plugins: [],
}
```

### 5.4 Spacing System

```
Section vertical padding (desktop): 120px top + 120px bottom
Section vertical padding (mobile):  72px top + 72px bottom
Container max-width:                1200px
Container padding (desktop):        0 80px
Container padding (mobile):         0 24px
Component gap:                      48px (desktop), 32px (mobile)
Text → CTA gap:                     32px
```

### 5.5 Border & Radius

```
Border color:           Warm Limestone #D7D1C7
Border radius (cards):  12px
Border radius (buttons): 8px
Border radius (tags):   999px (pill)
Default border width:   1px
```

---

## 6. Component Architecture

### 6.1 File Structure

```
/src
  /components
    /sections          ← Full page sections (Hero, WhoWeAre, OurStory, etc.)
    /ui                ← Reusable atoms (Button, Card, Tag, Divider, Badge, etc.)
    /3d                ← Three.js scenes (HeroCanvas, ParticleField, DemoCenter3D)
    /animations        ← GSAP configs, ScrollTrigger setups, timeline definitions
    /layout            ← Navbar, Footer, PageWrapper, SectionWrapper
  /styles
    /tokens.css        ← CSS custom properties from design system
    /globals.css       ← Reset + base styles
  /assets
    /images            ← Client-provided photos (sorted by section)
    /icons             ← SVG icons (from Lucide React — outline only)
  /data
    /content.js        ← ALL copy lives here — never hardcode text in components
    /placeholders.js   ← Placeholder definitions for missing real data
  /hooks               ← Custom React hooks (useScrollProgress, useMouse, etc.)
  /utils               ← Helpers (cn(), formatNumber(), etc.)
  /pages               ← Page-level components (index, technology, presence, etc.)
```

### 6.2 Component Rules

- One component per file. Filename = component name (PascalCase).
- All copy sourced from `/data/content.js` — never inline strings in JSX.
- All colors via Tailwind tokens — never hardcode hex values in components.
- All sections receive `className` prop for override flexibility.
- Every image has `alt` text.
- Every section has a semantic `id` for anchor navigation.

### 6.3 Content Centralization

All text content lives in `/src/data/content.js`:
```js
export const CONTENT = {
  hero: {
    headline: "Waste becomes value.",
    subheadline: "G2E transforms organic residues into carbon-rich material...",
    cta: "Discover the process",
  },
  whoWeAre: {
    title: "An environmental infrastructure company.",
    body: "...",
  },
  // etc.
}
```

Use `[PLACEHOLDER: description]` for any content not yet confirmed.

---

## 7. Animation & Motion System

### 7.1 Philosophy

> Motion at G2E is editorial, not decorative.
> Every animation has one purpose: to explain, to reveal, or to guide attention.
> If an animation doesn't serve the story, it doesn't exist.

### 7.2 Animation Stack

| Tool              | Role                                              |
|-------------------|---------------------------------------------------|
| GSAP + ScrollTrigger | Primary engine for all scroll-driven animation  |
| Three.js          | 3D hero scene, particle systems, Demo Center      |
| CSS transitions   | Hover states and micro-interactions only          |

### 7.3 Approved Animation Types

| Type                    | Use Case                                   | GSAP Pattern              |
|-------------------------|--------------------------------------------|---------------------------|
| Fade up on scroll       | Section reveals, text entrances            | `y:30, opacity:0` → reset |
| Stagger reveal          | Card groups, stat rows, lists              | `stagger: 0.1`            |
| Scroll-pinned narrative | "How We Work" process progression          | `pin:true, scrub:1`       |
| Immersive 3D hero       | Landing page opening — Three.js scene      | requestAnimationFrame     |
| Ambient particles       | Background depth in hero                   | Three.js Points           |
| Horizontal scroll track | Technology timeline (optional)             | `scrub:1, x:-N`           |
| Counter animation       | Statistics/impact numbers                  | GSAP numericTo            |
| Subtle parallax layers  | Image backgrounds (max 20% offset)         | ScrollTrigger, scrub:0.5  |
| Hover lift              | Cards, buttons                             | CSS `translateY(-4px)`    |
| Section transition      | GSAP page enter/exit                       | `autoAlpha:0 → 1`         |

### 7.4 Timing Standards

```
Hover micro:        150–200ms   ease-out
Element reveal:     600–800ms   power2.out
Scroll narrative:   scrub-based (tied to scroll position)
Page transition:    400–600ms   power3.inOut
Stagger child:      0.08–0.12s  between items
```

### 7.5 Motion Forbidden List

- Spinning 3D objects with no contextual meaning
- Excessive parallax (> 20% vertical offset)
- Looping animations on static content
- Transitions that delay reading content
- Heavy particle systems on sections below the hero
- Bounce easing (never use `elastic` or `bounce`)
- Simultaneous animations on more than 5 elements

### 7.6 Mobile Motion Rules

- Particle count: reduce to 30% of desktop count on mobile
- Parallax: disable entirely on mobile (performance + motion sickness)
- Scroll-pinned sections: simplify or linearize on mobile
- 3D hero: replace with high-quality static image fallback below 768px
  (or reduce to a minimal, highly-optimized WebGL version)

---

## 8. Tone of Voice & Copy Rules

### 8.1 Approved Vocabulary

Always use these terms. Never paraphrase with informal or inaccurate language.

| Correct Term                                | Never Say                          |
|---------------------------------------------|------------------------------------|
| Hydrochar / biochar                         | "magical dirt", "super soil"       |
| Carbon-rich material                        | "eco stuff", "green powder"        |
| Organic waste transformation                | "garbage recycling"                |
| Industrial-scale environmental infrastructure | "big recycling plant"            |
| Measurable environmental value             | "saving the planet"                |
| Circular material systems                   | "closed loop" (unless in context)  |
| Soil productivity                           | "better dirt"                      |
| Nutrient retention                          | —                                  |
| Methane reduction                           | —                                  |
| Scientific execution                        | —                                  |

### 8.2 Copy Principles

- **Short sentences.** One idea per sentence.
- **No filler.** Every word earns its place.
- **No overpromising.** Let the technology speak for itself.
- **No AI-generated filler phrases.** No "delve into", "at the forefront of", "robust solutions".
- **Credibility over excitement.** Calm confidence outperforms hype.

### 8.3 Tone Keywords

Clear · Premium · Intelligent · Calm · Scientific · Human · Confident

---

## 9. Page Architecture & Build Order

### ⚠️ CRITICAL: One section at a time. Always confirm before proceeding.

### Phase 1: Landing Page

Build in this exact order — wait for approval before proceeding to the next step.

| Step | Section       | Key Content                                               | 3D/Animation            |
|------|---------------|-----------------------------------------------------------|-------------------------|
| 1    | Hero          | Headline, subline, primary CTA, brand statement           | Three.js scene + particles |
| 2    | Who We Are    | Company identity, 2–3 lines, trust signals                | Fade up reveal          |
| 3    | Our Story     | Founding narrative, the "why", emotional connection        | Scroll-triggered reveal |
| 4    | How We Work   | Process overview (waste → transformation → value)         | Scroll-pinned animation |
| 5    | Contact       | Contact form + key info                                   | Subtle fade             |
| 6    | Footer        | Navigation, legal, location, social                       | —                       |

### Phase 2: Secondary Pages (build one at a time, in order of priority)

| Priority | Page                 | Content                                                          |
|----------|----------------------|------------------------------------------------------------------|
| 1        | Technology           | Full tech explanation, process diagrams, productivity impact     |
| 2        | Presence             | Locations, recognitions, partnerships, press, where they've worked |
| 3        | Demonstration Center | 3D interactive facility plan                                     |
| 4        | Services             | Evaluate: may be merged into landing page — confirm with client  |

### Navbar Structure

```
G2E [logo]     |  Technology  |  Presence  |  Demo Center  |  Contact  |  [CTA Button]
```

---

## 10. Technical Standards

### 10.1 Stack

| Layer         | Technology               | Notes                                   |
|---------------|--------------------------|-----------------------------------------|
| Framework     | React (Vite)             | Component-based, modular                |
| Styling       | Tailwind CSS             | Extended with G2E design tokens         |
| Animations    | GSAP 3 + ScrollTrigger   | Import only needed plugins              |
| 3D            | Three.js (vanilla)       | Managed via React useEffect + useRef    |
| Visual AI     | Higgsfield               | Abstract visuals + 3D renders — see §10.4 |
| Fonts         | Google Fonts             | Space Grotesk + Inter — font-display:swap |
| Icons         | Lucide React             | Outline only, never filled              |
| Package mgr   | npm                      |                                         |

Do not add dependencies not listed here without explicit approval.

### 10.2 Performance Targets

| Metric              | Target    |
|---------------------|-----------|
| Lighthouse Performance | ≥ 85   |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 90 |
| First Contentful Paint | < 2.0s |
| LCP                 | < 2.5s    |

**Performance rules:**
- Lazy-load all 3D scenes on viewport entry — never block initial render
- All images: `loading="lazy"` + explicit `width` and `height`
- WebP format for all images (with JPEG fallback)
- GSAP: import only what's used (`gsap`, `ScrollTrigger` — not the full bundle)
- Fonts: `font-display: swap`
- Code-split the 3D canvas bundle from the main page bundle
- Three.js scenes: dispose geometry + material + renderer on component unmount

### 10.3 Responsive Breakpoints

```
Mobile:    < 768px
Tablet:    768px – 1024px
Desktop:   1024px – 1440px
Wide:      > 1440px (max-width container: 1200px, centered)
```

### 10.4 Higgsfield Visual Generation Protocol

Higgsfield is an AI visual generation tool Claude uses to produce **3D visuals, abstract environments, and textural imagery** for the site. It is not a deployment platform and not a photography replacement.

#### What Higgsfield IS used for on this project

| Use Case | Section | Description |
|----------|---------|-------------|
| Hero background | Landing — Hero | Abstract organic 3D environment — moss, stone, soil texture rendered at depth |
| Section texture layers | Landing — various | Subtle background textures that reinforce the stone/moss/fog palette |
| Process visualization | Landing — How We Work | Abstract visual of transformation: waste → material → land |
| 3D material renders | Technology page | Close-up biochar/hydrochar texture rendered with precision |
| Facility model | Demo Center page | 3D architectural representation of the G2E facility |
| Environmental abstracts | Any | Atmospheric nature backgrounds that feel cultivated, not wild |

#### What Higgsfield is NEVER used for on this project

- ✗ Images meant to look like real G2E employees or team members
- ✗ Images meant to represent the actual G2E facility (use client-provided photos)
- ✗ Fake machinery, fake lab equipment, fake processing infrastructure
- ✗ Hands holding soil / crops / glowing Earth type visuals
- ✗ Anything photorealistic that could be mistaken for real documentation
- ✗ Visuals that don't fit the Stone Ivory / Moss / Forest color palette
- ✗ Dark, heavy, or cinematic renders — keep visuals bright and editorial

#### Higgsfield Quality Standard

Every Higgsfield-generated visual must:
- Feel consistent with the cultivated nature aesthetic (calm, premium, architectural)
- Match the G2E palette: warm whites, stone tones, sage/moss greens — no blues, no synthetic colors
- Look as intentional as a high-end editorial photograph
- Not look like generic AI art, stock renders, or sci-fi environments
- If a generated visual feels fake, AI-looking, or out of tone — regenerate or omit it

#### Integration into the codebase

- Place generated visuals in `/src/assets/images/generated/`
- Name descriptively: `hero-bg-moss-texture.webp`, `biochar-material-render.webp`
- Convert to WebP before using
- All generated visuals still require `alt` text and `loading="lazy"`

---

### 10.5 Deployment

**Platform:** [PLACEHOLDER — confirm hosting target: Vercel / Netlify / Hostinger / other]

Until confirmed, build as a standard Vite React app:
- Build command: `npm run build`
- Output directory: `dist/`
- Environment variables: `.env.local` — never commit to repo

### 10.5 Image Pipeline

When client provides assets via Google Drive:
1. Place in `/src/assets/images/[section-name]/`
2. Rename descriptively (e.g. `biochar-texture-closeup.webp`)
3. Convert to WebP if not already
4. Always include meaningful `alt` text
5. Never resize in CSS — set explicit dimensions in HTML

---

## 11. Claude Code Behavior Protocol

- **One section at a time.** Never build multiple sections or pages without approval.
- **State assumptions upfront.** At the top of every response, list any assumptions made.
- **Ask before guessing.** If content is missing, use `[PLACEHOLDER]` and flag it — don't invent.
- **Show component in isolation.** Build and show a section independently before wiring it to the page.
- **Clean code only.** No `console.log` in final output. No commented-out code blocks. No TODOs left in production files.
- **Comment meaningfully.** Explain the "why" of complex animation setups or Three.js configurations.
- **Never hallucinate partners, press, or data.** If the client hasn't confirmed it, it doesn't exist.
- **Confirm destructive decisions.** Deleting or heavily restructuring existing code requires explicit confirmation.
- **All copy from content.js.** Never write copy directly inside a component.

---

## 12. Visual References (Aesthetic Targets)

The G2E site should evoke:
- Apple's product pages (editorial precision, whitespace, restraint)
- Kinfolk magazine (organic, warm, premium photography)
- Ferm Living or Aesop (minimal biophilic design)
- Patagonia's mission-driven corporate storytelling (credibility without performance)
- A high-end Scandinavian architecture studio (structure, calm, purpose)

**It should never look like:**
- A generic SaaS company (Slack, Notion, Webflow templates)
- A crypto or AI project (dark bg, neon, geometric excess)
- A brochure from a government environmental agency (boring, text-heavy)
- A student design project (inconsistent, unrefined)
- A cliché sustainability brand (green overload, stock imagery, slogans)

---

## 13. Imagery Direction

### 13.1 Real client assets (from Google Drive) — use for all human/facility sections

These sections require real photos only. No Higgsfield. No stock. No AI imagery.

**Use visuals of:**
- Organic waste material in a clean industrial processing context
- Hydrochar/biochar macro texture (close-up, beautiful)
- Soil cross-sections and root systems
- Agricultural landscapes under resilience
- Clean processing infrastructure (machinery, tubes, facilities)
- Lab and engineering details (precise, scientific, real)
- Mexican environmental landscape and geography
- Real people working in real environments

**Sections that require real assets:** Who We Are, Our Story, Presence, any team/people/facility photography.

### 13.2 Higgsfield-generated visuals — use for abstract and 3D sections

**Approved for generation:**
- Hero background environment
- Section texture and atmospheric layers
- Process/transformation abstract visuals
- 3D material renders (biochar texture, soil cross-section render)
- 3D Demonstration Center facility model
- Background environmental abstracts

**Never use (real or generated):**
- Generic iStock sustainability photos
- Hands holding glowing Earth or plants
- Neon green leaf imagery
- Unrealistic sci-fi lab environments
- Messy or disturbing garbage imagery
- Anything that looks like a cliché sustainability campaign

---

## 14. Quick Reference Checklist (before shipping any section)

- [ ] All colors match the 7-color system exactly
- [ ] No copy written directly in JSX — all from content.js
- [ ] No placeholder text that isn't marked `[PLACEHOLDER: ...]`
- [ ] No invented metrics, partners, or press
- [ ] Animations are purposeful and not distracting
- [ ] Mobile version tested at 375px width
- [ ] Fonts load correctly (Space Grotesk + Inter)
- [ ] Images have `alt` text and `loading="lazy"`
- [ ] Three.js scenes have cleanup (dispose) in useEffect return
- [ ] No console.log in final code
- [ ] Section has semantic `id` for anchor navigation
- [ ] Accessibility: sufficient color contrast, focus states on interactive elements
- [ ] Higgsfield visuals: do they feel editorial and real, or do they look like AI art? Regenerate if needed
- [ ] Higgsfield visuals: only used in abstract/3D sections — real client photos used for human/facility sections
- [ ] Deployment target confirmed before running `npm run build`

---

## 15. 3D Scroll Story & Motion Brief

> This is the cinematic script for the full landing page experience.
> Every 3D scene, camera move, and scroll beat is defined here.
> Claude Code must treat this as a film director's brief — not a suggestion.
> Do not invent scene logic. If something is unclear, ask before building.

---

### The Experience in One Sentence

The user watches organic waste become life — from a spinning piece of carbon on a white background,
through the growth of a corn plant, through the industrial transformation process,
to the finished facility — all driven by their own scroll.

---

### Scene 1 — Hero

**What the user sees on load:**
A white (Stone Ivory `#F4F2ED`) background. On the right side of the screen, a single piece of
hydrochar/biochar — dark, rough, carbon-textured — floats and rotates slowly. The motion is
natural, warm, not mechanical. It feels alive. The user does not yet know what it is.
They feel curious.

**Camera:** Fixed. Object positioned right-of-center, roughly at eye level.

**Object behavior (idle, before scroll):**
- Gentle Y-axis rotation: one full rotation every ~8 seconds
- Subtle float: slight Y oscillation of ±6px over ~4 seconds (sine wave)
- Very slight X-axis tilt responding to mouse position (±5° max)

**On scroll start:**
The biochar begins to scale up slowly and drift toward the horizontal center of the screen.
This is the transition trigger into Scene 2.

**3D approach:** Three.js. Biochar represented as an irregular dark geometry
(IcosahedronGeometry subdivided + noise displacement) with MeshStandardMaterial:
roughness 0.95, metalness 0.05, color `#1A1A14`. Soft directional light from top-left.
Ambient light low (0.3 intensity). Background: transparent canvas over Stone Ivory page bg.

**Assets needed:**
- Higgsfield: generate reference image of isolated hydrochar piece on white for visual target
- Geometry: procedurally generated in Three.js (no external model needed)

---

### Scene 2 — Biochar Close-Up & Identity

**Scroll trigger:** Begins when user scrolls ~10vh past hero.

**What happens:**
The biochar from Scene 1 scales up and moves to horizontal center.
As it settles, it softens slightly — like the camera moved closer.
Text fades in as overlay: the company name, a one-line description of what biochar is.
The user now understands what they were looking at.

**Camera:** Still fixed. Object now centered, larger — fills roughly 40% of viewport.

**Text overlay:** GSAP fade in, `opacity: 0 → 1`, `y: 20 → 0`, `duration: 0.6s`.
Copy from `content.js`.

**Transition out:**
As the user continues scrolling, the biochar begins its descent.
It moves downward and slightly left. A flat dark soil plane rises up from the bottom of the screen.

---

### Scene 3 — Biochar Lands on Soil

**What happens:**
The biochar "lands" on the dark soil plane that has risen from the bottom.
On impact: a subtle particle burst (soil particles scatter briefly — 20–30 small dark points
that fall back down under simulated gravity). The biochar settles. Embeds slightly into the soil.

**Soil plane:** A flat THREE.Mesh (PlaneGeometry, rotated X -90°) with dark soil texture.
Color: deep brown-black `#1C1410`. Slight texture displacement.

**Camera:** Begins to shift perspective here — starts to move to a lower, more horizontal angle.
The user is no longer looking from above. They are moving to ground level.

**Transition out:**
The soil plane, with the embedded biochar, slides left off screen.
As it exits, the camera continues its descent to ground level.
A new scene initializes on the right side.

---

### Scene 4 — The Corn Plant (Our Story / Timeline)

**This is the most important scene in the entire site.**

**Camera position:** Extremely close. Ground level. Imagine lying on the soil, face 5cm from the earth.
The user is not watching a plant from above — they are inside the plant's perspective.
They see roots. They see the soil texture. They see leaves unfurling at eye level.

**Plant orientation:** The plant grows LEFT TO RIGHT across the screen.
It does not grow upward. It grows horizontally, like a timeline reading naturally left to right.

**Scroll behavior:**
Each centimeter of scroll = a specific growth beat of the plant.
This section must be VERY long — pin the scene and use `scrub: 1` over ~400vh of scroll distance.

**Growth sequence (scroll-driven, left to right):**

| Scroll Beat | What grows | What appears |
|-------------|-----------|--------------|
| 0%          | First root emerges from soil | Earliest company milestone — text fades in |
| 15%         | First leaf unfurls | Second milestone |
| 28%         | Second leaf, larger | Third milestone |
| 42%         | Stem thickens, third leaf | Fourth milestone |
| 56%         | Plant is mid-maturity, 4th leaf | Fifth milestone |
| 70%         | Plant nearing full height, 5th leaf | Sixth milestone |
| 85%         | Plant fully grown, all leaves present | Most recent milestone |
| 100%        | Corn cob appears at the top of the plant | "Today / Current state" |

**Timeline text placement:**
Each milestone text block appears next to its corresponding leaf.
Position: floated beside the leaf tip, fade in on that specific scroll beat.
Typography: H3 Space Grotesk 600 for the year/event, Inter 400 for the description.
Color: Forest Shadow `#2E372A` on the Stone Ivory background.

**The feeling:**
The user is not reading a timeline. They are watching a plant grow
while the company's story unfolds beside it. The plant IS the company.

**3D approach options (in order of preference):**

Option A — Full Three.js:
A corn plant GLB model with morph targets or bone animation, driven by GSAP ScrollTrigger.
Each leaf is a separate mesh revealed sequentially. Requires sourcing a rigged corn plant GLB.
(Source: Sketchfab free library — search "corn plant" or "maize plant")

Option B — Three.js hybrid:
The soil, roots, and environment are Three.js. The plant leaves are SVG/canvas drawn elements
layered on top, animated by GSAP. This is more buildable but slightly less immersive.

Option C — GSAP SVG only:
A beautifully illustrated SVG corn plant that grows via GSAP drawSVG plugin.
Full control, no 3D model dependency, highly reliable. Least immersive but most buildable.

**Recommended: Start with Option C. Build Option A on top if time allows.**

**Transition out:**
When scroll reaches 100%, the corn cob at the top of the fully grown plant
separates and "rolls" or "falls" right — a brief physics-like animation —
into the next section's space. The plant fades back gently.

**Assets needed:**
- If Option A: corn plant GLB with animation (source from Sketchfab)
- If Option C: SVG illustration of corn plant (built in code or designed first)
- Timeline content: client must provide actual company milestones with dates
  `[PLACEHOLDER: company milestone 1 — year + description]`

---

### Scene 5 — The Process (How We Work)

**This is the longest scene. It has 6 sub-acts, all scroll-driven.**
Pin the scene container. Each sub-act is a distinct scroll beat within the pin.

**Sub-act 5.1 — The Truck**
A truck (3D model, side view) enters from the left edge of the screen.
It drives at a constant speed to center-screen and parks.
The truck is on a white background.
After parking, the truck tips its bed and organic waste falls out in a pile.

*Technical:* Truck enters via GSAP `x: -120vw → 0`, then a tilt animation on the bed.
Waste pile: particle burst + a pile mesh that grows from the ground up.
Truck model: source a side-view truck GLB from Sketchfab (simple, not photorealistic).

**Sub-act 5.2 — Zoom into the waste**
Camera zooms in toward the waste pile. The waste fills the screen.
The user sees it up close — organic material, food waste texture.

*Technical:* GSAP ScrollTrigger + Three.js camera FOV zoom + position lerp toward the pile.

**Sub-act 5.3 — Zoom out: the industrial container**
As the camera pulls back, the waste is revealed to be inside a large industrial processing unit —
a cylindrical container. The waste is one small part of a much larger machine.

*Technical:* Camera pulls back (`z` position increases). New geometry (cylinder/container) becomes visible.

**Sub-act 5.4 — Water is added. It starts to boil.**
Water fills the container. Then: heat. Small bubbles begin rising from the bottom.
Bubble density increases over 2–3 seconds of scroll.

*Technical:* Bubble particles: THREE.Points, small white spheres, rising along Y with randomized speed.
Water surface: PlaneGeometry with slight shader animation (ripple effect).

**Sub-act 5.5 — Bubbles fill the screen**
The bubbles become so dense they obscure the container. The screen is filled with bubbles.
The user cannot see what is behind them. Anticipation.

*Technical:* Particle count scales up dramatically. Camera moves slightly into the bubble field.

**Sub-act 5.6 — The dark mass appears**
The bubbles part. A dark, dense mass is visible — rough, carbon-rich, irregular.
This is the processed material: hydrochar/biochar.

*Technical:* A dark organic geometry (similar to Scene 1 biochar, but larger, rougher).
Fade in through the bubble field clearing.

**Sub-act 5.7 — Pieces separate. The product.**
Small fragments break off from the mass and fly toward the camera, then arc down
and land in a stacked formation — bags or containers of finished G2E product.
The stack grows as the fragments land.

*Technical:* GSAP physics-like animation on individual mesh instances.
Target: a simple stack of product units (boxes/bags geometry) that builds up piece by piece.

---

### Scene 6 — Demonstration Center (The Facility)

**What the user sees:**
The G2E facility in 3D — an architectural model of the actual building.
Clean, precise, slightly stylized. Not photorealistic. More like an architectural diagram.

**Camera behavior on scroll:**
The camera orbits 360° around the facility as the user scrolls.
Start: front-facing. End: back to front after one full orbit.
The user sees the full building from every angle during the orbit.

**Technical:**
Three.js OrbitControls disabled — camera position is driven entirely by scroll.
Camera animates along a circular path around the model center using trigonometry:
`camera.x = radius * Math.cos(scrollProgress * Math.PI * 2)`
`camera.z = radius * Math.sin(scrollProgress * Math.PI * 2)`

**Critical dependency:**
This scene CANNOT be built without architectural data from the client.
Either:
- Client provides a 3D file (GLB/OBJ/FBX) of the actual facility
- OR a simplified geometric interpretation is built as a stand-in
- OR Higgsfield generates a stylized architectural render as reference

`[PLACEHOLDER: G2E facility 3D model — required from client]`

---

### Scene 7 — Contact

**Transition in:**
The 3D facility scene fades out gracefully. A clean white section slides up.
GSAP timeline: `autoAlpha 0 → 1`, `y: 40 → 0`, duration 0.8s.

**Layout:** Minimal. Left side: contact information. Right side: form.
No 3D. No heavy animation. The user has just been through an intense visual journey.
This section breathes.

**Real contact data (from content.js `CONTACT`):**
- General: contacto@g2e.mx
- Info: info@g2e.mx
- Location: Mexico City, Mexico — Bordo Poniente
- Phone: `[PLACEHOLDER: confirm phone number]`

---

### Scene 8 — Footer

Standard footer. Clean. Dark background (`#2E372A` Forest Shadow).
Fog White text. Navigation links. Location. Legal.

---

### 3D Assets Required Before Building

| Asset | Scene | Source | Status |
|-------|-------|--------|--------|
| Hydrochar geometry | 1, 2, 3 | Built procedurally in Three.js | Ready to build |
| Soil texture | 3 | Higgsfield generate | Needs generation |
| Corn plant model or SVG | 4 | Sketchfab GLB or built in code | **Decision needed (A/B/C — see below)** |
| Company timeline milestones | 4 | In content.js `OUR_STORY.milestones` | ✅ RESOLVED — 13 milestones confirmed |
| Press coverage | Presence | In content.js `PRESS` — 4 confirmed outlets | ✅ RESOLVED |
| Partners       | Who We Are | In content.js `PARTNERS` — 5 confirmed | ✅ RESOLVED |
| Industrial container geometry | 5.3 | Built in Three.js | Ready to build |
| Product stack geometry | 5.7 | Built in Three.js | Ready to build |
| G2E facility 3D model | 6 | Client must provide | `[PLACEHOLDER — BLOCKER]` |

---

### Build Order for 3D Scenes

Build in this exact order — one scene confirmed before next begins.

```
Scene 1 (Hero)  →  Scene 2 (Zoom)  →  Scene 3 (Soil)  →  Scene 4 (Plant)
→  Scene 5.1 (Truck)  →  Scene 5.2–5.5 (Process)  →  Scene 5.6–5.7 (Product)
→  Scene 6 (Facility — only after client provides 3D model)
→  Scene 7 (Contact)  →  Scene 8 (Footer)
```

---

*Project: G2E Website*
*Studio: Luca Mendieta Studio*
*Build environment: Antigravity*
*Visual generation: Higgsfield (abstract/3D visuals only)*
*Version: 1.3 — Real content loaded, all non-blocked placeholders resolved*
*Last updated: June 2026*
