const PRODUCTS = [
  {
    id: '01',
    category: 'Biological fertilizer',
    headline: 'Returns carbon to the soil,',
    italic:   'for generations.',
    body:     'Hydrochar has the potential to cut chemical fertilizer use by up to 50% in corn and beans while keeping yields the same. It returns carbon and nutrients to the soil.',
    proof:    'Validated with COLPOS, CIMMYT, and SADER.',
    bg:       '#2C4A35',   // Moss-600 — natural, organic
    line:     'rgba(242,239,231,0.10)',
    muted:    'rgba(242,239,231,0.50)',
  },
  {
    id: '02',
    category: 'Coal replacement',
    headline: 'Decarbonizing the hardest',
    italic:   'industries to clean up.',
    body:     'Replaces thermal coal in power generation and metallurgical coal in steel production — two of the most emissions-intensive sectors on the planet.',
    proof:    'Direct drop-in replacement. No infrastructure change required.',
    bg:       '#11140F',   // Hydrochar-900 — industrial, precise
    line:     'rgba(242,239,231,0.08)',
    muted:    'rgba(242,239,231,0.50)',
  },
  {
    id: '03',
    category: 'Premium carbon credits',
    headline: 'Technology-based.',
    italic:   'Permanently verified.',
    body:     'Credits based on technology — not forests — with proven permanence and measurable social impact. Phase II will generate 270,600 credits per year.',
    proof:    'The kind of credit responsible companies like Apple, Microsoft, and Stripe are looking for.',
    bg:       '#11140F',   // Hydrochar-900
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
            [ 04 ]
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
          Three products, one technology
        </p>

        {/* ── Intro headline ────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8"
          style={{ alignItems: 'end', marginBottom: 'var(--space-10)' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              lineHeight: 'var(--lh-snug)',
              letterSpacing: 'var(--ls-display)',
              fontWeight: 400,
              color: 'var(--ink)',
              maxWidth: '560px',
            }}
          >
            One material.<br />
            <em>Three industries transformed.</em>
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
                  fontSize: 'var(--text-2xl)',
                  lineHeight: 'var(--lh-snug)',
                  letterSpacing: 'var(--ls-display)',
                  fontWeight: 400,
                  color: 'var(--bone-100)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                {product.headline}<br />
                <em>{product.italic}</em>
              </h3>

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
