'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Only Story 3 + Story 4 (frames 240–479 of the combined video) ──── */
const START_FRAME  = 240
const TOTAL_FRAMES = 240          // 120 frames per story × 2
const FPS          = 30
const START_TIME   = START_FRAME / FPS   // 8.0 s into the video
const DURATION     = TOTAL_FRAMES / FPS  // 8.0 s of content
const PX_PER_FRAME = 5
const SCROLL_DIST  = TOTAL_FRAMES * PX_PER_FRAME  // 1200px

/* ─── Chapter definitions (local frames 0–239) ───────────────────────── */
const CHAPTERS = [
  {
    fromFrame: 0,
    toFrame:   119,
    num:       '01',
    eyebrow:   'The Products',
    headline:  'Hydrochar doesn\'t just\nreplace coal.',
    sub:       'It regenerates soil. It sequesters carbon for centuries. It generates premium technology-based carbon credits that the market actually needs.',
    align:     'left'   as const,
    stats:     [
      { value: '3',       label: 'Industries transformed' },
      { value: '270,600', label: 'Carbon credits / yr'    },
    ],
  },
  {
    fromFrame: 120,
    toFrame:   239,
    num:       '02',
    eyebrow:   'The Vision',
    headline:  'This is what scale looks like\nwhen the mission is real.',
    sub:       'Phase II · 2027 · 10 new modules at Bordo Poniente. The beginning of 170. $150M USD. 792 tonnes of waste processed every day.',
    align:     'center' as const,
    stats:     [
      { value: '$150M', label: 'Phase II investment' },
      { value: '170',   label: 'Module vision'       },
    ],
  },
]

