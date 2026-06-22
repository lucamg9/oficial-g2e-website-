'use client'

import { useEffect, useRef, useState } from 'react'
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

  /* ── "In development" toast ─────────────────────────────────────────────
     These sections aren't built yet, so clicking a link surfaces a calm
     notice instead of navigating to a dead anchor. `label` keeps it mounted;
     `open` drives the slide/fade. */
  const [notice, setNotice] = useState<{ label: string } | null>(null)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const hideTimer   = useRef<number | undefined>(undefined)
  const unmountTimer = useRef<number | undefined>(undefined)

  const showNotice = (label: string) => {
    window.clearTimeout(hideTimer.current)
    window.clearTimeout(unmountTimer.current)
    setNotice({ label })
    // next frame → transition in
    requestAnimationFrame(() => requestAnimationFrame(() => setNoticeOpen(true)))
    hideTimer.current = window.setTimeout(() => {
      setNoticeOpen(false)
      unmountTimer.current = window.setTimeout(() => setNotice(null), 340)
    }, 2000)
  }

  useEffect(() => () => {
    window.clearTimeout(hideTimer.current)
    window.clearTimeout(unmountTimer.current)
  }, [])

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
    <>
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

        {/* Nav links — these sections are still in development, so they
            surface a notice instead of navigating to a dead anchor. */}
        {NAV_LINKS.map(link => (
          <button
            key={link.href}
            type="button"
            onClick={() => showNotice(link.label)}
            style={{
              fontFamily:     'var(--font-sans)',
              fontSize:       '14px',
              fontWeight:     500,
              color:          'var(--ink-600)',
              padding:        '9px 15px',
              border:         'none',
              background:     'transparent',
              borderRadius:   'var(--radius-pill)',
              cursor:         'pointer',
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
          </button>
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

    {/* ── "In development" toast — sits just under the pill, centred ─────── */}
    {notice && (
      <div
        role="status"
        aria-live="polite"
        style={{
          position:      'fixed',
          top:           '84px',
          left:          '50%',
          zIndex:        101,
          transform:     `translateX(-50%) translateY(${noticeOpen ? '0' : '-10px'})`,
          opacity:       noticeOpen ? 1 : 0,
          transition:    'opacity 280ms ease, transform 320ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1))',
          pointerEvents: 'none',
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '10px',
          padding:       '10px 16px 10px 14px',
          borderRadius:  '999px',
          background:    'color-mix(in srgb, #2E372A 92%, transparent)',
          backdropFilter:'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border:        '1px solid rgba(245,243,238,0.12)',
          boxShadow:     '0 14px 34px -14px rgba(46,55,42,0.55)',
          whiteSpace:    'nowrap',
          maxWidth:      'calc(100vw - 32px)',
        }}
      >
        {/* pulsing moss dot */}
        <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'var(--clay-500, #7A8F5A)', animation: 'g2e-ping 1.8s var(--ease-expo, ease-out) infinite',
          }} />
          <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--clay-500, #7A8F5A)' }} />
        </span>
        <span style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '13.5px',
          fontWeight:    500,
          color:         '#FAFAF7',
          letterSpacing: '-0.01em',
        }}>
          <strong style={{ fontWeight: 600 }}>{notice.label}</strong>
          {' '}is in development
        </span>

        <style>{`
          @keyframes g2e-ping {
            0%   { transform: scale(1);   opacity: 0.55; }
            70%  { transform: scale(2.4); opacity: 0;    }
            100% { transform: scale(2.4); opacity: 0;    }
          }
        `}</style>
      </div>
    )}
    </>
  )
}
