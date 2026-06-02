'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Timeline milestones (from landing page copy) ────────────────────── */
const MILESTONES = [
  {
    year:  '2008',
    label: 'La Sierra Oaxaqueña',
    body:  'The NGO Gente como Nosotros is founded with a simple idea: create jobs and improve life in isolated rural communities.',
    tag:   'Origins',
  },
  {
    year:  '2011',
    label: 'Gasification & Biochar',
    body:  'We discovered two technologies that changed our direction. Real impact would only come from scaling them to an industrial level.',
    tag:   'Discovery',
  },
  {
    year:  '2013',
    label: 'G2E is Born',
    body:  'To bring gasification to industrial scale, we founded G2E — convinced we could help decarbonize Mexican industry through waste.',
    tag:   'Founding',
  },
  {
    year:  '2014',
    label: 'Partnership with UNAM',
    body:  'We started working with UNAM\'s Institute of Engineering — the technical foundation for everything that followed.',
    tag:   'Research',
  },
  {
    year:  '2016',
    label: 'Demonstration Center',
    body:  'With SAGARPA funding, we opened the UNAM–SAGARPA–G2E Gasification Technologies Demonstration Center at UNAM\'s main campus.',
    tag:   'Infrastructure',
  },
  {
    year:  '2019',
    label: 'The Invitation',
    body:  'At the direct request of Dr. Claudia Sheinbaum, we partnered with UNAM to decarbonize Mexico City\'s organic waste. The HTC Plant is born.',
    tag:   'Turning Point',
  },
  {
    year:  '2021',
    label: 'Construction Begins',
    body:  'Phase I construction starts at Bordo Poniente — the former landfill where over 1,000,000 m³ of organic matter release methane every day.',
    tag:   'Build',
  },
  {
    year:  '2023',
    label: 'World\'s Largest Plant',
    body:  'Phase I is completed. Our 3 t/hr reactor becomes the largest HTC plant in the world processing municipal organic waste.',
    tag:   'Record',
  },
  {
    year:  '2025',
    label: 'Operate & Improve',
    body:  'Two years of staged operation campaigns teach us about feedstock conditioning, system robustness, and process control.',
    tag:   'Operations',
  },
  {
    year:  '2026',
    label: 'Designing Replication',
    body:  'Phase II is formalized: 10 additional modules, USD 150 million investment. The method to make every new plant faster and cheaper to build.',
    tag:   'Scale',
  },
]

/* Each card is 340px wide + 24px gap. We add viewport width so the last
   card can reach center-screen. */
const CARD_W   = 340
const CARD_GAP = 24
const RAIL_EXTRA = 200   // breathing room after last card

