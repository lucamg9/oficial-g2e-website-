'use client'

const COMING = [
  {
    id:    'A',
    label: 'Science & Technology',
    title: 'Technical documentation',
    body:  'Deep-dive reports, white papers, and peer-reviewed research on Hydrothermal Carbonization at industrial scale.',
  },
  {
    id:    'B',
    label: 'Live Operations',
    title: 'Plant data dashboard',
    body:  'Real-time throughput, hydrochar output, and emissions metrics from the Bordo Poniente facility.',
  },
  {
    id:    'C',
    label: 'Investor Relations',
    title: 'Phase II portal',
    body:  'Project financials, off-take agreements, carbon credit registry, and Phase II development timeline.',
  },
]

export default function ComingSoonSection() {
  return (
    <section
      id="coming-soon"
      style={{ background: 'var(--hydrochar-900)', position: 'relative', overflow: 'hidden' }}
    >

      {/* ── Bridge — bone → dark ─────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height: '100px',
          background: 'linear-gradient(to bottom, var(--bg) 0%, var(--hydrochar-900) 100%)',
        }}
      />

      {/* ── GIF 4 ambient background ─────────────── */}
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
            objectPosition: 'center 20%',
            opacity: 0.18,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,20,15,0.72)' }} />
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingBottom: 'var(--space-16)',
        }}
      >

        {/* ── Section label ─────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              color: 'rgba(242,239,231,0.30)',
              flexShrink: 0,
            }}
          >
            [ 10 ]
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(242,239,231,0.08)' }} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'rgba(242,239,231,0.30)',
            marginBottom: 'var(--space-12)',
          }}
        >
          Site in development
        </p>

        {/* ── Main block ────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12"
          style={{ alignItems: 'end', marginBottom: 'var(--space-12)' }}
        >
          {/* Left — headline */}
          <div>
            {/* G2E monogram — large */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '999px',
                background: 'rgba(242,239,231,0.08)',
                border: '1px solid rgba(242,239,231,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-7)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '40px',
                  color: 'var(--bone-100)',
                  lineHeight: 1,
                  display: 'block',
                  marginTop: '4px',
                }}
              >
                g
              </span>
            </div>

            <h2
              data-sr
              data-sr-delay="60"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'var(--text-5xl)',
                lineHeight: 'var(--lh-tight)',
                letterSpacing: 'var(--ls-display)',
                color: '#FFFFFF',
                marginBottom: 'var(--space-6)',
                maxWidth: '600px',
              }}
            >
              This is a preview.<br />
              <span style={{ color: 'rgba(245,243,238,0.45)', fontWeight: 600 }}>The full experience is coming.</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--lh-loose)',
                color: 'rgba(242,239,231,0.55)',
                maxWidth: '480px',
                fontWeight: 300,
              }}
            >
              What you&apos;ve seen today is the foundation. The complete G2E digital presence — with deep technical documentation, live plant data, and investor materials — is being built.
            </p>
          </div>

          {/* Right — status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              borderRadius: '999px',
              background: 'rgba(242,239,231,0.06)',
              border: '1px solid rgba(242,239,231,0.12)',
              flexShrink: 0,
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '99px',
                background: 'var(--moss-400)',
                display: 'block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.55)',
              }}
            >
              In active development
            </span>
          </div>
        </div>

        {/* ── Coming sections — ghost cards ────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ marginBottom: 'var(--space-12)' }}
        >
          {COMING.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(242,239,231,0.04)',
                border: '1px solid rgba(242,239,231,0.10)',
                borderRadius: 'var(--radius-2xl)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              {/* Card eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: 'var(--ls-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,231,0.30)',
                  }}
                >
                  {item.label}
                </span>
                {/* Locked badge */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,231,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Soon
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(242,239,231,0.07)' }} />

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  lineHeight: 'var(--lh-snug)',
                  letterSpacing: 'var(--ls-display)',
                  fontWeight: 400,
                  color: 'rgba(242,239,231,0.75)',
                }}
              >
                {item.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--lh-loose)',
                  color: 'rgba(242,239,231,0.35)',
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom — contact line ────────────────── */}
        <div
          style={{
            paddingTop: 'var(--space-7)',
            borderTop: '1px solid rgba(242,239,231,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
          className="md:flex-row md:items-center md:justify-between"
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(242,239,231,0.40)',
            }}
          >
            Enquiries during development:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            {['contacto@g2e.mx', 'info@g2e.mx'].map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.04em',
                  color: 'rgba(242,239,231,0.55)',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-100)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,239,231,0.55)')}
              >
                {email}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
