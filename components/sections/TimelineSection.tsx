'use client'

import { useEffect, useRef } from 'react'

/* ─── Milestone data ────────────────────────────────────────────────────── */
type Status = 'past' | 'current' | 'future'

const MILESTONES: {
  year:   string
  label:  string
  body:   string
  tag:    string
  status: Status
}[] = [
  {
    year:   '2008',
    label:  'La Sierra Oaxaqueña',
    body:   'The NGO Gente como Nosotros is founded with a simple idea: create jobs and improve life in isolated rural communities.',
    tag:    'Origins',
    status: 'past',
  },
  {
    year:   '2011',
    label:  'Gasification & Biochar',
    body:   'We discovered two technologies that changed our direction. Real impact would only come from scaling them to an industrial level.',
    tag:    'Discovery',
    status: 'past',
  },
  {
    year:   '2013',
    label:  'G2E is Born',
    body:   'To bring gasification to industrial scale, we founded G2E — convinced we could help decarbonize Mexican industry through waste.',
    tag:    'Founding',
    status: 'past',
  },
  {
    year:   '2014',
    label:  'Partnership with UNAM',
    body:   "We started working with UNAM's Institute of Engineering — the technical foundation for everything that followed.",
    tag:    'Research',
    status: 'past',
  },
  {
    year:   '2016',
    label:  'Demonstration Center',
    body:   "With SAGARPA funding, we opened the UNAM–SAGARPA–G2E Gasification Technologies Demonstration Center at UNAM's main campus.",
    tag:    'Infrastructure',
    status: 'past',
  },
  {
    year:   '2019',
    label:  'The Invitation',
    body:   "At the direct request of Dr. Claudia Sheinbaum, we partnered with UNAM to decarbonize Mexico City's organic waste. The HTC Plant is born.",
    tag:    'Turning Point',
    status: 'past',
  },
  {
    year:   '2021',
    label:  'Construction Begins',
    body:   'Phase I construction starts at Bordo Poniente — the former landfill where over 1,000,000 m³ of organic matter release methane every day.',
    tag:    'Build',
    status: 'past',
  },
  {
    year:   '2023',
    label:  "World's Largest Plant",
    body:   'Phase I is completed. Our 3 t/hr reactor becomes the largest HTC plant in the world processing municipal organic waste.',
    tag:    'Record',
    status: 'past',
  },
  {
    year:   '2026',
    label:  'Operate & Scale',
    body:   'Two years of staged operation campaigns refine feedstock conditioning and process control. Phase II is formalized: 10 additional modules, USD 150 million investment.',
    tag:    'Now',
    status: 'current',
  },
  {
    year:   '2027',
    label:  'Replication at Scale',
    body:   'Phase II launches. The method to make every new plant faster and cheaper to build becomes the foundation for global expansion.',
    tag:    'Phase II',
    status: 'future',
  },
]

/* ─── Dot colours by status ─────────────────────────────────────────────── */
const DOT_COLOR: Record<Status, string> = {
  past:    'var(--sand-300)',
  current: 'var(--clay-500)',
  future:  'var(--oat-200)',
}
const DOT_BORDER: Record<Status, string> = {
  past:    'var(--ink-500)',
  current: 'var(--clay-500)',
  future:  'var(--sand-300)',
}

