'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Technology',           href: '#technology' },
  { label: 'Services',             href: '#services'   },
  { label: 'Demonstration Center', href: '#demo'       },
  { label: 'Presence',             href: '#presence'   },
]

export default function Nav() {
  const headerRef   = useRef<HTMLElement>(null)
  const revealedRef = useRef(false)

  const revealNav = () => {
    if (revealedRef.current) return
    revealedRef.current = true
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', clearProps: 'transform' }
    )
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    gsap.set(header, { opacity: 0, y: -16 })

    if (sessionStorage.getItem('g2e-intro-seen') || window.scrollY > window.innerHeight * 1.5) {
      revealNav()
    }

    const onReveal = () => revealNav()
    window.addEventListener('g2e:hero-reveal', onReveal)
    return () => window.removeEventListener('g2e:hero-reveal', onReveal)
  }, [])

  return (
    <header
      ref={headerRef}
      aria-label="Site navigation"
      style={{
        position:        'fixed',
        top:             '18px',
        left:            0,
        right:           0,
        zIndex:          100,
        display:         'flex',
        justifyContent:  'center',
        padding:         '0 20px',
        opacity:         0,
        willChange:      'opacity',
        pointerEvents:   'none',
      }}
    >
      {/* Pill container — matches Daniel's .g2e-nav spec exactly */}
      <nav
        aria-label="Primary"
        style={{
          width:                '100%',
          maxWidth:             '1060px',
          display:              'flex',
          alignItems:           'center',
          gap:                  '4px',
          background:           `color-mix(in srgb, #FCFBF6 86%, transparent)`,
          backdropFilter:       'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border:               '1px solid var(--sand-300)',
          borderRadius:         'var(--radius-pill)',
          padding:              '9px 9px 9px 18px',
          boxShadow:            'var(--shadow-card)',
          pointerEvents:        'auto',
        }}
      >
        {/* Logo — full SVG lockup (mark + G2E text) */}
        <Link
          href="/"
          aria-label="G2E home"
          style={{
            display:        'flex',
            alignItems:     'center',
            marginRight:    'auto',
            textDecoration: 'none',
            flexShrink:     0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/g2e-logo.svg"
            alt="G2E"
            height={28}
            style={{ display: 'block' }}
          />
        </Link>

        {/* Nav links */}
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily:     'var(--font-sans)',
              fontSize:       '14px',
              fontWeight:     500,
              color:          'var(--ink-600)',
              padding:        '9px 15px',
              borderRadius:   'var(--radius-pill)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
              transition:     'background 220ms, color 220ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--oat-200)'
              e.currentTarget.style.color = 'var(--ink-900)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--ink-600)'
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* CTA — clay accent pill */}
        <Link
          href="#contact"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            fontFamily:     'var(--font-sans)',
            fontSize:       '14px',
            fontWeight:     600,
            background:     'var(--clay-500)',
            color:          '#FCFBF6',
            padding:        '10px 20px',
            borderRadius:   'var(--radius-pill)',
            textDecoration: 'none',
            flexShrink:     0,
            marginLeft:     '4px',
            boxShadow:      '0 6px 20px -8px rgba(148,75,40,0.55)',
            transition:     'background 180ms var(--ease-expo)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--clay-600)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--clay-500)')}
        >
          Get in touch
          <span aria-hidden="true" style={{ display: 'inline-block', transition: 'transform 200ms var(--ease-expo)' }}>→</span>
        </Link>
      </nav>
    </header>
  )
}
