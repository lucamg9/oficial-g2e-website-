'use client'

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

      {/* ── Story 4 — hydrochar granules in soil, full-bleed ────────── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        {/* Story 4 — WebM, full quality, hydrochar granules in soil */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
          }}
        >
          <source src="/motion/story-4.webm" type="video/webm" />
          <source src="/motion/story-4.mp4"  type="video/mp4"  />
        </video>
        {/* Dark tint — 30% max so granules texture remains visible */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,19,15,0.30)' }} />
        {/* Bottom gradient — stat legibility */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '60%',
            background: 'linear-gradient(to bottom, rgba(20,19,15,0) 0%, rgba(20,19,15,0.95) 100%)',
          }}
        />
        {/* Top gradient — label legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '35%',
            background: 'linear-gradient(to top, rgba(20,19,15,0) 0%, rgba(20,19,15,0.55) 100%)',
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
            [ 08 ]
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
          Phase II · 2027
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
          data-sr
          data-sr-delay="60"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'var(--text-6xl)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: '#FFFFFF',
            marginBottom: 'var(--space-5)',
          }}
        >
          This is what scale looks like<br />
          <span style={{ color: 'rgba(245,243,238,0.45)', fontWeight: 600 }}>when the mission is real.</span>
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--lh-loose)',
            color: 'rgba(245,243,238,0.60)',
            maxWidth: '480px',
          }}
        >
          Phase II — 2027. From demonstration plant to real urban infrastructure. 10 new modules at Bordo Poniente. The beginning of 170.
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
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: 'var(--ls-display)',
                  color: '#FFFFFF',
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
            className="glass-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              color: '#FFFFFF',
              padding: '14px 24px',
              textDecoration: 'none',
            }}
          >
            Be part of it
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
              fontWeight: 400,
              color: 'rgba(245,243,238,0.60)',
              background: 'transparent',
              border: '1px solid rgba(245,243,238,0.18)',
              padding: '13px 20px',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.40)'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.18)'
              e.currentTarget.style.color = 'rgba(245,243,238,0.60)'
            }}
          >
            Request the brief
          </a>
        </div>
      </div>

    </section>
  )
}
