const PRODUCTS = [
  {
    id: '01',
    category: 'Biological fertilizer',
    headline: 'Returns carbon to the soil.',
    sub:      'For generations.',
    body:     'Hydrochar cuts chemical fertilizer use by up to 50% in corn and beans while maintaining yields. It returns carbon and nutrients — repairing land that industrial farming has degraded.',
    proof:    'Validated with COLPOS, CIMMYT, and SADER.',
    bg:       '#2D5A3D',
    line:     'rgba(242,239,231,0.10)',
    muted:    'rgba(242,239,231,0.50)',
  },
  {
    id: '02',
    category: 'Coal replacement',
    headline: 'Decarbonizing the hardest industries.',
    sub:      'No infrastructure change required.',
    body:     'Replaces thermal coal in power generation and metallurgical coal in steel production — two of the most emissions-intensive sectors on the planet. Drop-in compatible.',
    proof:    'Direct replacement. No retrofitting. No compromise on energy output.',
    bg:       '#14130F',
    line:     'rgba(242,239,231,0.08)',
    muted:    'rgba(242,239,231,0.50)',
  },
  {
    id: '03',
    category: 'Premium carbon credits',
    headline: 'Technology-based. Permanently verified.',
    sub:      'The credits the market actually needs.',
    body:     'Credits based on technology — not forests — with proven permanence and measurable social impact. Phase II will generate 270,600 credits per year.',
    proof:    'The kind of credit Apple, Microsoft, and Stripe are actively seeking.',
    bg:       '#14130F',
    line:     'rgba(242,239,231,0.08)',
    muted:    'rgba(242,239,231,0.50)',
  },
]

export default function ProductsSection() {
  return (
    <section
      id="products"
      style={{
        background: 'var(--bg)',
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
              color: 'var(--ink-muted)',
              flexShrink: 0,
            }}
          >
            [ 07 ]
          </span>
          <div style={{ height: '1px', flex: 1, background: 'var(--line)' }} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 'var(--space-8)',
          }}
        >
          What we create
        </p>

        {/* ── Intro headline ────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8"
          style={{ alignItems: 'end', marginBottom: 'var(--space-10)' }}
        >
          <h2
            data-sr
            data-sr-delay="60"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'var(--text-4xl)',
              lineHeight: 'var(--lh-snug)',
              letterSpacing: 'var(--ls-display)',
              color: 'var(--ink)',
              maxWidth: '560px',
            }}
          >
            Hydrochar doesn&apos;t just<br />
            <span style={{ color: 'var(--forest-mid)' }}>replace coal. It reverses the damage.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-md)',
              lineHeight: 'var(--lh-loose)',
              color: 'var(--ink-muted)',
              maxWidth: '300px',
            }}
          >
            Hydrochar is the output. What changes is who receives it — and what they do with it.
          </p>
        </div>

        {/* ── Story 3 — hydrochar in soil visual bridge ─ */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            height: 'clamp(200px, 28vw, 360px)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {/* Story 3 — WebM, full quality, hydrochar meeting soil */}
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
              objectPosition: 'center 60%',
              display: 'block',
            }}
          >
            <source src="/motion/story-3.webm" type="video/webm" />
            <source src="/motion/story-3.mp4"  type="video/mp4"  />
          </video>
          {/* Very subtle overlay to blend with bone bg */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(245,243,238,0.60) 0%, rgba(245,243,238,0) 50%)',
            }}
          />
          {/* Glass caption chip */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              background: 'rgba(245,243,238,0.75)',
              color: 'var(--ink)',
              padding: '8px 14px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(20,19,15,0.08)',
            }}
          >
            <span
              style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--forest-mid)',
                display: 'block', flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              Hydrochar applied to soil
            </span>
          </div>
        </div>

        {/* ── Product cards grid ────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                background: product.bg,
                color: 'var(--bone-100)',
                borderRadius: 'var(--radius-2xl)',
                padding: '28px',
                boxShadow: 'var(--shadow-panel)',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {/* Card eyebrow */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  letterSpacing: 'var(--ls-eyebrow)',
                  textTransform: 'uppercase',
                  color: product.muted,
                  marginBottom: 'var(--space-6)',
                }}
              >
                [ {product.id} ] {product.category}
              </p>

              {/* Card headline */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-2xl)',
                  lineHeight: 'var(--lh-snug)',
                  letterSpacing: 'var(--ls-display)',
                  color: 'var(--bone-100)',
                  marginBottom: '6px',
                }}
              >
                {product.headline}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 'var(--text-sm)',
                  color: product.muted,
                  marginBottom: 'var(--space-5)',
                }}
              >
                {product.sub}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: product.line,
                  marginBottom: 'var(--space-5)',
                }}
              />

              {/* Body */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--lh-loose)',
                  color: product.muted,
                  marginBottom: 'var(--space-5)',
                  flex: 1,
                }}
              >
                {product.body}
              </p>

              {/* Proof point */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: 'rgba(242,239,231,0.35)',
                  lineHeight: 'var(--lh-base)',
                  marginBottom: 'var(--space-6)',
                  paddingTop: 'var(--space-4)',
                  borderTop: `1px solid ${product.line}`,
                }}
              >
                {product.proof}
              </p>

              {/* CTA */}
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-start',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--bone-100)',
                  background: 'transparent',
                  border: '1px solid rgba(242,239,231,0.22)',
                  padding: '9px 16px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                Learn more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
