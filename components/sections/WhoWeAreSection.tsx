const STATS = [
  { num: '3 t/hr',    label: 'Reactor capacity\nWorld’s largest' },
  { num: '2013',      label: 'G2E founded\nCiudad de México'     },
  { num: 'UNAM',      label: 'Scientific partner\nsince 2014'    },
  { num: '$150M',     label: 'Phase II investment\nunder development' },
]

const PARTNERS = [
  'UNAM Institute of Engineering',
  'Gobierno de México',
  'SEMARNAT',
  'CDMX',
  'COLPOS',
  'CIMMYT',
]

export default function WhoWeAreSection() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--bg)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Story 1 — floating hydrochar on bone bg blends into section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/motion/story-1.gif"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-4%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '52%',
          maxWidth: '700px',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.70,
          zIndex: 0,
        }}
      />
      <div className="g2e-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section label ─────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              color: 'var(--ink-muted)',
              flexShrink: 0,
            }}
          >
            [ 02 ]
          </span>
          <div style={{ height: '1px', flex: 1, background: 'var(--line)' }} />
        </div>
        <p
          data-sr
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 'var(--space-10)',
          }}
        >
          Who we are
        </p>

        {/* ── Asymmetric 2-col grid ─────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16"
          style={{ alignItems: 'start' }}
        >

          {/* Left — headline + body */}
          <div>
            <h2
              data-sr
              data-sr-delay="80"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'var(--text-5xl)',
                lineHeight: 'var(--lh-tight)',
                letterSpacing: 'var(--ls-display)',
                color: 'var(--ink)',
                marginBottom: 'var(--space-8)',
                maxWidth: '560px',
              }}
            >
              We started where<br />
              <span style={{ color: 'var(--forest-mid)' }}>the problem is loudest.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '500px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-lg)',
                  lineHeight: 'var(--lh-loose)',
                  color: 'var(--ink)',
                }}
              >
                We&apos;re a Mexican technology company that takes what cities throw away — the organic waste that today releases greenhouse gases in landfills — and transforms it into hydrochar.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-md)',
                  lineHeight: 'var(--lh-loose)',
                  color: 'var(--ink-muted)',
                }}
              >
                Hydrochar replaces mineral coal in power generation, regenerates farmland soil, and decarbonizes the steel industry. We work alongside UNAM, the Mexican Government, and international partners so this technology doesn&apos;t stay in a lab — it reaches every city that needs it.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-md)',
                  lineHeight: 'var(--lh-loose)',
                  color: 'var(--ink-muted)',
                }}
              >
                Today we operate the world&apos;s largest hydrothermal carbonization plant processing municipal organic waste.
              </p>
            </div>

            {/* CTA */}
            <a
              href="#process"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: 'var(--space-8)',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 500,
                background: 'transparent',
                color: 'var(--ink)',
                padding: '12px 20px',
                borderRadius: '999px',
                border: '1px solid var(--line-strong)',
                textDecoration: 'none',
              }}
            >
              See the process
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          </div>

          {/* Right — Hydrochar panel (dark card, 28px radius) */}
          <div
            style={{
              background: 'var(--hydrochar-900)',
              color: 'var(--bone-100)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-7)',
              boxShadow: 'var(--shadow-panel)',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.35)',
                marginBottom: 'var(--space-6)',
              }}
            >
              [ G2E ] Key figures
            </p>

            {STATS.map((stat, i) => (
              <div
                key={stat.num}
                style={{
                  paddingTop: i > 0 ? 'var(--space-6)' : 0,
                  paddingBottom: 'var(--space-6)',
                  borderTop: i > 0 ? '1px solid rgba(242,239,231,0.08)' : 'none',
                  borderBottom: i < STATS.length - 1 ? 'none' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'var(--text-3xl)',
                    lineHeight: 1,
                    letterSpacing: 'var(--ls-display)',
                    marginBottom: '6px',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--lh-base)',
                    color: 'rgba(242,239,231,0.50)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Partner strip ────────────────────────── */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            paddingTop: 'var(--space-7)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            rowGap: 'var(--space-3)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--ink-subtle)',
              marginRight: 'var(--space-5)',
              flexShrink: 0,
            }}
          >
            Partners
          </span>

          {PARTNERS.map((name, i) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {i > 0 && (
                <span style={{ color: 'var(--ink-subtle)', userSelect: 'none' }}>·</span>
              )}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ink-muted)',
                }}
              >
                {name}
              </span>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
