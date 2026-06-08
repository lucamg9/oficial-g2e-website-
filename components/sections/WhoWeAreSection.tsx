'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC   = '/motion/story/who-we-are.mp4'
const SCROLL_DIST = 3600   // 900px per chapter — snappier pacing
const LERP        = 0.18   // higher = more immediate video response
const FADE        = 0.08   // fraction of total progress for fade window

/* ─── 4 chapters mapped to progress 0 → 1 ─────────────────────────────── */
const CHAPTERS = [
  {
    eyebrow:  '01 · Carbon',
    headline: 'Circular economy,\nat scale.',
    body:     'G2E is a pioneering Mexican technology firm dedicated to the circular economy. We capture urban organic waste — which traditionally generates greenhouse gases in landfills.',
    in:  0.00,
    out: 0.25,
  },
  {
    eyebrow:  '02 · Hydrochar',
    headline: 'Waste becomes\nhigh-value material.',
    body:     'We convert organic waste into hydrochar — a sustainable replacement for mineral coal that regenerates agricultural soil and creates lasting carbon sequestration.',
    in:  0.22,
    out: 0.50,
  },
  {
    eyebrow:  '03 · Agriculture',
    headline: 'Barren land\nbecomes productive.',
    body:     'Hydrochar restores farmland and facilitates the decarbonization of the steel industry — turning what cities discard into a foundation for regenerative growth.',
    in:  0.47,
    out: 0.75,
  },
  {
    eyebrow:  '04 · Impact',
    headline: 'From laboratory\nto urban infrastructure.',
    body:     'Collaborating with UNAM, the Mexican Government, and international stakeholders, we operate the world\'s largest hydrothermal carbonization plant dedicated to municipal organic waste.',
    in:  0.72,
    out: 1.00,
  },
]

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

