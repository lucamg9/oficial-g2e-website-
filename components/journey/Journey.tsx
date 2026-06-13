'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { journey, SCENES } from './journeyState'
import JourneyOverlay from './JourneyOverlay'

/* Canvas is client-only WebGL — never SSR it. */
const JourneyCanvas = dynamic(() => import('./JourneyCanvas'), { ssr: false })

/* ──────────────────────────────────────────────────────────────
   Journey — the scroll spine. A tall container (SCENES viewport-
   heights, defined in journeyState) sets the length of the
   experience; one pinned layer holds the persistent canvas and the
   text overlay. Scroll position → journey.target (0→1); the scene
   smooths it into journey.progress each frame.
   ────────────────────────────────────────────────────────────── */

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? -rect.top / scrollable : 0
      journey.target = Math.max(0, Math.min(1, p))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${SCENES * 100}vh`,
        background: 'var(--stone-ivory)',
      }}
    >
      {/* Pinned stage — canvas + overlay share one sticky viewport. */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <JourneyCanvas />
        <JourneyOverlay />
      </div>
    </div>
  )
}
