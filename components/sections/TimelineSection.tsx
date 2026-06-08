'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
// framer-motion v12 re-exports under both 'framer-motion' and 'motion/react'
import {
  Leaf, Flame, Cog, GraduationCap, Building2,
  Globe2, Rocket, Wrench, TrendingUp,
} from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Status = 'past' | 'current' | 'future'

type Milestone = {
  year:        string
  label:       string
  title:       string
  description: string
  tag:         string
  status:      Status
  Icon:        React.ComponentType<{ size?: number; strokeWidth?: number }>
  stat?:       { value: string; unit: string }
}

/* ─── Milestones ────────────────────────────────────────────────────────── */
const MILESTONES: Milestone[] = [
  {
    year:        '2008',
    label:       'Origins',
    title:       'Roots in rural Mexico',
    description: 'NGO "Gente como Nosotros" is founded with a simple idea: create dignified jobs and improve life in isolated rural communities of Oaxaca.',
    tag:         'Foundation',
    status:      'past',
    Icon:        Leaf,
    stat:        { value: '01', unit: 'Origin' },
  },
  {
    year:        '2011',
    label:       'Discovery',
    title:       'Gasification & Biochar',
    description: 'We discover two technologies that change our direction. Real impact would only come from scaling them to industrial level.',
    tag:         'Pivot',
    status:      'past',
    Icon:        Flame,
    stat:        { value: 'Two', unit: 'Key techs' },
  },
  {
    year:        '2013',
    label:       'Founding',
    title:       'G2E is Born',
    description: 'To bring gasification to industrial scale, we found G2E — convinced we could help decarbonize Mexican industry through waste.',
    tag:         'Company',
    status:      'past',
    Icon:        Cog,
    stat:        { value: 'G2E', unit: 'Founded' },
  },
  {
    year:        '2014',
    label:       'Research',
    title:       'Partnership with UNAM',
    description: "We begin working with UNAM's Institute of Engineering — the technical foundation for everything that followed.",
    tag:         'Alliance',
    status:      'past',
    Icon:        GraduationCap,
    stat:        { value: 'R&D', unit: 'Backbone' },
  },
  {
    year:        '2016',
    label:       'Infrastructure',
    title:       'Demonstration Center',
    description: 'With SAGARPA funding, we open the UNAM–SAGARPA–G2E Gasification Technologies Demonstration Center at UNAM\'s main campus.',
    tag:         'Build',
    status:      'past',
    Icon:        Building2,
    stat:        { value: 'Demo', unit: 'Center' },
  },
  {
    year:        '2019',
    label:       'Turning Point',
    title:       'The Invitation',
    description: "At the direct request of Dr. Claudia Sheinbaum, we partner with UNAM to decarbonize Mexico City's organic waste. The HTC Plant is born.",
    tag:         'CDMX',
    status:      'past',
    Icon:        Globe2,
    stat:        { value: '9M+', unit: 'Citizens' },
  },
  {
    year:        '2021',
    label:       'Build',
    title:       'Construction Begins',
    description: 'Phase I construction starts at Bordo Poniente — the former landfill where over 1,000,000 m³ of organic matter release methane every day.',
    tag:         'Phase I',
    status:      'past',
    Icon:        Wrench,
    stat:        { value: '1M+', unit: 'm³ / year' },
  },
  {
    year:        '2023',
    label:       'Record',
    title:       "World's Largest Plant",
    description: 'Phase I is completed. Our 3 t/hr reactor becomes the largest HTC plant in the world processing municipal organic waste.',
    tag:         'Global #1',
    status:      'past',
    Icon:        Globe2,
    stat:        { value: '#1', unit: 'Worldwide' },
  },
  {
    year:        '2026',
    label:       'Now',
    title:       'Operate & Scale',
    description: 'Staged operation campaigns refine feedstock conditioning and process control. Phase II is formalized: 10 additional modules, USD 150 million investment.',
    tag:         'Current',
    status:      'current',
    Icon:        TrendingUp,
    stat:        { value: '$150M', unit: 'Phase II' },
  },
  {
    year:        '2027',
    label:       'Phase II',
    title:       'Replication at Scale',
    description: 'Phase II launches. A continental decarbonization platform designed for partners who think in decades — 10 new modules, verifiable carbon credits.',
    tag:         'Next',
    status:      'future',
    Icon:        Rocket,
    stat:        { value: '×10', unit: 'Modules' },
  },
]

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function TimelineSection() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const [, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping:   22,
    mass:      0.4,
  })

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      aria-label="G2E company timeline"
      style={{
        position:   'relative',
        background: 'var(--cream-100)',
        padding:    'clamp(80px, 10vw, 140px) 0',
      }}
    >
      {/* ── Section header ───────────────────────────────────────────── */}
      <div className="g2e-container" style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', background: 'var(--oat-150)',
            border: '1px solid var(--sand-300)', borderRadius: '999px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--clay-500)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-600)' }}>
              Our Story
            </span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.10em', color: 'var(--ink-500)' }}>
            2008 — 2027
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(2.2rem, 5vw, 3.8rem)',
            lineHeight:    0.97,
            letterSpacing: '-0.035em',
            color:         'var(--ink-900)',
            marginBottom:  '20px',
          }}>
            Seven stages of a<br />
            <span style={{ color: 'var(--ink-500)' }}>single, living system.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize:   'clamp(0.95rem, 1.4vw, 1.05rem)',
            lineHeight: 1.72,
            color:      'var(--ink-600)',
            maxWidth:   '540px',
            margin:     0,
          }}>
            From the first seed planted in rural Mexico to a continental-scale
            decarbonization platform — each milestone built on the resilience
            of the one before it.
          </p>
        </motion.div>
      </div>

      {/* ── Spine + milestone rows ────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{ position: 'relative' }}
      >
        <div style={{ position: 'relative' }}>

          {/* Static spine track */}
          <div
            aria-hidden
            style={{
              position:   'absolute',
              top:        0,
              bottom:     0,
              left:       'var(--spine-x, 20px)',
              width:      '2px',
              borderRadius: '999px',
              background: 'linear-gradient(to bottom, transparent, rgba(15,61,46,0.14) 8%, rgba(15,61,46,0.14) 92%, transparent)',
              zIndex:     0,
            }}
          />

          {/* Growing spine — scroll driven */}
          <motion.div
            aria-hidden
            style={{
              height:       lineHeight,
              position:     'absolute',
              top:          0,
              left:         'var(--spine-x, 20px)',
              width:        '2px',
              borderRadius: '999px',
              transformOrigin: 'top',
              zIndex:       1,
            }}
          >
            <div style={{
              height: '100%',
              width:  '100%',
              borderRadius: '999px',
              background: 'linear-gradient(to bottom, var(--forest-800), var(--forest-700) 45%, var(--clay-500) 90%, var(--clay-600))',
              boxShadow:  '0 0 20px rgba(197,106,56,0.25)',
            }} />

            {/* Leading bloom dot */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position:     'absolute',
                bottom:       '-8px',
                left:         '50%',
                transform:    'translateX(-50%)',
                width:        '16px',
                height:       '16px',
                borderRadius: '50%',
                background:   'radial-gradient(circle, var(--clay-500), rgba(197,106,56,0.5) 60%, transparent)',
                boxShadow:    '0 0 12px var(--clay-500)',
              }}
            />
          </motion.div>

          {/* Milestone list */}
          <ol style={{ position: 'relative', listStyle: 'none', margin: 0, padding: 0 }}>
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.year}
                milestone={m}
                index={i}
                total={MILESTONES.length}
                onActive={() => setActive(i)}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* ── Responsive spine position ─────────────────────────────────── */}
      <style>{`
        /* Desktop: centre spine */
        @media (min-width: 768px) {
          [style*="--spine-x"] {
            --spine-x: calc(50% - 1px) !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ─── MilestoneRow ──────────────────────────────────────────────────────── */
function MilestoneRow({
  milestone,
  index,
  total,
  onActive,
}: {
  milestone: Milestone
  index:     number
  total:     number
  onActive:  () => void
}) {
  const ref    = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  const isLeft    = index % 2 === 0
  const isCurrent = milestone.status === 'current'
  const isFuture  = milestone.status === 'future'
  const { Icon } = milestone

  const intensity = useMemo(() => {
    const t = index / (total - 1)
    return { glow: 0.1 + t * 0.5 }
  }, [index, total])

  return (
    <li
      ref={ref}
      style={{
        position:     'relative',
        marginBottom: index < total - 1 ? 'clamp(56px, 8vw, 112px)' : 0,
      }}
    >
      {/* ── Spine node dot ────────────────────────────────────────────── */}
      <NodeDot
        index={index}
        total={total}
        active={inView}
        isCurrent={isCurrent}
        isFuture={isFuture}
      />

      {/* ── Row grid — mobile: single column, desktop: two columns ────── */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr',
        gap:                 '24px',
        paddingLeft:         '52px',   // space for mobile spine
      }}
        className="tl-milestone-row"
      >

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-12% 0px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`tl-card-col ${isLeft ? 'tl-card-left' : 'tl-card-right'}`}
        >
          <MilestoneCard
            milestone={milestone}
            index={index}
            total={total}
            alignRight={isLeft}
            intensity={intensity}
          />
        </motion.div>

        {/* Year mega-type — desktop only, opposite side */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-12% 0px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`tl-year-col ${isLeft ? 'tl-year-right' : 'tl-year-left'}`}
          style={{ display: 'none' }}   // hidden on mobile, shown via CSS
        >
          <div style={{ padding: isLeft ? '0 0 0 32px' : '0 32px 0 0' }}>
            <div
              style={{
                fontFamily:       'var(--font-display)',
                fontWeight:       800,
                fontSize:         'clamp(4rem, 9vw, 9rem)',
                lineHeight:       1,
                letterSpacing:    '-0.045em',
                color:            'transparent',
                WebkitTextStroke: `1.5px rgba(15,61,46,${0.12 + index * 0.05})`,
                userSelect:       'none',
              }}
            >
              {milestone.year}
            </div>
            <div style={{ marginTop: '12px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 10px', background: 'var(--oat-150)',
                border: '1px solid var(--sand-300)', borderRadius: '999px',
              }}>
                <Icon size={11} strokeWidth={2} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-600)' }}>
                  {milestone.label}
                </span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Responsive styles for this row */}
      <style>{`
        @media (min-width: 768px) {
          .tl-milestone-row {
            grid-template-columns: 1fr 1fr !important;
            padding-left: 0 !important;
            gap: 0 !important;
          }
          .tl-year-col {
            display: flex !important;
            align-items: center;
          }
          .tl-card-left  { grid-column: 1; grid-row: 1; padding-right: 64px; }
          .tl-card-right { grid-column: 2; grid-row: 1; padding-left:  64px; }
          .tl-year-left  { grid-column: 1; grid-row: 1; justify-content: flex-end; }
          .tl-year-right { grid-column: 2; grid-row: 1; }
        }
      `}</style>
    </li>
  )
}

/* ─── NodeDot ───────────────────────────────────────────────────────────── */
function NodeDot({
  index,
  total,
  active,
  isCurrent,
  isFuture,
}: {
  index:     number
  total:     number
  active:    boolean
  isCurrent: boolean
  isFuture:  boolean
}) {
  const size = 14 + (index / (total - 1)) * 10

  return (
    <div
      style={{
        position: 'absolute',
        top:      '8px',
        left:     'var(--node-x, calc(20px - 1px))',
        zIndex:   2,
        transform: 'translateX(-50%)',
      }}
      className="tl-node"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: '-20% 0px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        style={{
          position:    'relative',
          display:     'grid',
          placeItems:  'center',
          width:       size + 16,
          height:      size + 16,
        }}
      >
        {/* Halo */}
        <motion.span
          aria-hidden
          animate={active
            ? { scale: [1, 1.4, 1], opacity: [0.5, 0.15, 0.5] }
            : { scale: 1, opacity: 0.2 }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position:     'absolute',
            inset:        0,
            borderRadius: '50%',
            background:   isCurrent
              ? 'radial-gradient(circle, rgba(197,106,56,0.55), transparent 70%)'
              : 'radial-gradient(circle, rgba(15,61,46,0.4), transparent 70%)',
          }}
        />

        {/* Dot */}
        <span
          style={{
            position:     'relative',
            width:        size,
            height:       size,
            borderRadius: '50%',
            background:   isFuture
              ? 'var(--oat-200)'
              : isCurrent
                ? 'linear-gradient(135deg, var(--clay-500), var(--clay-600))'
                : 'linear-gradient(135deg, var(--forest-800), var(--forest-700))',
            boxShadow:    active
              ? isCurrent
                ? '0 0 0 5px rgba(197,106,56,0.18), 0 8px 24px -8px rgba(197,106,56,0.5)'
                : '0 0 0 5px rgba(15,61,46,0.12), 0 8px 24px -8px rgba(15,61,46,0.4)'
              : '0 4px 12px -4px rgba(15,61,46,0.3)',
            border:       isFuture ? '2px solid var(--sand-300)' : 'none',
            outline:      '3px solid var(--cream-100)',
            outlineOffset: '1px',
            transition:   'box-shadow 600ms ease',
          }}
        />
      </motion.div>

      {/* Responsive node position */}
      <style>{`
        @media (min-width: 768px) {
          .tl-node {
            left: calc(50% - 1px) !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── MilestoneCard ─────────────────────────────────────────────────────── */
function MilestoneCard({
  milestone,
  index,
  total,
  alignRight,
  intensity,
}: {
  milestone:  Milestone
  index:      number
  total:      number
  alignRight: boolean
  intensity:  { glow: number }
}) {
  const isFinal   = index === total - 1
  const isCurrent = milestone.status === 'current'
  const isFuture  = milestone.status === 'future'
  const { Icon }  = milestone

  const cardBg = isFinal
    ? 'var(--forest-800)'
    : isCurrent
      ? '#FFFFFF'
      : '#FFFFFF'

  const borderColor = isFinal
    ? 'rgba(245,243,238,0.10)'
    : isCurrent
      ? 'var(--clay-200)'
      : 'var(--sand-300)'

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: '20px',
        padding:      'clamp(24px, 3vw, 36px)',
        background:   cardBg,
        border:       `1px solid ${borderColor}`,
        boxShadow:    isFinal
          ? '0 8px 32px -8px rgba(15,61,46,0.35), 0 32px 64px -24px rgba(15,61,46,0.25)'
          : '0 2px 8px rgba(22,25,15,0.04), 0 12px 32px -8px rgba(22,25,15,0.10)',
        textAlign:    alignRight ? 'right' : 'left',
      }}
    >
      {/* Decorative grid lines */}
      <div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position:      'absolute',
          inset:         0,
          opacity:       0.04 + intensity.glow * 0.04,
          backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 14px)',
          maskImage:     'linear-gradient(to bottom, black, transparent)',
          color:         isFinal ? 'white' : 'var(--forest-800)',
        }}
      />

      {/* Corner ticks */}
      <CornerTicks dark={isFinal} />

      {/* Header */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '12px',
        flexDirection:  alignRight ? 'row-reverse' : 'row',
        marginBottom:   '20px',
      }}>
        <span style={{
          display:    'grid',
          placeItems: 'center',
          width:      '42px',
          height:     '42px',
          borderRadius: '12px',
          flexShrink: 0,
          background: isFinal
            ? 'linear-gradient(135deg, var(--clay-500), var(--clay-600))'
            : isCurrent
              ? 'var(--clay-100)'
              : 'var(--oat-150)',
          color:      isFinal ? '#FFFFFF' : isCurrent ? 'var(--clay-700)' : 'var(--forest-800)',
          border:     `1px solid ${isFinal ? 'rgba(245,243,238,0.18)' : isCurrent ? 'var(--clay-200)' : 'var(--sand-300)'}`,
        }}>
          <Icon size={18} strokeWidth={1.75} />
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: alignRight ? 'flex-end' : 'flex-start' }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color:         isFinal ? 'rgba(245,243,238,0.55)' : 'var(--ink-500)',
          }}>
            {milestone.year} · Stage {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase' as const,
            color:         isFinal ? 'var(--clay-200)' : isCurrent ? 'var(--clay-500)' : 'var(--clay-600)',
            marginTop:     '3px',
          }}>
            {milestone.tag}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    'var(--font-display)',
        fontWeight:    700,
        fontSize:      'clamp(1.3rem, 2.2vw, 1.8rem)',
        lineHeight:    1.1,
        letterSpacing: '-0.025em',
        color:         isFinal ? '#FFFFFF' : isFuture ? 'var(--ink-500)' : 'var(--ink-900)',
        marginBottom:  '12px',
      }}>
        {milestone.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize:   'clamp(0.875rem, 1.2vw, 0.95rem)',
        lineHeight: 1.72,
        color:      isFinal ? 'rgba(245,243,238,0.72)' : isFuture ? 'var(--ink-500)' : 'var(--ink-600)',
        margin:     0,
      }}>
        {milestone.description}
      </p>

      {/* Stat strip */}
      {milestone.stat && (
        <div style={{
          marginTop:    '20px',
          paddingTop:   '16px',
          borderTop:    `1px solid ${isFinal ? 'rgba(245,243,238,0.10)' : 'var(--sand-300)'}`,
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          flexDirection: alignRight ? 'row-reverse' : 'row',
        }}>
          <div style={{ textAlign: alignRight ? 'right' : 'left' }}>
            <div style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(1.6rem, 2.5vw, 2.2rem)',
              lineHeight:    1,
              letterSpacing: '-0.04em',
              color:         isFinal ? '#FFFFFF' : 'var(--forest-800)',
            }}>
              {milestone.stat.value}
            </div>
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color:         isFinal ? 'rgba(245,243,238,0.45)' : 'var(--ink-500)',
              marginTop:     '4px',
            }}>
              {milestone.stat.unit}
            </div>
          </div>
        </div>
      )}

      {/* Glow accent */}
      <div
        aria-hidden
        style={{
          pointerEvents: 'none',
          position:      'absolute',
          bottom:        '-80px',
          right:         '-60px',
          width:         '200px',
          height:        '200px',
          borderRadius:  '50%',
          filter:        'blur(48px)',
          background:    isFinal
            ? 'radial-gradient(closest-side, rgba(197,106,56,0.7), transparent)'
            : `radial-gradient(closest-side, rgba(15,61,46,${0.12 + intensity.glow * 0.2}), transparent)`,
          opacity:       0.55,
        }}
      />
    </motion.article>
  )
}

/* ─── CornerTicks ───────────────────────────────────────────────────────── */
function CornerTicks({ dark }: { dark: boolean }) {
  const c = dark ? 'rgba(245,243,238,0.22)' : 'rgba(15,61,46,0.22)'
  const s: React.CSSProperties = { position: 'absolute', width: '10px', height: '10px' }
  return (
    <>
      <span aria-hidden style={{ ...s, top: '10px', left: '10px',   borderTop:    `1px solid ${c}`, borderLeft:   `1px solid ${c}` }} />
      <span aria-hidden style={{ ...s, top: '10px', right: '10px',  borderTop:    `1px solid ${c}`, borderRight:  `1px solid ${c}` }} />
      <span aria-hidden style={{ ...s, bottom: '10px', left: '10px',  borderBottom: `1px solid ${c}`, borderLeft:   `1px solid ${c}` }} />
      <span aria-hidden style={{ ...s, bottom: '10px', right: '10px', borderBottom: `1px solid ${c}`, borderRight:  `1px solid ${c}` }} />
    </>
  )
}
