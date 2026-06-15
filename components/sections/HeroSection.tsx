'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────
   HeroSection — the "carbon" split layout.
   Left:  minimal, dominant copy (real G2E landing message).
   Right: the hydrochar itself, presented as a single framed
          editorial photograph floating on the Stone Ivory canvas
          with a deep, soft shadow so it reads as a real object
          held above the page. A small spec chip overlaps the
          frame for layered depth (inspiration only — real data:
          220°C, zero CO₂ emissions, from the process brief).
   Palette + fonts: the site's 7-color system, Space Grotesk +
   Inter. Nothing outside the system.
   ────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  useEffect(() => {
    // No intro gate — reveal the nav as soon as the hero mounts.
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
        {/* ── Left: minimal, dominant copy ───────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--moss)', display: 'block' }} />
            <span className="g2e-eyebrow">G2E · Green to Energy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    700,
              fontSize:      'clamp(3.2rem, 6.5vw, 5.5rem)',
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
              color:         'var(--forest)',
              maxWidth:      '12ch',
              margin:        0,
            }}
          >
            Waste becomes{' '}
            <span style={{ color: 'var(--moss)' }}>carbon.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.14 }}
            className="g2e-lede"
            style={{
              color:      'var(--fg-secondary)',
              maxWidth:   '46ch',
              marginTop:  '28px',
            }}
          >
            We collect organic waste from Mexico City and transform it into
            hydrochar — a mineral-grade carbon material that replaces mineral coal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '40px' }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                background: 'var(--forest)', color: 'var(--fog-white)',
                padding: '15px 28px', borderRadius: 'var(--radius-sm)',
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
                color: 'var(--forest)', padding: '15px 22px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--limestone)',
                textDecoration: 'none', transition: 'border-color 200ms, background 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--moss)'; e.currentTarget.style.background = 'var(--fog-white)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--limestone)'; e.currentTarget.style.background = 'transparent' }}
            >
              Discover the process
            </a>
          </motion.div>
        </div>

        {/* ── Right: the hydrochar — framed photo, floating high ─ */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Soft surface card. The deep, layered shadow lifts it off the
              canvas so there is visible space behind it. The real
              biocharcoal sits inside as a clean cut-out, grounded by its
              own contact shadow. */}
          <div
            style={{
              position:     'relative',
              width:        '100%',
              maxWidth:     '440px',
              aspectRatio:  '4 / 5',
              borderRadius: '24px',
              overflow:     'hidden',
              background:   'radial-gradient(120% 90% at 50% 28%, var(--fog-white) 0%, var(--cream-100) 55%, var(--oat-150) 100%)',
              border:       '1px solid var(--limestone)',
              boxShadow:    '0 2px 6px rgba(46,55,42,0.06), 0 18px 36px -12px rgba(46,55,42,0.20), 0 48px 90px -28px rgba(46,55,42,0.42)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset:    0,
                display:  'flex',
                alignItems:     'center',
                justifyContent: 'center',
                paddingTop:    'clamp(28px, 6%, 48px)',
                paddingInline: 'clamp(20px, 5%, 36px)',
                paddingBottom: 'clamp(72px, 18%, 104px)',
              }}
            >
              <Image
                src="/assets/generated/biochar-clean.png"
                alt="A piece of biocharcoal — the carbon-rich material G2E produces from Mexico City's organic waste."
                width={440}
                height={440}
                priority
                sizes="(max-width: 900px) 70vw, 360px"
                style={{
                  width:     '100%',
                  height:    '100%',
                  objectFit: 'contain',
                  // Grounded contact shadow so the cut-out reads as a real
                  // object resting on the surface, not a pasted sticker.
                  filter: 'drop-shadow(0 26px 26px rgba(46,55,42,0.30))',
                }}
              />
            </div>
          </div>

          {/* Floating spec chip — layered depth, real process data. */}
          <div
            style={{
              position:      'absolute',
              left:          'clamp(-8px, 2vw, 24px)',
              bottom:        '28px',
              display:       'flex',
              flexDirection: 'column',
              gap:           '2px',
              padding:       '14px 18px',
              borderRadius:  'var(--radius-lg)',
              background:    'var(--glass-panel-bg)',
              backdropFilter:'var(--glass-panel-blur)',
              WebkitBackdropFilter: 'var(--glass-panel-blur)',
              border:        '1px solid rgba(255,255,255,0.5)',
              boxShadow:     '0 16px 40px -12px rgba(46,55,42,0.28)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px',
              letterSpacing: '-0.01em', color: 'var(--forest)', lineHeight: 1.1,
            }}>
              Hydrochar
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px',
              letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--moss)',
            }}>
              220°C · Zero CO₂ emissions
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
