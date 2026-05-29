'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/* ─── Frame sequence config ──────────────────────────────────────────── */
const STEPS = [
  { dir: 'step-1', frames: 88,  startFrame: 0   },
  { dir: 'step-2', frames: 120, startFrame: 88  },
  { dir: 'step-3', frames: 120, startFrame: 208 },
  { dir: 'step-4', frames: 120, startFrame: 328 },
  { dir: 'step-5', frames: 120, startFrame: 448 },
  { dir: 'step-6', frames: 120, startFrame: 568 },
]
const TOTAL_FRAMES = 688
const PX_PER_FRAME = 5   // scroll pixels per frame — controls pacing

/* ─── Story act overlays ─────────────────────────────────────────────── */
const ACTS = [
  {
    fromFrame: 0,
    toFrame: 87,
    headline: 'Every day, cities generate thousands\nof tonnes of organic waste.',
    sub: 'It rots. It burns. It poisons the ground.',
    align: 'left' as const,
  },
  {
    fromFrame: 88,
    toFrame: 207,
    headline: 'What if that waste had\na different destination?',
    sub: 'We built one.',
    align: 'left' as const,
  },
  {
    fromFrame: 208,
    toFrame: 327,
    headline: '220°C. Controlled pressure.\nZero combustion.',
    sub: 'Hydrothermal Carbonization — the process that changes everything.',
    align: 'right' as const,
  },
  {
    fromFrame: 328,
    toFrame: 447,
    headline: 'Hydrochar.',
    sub: 'A mineral-grade carbon material — born from organic waste.',
    align: 'center' as const,
  },
  {
    fromFrame: 448,
    toFrame: 567,
    headline: 'Applied to soil,\nit sequesters carbon for centuries.',
    sub: 'And makes barren land productive again.',
    align: 'left' as const,
  },
  {
    fromFrame: 568,
    toFrame: 687,
    headline: 'This is what we built.',
    sub: "The world's largest hydrothermal carbonization plant. Mexico City.",
    align: 'center' as const,
  },
]

function framePath(stepDir: string, frameNum: number): string {
  const padded = String(frameNum).padStart(3, '0')
  return `/intro/${stepDir}/ezgif-frame-${padded}.jpg`
}

