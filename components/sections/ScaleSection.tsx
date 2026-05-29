const STATS = [
  { num: '792',   unit: 't / day',   label: 'Organic waste\nprocessed'       },
  { num: '96',    unit: 't / day',   label: 'Hydrochar\nproduced'            },
  { num: '$150M', unit: 'USD',       label: 'Phase II\ninvestment'           },
  { num: '170',   unit: 'modules',   label: 'Full project\nvision'           },
]

export default function ScaleSection() {
  return (
    <section
      id="scale"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--hydrochar-900)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >

      {/* ── GIF 4 — full-bleed cinematic background ── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/motion/4.gif"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            opacity: 0.40,
          }}
        />
        {/* Base overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,20,15,0.55)' }} />
        {/* Bottom gradient — stats legibility */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, rgba(17,20,15,0) 0%, rgba(17,20,15,0.92) 100%)',
          }}
        />
        {/* Top gradient — label legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(17,20,15,0) 0%, rgba(17,20,15,0.50) 100%)',
          }}
        />
      </div>

      {/* ── Top — section label ───────────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--space-10)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              color: 'rgba(242,239,231,0.35)',
              flexShrink: 0,
            }}
          >
            [ 05 ]
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(242,239,231,0.10)' }} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'rgba(242,239,231,0.35)',
          }}
        >
          Where we&apos;re going
        </p>
      </div>

      {/* ── Centre — Phase II headline ────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-6xl)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            fontWeight: 400,
            color: 'var(--bone-100)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Phase II.<br />
          <em>2027.</em>
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--lh-loose)',
            color: 'rgba(242,239,231,0.62)',
            maxWidth: '480px',
            fontWeight: 300,
          }}
        >
          From demonstration plant to real urban infrastructure — 10 new modules at Bordo Poniente. The beginning of 170.
        </p>
      </div>

      {/* ── Bottom — stat grid + CTA ──────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingBottom: 'var(--space-10)',
        }}
      >
        {/* Stat grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(242,239,231,0.12)',
            marginBottom: 'var(--space-8)',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.num}
              style={{
                padding: 'var(--space-6) var(--space-5) var(--space-5) 0',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(242,239,231,0.08)' : 'none',
                paddingLeft: i > 0 ? 'var(--space-5)' : 0,
              }}
            >
              {/* Big number */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: 'var(--ls-display)',
                  fontWeight: 400,
                  color: 'var(--bone-100)',
                  marginBottom: '4px',
                }}
              >
                {stat.num}
              </div>
              {/* Unit */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'rgba(242,239,231,0.40)',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                }}
              >
                {stat.unit}
              </div>
              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  lineHeight: 'var(--lh-base)',
                  color: 'rgba(242,239,231,0.40)',
                  whiteSpace: 'pre-line',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              background: 'var(--bone-100)',
              color: 'var(--hydrochar-900)',
              padding: '14px 22px 14px 26px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Partner with us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--bone-100)',
              background: 'transparent',
              border: '1px solid rgba(242,239,231,0.22)',
              padding: '13px 20px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Read the brief
          </a>
        </div>
      </div>

    </section>
  )
}
