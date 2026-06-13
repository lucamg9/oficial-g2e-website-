'use client'

import { useEffect, useRef } from 'react'
import { journey, BEATS, beat } from './journeyState'

/* ──────────────────────────────────────────────────────────────
   HTML text beats layered over the 3D canvas. Driven by a rAF that
   reads journey.progress and sets element styles directly — no React
   state, no re-renders. Text fades + drifts in/out smoothly as the
   biochar moves, so copy and motion feel like one continuous story.
   ────────────────────────────────────────────────────────────── */

/** Fade a beat in over its first `edge` and out over its last `edge`. */
function windowOpacity(k: number, edge = 0.18): number {
  if (k <= 0 || k >= 1) return 0
  const inP  = Math.min(1, k / edge)
  const outP = Math.min(1, (1 - k) / edge)
  return Math.min(inP, outP)
}

export default function JourneyOverlay() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)

  useEffect(() => {
    const apply = () => {
      const p = journey.progress

      // Beat 1 — hero: brand + scroll hint, fades out as we move in.
      const hero = heroRef.current
      if (hero) {
        const k = beat(p, BEATS.hero[0], BEATS.hero[1])
        const o = 1 - Math.min(1, k / 0.7) // visible at top, gone by ~70% of hero beat
        hero.style.opacity = String(Math.max(0, o))
        hero.style.transform = `translateY(${(1 - Math.max(0, o)) * -12}px)`
      }

      // Beat 2 — identity: "Hydrochar" reveal as the chunk centers.
      const id = identityRef.current
      if (id) {
        const k = beat(p, BEATS.identity[0], BEATS.identity[1])
        const o = windowOpacity(k, 0.22)
        id.style.opacity = String(o)
        id.style.transform = `translateY(${(1 - o) * 18}px)`
      }

      rafRef.current = requestAnimationFrame(apply)
    }
    rafRef.current = requestAnimationFrame(apply)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
      {/* ── Beat 1 — hero ─────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(32px, 6vw, 96px)',
          paddingBottom: 'clamp(56px, 10vh, 120px)',
          willChange: 'opacity, transform',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--moss)' }} />
          <span className="g2e-eyebrow">G2E · Green to Energy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fg-secondary)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>
            Scroll to begin
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14" /><path d="m5 12 7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* ── Beat 2 — identity reveal ──────────────────────────── */}
      <div
        ref={identityRef}
        style={{
          position: 'absolute', inset: 0, opacity: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center',
          padding: 'clamp(24px, 5vw, 80px)',
          willChange: 'opacity, transform',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.0,
          letterSpacing: '-0.02em', color: 'var(--forest)', margin: 0,
        }}>
          Hydrochar
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 400,
          fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', lineHeight: 1.6,
          color: 'var(--fg-secondary)', maxWidth: '34ch', marginTop: '20px',
        }}>
          A mineral-grade carbon material — born from organic waste.
        </p>
      </div>
    </div>
  )
}