export default function IntroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const actRefs    = useRef<(HTMLDivElement | null)[]>([])
  const logoRef    = useRef<HTMLDivElement>(null)
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const currentFrame = useRef<number>(0)
  /* ─── Preload a full step ──────────────────────────────────────────── */
  const preloadStep = useCallback((stepIndex: number) => {
    if (stepIndex >= STEPS.length) return
    const step = STEPS[stepIndex]
    for (let i = 1; i <= step.frames; i++) {
      const absFrame = step.startFrame + i - 1
      if (frameCache.current.has(absFrame)) continue
      const img = new Image()
      img.src = framePath(step.dir, i)
      img.onload = () => { frameCache.current.set(absFrame, img) }
    }
  }, [])

  /* ─── Draw a specific frame to canvas ─────────────────────────────── */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = frameCache.current.get(frameIndex)
    if (!img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    currentFrame.current = frameIndex
  }, [])

  /* ─── Resize canvas to viewport ───────────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    drawFrame(currentFrame.current)
  }, [drawFrame])

  /* ─── Mount: preload first 2 steps, set up ScrollTrigger ──────────── */
  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    preloadStep(0)
    preloadStep(1)

    // Draw frame 0 as soon as it loads
    const checkFirst = setInterval(() => {
      if (frameCache.current.has(0)) {
        drawFrame(0)
        clearInterval(checkFirst)
      }
    }, 50)

    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * PX_PER_FRAME}`,
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const rawFrame = Math.round(self.progress * (TOTAL_FRAMES - 1))
        const frame = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame))
        drawFrame(frame)

        // Lazy-load next step when approaching it
        for (let s = 0; s < STEPS.length; s++) {
          const step = STEPS[s]
          if (frame >= step.startFrame - 40 && s + 1 < STEPS.length) {
            preloadStep(s + 1)
          }
        }

        // Act visibility — show the act whose frame range contains current frame
        ACTS.forEach((act, i) => {
          const el = actRefs.current[i]
          if (!el) return
          const inRange = frame >= act.fromFrame && frame <= act.toFrame

          // Fade in at start of range, fade out at end
          const fadeLen = 18 // frames for transition
          let opacity = 0
          if (inRange) {
            const inFade  = frame - act.fromFrame
            const outFade = act.toFrame - frame
            opacity = Math.min(1, Math.min(inFade, outFade, fadeLen) / fadeLen)
          }
          el.style.opacity = String(opacity)
        })

        // Logo / final card appears at 92%+
        if (logoRef.current) {
          const appear = Math.max(0, (self.progress - 0.92) / 0.08)
          logoRef.current.style.opacity = String(appear)
          logoRef.current.style.transform = `translateY(${(1 - appear) * 20}px)`
        }
      },
    })

    return () => {
      st.kill()
      window.removeEventListener('resize', resizeCanvas)
      clearInterval(checkFirst)
    }
  }, [drawFrame, preloadStep, resizeCanvas])

  /* ─── Scroll past intro (works with or without Lenis) ─────────────── */
  const scrollToHero = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    // The section is pinned; its scroll distance = TOTAL_FRAMES * PX_PER_FRAME
    // Jump to just after the pinned section ends
    const skipTo = section.offsetTop + TOTAL_FRAMES * PX_PER_FRAME + window.innerHeight
    window.scrollTo({ top: skipTo, behavior: 'smooth' })
  }, [])

  /* ─── Auto-skip on return visit ────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('g2e-intro-seen')
    if (seen) {
      // Give ScrollTrigger time to initialize before jumping
      const t = setTimeout(() => {
        const section = sectionRef.current
        if (!section) return
        const skipTo = section.offsetTop + TOTAL_FRAMES * PX_PER_FRAME + 10
        window.scrollTo({ top: skipTo, behavior: 'instant' })
      }, 100)
      return () => clearTimeout(t)
    }
  }, [])

  /* ─── Skip handler ─────────────────────────────────────────────────── */
  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('g2e-intro-seen', '1')
    }
    scrollToHero()
  }

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
      }}
    >
      {/* Canvas — full viewport frame display */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background: '#0A0908',
        }}
      />

      {/* Dark vignette — top and bottom edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Act overlays ─────────────────────────────────────────────── */}
      {ACTS.map((act, i) => (
        <div
          key={i}
          ref={el => { actRefs.current[i] = el }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(32px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 10vh, 120px)',
            alignItems: act.align === 'right'
              ? 'flex-end'
              : act.align === 'center'
              ? 'center'
              : 'flex-start',
            opacity: 0,
            transition: 'opacity 0ms linear', // GSAP handles opacity
            pointerEvents: 'none',
            textAlign: act.align,
          }}
        >
          {/* Act number pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              padding: '6px 14px',
              background: 'rgba(245,243,238,0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245,243,238,0.14)',
              borderRadius: '999px',
            }}
          >
            <span
              style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--forest-light)',
                display: 'block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,243,238,0.50)',
              }}
            >
              {String(i + 1).padStart(2, '0')} / 06
            </span>
          </div>

          {/* Main headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              maxWidth: act.align === 'center' ? '900px' : '640px',
              whiteSpace: 'pre-line',
              marginBottom: '20px',
              textShadow: '0 2px 20px rgba(0,0,0,0.40)',
            }}
          >
            {act.headline}
          </h2>

          {/* Sub text */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              lineHeight: 1.6,
              color: 'rgba(245,243,238,0.72)',
              maxWidth: '520px',
              textShadow: '0 1px 8px rgba(0,0,0,0.30)',
            }}
          >
            {act.sub}
          </p>
        </div>
      ))}

      {/* ── Final card — G2E identity reveal ─────────────────────────── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(245,243,238,0.10)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(245,243,238,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '38px',
              fontWeight: 800,
              color: '#F5F3EE',
              lineHeight: 1,
              marginTop: '3px',
            }}
          >
            g
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.45)',
          }}
        >
          Green to Energy · CDMX
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            color: 'rgba(245,243,238,0.38)',
            letterSpacing: '0.04em',
            marginTop: '8px',
          }}
        >
          ↓ Scroll to explore
        </p>
      </div>

      {/* ── Skip button — always visible ─────────────────────────────── */}
      <button
        onClick={handleSkip}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: 'rgba(245,243,238,0.10)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          border: '1px solid rgba(245,243,238,0.18)',
          borderRadius: '999px',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(245,243,238,0.80)',
          cursor: 'pointer',
          transition: 'background 180ms, color 180ms',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(245,243,238,0.18)'
          e.currentTarget.style.color = '#F5F3EE'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(245,243,238,0.10)'
          e.currentTarget.style.color = 'rgba(245,243,238,0.80)'
        }}
      >
        Skip
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </section>
  )
}
