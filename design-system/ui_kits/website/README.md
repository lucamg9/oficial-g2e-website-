# G2E Marketing Website — UI Kit

High-fidelity, click-through recreation of the G2E marketing site, built on the design system tokens in `colors_and_type.css`.

## Structure

```
ui_kits/website/
├── README.md             ← you are here
├── index.html            ← runnable demo (open this)
├── site.css              ← layout-level styles
├── components/
│   ├── Primitives.jsx    ← Button, Pill, Tag, IconChip, Eyebrow, SectionMarker
│   ├── PhotoFrame.jsx    ← placeholder photo container with caption
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── Process.jsx
│   ├── Plants.jsx
│   ├── Stats.jsx
│   ├── Partners.jsx
│   ├── PressPullQuote.jsx
│   ├── CTAPanel.jsx
│   └── Footer.jsx
└── app.jsx               ← composes everything into a single scrollable page
```

## What's interactive

- Sticky nav blur on scroll
- Plant cards open a fullscreen detail overlay (Esc / × to close)
- Partner logo wall hover dims siblings
- "Get in touch" pill appears bottom-right once the hero scrolls out of view

## What's a placeholder

- All photography. Photo slots are marked `[ PLACEHOLDER PHOTO ]` with a description of what the shot should be. **Real plant photography is needed.**
- Partner logos are wordmarks set in Instrument Serif; replace with vector files when available.

## How to use

Open `index.html` directly. It's a single-page React app, all JSX components inlined via Babel for transparent direct-editability.
