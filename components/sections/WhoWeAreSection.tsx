'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 120
const FPS          = 30
const DURATION     = TOTAL_FRAMES / FPS   // 4.0 s
const PX_PER_FRAME = 5
const SCROLL_DIST  = TOTAL_FRAMES * PX_PER_FRAME  // 600 px
const LERP         = 0.14

const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t

/* ─── Expandable card definitions ─────────────────────────────────────── */
const CARDS = [
  {
    id:      'info',
    label:   'Info',
    icon:    '◎',
    summary: 'What we are and what we do.',
    body:    'G2E turns organic waste into hydrochar — a mineral-grade carbon material that replaces coal, regenerates farmland soil, and decarbonizes the steel industry. We operate the world\'s largest hydrothermal carbonization plant processing municipal organic waste at Bordo Poniente, Mexico City.',
  },
  {
    id:      'goals',
    label:   'Goals',
    icon:    '◈',
    summary: 'Where we are going.',
    body:    'Decarbonize Mexican industry and cities through scalable waste-to-value technology. Replace mineral coal. Regenerate farmland soil. Generate premium technology-based carbon credits. Phase II targets 10 new modules in 2027 and a long-term vision of 170 replicable plants worldwide.',
  },
  {
    id:      'values',
    label:   'Values',
    icon:    '◇',
    summary: 'What drives every decision.',
    body:    'Community roots, scientific rigor, and real-world impact. We built this from an NGO in Oaxaca — not a lab. Every decision is grounded in partnership, transparency, and the conviction that technology must reach the people who need it most.',
  },
  {
    id:      'allies',
    label:   'Allies',
    icon:    '◉',
    summary: 'Who we work with.',
    body:    'UNAM Institute of Engineering · Gobierno de México · SEMARNAT · Government of Mexico City · COLPOS · CIMMYT · SADER · International clean-tech partners. Science, policy, and agriculture — aligned around one mission.',
  },
]