export default function WhoWeAreSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([])
  const targetTime  = useRef(0)
  const lerpedTime  = useRef(0)
  const rafRef      = useRef<number>(0)
  const last = CHAPTERS.length - 1

  /* ─── RAF lerp scrub ──────────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const v = videoRef.current
      if (v && v.readyState >= 2) {
        const next = lerpedTime.current + (targetTime.current - lerpedTime.current) * LERP
        if (Math.abs(next - lerpedTime.current) > 0.0005) {
          lerpedTime.current = next
          try { v.currentTime = next } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* ─── ScrollTrigger ───────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const resetToStart = () => {
      targetTime.current  = 0
      lerpedTime.current  = 0
      chapterRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity   = i === 0 ? '1' : '0'
        el.style.transform = 'translateY(0px)'
        el.style.filter    = 'blur(0px)'
      })
      dotRefs.current.forEach((d, i) => {
        if (!d) return
        d.style.background = i === 0 ? 'var(--clay-500)' : 'rgba(245,243,238,0.28)'
        d.style.transform  = i === 0 ? 'scaleY(2.8)' : 'scaleY(1)'
      })
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      pin:     true,
      scrub:   0.4,
      onLeave() { resetToStart() },
      onUpdate(self) {
        const p = self.progress

        /* video scrub */
        targetTime.current = p * (videoRef.current?.duration || 30)

        /* chapter opacity + lift */
        CHAPTERS.forEach((ch, i) => {
          const el = chapterRefs.current[i]
          if (!el) return

          const inP  = clamp((p - ch.in)  / FADE, 0, 1)
          const outP = clamp((ch.out - p) / FADE, 0, 1)
          const alpha = i === last ? clamp(inP, 0, 1) : Math.min(inP, outP)

          const yBase  = i === last ? (1 - inP) * 18 : (outP < inP ? -14 : 18)
          const yShift = i === last ? (1 - inP) * 18 : (1 - Math.min(inP, outP)) * yBase

          el.style.opacity   = String(alpha)
          el.style.transform = `translateY(${yShift}px)`
          el.style.filter    = alpha < 0.55
            ? `blur(${(1 - alpha / 0.55) * 5}px)`
            : 'blur(0px)'
        })

        /* dot indicator */
        const activeIdx = clamp(Math.floor(p * CHAPTERS.length), 0, last)
        dotRefs.current.forEach((d, i) => {
          if (!d) return
          d.style.background = i === activeIdx ? 'var(--clay-500)' : 'rgba(245,243,238,0.28)'
          d.style.transform  = i === activeIdx ? 'scaleY(2.8)' : 'scaleY(1)'
        })
      },
    })

    return () => st.kill()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Who we are"
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        overflow:   'hidden',
        background: '#090C08',
      }}
    >

      {/* ── Full-bleed video ─────────────────────────────────────────── */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
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
        }}
      />

      {/* Left anchor gradient — text panel readability */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        inset:         0,
        background:    'linear-gradient(to right, rgba(9,12,8,0.62) 0%, rgba(9,12,8,0.22) 48%, rgba(9,12,8,0.02) 100%)',
        zIndex:        1,
        pointerEvents: 'none',
      }} />
      {/* Entry fade */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           0, left: 0, right: 0,
        height:        '14%',
        background:    'linear-gradient(to top, transparent 0%, rgba(9,12,8,0.60) 100%)',
        zIndex:        1,
        pointerEvents: 'none',
      }} />
      {/* Exit fade */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        bottom:        0, left: 0, right: 0,
        height:        '16%',
        background:    'linear-gradient(to bottom, transparent 0%, rgba(9,12,8,0.75) 100%)',
        zIndex:        1,
        pointerEvents: 'none',
      }} />

      {/* ── Content layer ────────────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{
          position:      'absolute',
          inset:         0,
          zIndex:        2,
          display:       'flex',
          alignItems:    'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width:               '100%',
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems:          'center',
          gap:                 '40px',
        }}>

          {/* ── LEFT — stacked chapter panels ────────────────────────── */}
          <div style={{ position: 'relative', height: '360px' }}>
            {CHAPTERS.map((ch, i) => (
              <div
                key={i}
                ref={el => { chapterRefs.current[i] = el }}
                style={{
                  position:      'absolute',
                  top:           0,
                  left:          0,
                  right:         0,
                  opacity:       i === 0 ? 1 : 0,
                  transform:     'translateY(0px)',
                  willChange:    'opacity, transform, filter',
                  pointerEvents: 'none',
                }}
              >
                {/* Eyebrow */}
                <div style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '10px',
                  marginBottom: '22px',
                }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase' as const,
                    color:         'var(--clay-500)',
                  }}>
                    {ch.eyebrow}
                  </span>
                  <div style={{ height: '1px', width: '28px', background: 'rgba(197,106,56,0.35)' }} />
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase' as const,
                    color:         'rgba(245,243,238,0.28)',
                  }}>
                    Who we are
                  </span>
                </div>

                {/* Headline */}
                <h2 style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(2.2rem, 3.8vw, 3.8rem)',
                  lineHeight:    0.96,
                  letterSpacing: '-0.03em',
                  color:         '#FFFFFF',
                  marginBottom:  '26px',
                  whiteSpace:    'pre-line',
                }}>
                  {ch.headline}
                </h2>

                {/* Body */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize:   'clamp(0.92rem, 1.2vw, 1.06rem)',
                  lineHeight: 1.74,
                  color:      'rgba(245,243,238,0.74)',
                  maxWidth:   '420px',
                }}>
                  {ch.body}
                </p>

                {/* CTAs — last chapter only */}
                {i === last && (
                  <div style={{
                    marginTop:     '30px',
                    display:       'flex',
                    gap:           '12px',
                    flexWrap:      'wrap',
                    pointerEvents: 'auto',
                  }}>
                    <a
                      href="#contact"
                      style={{
                        display:        'inline-flex',
                        alignItems:     'center',
                        gap:            '9px',
                        fontFamily:     'var(--font-sans)',
                        fontSize:       '14px',
                        fontWeight:     600,
                        background:     'var(--clay-500)',
                        color:          '#FCFBF6',
                        padding:        '12px 22px',
                        borderRadius:   'var(--radius-pill)',
                        textDecoration: 'none',
                        boxShadow:      '0 6px 24px -8px rgba(148,75,40,0.55)',
                        transition:     'background 180ms',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--clay-600)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'var(--clay-500)')}
                    >
                      Contact our team <span aria-hidden="true">→</span>
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
                        color:          'rgba(245,243,238,0.58)',
                        padding:        '11px 20px',
                        borderRadius:   'var(--radius-pill)',
                        border:         '1px solid rgba(245,243,238,0.18)',
                        textDecoration: 'none',
                        transition:     'border-color 200ms, color 200ms',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(245,243,238,0.45)'
                        e.currentTarget.style.color = '#FFFFFF'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(245,243,238,0.18)'
                        e.currentTarget.style.color = 'rgba(245,243,238,0.58)'
                      }}
                    >
                      Our story
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── RIGHT — vertical chapter dot indicator ───────────────── */}
          <div style={{
            display:        'flex',
            justifyContent: 'flex-end',
            alignItems:     'center',
          }}>
            <div style={{
              display:         'flex',
              flexDirection:   'column',
              gap:             '10px',
              alignItems:      'center',
              paddingRight:    '8px',
            }}>
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  ref={el => { dotRefs.current[i] = el }}
                  style={{
                    width:           '3px',
                    height:          '14px',
                    borderRadius:    '99px',
                    background:      i === 0 ? 'var(--clay-500)' : 'rgba(245,243,238,0.28)',
                    transform:       i === 0 ? 'scaleY(2.8)' : 'scaleY(1)',
                    transition:      'background 380ms, transform 380ms var(--ease-expo)',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Partner strip — bottom ────────────────────────────────────── */}
      <div style={{
        position:       'absolute',
        bottom:         '30px',
        left:           0,
        right:          0,
        zIndex:         3,
        display:        'flex',
        justifyContent: 'center',
        pointerEvents:  'none',
      }}>
        <div style={{
          display:        'flex',
          alignItems:     'center',
          gap:            '20px',
          flexWrap:       'wrap',
          justifyContent: 'center',
        }}>
          {['UNAM', 'Mexican Government', 'SEMARNAT', 'COLPOS · CIMMYT'].map((name, i) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {i > 0 && (
                <span style={{
                  width: '3px', height: '3px', borderRadius: '50%',
                  background: 'rgba(245,243,238,0.18)', display: 'inline-block',
                }} />
              )}
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '9.5px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color:         'rgba(245,243,238,0.28)',
              }}>
                {name}
              </span>
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
