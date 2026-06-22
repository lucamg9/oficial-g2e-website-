'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import CursorReveal from '@/components/ui/CursorReveal'
import { useT } from '@/lib/i18n'

/* ──────────────────────────────────────────────────────────────
   HeroSection — the "carbon" split layout.
   Left:  minimal, dominant copy (real G2E landing message).
   Right: the real biochar — a live 3D model on a very slow rotation.
          It is rendered by HydrocharJourney on a fixed layer so it
          can travel into the next section on scroll; the hero only
          reserves an invisible anchor (#hydrochar-anchor) for it.
   Easter egg: the G2E "carved in soil" image peeks through a small
          gooey bubble that follows the cursor (CursorReveal).
   Palette + fonts: the site's 7-color system, Space Grotesk +
   Inter. Nothing outside the system.
   ────────────────────────────────────────────────────────────── */

// The travelling biochar lives on its own fixed layer (lazy, client
// only) so it can move across the hero→Who-We-Are boundary.
const HydrocharJourney = dynamic(() => import('@/components/3d/HydrocharJourney'), {
  ssr: false,
})

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  const t = useT()

  useEffect(() => {
    // No intro gate — reveal the nav as soon as the hero mounts.
    window.dispatchEvent(new CustomEvent('g2e:hero-reveal'))
  }, [])

  return (
    <section
      id="intro"
      aria-label="G2E · circular economy from organic waste"
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
      {/* The G2E "carved in soil" image peeking through a gooey bubble that
          follows the cursor. Sits behind all content so it reveals in the
          negative space and softly behind the text/card. */}
      <CursorReveal src="/assets/generated/soil-reveal.webp" radius={120} trail={5} />

      {/* The biochar lives here, on a fixed layer, so it can travel into
          the next section on scroll. Direct child of the section (no
          transformed ancestor) so position:fixed maps to the viewport. */}
      <HydrocharJourney />

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
              fontSize:      'clamp(2.5rem, 8vw, 5.5rem)',
              lineHeight:    1.02,
              letterSpacing: '-0.03em',
              color:         'var(--forest)',
              maxWidth:      '12ch',
              margin:        0,
            }}
          >
            {t('Waste becomes')}{' '}
            <span style={{ color: 'var(--moss)' }}>{t('carbon.')}</span>
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
            {t('We collect organic waste from Mexico City and transform it into hydrochar, a mineral grade carbon material that replaces mineral coal.')}
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
              {t('Get in touch')}
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
              {t('Discover the process')}
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
            <span className="g2e-eyebrow">{t("World's largest hydrothermal carbonization plant")}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--limestone)' }} />
            <span className="g2e-eyebrow" style={{ color: 'var(--fg-muted)' }}>{t('Mexico City')}</span>
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
          {/* Invisible anchor — reserves the biochar's resting footprint.
              HydrocharJourney renders the live, slowly-rotating 3D model on
              a fixed layer aligned to this box, then scrubs it into the
              next section on scroll. */}
          <div
            id="hydrochar-anchor"
            aria-hidden="true"
            style={{
              position:    'relative',
              zIndex:      1,
              width:       '100%',
              maxWidth:    '540px',
              aspectRatio: '1 / 1',
            }}
          />

          {/* Spec section — pulled up to overlap the biochar so its contact
              shadow runs softly behind it, never abruptly cut. Sits above
              the fixed biochar layer (z-index) to preserve that overlap. */}
          <div
            style={{
              position:     'relative',
              zIndex:       3,
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
                {t('Hydrochar')}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '11px',
                letterSpacing: '0.04em', color: 'var(--moss)', whiteSpace: 'nowrap',
              }}>
                {t('Mineral grade carbon')}
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
                  {t(d.value)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '10px',
                  letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)',
                  lineHeight: 1.2,
                }}>
                  {t(d.label)}
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
          {t('Scroll to explore')}
        </span>
        <span style={{ width: '46px', height: '1px', background: 'var(--limestone)', display: 'block' }} />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
      </motion.div>
    </section>
  )
}