export default function StorySequence() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ─── Seek deduplication ─────────────────────────────────────────── */
  const pendingSeek = useRef(false)
  const targetTime  = useRef(0)

  const seekTo = useCallback((time: number) => {
    const video = videoRef.current
    if (!video) return
    targetTime.current = time
    if (pendingSeek.current) return
    const delta = Math.abs(video.currentTime - time)
    if (delta < 1 / FPS / 2) return
    pendingSeek.current = true
    video.currentTime   = time
  }, [])

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

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
      scrub:   true,
      onUpdate: (self) => {
        /* Video seek — offset to Story 3 start (8s into combined video) */
        seekTo(START_TIME + self.progress * DURATION)

        /* Chapter opacity */
        const frame   = self.progress * (TOTAL_FRAMES - 1)
        const fadeLen = 20   // frames for in/out fade

        CHAPTERS.forEach((ch, i) => {
          const el = chapterRefs.current[i]
          if (!el) return
          let opacity = 0
          if (frame >= ch.fromFrame && frame <= ch.toFrame) {
            const inFade  = frame - ch.fromFrame
            const outFade = ch.toFrame - frame
            opacity = Math.min(1, Math.min(inFade, outFade, fadeLen) / fadeLen)
          }
          el.style.opacity = String(opacity)
        })
      },
    })

    return () => {
      st.kill()
      video.removeEventListener('seeked', onSeeked)
    }
  }, [seekTo])

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="G2E story — four chapters"
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      {/*
        story-sequence.webm: 4 stories concatenated, all-keyframe VP9
        objectFit: cover — fills any viewport natively, DPR-aware
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position:  'absolute',
          inset:     0,
          width:     '100%',
          height:    '100%',
          objectFit: 'cover',
          background:'var(--bg)',
          display:   'block',
        }}
      >
        <source src="/intro/story-sequence.webm" type="video/webm" />
        <source src="/intro/story-sequence.mp4"  type="video/mp4"  />
      </video>

      {/* Very subtle vignette — bone bg is already light, keep minimal */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          background:   'radial-gradient(ellipse at 60% 50%, transparent 35%, rgba(245,243,238,0.18) 100%)',
          pointerEvents:'none',
          zIndex:       1,
        }}
      />

      {/* Chapter overlays */}
      {CHAPTERS.map((ch, i) => (
        <div
          key={i}
          ref={el => { chapterRefs.current[i] = el }}
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        2,
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'center',
            padding:       'clamp(40px, 6vw, 96px)',
            alignItems:    (ch.align as string) === 'right'  ? 'flex-end'
                         : ch.align === 'center' ? 'center'
                         :                        'flex-start',
            opacity:       0,
            pointerEvents: 'none',
            textAlign:     ch.align,
          }}
        >
          {/*
            Frosted glass panel — guarantees text readability regardless of
            what the video is showing behind it (dark hydrochar, soil, etc.)
          */}
          <div style={{
            display:             'flex',
            flexDirection:       'column',
            alignItems:          (ch.align as string) === 'right'  ? 'flex-end'
                               : ch.align === 'center' ? 'center'
                               :                        'flex-start',
            background:          'rgba(245,243,238,0.82)',
            backdropFilter:      'blur(24px) saturate(150%)',
            WebkitBackdropFilter:'blur(24px) saturate(150%)',
            border:              '1px solid rgba(245,243,238,0.90)',
            borderRadius:        'var(--radius-2xl)',
            padding:             'clamp(24px, 3vw, 40px)',
            maxWidth:            ch.align === 'center' ? '760px' : '520px',
            width:               '100%',
            boxShadow:           '0 8px 40px rgba(20,19,15,0.10)',
          }}>

            {/* Chapter pill */}
            <div style={{
              display:     'inline-flex',
              alignItems:  'center',
              gap:         '8px',
              marginBottom:'20px',
              padding:     '5px 12px',
              background:  'rgba(20,19,15,0.06)',
              border:      '1px solid rgba(20,19,15,0.10)',
              borderRadius:'999px',
            }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--forest-mid)', display:'block', flexShrink:0 }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-muted)' }}>
                {ch.num} / 02 — {ch.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(1.8rem, 4vw, 4rem)',
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
              color:         'var(--ink)',
              whiteSpace:    'pre-line',
              marginBottom:  '16px',
            }}>
              {ch.headline}
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily:  'var(--font-sans)',
              fontWeight:  400,
              fontSize:    'clamp(0.875rem, 1.3vw, 1.05rem)',
              lineHeight:  1.65,
              color:       'var(--ink-muted)',
              marginBottom:'24px',
            }}>
              {ch.sub}
            </p>

            {/* Stat chips */}
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {ch.stats.map(stat => (
                <div
                  key={stat.value}
                  style={{
                    padding:       '10px 16px',
                    background:    'rgba(20,19,15,0.05)',
                    border:        '1px solid rgba(20,19,15,0.10)',
                    borderRadius:  'var(--radius-md)',
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '3px',
                    minWidth:      '100px',
                  }}
                >
                  <span style={{
                    fontFamily:    'var(--font-display)',
                    fontWeight:    700,
                    fontSize:      'clamp(1rem, 1.8vw, 1.35rem)',
                    letterSpacing: '-0.02em',
                    color:         'var(--ink)',
                    lineHeight:    1,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontFamily:   'var(--font-mono)',
                    fontSize:     '10px',
                    letterSpacing:'0.08em',
                    textTransform:'uppercase',
                    color:        'var(--ink-muted)',
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}

      {/* Chapter progress — bottom right */}
      <div style={{
        position:  'absolute',
        bottom:    '32px',
        right:     'var(--container-pad)',
        zIndex:    3,
        display:   'flex',
        flexDirection:'column',
        alignItems:'flex-end',
        gap:       '6px',
        pointerEvents:'none',
      }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={el => {
              /* Highlight the active chapter dot */
              chapterRefs.current[i + 100] = el
            }}
            style={{
              display:   'flex',
              alignItems:'center',
              gap:       '8px',
            }}
          >
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--ink-subtle)' }}>
              {ch.eyebrow}
            </span>
            <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--ink-subtle)', flexShrink:0 }} />
          </div>
        ))}
      </div>
    </section>
  )
}
