const STEPS = [
  {
    num: '01',
    title: 'Arrival and sorting',
    body: 'Mexico City trucks deliver the organic fraction of urban waste directly to the plant at Bordo Poniente.',
  },
  {
    num: '02',
    title: 'Conditioning',
    body: 'The organic matter becomes a smooth, pumpable paste. No drying required — water is part of the process.',
  },
  {
    num: '03',
    title: 'Hydrothermal carbonization',
    body: 'The paste enters the reactor under high pressure and temperature. Water acts as solvent and catalyst — organic matter becomes hydrochar in hours, not centuries.',
  },
  {
    num: '04',
    title: 'Separation and drying',
    body: 'Hydrochar is separated from process water. Both are used: the solid as fertilizer or coal replacement, the liquid as biogenic fertilizer.',
  },
  {
    num: '05',
    title: 'Distribution',
    body: 'Hydrochar reaches farmers, steel mills, and power plants. Carbon that would have become methane now ends up in the soil — or replacing fossil fuels.',
  },
]

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        background: 'var(--hydrochar-900)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
      }}
    >
      <div className="g2e-container">

        {/* ── Section label ─────────────────────────── */}
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
            [ 03 ]
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
            marginBottom: 'var(--space-10)',
          }}
        >
          The process
        </p>

        {/* ── 2-column grid ─────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16"
          style={{ alignItems: 'start' }}
        >

          {/* Left — headline + 5-step list */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-5xl)',
                lineHeight: 'var(--lh-tight)',
                letterSpacing: 'var(--ls-display)',
                fontWeight: 400,
                color: 'var(--bone-100)',
                marginBottom: 'var(--space-10)',
                maxWidth: '520px',
              }}
            >
              From waste to hydrochar,<br />
              <em>in hours.</em>
            </h2>

            {/* Steps */}
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {STEPS.map((step, i) => (
                <li
                  key={step.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: 'var(--space-5)',
                    paddingTop: i > 0 ? 'var(--space-6)' : 0,
                    paddingBottom: 'var(--space-6)',
                    borderBottom: '1px solid rgba(242,239,231,0.08)',
                  }}
                >
                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-2xs)',
                      letterSpacing: 'var(--ls-eyebrow)',
                      color: 'rgba(242,239,231,0.30)',
                      paddingTop: '3px',
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Step content */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-md)',
                        fontWeight: 500,
                        color: 'var(--bone-100)',
                        marginBottom: '6px',
                        letterSpacing: 'var(--ls-tight)',
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 'var(--lh-loose)',
                        color: 'rgba(242,239,231,0.55)',
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — GIF 2 cinematic visual */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              aspectRatio: '3 / 4',
            }}
            className="hidden lg:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/motion/2.gif"
              alt="Hydrothermal carbonization process at the G2E plant"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Subtle dark overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(17,20,15,0.30)',
              }}
            />

            {/* Glass chip — location */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backdropFilter: 'blur(18px) saturate(140%)',
                WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                background: 'rgba(17,20,15,0.55)',
                color: 'var(--bone-100)',
                padding: '10px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '99px',
                  background: 'var(--bone-100)',
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
                }}
              >
                Bordo Poniente · CDMX
              </span>
            </div>
          </div>

        </div>

        {/* ── Callout stat ─────────────────────────── */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            paddingTop: 'var(--space-7)',
            borderTop: '1px solid rgba(242,239,231,0.10)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-8)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '220 °C', label: 'Operating temperature' },
            { num: 'Hours',  label: 'Process duration vs. centuries in landfill' },
            { num: '100%',   label: 'Feedstock utilised — solid and liquid' },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  letterSpacing: 'var(--ls-display)',
                  color: 'var(--bone-100)',
                  lineHeight: 1,
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(242,239,231,0.40)',
                  maxWidth: '160px',
                  lineHeight: 'var(--lh-base)',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
