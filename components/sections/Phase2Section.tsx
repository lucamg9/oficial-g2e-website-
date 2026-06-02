/* Phase II / 2027 vision — final narrative section before Contact */

const STATS = [
  { value: '$150M',     label: 'Phase II investment' },
  { value: '10',        label: 'New modules · 2027'  },
  { value: '792 t/day', label: 'Waste processed daily' },
  { value: '170',       label: 'Module vision'        },
]

const PRODUCTS = [
  {
    title: 'Biological fertilizer',
    body:  'Hydrochar can cut chemical fertilizer use by up to 50% in corn and beans while keeping yields the same. It returns carbon and nutrients to the soil. Validated with COLPOS, CIMMYT, and SADER.',
  },
  {
    title: 'Mineral coal replacement',
    body:  'Replaces thermal coal in power generation and metallurgical coal in steel production. Decarbonizes two of the hardest industries to clean up.',
  },
  {
    title: 'Premium carbon credits',
    body:  'Credits based on technology — not forests — with proven permanence and measurable social impact. Phase II will generate ~1,040,000 credits per year. The kind responsible companies are looking for.',
  },
]

export default function Phase2Section() {
  return (
    <section
      id="phase2"
      aria-label="Phase II — 2027 vision"
      style={{
        background:    'var(--bg-dark)',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Subtle top border */}
      <div style={{ height: '1px', background: 'rgba(245,243,238,0.07)' }} />

      <div
        className="g2e-container"
        style={{
          paddingTop:    'clamp(80px, 10vw, 140px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >

        {/* ── Eyebrow ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.35)',
          }}>
            Where we are going
          </span>
          <div style={{ height: '1px', width: '28px', background: 'rgba(245,243,238,0.14)' }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.20)',
          }}>
            Phase II · 2027
          </span>
        </div>

        {/* ── Main headline ────────────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 96px)' }}>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(2.8rem, 6vw, 6rem)',
            lineHeight:    0.92,
            letterSpacing: '-0.04em',
            color:         '#FFFFFF',
            marginBottom:  '32px',
            maxWidth:      '900px',
          }}>
            From demonstration<br />
            <span style={{ color: 'rgba(245,243,238,0.38)' }}>plant to urban<br />infrastructure.</span>
          </h2>

          <p style={{
            fontFamily:  'var(--font-sans)',
            fontWeight:  300,
            fontSize:    'clamp(1rem, 1.6vw, 1.2rem)',
            lineHeight:  1.7,
            color:       'rgba(245,243,238,0.60)',
            maxWidth:    '560px',
          }}>
            In 2027, construction begins on 10 new modules at Bordo Poniente. It is the jump from one reactor to real city-scale infrastructure. And it is just the start — the full project aims for 170 modules, replicable in any city that needs them.
          </p>
        </div>

        {/* ── Stat strip ───────────────────────────────────────────── */}
        <div
          style={{
            display:       'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap:           '1px',
            background:    'rgba(245,243,238,0.07)',
            border:        '1px solid rgba(245,243,238,0.07)',
            borderRadius:  'var(--radius-2xl)',
            overflow:      'hidden',
            marginBottom:  'clamp(48px, 7vw, 96px)',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              style={{
                background:    'var(--bg-dark)',
                padding:       'clamp(24px, 3vw, 40px)',
                display:       'flex',
                flexDirection: 'column',
                gap:           '8px',
              }}
            >
              <span style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(2rem, 3.5vw, 3rem)',
                lineHeight:    1,
                letterSpacing: '-0.04em',
                color:         '#FFFFFF',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '10px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color:         'rgba(245,243,238,0.38)',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Three products ───────────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 96px)' }}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.30)',
            marginBottom:  '28px',
          }}>
            Three products · One technology
          </p>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap:                 '1px',
              background:          'rgba(245,243,238,0.07)',
              border:              '1px solid rgba(245,243,238,0.07)',
              borderRadius:        'var(--radius-2xl)',
              overflow:            'hidden',
            }}
          >
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                style={{
                  background:    'var(--bg-dark)',
                  padding:       'clamp(24px, 3vw, 36px)',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '14px',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    700,
                  fontSize:      'clamp(1rem, 1.4vw, 1.15rem)',
                  letterSpacing: '-0.02em',
                  color:         'rgba(245,243,238,0.90)',
                  lineHeight:    1.2,
                }}>
                  {p.title}
                </span>
                <div style={{ height: '1px', background: 'rgba(245,243,238,0.08)' }} />
                <p style={{
                  fontFamily:  'var(--font-sans)',
                  fontWeight:  300,
                  fontSize:    'clamp(0.82rem, 1.1vw, 0.9rem)',
                  lineHeight:  1.7,
                  color:       'rgba(245,243,238,0.48)',
                  margin:      0,
                }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <div style={{
          paddingTop:  'clamp(32px, 4vw, 56px)',
          borderTop:   '1px solid rgba(245,243,238,0.08)',
          display:     'flex',
          alignItems:  'center',
          gap:         '16px',
          flexWrap:    'wrap',
        }}>
          <a
            href="#contact"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '10px',
              fontFamily:     'var(--font-sans)',
              fontSize:       '15px',
              fontWeight:     500,
              background:     'rgba(245,243,238,0.10)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color:          '#FFFFFF',
              padding:        '14px 24px',
              borderRadius:   '999px',
              textDecoration: 'none',
              border:         '1px solid rgba(245,243,238,0.18)',
              transition:     'background 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,243,238,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,243,238,0.10)')}
          >
            Join the mission
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>

          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.28)',
          }}>
            Construction begins 2027
          </span>
        </div>

      </div>
    </section>
  )
}
