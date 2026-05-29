'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES  = 688
const FPS           = 30
const DURATION      = TOTAL_FRAMES / FPS      // 22.933s
const PX_PER_FRAME  = 5
const SCROLL_DIST   = TOTAL_FRAMES * PX_PER_FRAME  // 3440px

/* ─── Act overlays ───────────────────────────────────────────────────── */
const ACTS = [
  {
    fromFrame: 0,   toFrame: 87,
    headline:  'Every day, cities generate thousands\nof tonnes of organic waste.',
    sub:       'It rots. It burns. It poisons the ground.',
    align:     'left'   as const,
  },
  {
    fromFrame: 88,  toFrame: 207,
    headline:  'What if that waste had\na different destination?',
    sub:       'We built one.',
    align:     'left'   as const,
  },
  {
    fromFrame: 208, toFrame: 327,
    headline:  '220°C. Controlled pressure.\nZero combustion.',
    sub:       'Hydrothermal Carbonization — the process that changes everything.',
    align:     'right'  as const,
  },
  {
    fromFrame: 328, toFrame: 447,
    headline:  'Hydrochar.',
    sub:       'A mineral-grade carbon material — born from organic waste.',
    align:     'center' as const,
  },
  {
    fromFrame: 448, toFrame: 567,
    headline:  'Applied to soil,\nit sequesters carbon for centuries.',
    sub:       'And makes barren land productive again.',
    align:     'left'   as const,
  },
  {
    fromFrame: 568, toFrame: 687,
    headline:  'This is what we built.',
    sub:       "The world's largest hydrothermal carbonization plant. Mexico City.",
    align:     'center' as const,
  },
]