export default function WhoWeAreSection() {
  const [open, setOpen] = useState<string | null>(null)

  const sectionRef  = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const targetTime  = useRef(0)
  const lerpedTime  = useRef(0)
  const rafRef      = useRef<number>(0)

  const toggle = (id: string) => setOpen(prev => prev === id ? null : id)

  /* ─── RAF lerp loop ─────────────────────────────────────────────── */
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

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Hint browser for scrubbing
    video.pause()
    video.playbackRate = 0.000001
    video.currentTime  = 0

    startRaf()

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      pin:     true,
      scrub:   true,
      onUpdate(self) {
        targetTime.current = self.progress * DURATION
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
    }
  }, [startRaf])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Who we are"
      style={{
        position: 'relative',
        width:    '100%',
        height:   '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── Story 2 video — scroll-scrubbed background ──────────────── */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center center',
          display:        'block',
          background:     '#0A0C0A',
          zIndex:         0,
          willChange:     'contents',
        }}
      >
        <source src="/motion/story-2.webm" type="video/webm" />
        <source src="/motion/story-2.mp4"  type="video/mp4"  />
      </video>

      {/* Dark overlay — keeps text readable without blocking the visual */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'rgba(10,12,10,0.58)',
          zIndex:        1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content overlay ─────────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{
          position:       'absolute',
          inset:          0,
          zIndex:         2,
          display:        'flex',
          alignItems:     'center',
          pointerEvents:  'none',   // allow clicks to pass through gaps
        }}
      >
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:                 'clamp(48px, 6vw, 96px)',
            alignItems:          'center',
            width:               '100%',
            pointerEvents:       'auto',   // re-enable for interactive children
          }}
        >

          {/* ── LEFT — text + CTAs ────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color:         'rgba(245,243,238,0.50)',
              }}>
                Who we are
              </span>
              <div style={{ height: '1px', width: '32px', background: 'rgba(245,243,238,0.20)' }} />
            </div>

            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(2.2rem, 4vw, 3.8rem)',
              lineHeight:    0.95,
              letterSpacing: '-0.03em',
              color:         '#FFFFFF',
              marginBottom:  '28px',
            }}>
              We turn waste<br />
              <span style={{ color: 'rgba(245,243,238,0.48)' }}>into value.</span>
            </h2>

            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     'var(--text-lg)',
              lineHeight:   'var(--lh-loose)',
              color:        'rgba(245,243,238,0.90)',
              marginBottom: '16px',
              maxWidth:     '460px',
            }}>
              We&apos;re a Mexican technology company that takes what cities throw away — the organic waste that today releases greenhouse gases in landfills — and transforms it into hydrochar.
            </p>

            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     'var(--text-md)',
              lineHeight:   'var(--lh-loose)',
              color:        'rgba(245,243,238,0.60)',
              marginBottom: '40px',
              maxWidth:     '440px',
            }}>
              We work alongside UNAM, the Mexican Government, and international partners so this technology doesn&apos;t stay in a lab — it reaches every city that needs it.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '10px',
                  fontFamily:     'var(--font-sans)',
                  fontSize:       '14px',
                  fontWeight:     500,
                  background:     'rgba(245,243,238,0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color:          '#FFFFFF',
                  padding:        '13px 22px',
                  borderRadius:   '999px',
                  textDecoration: 'none',
                  border:         '1px solid rgba(245,243,238,0.20)',
                  transition:     'background 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,243,238,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,243,238,0.12)')}
              >
                Contact us
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                </svg>
              </a>

              <a
                href="#timeline"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  fontFamily:     'var(--font-sans)',
                  fontSize:       '14px',
                  fontWeight:     400,
                  color:          'rgba(245,243,238,0.65)',
                  padding:        '12px 20px',
                  borderRadius:   '999px',
                  border:         '1px solid rgba(245,243,238,0.20)',
                  textDecoration: 'none',
                  transition:     'border-color 200ms, color 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,243,238,0.50)'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,243,238,0.20)'
                  e.currentTarget.style.color = 'rgba(245,243,238,0.65)'
                }}
              >
                Our story
              </a>
            </div>
          </div>

          {/* ── RIGHT — 2×2 expandable cards ────────────────────────── */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '10px',
            }}
          >
            {CARDS.map((card) => {
              const isOpen = open === card.id
              return (
                <button
                  key={card.id}
                  onClick={() => toggle(card.id)}
                  aria-expanded={isOpen}
                  style={{
                    all:            'unset',
                    display:        'flex',
                    flexDirection:  'column',
                    cursor:         'pointer',
                    background:     isOpen
                                      ? 'rgba(245,243,238,0.14)'
                                      : 'rgba(245,243,238,0.06)',
                    backdropFilter:      'blur(16px) saturate(140%)',
                    WebkitBackdropFilter:'blur(16px) saturate(140%)',
                    border:         isOpen
                                      ? '1px solid rgba(245,243,238,0.30)'
                                      : '1px solid rgba(245,243,238,0.12)',
                    borderRadius:   'var(--radius-2xl)',
                    padding:        '20px',
                    transition:     'background 280ms var(--ease-expo), border-color 280ms',
                    textAlign:      'left',
                    minHeight:      '140px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize:   '18px',
                        lineHeight:  1,
                        color:      'rgba(245,243,238,0.60)',
                        transition: 'color 280ms',
                      }}>
                        {card.icon}
                      </span>
                      <div style={{
                        width:          '18px',
                        height:         '18px',
                        borderRadius:   '50%',
                        border:         '1px solid rgba(245,243,238,0.22)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        flexShrink:     0,
                        transition:     'transform 280ms',
                        transform:      isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                          stroke="rgba(245,243,238,0.45)"
                          strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </div>
                    </div>

                    <span style={{
                      fontFamily:    'var(--font-display)',
                      fontWeight:    700,
                      fontSize:      'clamp(0.95rem, 1.3vw, 1.1rem)',
                      letterSpacing: '-0.02em',
                      color:         '#FFFFFF',
                      lineHeight:    1.1,
                    }}>
                      {card.label}
                    </span>

                    {!isOpen && (
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize:   'clamp(0.72rem, 0.9vw, 0.80rem)',
                        lineHeight: 1.5,
                        color:      'rgba(245,243,238,0.48)',
                      }}>
                        {card.summary}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      overflow:   'hidden',
                      maxHeight:  isOpen ? '180px' : '0px',
                      opacity:    isOpen ? 1 : 0,
                      marginTop:  isOpen ? '14px' : '0px',
                      transition: 'max-height 380ms var(--ease-expo), opacity 260ms, margin-top 260ms',
                    }}
                  >
                    <div style={{ height: '1px', background: 'rgba(245,243,238,0.14)', marginBottom: '12px' }} />
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize:   'clamp(0.75rem, 0.95vw, 0.84rem)',
                      lineHeight: 1.65,
                      color:      'rgba(245,243,238,0.65)',
                      margin:     0,
                    }}>
                      {card.body}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
