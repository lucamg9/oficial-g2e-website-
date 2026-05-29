'use client'

import Link from 'next/link'

const COLS = [
  {
    label: 'Company',
    links: [
      { label: 'Who we are',            href: '#about'    },
      { label: 'Our story',             href: '#about'    },
      { label: 'Demonstration center',  href: '#about'    },
      { label: 'Projects',              href: '#scale'    },
    ],
  },
  {
    label: 'Technology',
    links: [
      { label: 'The process',           href: '#process'  },
      { label: 'Hydrochar',             href: '#products' },
      { label: 'Carbon credits',        href: '#products' },
      { label: 'Biological fertilizer', href: '#products' },
    ],
  },
  {
    label: 'Work with us',
    links: [
      { label: 'Off-take partners',     href: '#contact'  },
      { label: 'Investment',            href: '#contact'  },
      { label: 'Government',            href: '#contact'  },
      { label: 'Research',              href: '#contact'  },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--hydrochar-900)',
      }}
    >

      {/* ── Mexico landscape — Iztaccíhuatl & Popocatépetl ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/mexico-landscape.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 28%',   /* mountains in the upper-mid frame */
          opacity: 0.46,
        }}
      />

      {/*
        Overlay system — 3 layers tuned for THIS specific image:
        1. Base: Hydrochar 48% — lets the warm gold & deep blue sky show through
        2. Top gradient: hard dark → transparent, for text legibility
        3. Warm umber tint: lifts the amber quality of the fields
      */}

      {/* Layer 1 — base Hydrochar tint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(17,20,15,0.48)',
          zIndex: 1,
        }}
      />
      {/* Layer 2 — top gradient: blends from Coming Soon dark section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, rgba(17,20,15,1) 0%, rgba(17,20,15,0) 100%)',
          zIndex: 2,
        }}
      />
      {/* Layer 3 — very subtle warm umber lift — enhances the golden sierra */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(170deg, rgba(17,20,15,0) 40%, rgba(38,22,10,0.22) 100%)',
          zIndex: 2,
        }}
      />
      {/* Layer 4 — bottom fade to pure dark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '90px',
          background: 'linear-gradient(to top, rgba(17,20,15,1) 0%, rgba(17,20,15,0) 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Content ───────────────────────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-10)',
        }}
      >

        {/* ── Brand statement — full width, editorial ── */}
        <div
          style={{
            paddingBottom: 'var(--space-10)',
            borderBottom: '1px solid rgba(242,239,231,0.08)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Monogram + wordmark row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '999px',
                background: 'rgba(242,239,231,0.08)',
                border: '1px solid rgba(242,239,231,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '30px',
                  color: 'var(--bone-100)',
                  lineHeight: 1,
                  display: 'block',
                  marginTop: '4px',
                }}
              >
                g
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.28)',
              }}
            >
              Green to Energy · CDMX · Est. 2013
            </span>
          </div>

          {/* Tagline — large editorial display */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-display)',
              fontWeight: 400,
              color: 'rgba(242,239,231,0.90)',
              maxWidth: '640px',
            }}
          >
            From Mexico&apos;s mountains<br />
            to the world&apos;s industry.
          </h2>
        </div>

        {/* ── Main grid — brand block + nav ─────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-20"
          style={{
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid rgba(242,239,231,0.08)',
          }}
        >

          {/* Left — brand identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                lineHeight: 'var(--lh-snug)',
                letterSpacing: 'var(--ls-display)',
                color: 'rgba(242,239,231,0.50)',
                fontStyle: 'italic',
              }}
            >
              Waste, transmuted.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--lh-loose)',
                color: 'rgba(242,239,231,0.35)',
                maxWidth: '220px',
              }}
            >
              Transforming municipal organic waste into hydrochar — decarbonizing industry at scale.
            </p>

            {/* Email links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-2)' }}>
              {['contacto@g2e.mx', 'info@g2e.mx'].map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.03em',
                    color: 'rgba(242,239,231,0.42)',
                    textDecoration: 'none',
                    transition: 'color 220ms var(--ease-expo)',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,239,231,0.42)')}
                >
                  {email}
                </a>
              ))}
            </div>

            {/* CTA pill */}
            <a
              href="#contact"
              style={{
                marginTop: 'var(--space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                width: 'fit-content',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--bone-100)',
                background: 'rgba(242,239,231,0.10)',
                border: '1px solid rgba(242,239,231,0.16)',
                padding: '10px 16px',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'background 200ms, border-color 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(242,239,231,0.16)'
                e.currentTarget.style.borderColor = 'rgba(242,239,231,0.28)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(242,239,231,0.10)'
                e.currentTarget.style.borderColor = 'rgba(242,239,231,0.16)'
              }}
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          </div>

          {/* Right — nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {COLS.map((col) => (
              <div key={col.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xs)',
                    letterSpacing: 'var(--ls-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'rgba(242,239,231,0.25)',
                  }}
                >
                  {col.label}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-sm)',
                          color: 'rgba(242,239,231,0.40)',
                          textDecoration: 'none',
                          transition: 'color 200ms',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bone-100)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,239,231,0.40)')}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Legal row ─────────────────────────────── */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ paddingTop: 'var(--space-6)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color: 'rgba(242,239,231,0.18)',
            }}
          >
            Bordo Poniente · Ciudad de México · México
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(242,239,231,0.18)',
            }}
          >
            © {new Date().getFullYear()} G2E — Green to Energy. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
