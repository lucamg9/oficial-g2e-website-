'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Timing ────────────────────────────────────────────────────────────── */
// Adjust DURATION when real video is dropped in
const DURATION    = 18       // seconds — expected Higgsfield render length
const FPS         = 30
const SCROLL_DIST = 2400     // px of scroll to traverse full video

/* ─── 9 animation beats ─────────────────────────────────────────────────── */
const BEATS = [
  {
    t: 0 / 9,
    phase: '01',
    label: 'Collection',
    caption: 'G2E trucks collect organic municipal waste from Bordo Poniente.',
  },
  {
    t: 1 / 9,
    phase: '02',
    label: 'Intake',
    caption: 'The waste is deposited into the plant\'s intake system.',
  },
  {
    t: 2 / 9,
    phase: '03',
    label: 'Concentration',
    caption: 'Organic mass is accumulated and prepared for processing.',
  },
  {
    t: 3 / 9,
    phase: '04',
    label: 'Slurry',
    caption: 'Waste is converted into a homogeneous liquid slurry inside a sealed reactor vessel.',
  },
  {
    t: 4 / 9,
    phase: '05',
    label: 'Pressurization',
    caption: 'The reactor reaches operating pressure. Temperature climbs. The process begins.',
  },
  {
    t: 5 / 9,
    phase: '06',
    label: 'Hydrothermal reaction',
    caption: 'Under pressure and heat, organic molecules break down. Bubbles rise. Carbon bonds form.',
  },
  {
    t: 6 / 9,
    phase: '07',
    label: 'Carbonization',
    caption: 'The reaction completes. Bubbling stops. Water recedes. Hydrochar remains.',
  },
  {
    t: 7 / 9,
    phase: '08',
    label: 'First product',
    caption: 'The first sealed G2E bag of hydrochar — mineral-grade, stable, measurable.',
  },
  {
    t: 8 / 9,
    phase: '09',
    label: 'Scale',
    caption: 'Every batch repeats. Every module replicates. From one plant to city infrastructure.',
  },
]

export default function HowItWorksSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const stickyRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const phaseRef    = useRef<HTMLSpanElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const captionRef  = useRef<HTMLParagraphElement>(null)
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([])

  const pendingSeek = useRef(false)
  const targetTime  = useRef(0)

  const seekTo = useCallback((time: number) => {
    const video = videoRef.current
    if (!video) return
    targetTime.current = time
    if (pendingSeek.current) return
    if (Math.abs(video.currentTime - time) < 1 / FPS / 2) return
    pendingSeek.current = true
    video.currentTime = time
  }, [])

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const onSeeked = () => {
      pendingSeek.current = false
      if (Math.abs(video.currentTime - targetTime.current) > 1 / FPS / 2) {
        pendingSeek.current = true
        video.currentTime = targetTime.current
      }
    }
    video.addEventListener('seeked', onSeeked)

    const st = ScrollTrigger.create({
      trigger: section,
      pin:     stickyRef.current,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      scrub:   true,
      onUpdate(self) {
        const p = self.progress

        // Seek video
        seekTo(p * DURATION)

        // Progress bar
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`
        }

        // Active beat
        let activeBeat = BEATS[0]
        for (const beat of BEATS) {
          if (p >= beat.t) activeBeat = beat
        }

        // Beat index for dot activation
        const beatIndex = BEATS.indexOf(activeBeat)

        if (phaseRef.current)   phaseRef.current.textContent   = activeBeat.phase
        if (labelRef.current)   labelRef.current.textContent   = activeBeat.label
        if (captionRef.current) captionRef.current.textContent = activeBeat.caption

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return
          const active = i <= beatIndex
          dot.style.background  = active ? 'var(--forest-mid, #4a8c5c)' : 'rgba(245,243,238,0.15)'
          dot.style.transform   = i === beatIndex ? 'scale(1.5)' : 'scale(1)'
        })
      },
    })

    return () => {
      video.removeEventListener('seeked', onSeeked)
      st.kill()
    }
  }, [seekTo])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How it works"
      style={{
        height:   `calc(100vh + ${SCROLL_DIST}px)`,
        position: 'relative',
      }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
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
          }}
        />

        {/* Dark vignette overlay */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, rgba(10,12,10,0.18) 0%, rgba(10,12,10,0.62) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Section label — top left ────────────────────────────────── */}
        <div
          style={{
            position:   'absolute',
            top:        'clamp(24px, 4vw, 48px)',
            left:       'clamp(24px, 5vw, 80px)',
            display:    'flex',
            alignItems: 'center',
            gap:        '12px',
          }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.45)',
          }}>
            How it works
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(245,243,238,0.20)' }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.22)',
          }}>
            Hydrothermal carbonization
          </span>
        </div>

        {/* ── Beat counter — top right ─────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top:      'clamp(24px, 4vw, 48px)',
            right:    'clamp(24px, 5vw, 80px)',
            display:  'flex',
            alignItems: 'center',
            gap:      '8px',
          }}
        >
          <span
            ref={phaseRef}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(2rem, 4vw, 3.5rem)',
              lineHeight:    1,
              letterSpacing: '-0.05em',
              color:         'rgba(245,243,238,0.12)',
            }}
          >
            01
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '10px',
            color:      'rgba(245,243,238,0.20)',
            letterSpacing: '0.1em',
          }}>/ 09</span>
        </div>

        {/* ── Bottom overlay — caption area ────────────────────────────── */}
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            padding:    'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 80px)',
            background: 'linear-gradient(to top, rgba(10,12,10,0.88) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          {/* Beat dots */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {BEATS.map((beat, i) => (
              <div
                key={beat.phase}
                ref={el => { dotsRef.current[i] = el }}
                style={{
                  width:        '6px',
                  height:       '6px',
                  borderRadius: '999px',
                  background:   i === 0 ? 'var(--forest-mid, #4a8c5c)' : 'rgba(245,243,238,0.15)',
                  transition:   'background 200ms, transform 200ms',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </div>

          {/* Step label */}
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs, 10px)',
            letterSpacing: 'var(--ls-eyebrow, 0.14em)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.45)',
            marginBottom:  '10px',
          }}>
            <span ref={labelRef}>Collection</span>
          </p>

          {/* Caption */}
          <p
            ref={captionRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize:   'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.55,
              color:      'rgba(245,243,238,0.78)',
              maxWidth:   '560px',
              margin:     0,
            }}
          >
            G2E trucks collect organic municipal waste from Bordo Poniente.
          </p>
        </div>

        {/* ── Progress bar — bottom edge ──────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position:        'absolute',
            bottom:          0,
            left:            0,
            right:           0,
            height:          '2px',
            background:      'rgba(245,243,238,0.08)',
            transformOrigin: 'left center',
          }}
        >
          <div
            ref={progressRef}
            style={{
              height:          '100%',
              background:      'var(--forest-mid, #4a8c5c)',
              transformOrigin: 'left center',
              transform:       'scaleX(0)',
            }}
          />
        </div>

      </div>
    </section>
  )
}
