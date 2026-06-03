'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCROLL_DIST = 2700

// 9 beats across 6 video clips
// clip index 0-5 maps to /motion/hiw/1.mp4 – /motion/hiw/6.mp4
const BEATS = [
  { t: 0 / 9, clip: 0, phase: '01', label: 'Collection',            caption: 'G2E trucks collect organic municipal waste from Bordo Poniente.' },
  { t: 1 / 9, clip: 0, phase: '02', label: 'Intake',                caption: 'The waste is deposited into the plant\'s intake system.' },
  { t: 2 / 9, clip: 1, phase: '03', label: 'Concentration',         caption: 'Organic mass is accumulated and prepared for processing.' },
  { t: 3 / 9, clip: 1, phase: '04', label: 'Slurry',                caption: 'Waste is converted into a homogeneous liquid slurry inside a sealed reactor vessel.' },
  { t: 4 / 9, clip: 2, phase: '05', label: 'Pressurization',        caption: 'The reactor reaches operating pressure. Temperature climbs. The process begins.' },
  { t: 5 / 9, clip: 2, phase: '06', label: 'Hydrothermal reaction', caption: 'Under pressure and heat, organic molecules break down. Bubbles rise. Carbon bonds form.' },
  { t: 6 / 9, clip: 3, phase: '07', label: 'Carbonization',         caption: 'The reaction completes. Bubbling stops. Water recedes. Hydrochar remains.' },
  { t: 7 / 9, clip: 4, phase: '08', label: 'First product',         caption: 'The first sealed G2E bag of hydrochar — mineral-grade, stable, measurable.' },
  { t: 8 / 9, clip: 5, phase: '09', label: 'Scale',                 caption: 'Every batch repeats. Every module replicates. From one plant to city infrastructure.' },
]

const CLIPS = [
  '/motion/hiw/1.mp4',
  '/motion/hiw/2.mp4',
  '/motion/hiw/3.mp4',
  '/motion/hiw/4.mp4',
  '/motion/hiw/5.mp4',
  '/motion/hiw/6.mp4',
]

