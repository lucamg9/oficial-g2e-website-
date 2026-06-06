'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCROLL_DIST  = 4200   // px — 600px per clip × 7 clips
const CLIP_COUNT   = 7
const LERP         = 0.17   // higher = tighter coupling to scroll position

const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t

const CLIPS = [
  '/motion/hiw/1.mp4',
  '/motion/hiw/2.mp4',
  '/motion/hiw/3.mp4',
  '/motion/hiw/4.mp4',
  '/motion/hiw/5.mp4',
  '/motion/hiw/6.mp4',
  '/motion/hiw/7.mp4',
]

// 9 narrative beats mapped across 7 clips (clip 0-6)
// t = when this beat triggers (0–1 of total scroll progress)
const BEATS = [
  { t: 0 / 9, clip: 0, phase: '01', label: 'Collection',            caption: 'G2E trucks collect organic municipal waste from Bordo Poniente.' },
  { t: 1 / 9, clip: 1, phase: '02', label: 'Intake',                caption: 'The waste is deposited into the plant\'s intake system.' },
  { t: 2 / 9, clip: 1, phase: '03', label: 'Concentration',         caption: 'Organic mass is accumulated and prepared for processing.' },
  { t: 3 / 9, clip: 2, phase: '04', label: 'Slurry',                caption: 'Waste is converted into a homogeneous liquid slurry inside a sealed reactor vessel.' },
  { t: 4 / 9, clip: 3, phase: '05', label: 'Pressurization',        caption: 'The reactor reaches operating pressure. Temperature climbs. The process begins.' },
  { t: 5 / 9, clip: 4, phase: '06', label: 'Hydrothermal reaction', caption: 'Under pressure and heat, organic molecules break down. Bubbles rise. Carbon bonds form.' },
  { t: 6 / 9, clip: 5, phase: '07', label: 'Carbonization',         caption: 'The reaction completes. Bubbling stops. Water recedes. Hydrochar remains.' },
  { t: 7 / 9, clip: 5, phase: '08', label: 'First product',         caption: 'The first sealed G2E bag of hydrochar — mineral-grade, stable, measurable.' },
  { t: 8 / 9, clip: 6, phase: '09', label: 'Scale',                 caption: 'Every batch repeats. Every module replicates. From one plant to city infrastructure.' },
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
  const wipeRef      = useRef<HTMLDivElement>(null)

  // Scroll-scrub state
  const targetClipIdx = useRef(0)
  const targetTime    = useRef(0)
  const lerpedTime    = useRef(0)
  const rafRef        = useRef<number>(0)

  // UI state
  const activeClipIdx = useRef(0)
  const activeBeatIdx = useRef(-1)

  /* ─── RAF lerp loop — runs continuously, scrubs active clip ─────────── */
  const startRaf = useCallback(() => {
    const tick = () => {
      const video = videoRefs.current[targetClipIdx.current]
      if (video && video.readyState >= 2) {
        const next = lerpFn(lerpedTime.current, targetTime.current, LERP)
        if (Math.abs(next - lerpedTime.current) > 0.0005) {
          lerpedTime.current = next
          try { video.currentTime = next } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  /* ─── Clip crossfade ─────────────────────────────────────────────────── */
  const switchClip = useCallback((nextIdx: number) => {
    if (nextIdx === activeClipIdx.current) return
    const prevIdx = activeClipIdx.current
    activeClipIdx.current = nextIdx

    const prev = videoRefs.current[prevIdx]
    const next = videoRefs.current[nextIdx]
    if (!next) return

    // Reset lerpedTime so the new clip starts from its correct position
    lerpedTime.current = targetTime.current

    next.style.zIndex     = '2'
    next.style.transition = 'opacity 260ms ease'
    next.style.opacity    = '1'

    setTimeout(() => {
      if (prev) {
        prev.style.transition = 'opacity 260ms ease'
        prev.style.opacity    = '0'
        prev.style.zIndex     = '1'
      }
    }, 60)
  }, [])

  /* ─── Beat transition — GSAP choreographed ──────────────────────────── */
  const crossfadeTo = useCallback((beat: typeof BEATS[0], beatIdx: number) => {
    if (beatIdx === activeBeatIdx.current) return
    activeBeatIdx.current = beatIdx

    const caption = captionRef.current
    const label   = labelRef.current
    const phase   = phaseRef.current
    if (!caption || !label || !phase) return

    /* ── OUT ─────────────────────────────────────────────────────────────
       Headline snaps upward with slight rotation.
       Eyebrow label slides left. Phase counter slides right.
    ──────────────────────────────────────────────────────────────────── */
    gsap.to(caption, {
      opacity:  0,
      y:        -22,
      rotation: -0.8,
      duration: 0.13,
      ease:     'power2.in',
    })
    gsap.to(label, {
      opacity:  0,
      x:        -14,
      duration: 0.10,
      ease:     'power2.in',
    })
    gsap.to(phase, {
      opacity:  0,
      x:        10,
      duration: 0.09,
      ease:     'power2.in',
      onComplete() {
        /* ── Swap content ─────────────────────────────────────────────── */
        caption.textContent = beat.caption
        label.textContent   = beat.label
        phase.textContent   = beat.phase

        /* ── IN — cascade: phase → label → headline ──────────────────────
           Phase badge slides in from left.
           Step label rises cleanly.
           Headline lifts from below with a rotational snap — the star.
        ──────────────────────────────────────────────────────────────── */
        gsap.fromTo(phase,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.22, ease: 'power3.out', delay: 0 }
        )
        gsap.fromTo(label,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.26, ease: 'power3.out', delay: 0.04 }
        )
        gsap.fromTo(caption,
          { opacity: 0, y: 36, rotation: 1.4 },
          { opacity: 1, y: 0, rotation: 0, duration: 0.52, ease: 'power3.out', delay: 0.07 }
        )
      },
    })
  }, [])

  /* ─── ScrollTrigger + RAF boot ──────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Pause all videos — we control currentTime manually
    videoRefs.current.forEach(v => {
      if (!v) return
      try { v.pause(); v.currentTime = 0 } catch { /* ignore */ }
    })

    // Show first clip
    const firstVideo = videoRefs.current[0]
    if (firstVideo) {
      firstVideo.style.opacity = '1'
      firstVideo.style.zIndex  = '2'
    }

    startRaf()

    const resetToStart = () => {
      activeBeatIdx.current = -1
      activeClipIdx.current = 0
      targetClipIdx.current = 0
      targetTime.current    = 0
      lerpedTime.current    = 0

      videoRefs.current.forEach((v, i) => {
        if (!v) return
        v.style.transition = 'none'
        v.style.opacity    = i === 0 ? '1' : '0'
        v.style.zIndex     = i === 0 ? '2' : '1'
        try { v.currentTime = 0 } catch { /* ignore */ }
      })

      const caption = captionRef.current
      const label   = labelRef.current
      const phase   = phaseRef.current
      if (caption) { gsap.set(caption, { opacity: 1, y: 0, rotation: 0 }); caption.textContent = BEATS[0].caption }
      if (label)   { gsap.set(label,   { opacity: 1, x: 0 });               label.textContent   = BEATS[0].label   }
      if (phase)   { gsap.set(phase,   { opacity: 1, x: 0 });               phase.textContent   = BEATS[0].phase   }

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        dot.style.background = i === 0 ? '#4a8c5c' : 'rgba(245,243,238,0.20)'
        dot.style.transform  = i === 0 ? 'scaleY(2.8)' : 'scaleY(1)'
        dot.style.opacity    = i === 0 ? '1' : '0.38'
      })

      if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'
    }

    const st = ScrollTrigger.create({
      trigger: section,
      pin:     stickyRef.current,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      scrub:   0.4,
      onLeave() { resetToStart() },
      onUpdate(self) {
        const p = self.progress

        // Entry/exit wipe overlay
        if (wipeRef.current) {
          const eIn  = Math.min(p / 0.04, 1)
          const eOut = Math.max(0, (p - 0.96) / 0.04)
          wipeRef.current.style.opacity = String(Math.max(1 - eIn, eOut))
        }

        // Progress bar
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`
        }

        // Which clip zone are we in? Each clip gets 1/CLIP_COUNT of scroll
        const zone     = Math.min(p * CLIP_COUNT, CLIP_COUNT - 0.0001)
        const clipIdx  = Math.floor(zone)
        const clipProg = zone - clipIdx   // 0–1 within this clip

        // Set scrub target
        targetClipIdx.current = clipIdx
        const video = videoRefs.current[clipIdx]
        const dur   = video?.duration || 0
        targetTime.current = clipProg * dur

        // Crossfade to next clip if needed
        switchClip(clipIdx)

        // Beat for caption / dots
        let beatIdx = 0
        for (let i = 0; i < BEATS.length; i++) {
          if (p >= BEATS[i].t) beatIdx = i
        }
        crossfadeTo(BEATS[beatIdx], beatIdx)

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return
          const active    = i <= beatIdx
          const isCurrent = i === beatIdx
          dot.style.background    = active ? '#4a8c5c' : 'rgba(245,243,238,0.20)'
          dot.style.transform     = isCurrent ? 'scaleY(2.8)' : 'scaleY(1)'
          dot.style.opacity       = active ? '1' : '0.38'
        })
      },
    })

    const videos = videoRefs.current.slice()
    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
      videos.forEach(v => { try { v?.pause() } catch { /* ignore */ } })
    }
  }, [startRaf, switchClip, crossfadeTo])

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
        {/* Video layers — stacked, scrubbed via currentTime, crossfaded via opacity */}
        {CLIPS.map((src, i) => (
          <video
            key={src}
            ref={el => { videoRefs.current[i] = el }}
            src={src}
            muted
            playsInline
            preload="auto"
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    0,
              zIndex:     1,
              willChange: 'contents',
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

        {/* ── Top-left section identifier ──────────────────────────────── */}
        <div style={{
          position: 'absolute', zIndex: 20,
          top: 'clamp(24px, 4vw, 48px)', left: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.16em', textTransform: 'uppercase' as const,
            color: 'rgba(245,243,238,0.40)',
          }}>How it works</span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(245,243,238,0.18)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.14em', textTransform: 'uppercase' as const,
            color: 'rgba(245,243,238,0.20)',
          }}>Hydrothermal carbonization</span>
        </div>

        {/* ── Right-side vertical dot column ───────────────────────────── */}
        <div style={{
          position:       'absolute',
          right:          'clamp(24px, 4vw, 56px)',
          top:            '50%',
          transform:      'translateY(-50%)',
          zIndex:         20,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '10px',
          pointerEvents:  'none',
        }}>
          {BEATS.map((_, i) => (
            <div
              key={i}
              ref={el => { dotsRef.current[i] = el }}
              style={{
                width:           '3px',
                height:          '14px',
                borderRadius:    '99px',
                background:      i === 0 ? '#4a8c5c' : 'rgba(245,243,238,0.20)',
                transform:       i === 0 ? 'scaleY(2.8)' : 'scaleY(1)',
                transition:      'background 380ms ease, transform 380ms cubic-bezier(0.34,1.56,0.64,1), opacity 380ms ease',
                transformOrigin: 'center',
                opacity:         i === 0 ? 1 : 0.38,
              }}
            />
          ))}
        </div>

        {/* ── Bottom text panel ─────────────────────────────────────────
            Three-level hierarchy: eyebrow → headline → body.
            Full left side — dots no longer compete here.
        ──────────────────────────────────────────────────────────────── */}
        <div style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          zIndex:        20,
          padding:       'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(44px, 5vw, 68px)',
          paddingRight:  'clamp(80px, 14vw, 200px)',  /* clear the dot column */
          background:    'linear-gradient(to top, rgba(10,12,10,0.96) 0%, rgba(10,12,10,0.70) 45%, transparent 100%)',
          pointerEvents: 'none',
        }}>

          {/* Eyebrow — phase counter + step label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span
              ref={phaseRef}
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '11px',
                letterSpacing: '0.20em',
                textTransform: 'uppercase' as const,
                color:         'rgba(245,243,238,0.50)',
              }}
            >01</span>
            <span style={{ color: 'rgba(245,243,238,0.16)', fontSize: '9px' }}>—</span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color:         'rgba(245,243,238,0.22)',
            }}>09</span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(245,243,238,0.14)' }} />
            <span
              ref={labelRef}
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase' as const,
                color:         'rgba(245,243,238,0.46)',
              }}
            >Collection</span>
          </div>

          {/* Headline — BIG, the cinematic moment */}
          <h3
            ref={captionRef}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(2.6rem, 5.5vw, 5rem)',
              lineHeight:    1.02,
              letterSpacing: '-0.03em',
              color:         'rgba(245,243,238,0.93)',
              margin:        0,
              maxWidth:      '760px',
            }}
          >
            G2E trucks collect organic municipal waste from Bordo Poniente.
          </h3>
        </div>

        {/* ── Entry/exit wipe ──────────────────────────────────────────── */}
        <div
          ref={wipeRef}
          aria-hidden="true"
          style={{
            position:       'absolute',
            inset:          0,
            zIndex:         30,
            background:     '#0A0C0A',
            opacity:        1,
            pointerEvents:  'none',
            willChange:     'opacity',
          }}
        />

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