export default function IntroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const actRefs    = useRef<(HTMLDivElement | null)[]>([])
  const logoRef    = useRef<HTMLDivElement>(null)

  /* ─── Seek-deduplication ──────────────────────────────────────────── */
  // Prevents queuing up dozens of seeks — only the latest target matters.
  const pendingSeek  = useRef(false)
  const targetTime   = useRef(0)

  const seekTo = useCallback((time: number) => {
    const video = videoRef.current
    if (!video) return
    targetTime.current = time
    if (pendingSeek.current) return   // already seeking — will retry on 'seeked'
    const delta = Math.abs(video.currentTime - time)
    if (delta < 1 / FPS / 2) return   // already close enough (< half a frame)
    pendingSeek.current = true
    video.currentTime   = time
  }, [])

  /* ─── Auto-skip on return visit ───────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!sessionStorage.getItem('g2e-intro-seen')) return
    const t = setTimeout(() => {
      const section = sectionRef.current
      if (!section) return
      window.scrollTo({ top: section.offsetTop + SCROLL_DIST + 10, behavior: 'instant' })
    }, 100)
    return () => clearTimeout(t)
  }, [])

  /* ─── ScrollTrigger + overlay logic ──────────────────────────────── */
  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    /* Retry seek if we fell behind (fires after each seeked event) */
    const onSeeked = () => {
      pendingSeek.current = false
      const delta = Math.abs(video.currentTime - targetTime.current)
      if (delta > 1 / FPS / 2) {
        pendingSeek.current = true
        video.currentTime   = targetTime.current
      }
    }
    video.addEventListener('seeked', onSeeked)

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      pin:     true,
      scrub:   true,   // tighter follow than 1.2 — matches cursor 1:1
      onUpdate: (self) => {
        /* ── Video seek ── */
        seekTo(self.progress * DURATION)

        /* ── Act opacity ── */
        const frame   = self.progress * (TOTAL_FRAMES - 1)
        const fadeLen = 18

        ACTS.forEach((act, i) => {
          const el = actRefs.current[i]
          if (!el) return
          let opacity = 0
          if (frame >= act.fromFrame && frame <= act.toFrame) {
            const inFade  = frame - act.fromFrame
            const outFade = act.toFrame - frame
            opacity = Math.min(1, Math.min(inFade, outFade, fadeLen) / fadeLen)
          }
          el.style.opacity = String(opacity)
        })

        /* ── Final G2E card ── */
        if (logoRef.current) {
          const appear = Math.max(0, (self.progress - 0.92) / 0.08)
          logoRef.current.style.opacity   = String(appear)
          logoRef.current.style.transform = `translateY(${(1 - appear) * 20}px)`
        }
      },
    })

    return () => {
      st.kill()
      video.removeEventListener('seeked', onSeeked)
    }
  }, [seekTo])

  /* ─── Skip ────────────────────────────────────────────────────────── */
  const handleSkip = useCallback(() => {
    sessionStorage.setItem('g2e-intro-seen', '1')
    const section = sectionRef.current
    if (!section) return
    window.scrollTo({ top: section.offsetTop + SCROLL_DIST + window.innerHeight, behavior: 'smooth' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-hidden="true"
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      {/*
        Native <video> — no canvas, no DPR math.
        objectFit: cover  → handles any viewport aspect ratio natively.
        Hardware-decoded  → GPU compositing, not JS drawImage.
        All-keyframe WebM → instant seeking to any frame.
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position:   'absolute',
          inset:      0,
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
          background: '#0A0908',
          display:    'block',
        }}
      >
        <source src="/intro/intro.webm" type="video/webm" />
        <source src="/intro/intro.mp4"  type="video/mp4"  />
      </video>

      {/* Edge vignette */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          inset:       0,
          background:  'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
          zIndex:      1,
        }}
      />

      {/* Act text overlays */}
      {ACTS.map((act, i) => (
        <div
          key={i}
          ref={el => { actRefs.current[i] = el }}
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        2,
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'flex-end',
            padding:       'clamp(32px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 10vh, 120px)',
            alignItems:    act.align === 'right'  ? 'flex-end'
                         : act.align === 'center' ? 'center'
                         :                         'flex-start',
            opacity:       0,
            pointerEvents: 'none',
            textAlign:     act.align,
          }}
        >
          {/* Act pill */}
          <div style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            marginBottom:   '20px',
            padding:        '6px 14px',
            background:     'rgba(245,243,238,0.08)',
            backdropFilter: 'blur(12px)',
            border:         '1px solid rgba(245,243,238,0.14)',
            borderRadius:   '999px',
          }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--forest-light)', display:'block' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,243,238,0.50)' }}>
              {String(i + 1).padStart(2, '0')} / 06
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily:   'var(--font-display)',
            fontWeight:   800,
            fontSize:     'clamp(2rem, 4.5vw, 5rem)',
            lineHeight:   1.0,
            letterSpacing:'-0.03em',
            color:        '#FFFFFF',
            maxWidth:     act.align === 'center' ? '900px' : '640px',
            whiteSpace:   'pre-line',
            marginBottom: '20px',
            textShadow:   '0 2px 20px rgba(0,0,0,0.40)',
          }}>
            {act.headline}
          </h2>

          {/* Sub */}
          <p style={{
            fontFamily:   'var(--font-sans)',
            fontWeight:   300,
            fontSize:     'clamp(0.9rem, 1.5vw, 1.2rem)',
            lineHeight:   1.6,
            color:        'rgba(245,243,238,0.72)',
            maxWidth:     '520px',
            textShadow:   '0 1px 8px rgba(0,0,0,0.30)',
          }}>
            {act.sub}
          </p>
        </div>
      ))}

      {/* Final G2E identity card */}
      <div ref={logoRef} style={{
        position:      'absolute',
        inset:         0,
        zIndex:        3,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        justifyContent:'center',
        opacity:       0,
        pointerEvents: 'none',
        gap:           '16px',
      }}>
        <div style={{
          width:'72px', height:'72px', borderRadius:'50%',
          background:'rgba(245,243,238,0.10)', backdropFilter:'blur(20px)',
          border:'1px solid rgba(245,243,238,0.22)',
          display:'flex', alignItems:'center', justifyContent:'center',
          marginBottom:'8px',
        }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'38px', fontWeight:800, color:'#F5F3EE', lineHeight:1, marginTop:'3px' }}>g</span>
        </div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.20em', textTransform:'uppercase', color:'rgba(245,243,238,0.45)' }}>
          Green to Energy · CDMX
        </p>
        <p style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(0.85rem, 1.2vw, 1rem)', color:'rgba(245,243,238,0.38)', letterSpacing:'0.04em', marginTop:'8px' }}>
          ↓ Scroll to explore
        </p>
      </div>

      {/* Skip */}
      <button
        onClick={handleSkip}
        style={{
          position:       'fixed',
          top:            '24px',
          right:          '24px',
          zIndex:         100,
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '8px',
          padding:        '10px 18px',
          background:     'rgba(245,243,238,0.10)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          border:         '1px solid rgba(245,243,238,0.18)',
          borderRadius:   '999px',
          fontFamily:     'var(--font-sans)',
          fontSize:       '13px',
          fontWeight:     500,
          color:          'rgba(245,243,238,0.80)',
          cursor:         'pointer',
          transition:     'background 180ms, color 180ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(245,243,238,0.18)'; e.currentTarget.style.color='#F5F3EE' }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(245,243,238,0.10)'; e.currentTarget.style.color='rgba(245,243,238,0.80)' }}
      >
        Skip
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </section>
  )
}
