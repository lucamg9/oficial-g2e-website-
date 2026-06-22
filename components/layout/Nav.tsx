'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ──────────────────────────────────────────────────────────────
   Nav — the floating brand pill.

   Logo lockup: the -CO₂ sprout emblem + the G2E logomark (both
   transparent brand assets derived from the client files). Image
   heights are set inline so they beat Tailwind's preflight
   (img { height:auto }) — otherwise the PNGs render at full size.

   Dynamic on scroll: it stays visible at all times, but at the very
   top it sits open and airy, then once scrolled it condenses and
   gains a solid frosted background + stronger shadow.
   ────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Technology',           href: '#technology' },
  { label: 'Services',             href: '#services'   },
  { label: 'Demonstration Center', href: '#demo'       },
  { label: 'Presence',             href: '#presence'   },
]

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null)
  const navRef    = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const nav    = navRef.current
    if (!header || !nav) return

    // Reveal on mount (CSS-transition driven so it composes cleanly with the
    // scroll-driven transform below — both animate `transform`/`opacity`).
    const reveal = requestAnimationFrame(() => {
      header.style.opacity   = '1'
      header.style.transform = 'translateY(0)'
    })

    let scrolled = false
    let raf = 0

    const SOLID = 'color-mix(in srgb, #FAFAF7 94%, transparent)'
    const SHEER = 'color-mix(in srgb, #FAFAF7 86%, transparent)'

    const apply = () => {
      raf = 0
      // Condensed/solid state once we leave the very top — the bar itself
      // always stays visible (no hide-on-scroll).
      const nextScrolled = window.scrollY > 16
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled
        nav.style.background = scrolled ? SOLID : SHEER
        nav.style.boxShadow  = scrolled
          ? '0 10px 30px -12px rgba(46,55,42,0.30)'
          : 'var(--shadow-card)'
        nav.style.padding    = scrolled ? '5px 7px 5px 16px' : '6px 8px 6px 18px'
        nav.style.maxWidth   = scrolled ? '980px' : '1060px'
      }
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener('scroll', onScroll, { passive: true })
    apply()

    return () => {
      cancelAnimationFrame(reveal)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
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
        transform:       'translateY(-16px)',
        transition:      'transform 460ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1)), opacity 600ms ease',
        willChange:      'transform, opacity',
        pointerEvents:   'none',
      }}
    >
      {/* Pill container */}
      <nav
        ref={navRef}
        aria-label="Primary"
        style={{
          width:                '100%',
          maxWidth:             '1060px',
          display:              'flex',
          alignItems:           'center',
          gap:                  '4px',
          background:           'color-mix(in srgb, #FAFAF7 86%, transparent)',
          backdropFilter:       'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border:               '1px solid var(--sand-300)',
          borderRadius:         'var(--radius-pill)',
          padding:              '6px 8px 6px 18px',
          boxShadow:            'var(--shadow-card)',
          pointerEvents:        'auto',
          transition:           'max-width 360ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1)), padding 360ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1)), background 300ms ease, box-shadow 300ms ease',
        }}
      >
        {/* Logo lockup — emblem (logo_light.png) + G2E logomark (logo PDF).
            Height is set inline to override Tailwind preflight. */}
        <Link
          href="/"
          aria-label="G2E home"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '20px',
            marginRight:    'auto',
            textDecoration: 'none',
            flexShrink:     0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-emblem.png"
            alt=""
            aria-hidden="true"
            style={{ display: 'block', height: '44px', width: 'auto' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-g2e.png"
            alt="G2E"
            style={{ display: 'block', height: '34px', width: 'auto' }}
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
            color:          '#FAFAF7',
            padding:        '10px 20px',
            borderRadius:   'var(--radius-pill)',
            textDecoration: 'none',
            flexShrink:     0,
            marginLeft:     '4px',
            boxShadow:      '0 6px 20px -8px rgba(73,85,61,0.55)',
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