export default function HowItWorksSection() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const videoRefs    = useRef<(HTMLVideoElement | null)[]>([])
  const progressRef  = useRef<HTMLDivElement>(null)
  const phaseRef     = useRef<HTMLSpanElement>(null)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const captionRef   = useRef<HTMLParagraphElement>(null)
  const dotsRef      = useRef<(HTMLDivElement | null)[]>([])

  const activeBeatIdx = useRef(-1)
  const activeClipIdx = useRef(0)
  const fadeTimer     = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ─── Video crossfade ───────────────────────────────────────────────── */
  const switchClip = useCallback((nextClip: number) => {
    if (nextClip === activeClipIdx.current) return
    const prevIdx = activeClipIdx.current
    activeClipIdx.current = nextClip

    const prev = videoRefs.current[prevIdx]
    const next = videoRefs.current[nextClip]
    if (!next) return

    // Bring next on top and fade in
    next.style.zIndex     = '2'
    next.style.transition = 'opacity 500ms ease'
    next.style.opacity    = '1'
    try { next.play() } catch { /* ignore */ }

    // Fade out the previous after crossfade starts
    setTimeout(() => {
      if (prev) {
        prev.style.transition = 'opacity 500ms ease'
        prev.style.opacity    = '0'
        prev.style.zIndex     = '1'
        try { prev.pause() } catch { /* ignore */ }
      }
    }, 200)
  }, [])

  /* ─── Caption / label / phase crossfade ─────────────────────────────── */
  const crossfadeTo = useCallback((beat: typeof BEATS[0], beatIdx: number) => {
    if (beatIdx === activeBeatIdx.current) return
    activeBeatIdx.current = beatIdx

    const caption = captionRef.current
    const label   = labelRef.current
    const phase   = phaseRef.current
    if (!caption || !label || !phase) return

    if (fadeTimer.current) clearTimeout(fadeTimer.current)

    caption.style.transition = 'opacity 80ms ease, transform 80ms ease'
    caption.style.opacity    = '0'
    caption.style.transform  = 'translateY(6px)'
    label.style.transition   = 'opacity 80ms ease'
    label.style.opacity      = '0'
    phase.style.transition   = 'opacity 80ms ease'
    phase.style.opacity      = '0'

    fadeTimer.current = setTimeout(() => {
      caption.textContent = beat.caption
      label.textContent   = beat.label
      phase.textContent   = beat.phase

      caption.style.transition = 'opacity 160ms ease, transform 160ms ease'
      caption.style.opacity    = '1'
      caption.style.transform  = 'translateY(0px)'
      label.style.transition   = 'opacity 160ms ease'
      label.style.opacity      = '1'
      phase.style.transition   = 'opacity 160ms ease'
      phase.style.opacity      = '1'
    }, 90)
  }, [])

  /* ─── ScrollTrigger ─────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Boot first clip
    const firstVideo = videoRefs.current[0]
    if (firstVideo) {
      firstVideo.style.opacity = '1'
      firstVideo.style.zIndex  = '2'
      try { firstVideo.play() } catch { /* ignore */ }
    }

    const st = ScrollTrigger.create({
      trigger: section,
      pin:     stickyRef.current,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      scrub:   true,
      onUpdate(self) {
        const p = self.progress

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`
        }

        let beatIdx = 0
        for (let i = 0; i < BEATS.length; i++) {
          if (p >= BEATS[i].t) beatIdx = i
        }
        const beat = BEATS[beatIdx]

        switchClip(beat.clip)
        crossfadeTo(beat, beatIdx)

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return
          const active    = i <= beatIdx
          const isCurrent = i === beatIdx
          dot.style.background = active
            ? 'var(--forest-mid, #4a8c5c)'
            : 'rgba(245,243,238,0.15)'
          dot.style.transform  = isCurrent ? 'scale(1.6)' : active ? 'scale(1.1)' : 'scale(1)'
          dot.style.opacity    = active ? '1' : '0.5'
        })
      },
    })

    const videos = videoRefs.current.slice()
    return () => {
      st.kill()
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
      videos.forEach(v => { try { v?.pause() } catch { /* ignore */ } })
    }
  }, [switchClip, crossfadeTo])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How it works"
      style={{ height: `calc(100vh + ${SCROLL_DIST}px)`, position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position:   'sticky',
          top:        0,
          height:     '100vh',
          overflow:   'hidden',
          background: '#0A0C0A',
        }}
      >
        {/* Video layers — stacked, crossfaded via opacity */}
        {CLIPS.map((src, i) => (
          <video
            key={src}
            ref={el => { videoRefs.current[i] = el }}
            src={src}
            muted
            playsInline
            loop
            preload={i === 0 ? 'auto' : 'metadata'}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    0,
              zIndex:     1,
            }}
          />
        ))}

        {/* Cinematic vignettes */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.32) 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(10,12,10,0.20) 0%, rgba(10,12,10,0.55) 100%)',
        }} />

        {/* ── Top left label ──────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', zIndex: 20,
          top: 'clamp(24px, 4vw, 48px)', left: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)', textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.45)',
          }}>How it works</span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(245,243,238,0.20)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)', textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.22)',
          }}>Hydrothermal carbonization</span>
        </div>

        {/* ── Phase counter — top right ────────────────────────────────── */}
        <div style={{
          position: 'absolute', zIndex: 20,
          top: 'clamp(24px, 4vw, 48px)', right: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'baseline', gap: '6px',
        }}>
          <span
            ref={phaseRef}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1,
              letterSpacing: '-0.05em', color: 'rgba(245,243,238,0.12)',
              display: 'block',
            }}
          >01</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'rgba(245,243,238,0.18)', letterSpacing: '0.1em',
          }}>/ 09</span>
        </div>

        {/* ── Bottom caption area ──────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 80px)',
          background: 'linear-gradient(to top, rgba(10,12,10,0.90) 0%, rgba(10,12,10,0.60) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
            {BEATS.map((beat, i) => (
              <div
                key={beat.phase}
                ref={el => { dotsRef.current[i] = el }}
                style={{
                  width:  i === 0 ? '8px' : '6px',
                  height: i === 0 ? '8px' : '6px',
                  borderRadius: '999px',
                  background: i === 0 ? 'var(--forest-mid, #4a8c5c)' : 'rgba(245,243,238,0.15)',
                  transition: 'background 300ms ease, transform 300ms ease, opacity 300ms ease',
                  transformOrigin: 'center',
                  opacity: i === 0 ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)', textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.45)', marginBottom: '10px',
          }}>
            <span ref={labelRef}>Collection</span>
          </p>

          <p
            ref={captionRef}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300,
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.55,
              color: 'rgba(245,243,238,0.78)', maxWidth: '580px', margin: 0,
            }}
          >
            G2E trucks collect organic municipal waste from Bordo Poniente.
          </p>
        </div>

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 21,
          height: '2px', background: 'rgba(245,243,238,0.07)',
        }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              background: 'linear-gradient(to right, var(--forest-mid, #4a8c5c), #7ecf9a)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

      </div>
    </section>
  )
}
