'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────
   HeroSection — clean static hero (replaces the scroll-scrubbed
   intro). Stone Ivory canvas, Space Grotesk headline, framed real
   photo. One calm entrance; no scroll scrubbing here.
   Copy is the client-confirmed landing headline.
   ────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '3 t/hr',    label: 'Live throughput'     },
  { value: '220°C',     label: 'Process temperature' },
  { value: "World's #1",label: 'Largest HTC plant'   },
  { value: 'Est. 2013', label: 'Bordo Poniente, CDMX'},
]

const TRUST = ['UNAM partner', 'Mexico City Government', 'Phase II · 2027']

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  /* Reveal the nav immediately — there is no longer an intro gate. */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('g2e:hero-reveal'))
  }, [])

  return (
    <section
      id="intro"
      aria-label="G2E — circular economy from organic waste"
      style={{
        position:      'relative',
        minHeight:     '100vh',
        display:       'flex',
        alignItems:    'center',
        background:    'var(--stone-ivory)',
        paddingTop:    'calc(var(--nav-h) + 48px)',
        paddingBottom: 'clamp(64px, 10vh, 120px)',
        overflow:      'hidden',
      }}
    >
      <div className="g2e-container g2e-hero-grid">
        {/* ── Left: copy ─────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--moss)', display: 'block' }} />
            <span className="g2e-eyebrow">G2E · Green to Energy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    700,
              fontSize:      'clamp(2.5rem, 5vw, 4.25rem)',
              lineHeight:    1.05,
              letterSpacing: '-0.02em',
              color:         'var(--forest)',
              maxWidth:      '14ch',
              margin:        0,
            }}
          >
            Circular economy powered by one of the world&rsquo;s largest waste streams.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            style={{
              fontFamily:   'var(--font-sans)',
              fontWeight:   400,
              fontSize:     'clamp(1rem, 1.3vw, 1.125rem)',
              lineHeight:   1.7,
              color:        'var(--fg-secondary)',
              maxWidth:     '46ch',
              margin:       '28px 0 0',
            }}
          >
            We collect organic waste from Mexico City and transform it into hydrochar —
            a mineral-grade carbon material that replaces mineral coal and regenerates soil.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                background: 'var(--forest)', color: 'var(--fog-white)',
                padding: '14px 26px', borderRadius: 'var(--radius-sm)',
                textDecoration: 'none', transition: 'background 200ms var(--ease-expo)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--deep-moss)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--forest)')}
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href="#how-it-works"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                color: 'var(--forest)', padding: '14px 22px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--limestone)',
                textDecoration: 'none', transition: 'border-color 200ms, background 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--moss)'; e.currentTarget.style.background = 'var(--fog-white)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--limestone)'; e.currentTarget.style.background = 'transparent' }}
            >
              Discover the process
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.28 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}
          >
            {TRUST.map((item, i) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {i > 0 && <span aria-hidden style={{ color: 'var(--ink-500)', opacity: 0.5 }}>·</span>}
                <span className="g2e-eyebrow">{item}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: framed real photo + stats ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position:     'relative',
              aspectRatio:  '4 / 5',
              borderRadius: 'var(--radius-2xl)',
              overflow:     'hidden',
              border:       '1px solid var(--limestone)',
              boxShadow:    'var(--shadow-panel)',
            }}
          >
            <picture>
              <source srcSet="/assets/hero-image.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero-image.jpg"
                alt="G2E hydrothermal carbonization plant at Bordo Poniente, Mexico City"
                loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
              />
            </picture>
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(46,55,42,0.55) 0%, rgba(46,55,42,0) 55%)' }} />

            {/* Stat strip over the image */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(250,250,247,0.12)' }}>
              {STATS.map(stat => (
                <div key={stat.label} style={{ padding: '16px 18px', background: 'rgba(46,55,42,0.30)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--fog-white)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.72)', marginTop: '6px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
