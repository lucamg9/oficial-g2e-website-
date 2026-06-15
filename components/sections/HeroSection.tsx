'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CursorReveal from '@/components/ui/CursorReveal'

/* ──────────────────────────────────────────────────────────────
   HeroSection — the "carbon" split layout.
   Left:  minimal, dominant copy (real G2E landing message).
   Right: the real biochar — rendered live as a 3D model on a very
          slow rotation (HydrocharCanvas / biochar.glb), floating on
          a soft card surface. A spec chip overlaps the card for
          layered depth (real data: 220°C, zero CO₂ emissions).
   Easter egg: a cornfield image peeks through a small gooey bubble
          that follows the cursor (CursorReveal) — the soil/crop
          payoff of what the carbon ultimately feeds.
   Palette + fonts: the site's 7-color system, Space Grotesk +
   Inter. Nothing outside the system.
   ────────────────────────────────────────────────────────────── */

// Lazy, client-only — keeps the ~11MB GLB + R3F bundle out of first
// paint. The PNG below renders instantly as the fallback.
const HydrocharCanvas = dynamic(() => import('@/components/3d/HydrocharCanvas'), {
  ssr: false,
  loading: () => (
    <Image
      src="/assets/generated/biochar-clean.png"
      alt="A piece of biocharcoal — the carbon-rich material G2E produces from organic waste."
      width={440}
      height={440}
      priority
      sizes="(max-width: 900px) 70vw, 360px"
      style={{
        width: '100%', height: '100%', objectFit: 'contain',
        filter: 'drop-shadow(0 26px 26px rgba(46,55,42,0.30))',
      }}
    />
  ),
})

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
      {/* Cornfield peeking through a gooey bubble around the cursor.
          Sits behind all content so it reveals in the negative space
          and softly behind the text/card. */}
      <CursorReveal src="/assets/generated/cornfield.webp" radius={150} trail={5} />

      <div
        className="g2e-container g2e-hero-grid"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* ── Left: minimal, dominant copy ───────────────────── */}
        <div>
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
                textDecoration: 'none', transition: 'background 200ms var(--ease-expo), box-shadow 200ms var(--ease-expo), transform 200ms var(--ease-expo)',
                boxShadow: '0 10px 24px -10px rgba(46,55,42,0.45)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--deep-moss)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 30px -12px rgba(46,55,42,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--forest)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 24px -10px rgba(46,55,42,0.45)' }}
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

          {/* Credibility line — real, factual (from the project brief). */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
              marginTop: '44px', paddingTop: '24px', borderTop: '1px solid var(--line)',
            }}
          >
            <span className="g2e-eyebrow">World&rsquo;s largest hydrothermal carbonization plant</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--limestone)' }} />
            <span className="g2e-eyebrow" style={{ color: 'var(--fg-muted)' }}>Mexico City</span>
          </motion.div>
        </div>

        {/* ── Right: the hydrochar — live 3D + spec section ────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.2 }}
          style={{
            position:      'relative',
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '0px',
          }}
        >
          {/* The hydrochar floats directly on the page — no frame. Its
              live 3D contact shadow grounds it, as if resting on an unseen
              pale floor. */}
          <div
            style={{
              position:    'relative',
              zIndex:      1,
              width:       '100%',
              maxWidth:    '540px',
              aspectRatio: '1 / 1',
            }}
          >
            {/* Live, slowly-rotating 3D biochar (lazy). The PNG fallback
                renders instantly via the dynamic() loading state above. */}
            <HydrocharCanvas />
          </div>

          {/* Spec section — pulled up to overlap the canvas so the carbon's
              contact shadow runs softly behind it, never abruptly cut. */}
          <div
            style={{
              position:     'relative',
              zIndex:       2,
              marginTop:    '-44px',
              width:        '100%',
              maxWidth:     '500px',
              display:      'flex',
              alignItems:   'stretch',
              gap:          '14px',
              padding:      '18px 22px',
              borderRadius: 'var(--radius-lg)',
              background:   'var(--fog-white)',
              border:       '1px solid var(--limestone)',
              boxShadow:    'var(--shadow-card)',
            }}
          >
            {/* Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingRight: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '19px',
                letterSpacing: '-0.01em', color: 'var(--forest)', lineHeight: 1.05,
              }}>
                Hydrochar
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px',
                letterSpacing: '0.04em', color: 'var(--moss)', whiteSpace: 'nowrap',
              }}>
                Mineral-grade carbon
              </span>
            </div>

            {/* Data points */}
            {[
              { value: '220°C', label: 'Process temp' },
              { value: 'Zero',  label: 'CO₂ emissions' },
              { value: 'Coal',  label: 'Replaces' },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column', gap: '3px',
                  paddingLeft: '14px',
                  borderLeft: '1px solid var(--line)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px',
                  letterSpacing: '-0.01em', color: 'var(--forest)', lineHeight: 1.05,
                }}>
                  {d.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '10px',
                  letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)',
                  lineHeight: 1.2,
                }}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subtle scroll cue — editorial, bottom-left. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '28px', left: 'var(--container-pad)', zIndex: 1,
          display: 'flex', alignItems: 'center', gap: '12px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px',
          letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)',
        }}>
          Scroll to explore
        </span>
        <span style={{ width: '46px', height: '1px', background: 'var(--limestone)', display: 'block' }} />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
      </motion.div>
    </section>
  )
}
