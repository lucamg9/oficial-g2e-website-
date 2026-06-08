'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { year: '2008', label: 'La Sierra Oaxaqueña',   body: 'The NGO Gente como Nosotros is founded with a simple idea: create jobs and improve life in isolated rural communities.',                                                              tag: 'Origins'       },
  { year: '2011', label: 'Gasification & Biochar', body: 'We discovered two technologies that changed our direction. Real impact would only come from scaling them to an industrial level.',                                                     tag: 'Discovery'     },
  { year: '2013', label: 'G2E is Born',            body: 'To bring gasification to industrial scale, we founded G2E — convinced we could help decarbonize Mexican industry through waste.',                                                      tag: 'Founding'      },
  { year: '2014', label: 'Partnership with UNAM',  body: "We started working with UNAM's Institute of Engineering — the technical foundation for everything that followed.",                                                                     tag: 'Research'      },
  { year: '2016', label: 'Demonstration Center',   body: "With SAGARPA funding, we opened the UNAM–SAGARPA–G2E Gasification Technologies Demonstration Center at UNAM's main campus.",                                                          tag: 'Infrastructure'},
  { year: '2019', label: 'The Invitation',         body: "At the direct request of Dr. Claudia Sheinbaum, we partnered with UNAM to decarbonize Mexico City's organic waste. The HTC Plant is born.",                                          tag: 'Turning Point' },
  { year: '2021', label: 'Construction Begins',    body: 'Phase I construction starts at Bordo Poniente — the former landfill where over 1,000,000 m³ of organic matter release methane every day.',                                           tag: 'Build'         },
  { year: '2023', label: "World's Largest Plant",  body: 'Phase I is completed. Our 3 t/hr reactor becomes the largest HTC plant in the world processing municipal organic waste.',                                                             tag: 'Record'        },
  { year: '2025', label: 'Operate & Improve',      body: 'Two years of staged operation campaigns teach us about feedstock conditioning, system robustness, and process control.',                                                              tag: 'Operations'    },
  { year: '2026', label: 'Designing Replication',  body: 'Phase II is formalized: 10 additional modules, USD 150 million investment. The method to make every new plant faster and cheaper to build.',                                         tag: 'Scale'         },
]

const N          = MILESTONES.length
const CARD_W     = 360
const CARD_GAP   = 24
const RAIL_EXTRA = 80

