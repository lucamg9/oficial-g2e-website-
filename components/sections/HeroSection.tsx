'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────
   HeroSection — clean static hero. Minimal copy, one dominant
   headline. The right side is the biochar itself: a seamless
   Higgsfield turntable loop, slowed right down and edge-blended
   into the Stone Ivory canvas so it reads as one continuous,
   real, very-slow rotation.
   ────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const
const SPIN_SPEED = 0.4 // playbackRate — lower = slower, more "alive"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Reveal the nav immediately — there is no longer an intro gate.
    window.dispatchEvent(new CustomEvent('g2e:hero-reveal'))
    // Slow the spin to a calm, near-imperceptible rotation.
    if (videoRef.current) videoRef.current.playbackRate = SPIN_SPEED
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
              fontSize:      'clamp(2.9rem, 6vw, 5.25rem)',
              lineHeight:    1.02,
              letterSpacing: '-0.025em',
              color:         'var(--forest)',
              maxWidth:      '13ch',
              margin:        0,
            }}
          >
            Circular economy, powered by waste.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '44px' }}
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

        {/* ── Right: the biochar — seamless very-slow spin ───── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.2 }}
          style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%' }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src="/motion/biochar-spin.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{
              width:  '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              // Feather the edges into the Stone Ivory canvas so there is
              // no visible frame — the chunk appears to float on the page.
              WebkitMaskImage: 'radial-gradient(circle at 50% 48%, #000 52%, transparent 78%)',
              maskImage:       'radial-gradient(circle at 50% 48%, #000 52%, transparent 78%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