export default function TimelineSection() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const railRef     = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    const rail = railRef.current
    const line = lineRef.current
    if (!wrap || !rail || !line) return

    const totalCards  = MILESTONES.length
    const railWidth   = totalCards * (CARD_W + CARD_GAP) - CARD_GAP + RAIL_EXTRA
    const scrollDist  = railWidth - window.innerWidth + 160   // 160 = left padding

    const ctx = gsap.context(() => {
      /* ── Horizontal scroll ─────────────────────────────────────── */
      const st = ScrollTrigger.create({
        trigger:  wrap,
        start:    'top top',
        end:      `+=${scrollDist}`,
        pin:      true,
        scrub:    0.6,
        onUpdate: (self) => {
          const p = self.progress

          /* Move rail */
          gsap.set(rail, { x: -p * scrollDist })

          /* Fill progress line */
          gsap.set(line, { scaleX: p })

          /* Activate dots & fade cards */
          const activeIndex = Math.floor(p * totalCards)
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return
            const active = i <= activeIndex
            dot.style.background        = active ? 'var(--forest-mid)' : 'rgba(20,19,15,0.15)'
            dot.style.borderColor       = active ? 'var(--forest-mid)' : 'rgba(20,19,15,0.20)'
            dot.style.transform         = active ? 'scale(1.25)'       : 'scale(1)'
          })

          cardRefs.current.forEach((card, i) => {
            if (!card) return
            /* Cards fade in as they enter view, stay fully visible once active */
            const cardProgress = p * totalCards - i
            const opacity = Math.min(1, Math.max(0, cardProgress * 3))
            const translateY = (1 - Math.min(1, cardProgress)) * 16
            card.style.opacity   = String(opacity)
            card.style.transform = `translateY(${translateY}px)`
          })
        },
      })

      return () => st.kill()
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapRef}
      id="timeline"
      aria-label="G2E company timeline"
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        overflow:   'hidden',
        background: 'var(--bg-dark)',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── Section header ─────────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{ position: 'relative', zIndex: 2, marginBottom: '48px', flexShrink: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.40)',
          }}>
            Our story
          </span>
          <div style={{ height: '1px', width: '28px', background: 'rgba(245,243,238,0.14)' }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.25)',
          }}>
            2008 — 2026
          </span>
        </div>

        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    800,
          fontSize:      'clamp(2rem, 4vw, 3.5rem)',
          lineHeight:    0.95,
          letterSpacing: '-0.03em',
          color:         '#FFFFFF',
          maxWidth:      '640px',
        }}>
          From a rural NGO<br />
          <span style={{ color: 'rgba(245,243,238,0.45)' }}>to the world&apos;s largest<br />HTC plant.</span>
        </h2>
      </div>

      {/* ── Progress line ───────────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{ position: 'relative', zIndex: 2, marginBottom: '20px', flexShrink: 0 }}
      >
        {/* Track */}
        <div style={{
          position:     'relative',
          height:       '2px',
          background:   'rgba(245,243,238,0.08)',
          borderRadius: '999px',
          overflow:     'visible',
        }}>
          {/* Fill */}
          <div
            ref={lineRef}
            style={{
              position:     'absolute',
              top:          0, left: 0,
              width:        '100%',
              height:       '100%',
              background:   'var(--forest-light)',
              borderRadius: '999px',
              transformOrigin: 'left center',
              transform:    'scaleX(0)',
              willChange:   'transform',
            }}
          />

          {/* Dots */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el }}
              title={m.year}
              style={{
                position:     'absolute',
                top:          '50%',
                left:         `${(i / (MILESTONES.length - 1)) * 100}%`,
                transform:    'translate(-50%, -50%)',
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   'rgba(20,19,15,0.15)',
                border:       '1.5px solid rgba(20,19,15,0.20)',
                transition:   'background 300ms, border-color 300ms, transform 300ms',
                willChange:   'background, transform',
              }}
            />
          ))}
        </div>

        {/* Year labels under dots */}
        <div style={{ position: 'relative', height: '20px', marginTop: '8px' }}>
          {MILESTONES.map((m, i) => (
            <span
              key={i}
              style={{
                position:      'absolute',
                left:          `${(i / (MILESTONES.length - 1)) * 100}%`,
                transform:     'translateX(-50%)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '9px',
                letterSpacing: '0.10em',
                color:         'rgba(245,243,238,0.28)',
                whiteSpace:    'nowrap',
              }}
            >
              {m.year}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrolling rail ──────────────────────────────────────────── */}
      <div style={{
        position:   'relative',
        zIndex:     2,
        flexShrink: 0,
        paddingLeft: 'var(--container-pad)',
      }}>
        <div
          ref={railRef}
          style={{
            display:   'flex',
            gap:       `${CARD_GAP}px`,
            alignItems:'stretch',
            willChange:'transform',
          }}
        >
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                flexShrink:  0,
                width:       `${CARD_W}px`,
                background:  'rgba(245,243,238,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border:      '1px solid rgba(245,243,238,0.10)',
                borderRadius:'var(--radius-2xl)',
                padding:     '28px 28px 32px',
                display:     'flex',
                flexDirection:'column',
                gap:         '12px',
                opacity:     0,
                willChange:  'opacity, transform',
              }}
            >
              {/* Tag */}
              <div style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '6px',
                padding:       '4px 10px',
                background:    'rgba(245,243,238,0.07)',
                border:        '1px solid rgba(245,243,238,0.12)',
                borderRadius:  '999px',
                alignSelf:     'flex-start',
              }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--forest-light)', flexShrink:0 }} />
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,243,238,0.45)',
                }}>
                  {m.tag}
                </span>
              </div>

              {/* Year */}
              <div style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(2.4rem, 4vw, 3.2rem)',
                lineHeight:    1,
                letterSpacing: '-0.04em',
                color:         '#FFFFFF',
              }}>
                {m.year}
              </div>

              {/* Label */}
              <div style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    700,
                fontSize:      'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight:    1.2,
                letterSpacing: '-0.02em',
                color:         'rgba(245,243,238,0.90)',
              }}>
                {m.label}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(245,243,238,0.10)', margin: '4px 0' }} />

              {/* Body */}
              <p style={{
                fontFamily:  'var(--font-sans)',
                fontWeight:  300,
                fontSize:    'clamp(0.825rem, 1.1vw, 0.9rem)',
                lineHeight:  1.65,
                color:       'rgba(245,243,238,0.55)',
                margin:      0,
              }}>
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ─────────────────────────────────────────────── */}
      <div style={{
        position:  'absolute',
        bottom:    '32px',
        right:     'var(--container-pad)',
        zIndex:    3,
        display:   'flex',
        alignItems:'center',
        gap:       '8px',
        pointerEvents:'none',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'rgba(245,243,238,0.22)',
        }}>
          Scroll to explore
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,243,238,0.22)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </section>
  )
}
