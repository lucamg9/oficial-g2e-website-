'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DURATION    = 18       // seconds — update when real video drops in
const SCROLL_DIST = 2400
const LERP        = 0.14

const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t

const BEATS = [
  { t: 0 / 9, phase: '01', label: 'Collection',          caption: 'G2E trucks collect organic municipal waste from Bordo Poniente.'                                      },
  { t: 1 / 9, phase: '02', label: 'Intake',               caption: 'The waste is deposited into the plant\'s intake system.'                                             },
  { t: 2 / 9, phase: '03', label: 'Concentration',        caption: 'Organic mass is accumulated and prepared for processing.'                                            },
  { t: 3 / 9, phase: '04', label: 'Slurry',               caption: 'Waste is converted into a homogeneous liquid slurry inside a sealed reactor vessel.'                 },
  { t: 4 / 9, phase: '05', label: 'Pressurization',       caption: 'The reactor reaches operating pressure. Temperature climbs. The process begins.'                     },
  { t: 5 / 9, phase: '06', label: 'Hydrothermal reaction',caption: 'Under pressure and heat, organic molecules break down. Bubbles rise. Carbon bonds form.'             },
  { t: 6 / 9, phase: '07', label: 'Carbonization',        caption: 'The reaction completes. Bubbling stops. Water recedes. Hydrochar remains.'                           },
  { t: 7 / 9, phase: '08', label: 'First product',        caption: 'The first sealed G2E bag of hydrochar — mineral-grade, stable, measurable.'                          },
  { t: 8 / 9, phase: '09', label: 'Scale',                caption: 'Every batch repeats. Every module replicates. From one plant to city infrastructure.'                },
]

export default function HowItWorksSection() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const stickyRef     = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const phaseRef      = useRef<HTMLSpanElement>(null)
  const labelRef      = useRef<HTMLSpanElement>(null)
  const captionRef    = useRef<HTMLParagraphElement>(null)
  const dotsRef       = useRef<(HTMLDivElement | null)[]>([])

  // RAF lerp
  const targetTime    = useRef(0)
  const lerpedTime    = useRef(0)
  const rafRef        = useRef<number>(0)

  // Caption crossfade state
  const activeBeatIdx = useRef(0)
  const fadeTimer     = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ─── RAF lerp loop ─────────────────────────────────────────────────── */
  const startRaf = useCallback(() => {
    const tick = () => {
      const video = videoRef.current
      if (video) {
        const next = lerpFn(lerpedTime.current, targetTime.current, LERP)
        if (Math.abs(next - lerpedTime.current) > 0.0005) {
          lerpedTime.current = next
          video.currentTime  = next
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  /* ─── Caption crossfade ─────────────────────────────────────────────── */
  const crossfadeTo = useCallback((beat: typeof BEATS[0], beatIdx: number) => {
    if (beatIdx === activeBeatIdx.current) return
    activeBeatIdx.current = beatIdx

    const caption = captionRef.current
    const label   = labelRef.current
    const phase   = phaseRef.current
    if (!caption || !label || !phase) return

    // Clear any pending fade
    if (fadeTimer.current) clearTimeout(fadeTimer.current)

    // Fade out
    caption.style.transition = 'opacity 80ms ease, transform 80ms ease'
    caption.style.opacity    = '0'
    caption.style.transform  = 'translateY(6px)'
    label.style.transition   = 'opacity 80ms ease'
    label.style.opacity      = '0'
    phase.style.transition   = 'opacity 80ms ease'
    phase.style.opacity      = '0'

    fadeTimer.current = setTimeout(() => {
      // Swap text
      caption.textContent = beat.caption
      label.textContent   = beat.label
      phase.textContent   = beat.phase

      // Fade in
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
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    try {
      video.pause()
      video.playbackRate = 0
      video.currentTime  = 0
    } catch {
      // Some browsers reject playbackRate=0 — safe to ignore
    }

    startRaf()

    const st = ScrollTrigger.create({
      trigger: section,
      pin:     stickyRef.current,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      scrub:   true,
      onUpdate(self) {
        const p = self.progress

        // RAF lerp target
        targetTime.current = p * DURATION

        // Progress bar
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`
        }

        // Active beat
        let beatIdx = 0
        for (let i = 0; i < BEATS.length; i++) {
          if (p >= BEATS[i].t) beatIdx = i
        }
        const beat = BEATS[beatIdx]

        // Caption crossfade (only when beat changes)
        crossfadeTo(beat, beatIdx)

        // Dot activation with pulse
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

    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [startRaf, crossfadeTo])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How it works"
      style={{ height: `calc(100vh + ${SCROLL_DIST}px)`, position: 'relative' }}
    >
      {/* ── Sticky viewport ───────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          position:   'sticky',
          top:        0,
          height:     '100vh',
          overflow:   'hidden',
          background: 'var(--hydrochar-900, #0d0f0d)',
        }}
      >
        {/* Background video */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src="/motion/how-it-works.webm"
          preload="auto"
          muted
          playsInline
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            willChange: 'contents',
          }}
        />

        {/* Cinematic vignette — radial + bottom gradient */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.32) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(to bottom, rgba(10,12,10,0.20) 0%, rgba(10,12,10,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Top left label ──────────────────────────────────────────────── */}
        <div style={{
          position:   'absolute',
          top:        'clamp(24px, 4vw, 48px)',
          left:       'clamp(24px, 5vw, 80px)',
          display:    'flex',
          alignItems: 'center',
          gap:        '12px',
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

        {/* ── Phase counter — top right ────────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 'clamp(24px, 4vw, 48px)', right: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'baseline', gap: '6px',
        }}>
          <span
            ref={phaseRef}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1,
              letterSpacing: '-0.05em', color: 'rgba(245,243,238,0.12)',
              transition: 'opacity 160ms ease',
              display: 'block',
            }}
          >01</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'rgba(245,243,238,0.18)', letterSpacing: '0.1em',
          }}>/ 09</span>
        </div>

        {/* ── Bottom caption area ──────────────────────────────────────────── */}
        <div style={{
          position:   'absolute', bottom: 0, left: 0, right: 0,
          padding:    'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 80px)',
          background: 'linear-gradient(to top, rgba(10,12,10,0.90) 0%, rgba(10,12,10,0.60) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          {/* Beat dots */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
            {BEATS.map((beat, i) => (
              <div
                key={beat.phase}
                ref={el => { dotsRef.current[i] = el }}
                style={{
                  width:           i === 0 ? '8px' : '6px',
                  height:          i === 0 ? '8px' : '6px',
                  borderRadius:    '999px',
                  background:      i === 0 ? 'var(--forest-mid, #4a8c5c)' : 'rgba(245,243,238,0.15)',
                  transition:      'background 300ms ease, transform 300ms ease, opacity 300ms ease, width 300ms ease, height 300ms ease',
                  transformOrigin: 'center',
                  opacity:         i === 0 ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* Step label */}
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)', textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.45)', marginBottom: '10px',
          }}>
            <span ref={labelRef} style={{ transition: 'opacity 160ms ease' }}>Collection</span>
          </p>

          {/* Caption */}
          <p
            ref={captionRef}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300,
              fontSize:   'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.55,
              color:      'rgba(245,243,238,0.78)', maxWidth: '580px', margin: 0,
            }}
          >
            G2E trucks collect organic municipal waste from Bordo Poniente.
          </p>
        </div>

        {/* ── Progress bar ─────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '2px', background: 'rgba(245,243,238,0.07)',
          }}
        >
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