/* ─── Single milestone row ──────────────────────────────────────────────── */
function MilestoneRow({
  milestone,
  index,
  isLast,
}: {
  milestone: typeof MILESTONES[number]
  index:     number
  isLast:    boolean
}) {
  const rowRef  = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row  = rowRef.current
    const year = yearRef.current
    if (!row || !year) return

    // Initial hidden state
    row.style.opacity  = '0'
    row.style.transform = 'translateY(28px)'
    year.style.opacity  = '0'
    year.style.transform = 'translateY(16px)'

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        const delay = index * 0 // stagger is per-milestone so we don't stack delays

        setTimeout(() => {
          row.style.transition  = 'opacity 600ms cubic-bezier(0.4,0,0.2,1), transform 600ms cubic-bezier(0.4,0,0.2,1)'
          row.style.opacity     = '1'
          row.style.transform   = 'translateY(0)'
        }, delay)

        setTimeout(() => {
          year.style.transition  = 'opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)'
          year.style.opacity     = '1'
          year.style.transform   = 'translateY(0)'
        }, delay + 80)

        obs.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' },
    )

    obs.observe(row)
    return () => obs.disconnect()
  }, [index])

  const isCurrent = milestone.status === 'current'
  const isFuture  = milestone.status === 'future'

  return (
    <div
      style={{
        display:  'grid',
        // desktop: [year col] [spine col] [content col]
        // mobile:  [spine col] [content col] via media query override below
        gridTemplateColumns: 'var(--tl-year-w, 160px) 1px 1fr',
        gap:      '0 var(--tl-gap, 40px)',
        position: 'relative',
      }}
      className="tl-row"
    >
      {/* ── Year ──────────────────────────────────────────────────────── */}
      <div
        ref={yearRef}
        style={{
          paddingTop:    '2px',
          paddingBottom: isLast ? 0 : '80px',
          textAlign:     'right',
          flexShrink:    0,
        }}
        className="tl-year-col"
      >
        <span
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(2.4rem, 5vw, 4.5rem)',
            lineHeight:    1,
            letterSpacing: '-0.04em',
            color:         isCurrent
              ? 'var(--clay-500)'
              : isFuture
                ? 'var(--sand-300)'
                : 'var(--ink-900)',
            display: 'block',
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* ── Spine ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Vertical line */}
        {!isLast && (
          <div
            style={{
              position:   'absolute',
              top:        '14px',
              bottom:     '-14px',
              left:       '50%',
              transform:  'translateX(-50%)',
              width:      '1px',
              background: isFuture
                ? 'repeating-linear-gradient(to bottom, var(--sand-300) 0, var(--sand-300) 6px, transparent 6px, transparent 12px)'
                : 'var(--sand-300)',
            }}
          />
        )}

        {/* Node dot */}
        <div
          style={{
            position:     'absolute',
            top:          '6px',
            left:         '50%',
            transform:    'translateX(-50%)',
            width:        isCurrent ? '14px' : '10px',
            height:       isCurrent ? '14px' : '10px',
            borderRadius: '50%',
            background:   DOT_COLOR[milestone.status],
            border:       `2px solid ${DOT_BORDER[milestone.status]}`,
            boxShadow:    isCurrent ? '0 0 0 4px var(--clay-100)' : 'none',
            transition:   'transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
            zIndex:       1,
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        ref={rowRef}
        style={{
          paddingBottom: isLast ? '0' : '80px',
          paddingTop:    '0',
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '6px',
            padding:      '4px 10px',
            background:   isCurrent ? 'var(--clay-100)' : 'var(--oat-150)',
            border:       `1px solid ${isCurrent ? 'var(--clay-200)' : 'var(--sand-300)'}`,
            borderRadius: '999px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   isCurrent ? 'var(--clay-500)' : 'var(--ink-500)',
              flexShrink:   0,
            }}
          />
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         isCurrent ? 'var(--clay-700)' : 'var(--ink-600)',
            }}
          >
            {milestone.tag}
          </span>
        </div>

        {/* Milestone headline */}
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    700,
            fontSize:      'clamp(1.1rem, 2vw, 1.35rem)',
            lineHeight:    1.2,
            letterSpacing: '-0.02em',
            color:         isFuture ? 'var(--ink-500)' : 'var(--ink-900)',
            marginBottom:  '10px',
          }}
        >
          {milestone.label}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize:   'clamp(0.875rem, 1.2vw, 0.95rem)',
            lineHeight: 1.72,
            color:      isFuture ? 'var(--ink-500)' : 'var(--ink-600)',
            maxWidth:   '500px',
            margin:     0,
          }}
        >
          {milestone.body}
        </p>
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function TimelineSection() {
  const headerRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header  = headerRef.current
    const eyebrow = eyebrowRef.current
    if (!header || !eyebrow) return

    eyebrow.style.opacity   = '0'
    eyebrow.style.transform = 'translateY(16px)'
    header.style.opacity    = '0'
    header.style.transform  = 'translateY(24px)'

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        setTimeout(() => {
          eyebrow.style.transition = 'opacity 500ms ease, transform 500ms ease'
          eyebrow.style.opacity    = '1'
          eyebrow.style.transform  = 'translateY(0)'
        }, 0)
        setTimeout(() => {
          header.style.transition = 'opacity 600ms ease, transform 600ms ease'
          header.style.opacity    = '1'
          header.style.transform  = 'translateY(0)'
        }, 100)
        obs.disconnect()
      },
      { threshold: 0.3 },
    )
    obs.observe(eyebrow)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Responsive CSS injected once */}
      <style>{`
        /* ── Timeline responsive grid ─────────────────────────── */

        /* Desktop: three-column [year | spine | content] */
        .tl-row {
          --tl-year-w: 140px;
          --tl-gap: 36px;
          grid-template-columns: var(--tl-year-w) 1px 1fr;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .tl-row {
            --tl-year-w: 100px;
            --tl-gap: 24px;
          }
        }

        /* Mobile: two-column [spine | content], year moves above content */
        @media (max-width: 640px) {
          .tl-row {
            grid-template-columns: 20px 1fr;
            --tl-gap: 20px;
            gap: 0 var(--tl-gap);
          }
          .tl-year-col {
            display: none !important;
          }
        }
      `}</style>

      <section
        id="timeline"
        aria-label="G2E company timeline"
        style={{
          background: 'var(--cream-100)',
          padding:    'clamp(80px, 10vw, 140px) 0',
        }}
      >
        <div
          className="g2e-container"
          style={{ maxWidth: '920px' }}
        >

          {/* ── Section header ──────────────────────────────────────── */}
          <div style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}>

            <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span
                style={{
                  display:    'inline-flex',
                  alignItems: 'center',
                  gap:        '6px',
                  padding:    '4px 12px',
                  background: 'var(--oat-150)',
                  border:     '1px solid var(--sand-300)',
                  borderRadius: '999px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--clay-500)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-600)' }}>
                  Our Story
                </span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.10em', color: 'var(--ink-500)' }}>
                2008 — 2027
              </span>
            </div>

            <div ref={headerRef}>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(2.2rem, 5vw, 3.8rem)',
                  lineHeight:    0.97,
                  letterSpacing: '-0.035em',
                  color:         'var(--ink-900)',
                  marginBottom:  '20px',
                }}
              >
                From a rural NGO<br />
                <span style={{ color: 'var(--ink-500)' }}>to the world&apos;s largest<br />HTC plant.</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize:   'clamp(0.95rem, 1.4vw, 1.05rem)',
                  lineHeight: 1.72,
                  color:      'var(--ink-600)',
                  maxWidth:   '520px',
                  margin:     0,
                }}
              >
                Nineteen years of patient engineering, institutional partnerships,
                and a conviction that waste can become fuel.
              </p>
            </div>
          </div>

          {/* ── Timeline body ──────────────────────────────────────────── */}
          <div>
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.year}
                milestone={m}
                index={i}
                isLast={i === MILESTONES.length - 1}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
