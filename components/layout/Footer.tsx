'use client'

import { useRef, RefObject } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/use-reveal'

const COLS = [
  {
    label: 'Company',
    links: [
      { label: 'Who we are',           href: '#about'    },
      { label: 'Our story',            href: '#about'    },
      { label: 'Demonstration center', href: '#about'    },
      { label: 'Projects',             href: '#scale'    },
    ],
  },
  {
    label: 'Technology',
    links: [
      { label: 'The process',          href: '#process'  },
      { label: 'Hydrochar',            href: '#products' },
      { label: 'Carbon credits',       href: '#products' },
      { label: 'Soil regeneration',    href: '#products' },
    ],
  },
  {
    label: 'Work with us',
    links: [
      { label: 'Off-take partners',    href: '#contact'  },
      { label: 'Investment',           href: '#contact'  },
      { label: 'Government',           href: '#contact'  },
      { label: 'Research',             href: '#contact'  },
    ],
  },
]

export default function Footer() {
  const logoRowRef  = useRef<HTMLDivElement>(null)
  const missionRef  = useRef<HTMLHeadingElement>(null)
  const leftColRef  = useRef<HTMLDivElement>(null)
  const legalRowRef = useRef<HTMLDivElement>(null)
  /* One ref per nav column — COLS has 3 items */
  const navCol0Ref  = useRef<HTMLDivElement>(null)
  const navCol1Ref  = useRef<HTMLDivElement>(null)
  const navCol2Ref  = useRef<HTMLDivElement>(null)
  const navColRefs  = [navCol0Ref, navCol1Ref, navCol2Ref] as RefObject<HTMLElement | null>[]

  useReveal(
    [
      { ref: logoRowRef,  from: { opacity: 0, y: 60  }, duration: 0.90, ease: 'power4.out' },
      { ref: missionRef,  from: { opacity: 0, y: 100 }, duration: 1.20, ease: 'power4.out', delay: 0.12 },
      { ref: leftColRef,  from: { opacity: 0, y: 60  }, duration: 0.90, ease: 'power3.out', delay: 0.24 },
      { ref: legalRowRef, from: { opacity: 0, y: 30  }, duration: 0.80, delay: 0.40 },
    ],
    [
      {
        refs:     navColRefs,
        from:     { opacity: 0, y: 60 },
        stagger:  0.15,
        duration: 0.95,
        ease:     'power4.out',
      },
    ]
  )

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-dark)',
      }}
    >
      {/* ── Very subtle noise grain ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Ghosted brand typographic anchor ────────────────────────── */}
      {/* à la Terrava — huge Syne 800 text, barely visible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.12em',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(6rem, 14vw, 16rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'rgba(245,243,238,0.035)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        G2E
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-10)',
        }}
      >

        {/* ── Brand statement row ──────────────────────────────────── */}
        <div
          style={{
            paddingBottom: 'var(--space-10)',
            borderBottom: '1px solid var(--line-inv)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Logo */}
          <div ref={logoRowRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-6)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/g2e-logo-light.svg"
              alt="G2E"
              height={36}
              style={{ display: 'block', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color:         'rgba(245,243,238,0.22)',
              }}
            >
              Transforming Waste · CDMX · Est. 2013
            </span>
          </div>

          {/* Mission statement — large, Syne, no italic */}
          <h2
            ref={missionRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-4xl)',
              lineHeight: 'var(--lh-snug)',
              letterSpacing: 'var(--ls-display)',
              color: 'rgba(245,243,238,0.88)',
              maxWidth: '620px',
            }}
          >
            From Mexico&apos;s waste<br />to the world&apos;s industry.
          </h2>
        </div>

        {/* ── Main grid: brand left + nav right ───────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-20"
          style={{
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--line-inv)',
          }}
        >

          {/* Left — identity + contact */}
          <div ref={leftColRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'var(--text-md)',
                lineHeight: 'var(--lh-loose)',
                color: 'rgba(245,243,238,0.45)',
                maxWidth: '230px',
              }}
            >
              Transforming municipal organic waste into hydrochar, decarbonizing industry at scale.
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
                    color: 'rgba(245,243,238,0.40)',
                    textDecoration: 'none',
                    transition: 'color 200ms var(--ease-expo)',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--bone-100)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.40)')}
                >
                  {email}
                </a>
              ))}
            </div>

            {/* CTA pill */}
            <a
              href="#contact"
              className="glass-btn"
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
                padding: '10px 16px',
                textDecoration: 'none',
              }}
            >
              Join the mission
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>
          </div>

          {/* Right — nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {COLS.map((col, i) => (
              <div key={col.label} ref={[navCol0Ref, navCol1Ref, navCol2Ref][i] as RefObject<HTMLDivElement>} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xs)',
                    letterSpacing: 'var(--ls-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'rgba(245,243,238,0.22)',
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
                          color: 'rgba(245,243,238,0.38)',
                          textDecoration: 'none',
                          transition: 'color 200ms var(--ease-expo)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--bone-100)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.38)')}
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

        {/* ── Legal row ────────────────────────────────────────────── */}
        <div
          ref={legalRowRef}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ paddingTop: 'var(--space-6)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color: 'rgba(245,243,238,0.16)',
            }}
          >
            Bordo Poniente · Ciudad de México · México
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245,243,238,0.16)',
            }}
          >
            © {new Date().getFullYear()} G2E. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