export default function TimelineSection() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const railRef     = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const exitWipeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const rail = railRef.current
    const line = lineRef.current
    if (!wrap || !rail || !line) return

    const railWidth  = N * (CARD_W + CARD_GAP) - CARD_GAP + RAIL_EXTRA
    /* start rail so first card is centred: offset = (vw - cardW) / 2 */
    const getStart   = () => Math.max(48, (window.innerWidth - CARD_W) / 2)
    const scrollDist = () => railWidth + getStart() - window.innerWidth + 48

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger:  wrap,
        start:    'top top',
        end:      () => `+=${scrollDist()}`,
        pin:      true,
        scrub:    0.5,
        onLeave() {
          if (exitWipeRef.current) exitWipeRef.current.style.opacity = '0'
        },
        onUpdate: (self) => {
          const p = self.progress
          const sd = scrollDist()

          /* horizontal scroll */
          gsap.set(rail, { x: -(p * sd - getStart()) })

          /* progress line fill */
          gsap.set(line, { scaleX: p })

          /* dot states */
          const activeIdx = Math.min(Math.floor(p * N), N - 1)
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return
            const on = i <= activeIdx
            dot.style.background  = on ? 'var(--forest-800)' : 'var(--sand-300)'
            dot.style.transform   = `translate(-50%,-50%) scale(${on ? 1.4 : 1})`
            dot.style.boxShadow   = on ? '0 0 0 3px rgba(15,61,46,0.15)' : 'none'
          })

          /* exit wipe — dark, 0→1 over last 8% — fades to HowItWorksSection */
          if (exitWipeRef.current) {
            exitWipeRef.current.style.opacity = String(Math.max(0, (p - 0.92) / 0.08))
          }

          /* card reveal — scale + fade + translate, staggered feel */
          cardRefs.current.forEach((card, i) => {
            if (!card) return
            const cp      = p * N - i          /* 0→1 as this card enters view */
            const visible = Math.max(0, Math.min(1, cp * 2.2))
            const ty      = (1 - Math.min(1, cp * 1.6)) * 32
            const sc      = 0.88 + 0.12 * Math.min(1, cp * 2.2)
            card.style.opacity   = String(visible)
            card.style.transform = `translateY(${ty}px) scale(${sc})`
          })
        },
      })
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapRef}
      id="timeline"
      aria-label="G2E company timeline"
      style={{
        position:       'relative',
        width:          '100%',
        height:         '100vh',
        overflow:       'hidden',
        background:     'var(--cream-100)',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
      }}
    >

      {/* Warm ambient tint */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        inset:         0,
        background:    'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(15,61,46,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Section header ───────────────────────────────────────────── */}
      <div className="g2e-container" style={{ position: 'relative', zIndex: 2, marginBottom: '44px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', background: 'var(--oat-150)',
            border: '1px solid var(--sand-300)', borderRadius: '999px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--clay-500)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-600)' }}>
              Our story
            </span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.10em', color: 'var(--ink-500)' }}>
            2008 — 2026
          </span>
        </div>

        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    800,
          fontSize:      'clamp(2rem, 4vw, 3.25rem)',
          lineHeight:    0.97,
          letterSpacing: '-0.03em',
          color:         'var(--ink-900)',
          maxWidth:      '540px',
          margin:        0,
        }}>
          From a rural NGO<br />
          <span style={{ color: 'var(--ink-500)' }}>to the world&apos;s largest<br />HTC plant.</span>
        </h2>
      </div>

      {/* ── Progress line ────────────────────────────────────────────── */}
      <div className="g2e-container" style={{ position: 'relative', zIndex: 2, marginBottom: '32px', flexShrink: 0 }}>
        {/* Track */}
        <div style={{
          position:     'relative',
          height:       '2px',
          background:   'var(--sand-300)',
          borderRadius: '999px',
          overflow:     'visible',
        }}>
          {/* Fill */}
          <div
            ref={lineRef}
            style={{
              position:        'absolute',
              inset:           0,
              background:      'var(--forest-800)',
              borderRadius:    '999px',
              transformOrigin: 'left center',
              transform:       'scaleX(0)',
              willChange:      'transform',
            }}
          />

          {/* Milestone dots */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el }}
              title={`${m.year} — ${m.label}`}
              style={{
                position:     'absolute',
                top:          '50%',
                left:         `${(i / (N - 1)) * 100}%`,
                transform:    'translate(-50%,-50%)',
                width:        '9px',
                height:       '9px',
                borderRadius: '50%',
                background:   'var(--sand-300)',
                transition:   'background 300ms, transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms',
                willChange:   'background, transform',
              }}
            />
          ))}
        </div>

        {/* Year labels */}
        <div style={{ position: 'relative', height: '18px', marginTop: '9px' }}>
          {MILESTONES.map((m, i) => (
            <span
              key={i}
              style={{
                position:      'absolute',
                left:          `${(i / (N - 1)) * 100}%`,
                transform:     'translateX(-50%)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '9px',
                letterSpacing: '0.06em',
                color:         'var(--ink-500)',
                whiteSpace:    'nowrap' as const,
              }}
            >
              {m.year}
            </span>
          ))}
        </div>
      </div>

      {/* ── Card rail — first card centred on mount ───────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, flexShrink: 0, overflow: 'visible' }}>
        <div
          ref={railRef}
          style={{
            display:    'flex',
            gap:        `${CARD_GAP}px`,
            alignItems: 'stretch',
            willChange: 'transform',
            /* initial x set in JS so first card is centred */
          }}
        >
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                flexShrink:    0,
                width:         `${CARD_W}px`,
                background:    '#FFFFFF',
                border:        '1px solid var(--sand-300)',
                borderRadius:  '24px',
                padding:       '32px 32px 36px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '12px',
                opacity:       0,
                transform:     'translateY(32px) scale(0.88)',
                willChange:    'opacity, transform',
                boxShadow:     '0 4px 12px rgba(22,25,15,0.04), 0 12px 32px -8px rgba(22,25,15,0.10)',
              }}
            >
              {/* Tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '4px 10px', background: 'var(--oat-150)',
                border: '1px solid var(--sand-300)', borderRadius: '999px',
                alignSelf: 'flex-start',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--clay-500)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: 'var(--ink-600)' }}>
                  {m.tag}
                </span>
              </div>

              {/* Year */}
              <div style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(2.4rem, 3.8vw, 3rem)',
                lineHeight:    1,
                letterSpacing: '-0.045em',
                color:         'var(--ink-900)',
              }}>
                {m.year}
              </div>

              {/* Label */}
              <div style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    700,
                fontSize:      'clamp(0.95rem, 1.3vw, 1.08rem)',
                lineHeight:    1.2,
                letterSpacing: '-0.02em',
                color:         'var(--ink-700)',
              }}>
                {m.label}
              </div>

              <div style={{ height: '1px', background: 'var(--sand-300)', margin: '2px 0' }} />

              <p style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize:   'clamp(0.82rem, 1vw, 0.9rem)',
                lineHeight: 1.68,
                color:      'var(--ink-600)',
                margin:     0,
              }}>
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position:      'absolute',
        bottom:        '28px',
        right:         'var(--container-pad)',
        zIndex:        3,
        display:       'flex',
        alignItems:    'center',
        gap:           '8px',
        pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-500)' }}>
          Scroll to explore
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-500)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      {/* ── Exit wipe — dark, fades to HowItWorksSection ─────────────── */}
      <div
        ref={exitWipeRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          zIndex:        10,
          background:    '#0A0C0A',
          opacity:       0,
          pointerEvents: 'none',
          willChange:    'opacity',
        }}
      />

    </section>
  )
}
