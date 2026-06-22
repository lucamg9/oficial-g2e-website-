'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang, useT } from '@/lib/i18n'

/* ──────────────────────────────────────────────────────────────
   Nav — the floating brand pill.

   Logo lockup: the -CO₂ sprout emblem + the G2E logomark. Image
   heights are set inline so they beat Tailwind's preflight.

   Desktop: links + EN/ES toggle + CTA inline in the pill, which
   condenses on scroll. Mobile/tablet (≤880px): the inline items are
   replaced by a hamburger that opens a dropdown panel with the same
   links, toggle and CTA.
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
  const { lang, setLang } = useLang()
  const t = useT()

  const [menuOpen, setMenuOpen] = useState(false)

  /* ── "In development" toast ───────────────────────────────────────────── */
  const [notice, setNotice] = useState<{ label: string } | null>(null)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const hideTimer    = useRef<number | undefined>(undefined)
  const unmountTimer = useRef<number | undefined>(undefined)

  const showNotice = (label: string) => {
    window.clearTimeout(hideTimer.current)
    window.clearTimeout(unmountTimer.current)
    setNotice({ label })
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
      const nextScrolled = window.scrollY > 16
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled
        nav.style.background = scrolled ? SOLID : SHEER
        nav.style.boxShadow  = scrolled
          ? '0 10px 30px -12px rgba(46,55,42,0.30)'
          : 'var(--shadow-card)'
        nav.style.padding    = scrolled ? '5px 7px 5px 16px' : '6px 8px 6px 18px'
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

  /* Shared bits ─────────────────────────────────────────────────────────── */
  const LangToggle = ({ compact = false }: { compact?: boolean }) => (
    <div role="group" aria-label="Language" style={{
      display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0,
      padding: '3px', borderRadius: '999px',
      border: '1px solid var(--sand-300)', background: 'var(--oat-150)',
      marginLeft: compact ? 0 : '6px',
    }}>
      {(['en', 'es'] as const).map(l => {
        const active = lang === l
        return (
          <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={active}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              padding: compact ? '7px 14px' : '5px 9px', borderRadius: '999px',
              border: 'none', cursor: 'pointer',
              background: active ? 'var(--forest, #2E372A)' : 'transparent',
              color: active ? '#FAFAF7' : 'var(--ink-600)',
              transition: 'background 200ms, color 200ms',
            }}>
            {l}
          </button>
        )
      })}
    </div>
  )

  return (
    <>
    <header
      ref={headerRef}
      aria-label="Site navigation"
      style={{
        position: 'fixed', top: '14px', left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'center', padding: '0 16px',
        opacity: 0, transform: 'translateY(-16px)',
        transition: 'transform 460ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1)), opacity 600ms ease',
        willChange: 'transform, opacity', pointerEvents: 'none',
      }}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        style={{
          width: '100%', maxWidth: '1060px',
          display: 'flex', alignItems: 'center', gap: '4px',
          background: 'color-mix(in srgb, #FAFAF7 86%, transparent)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid var(--sand-300)', borderRadius: 'var(--radius-pill)',
          padding: '6px 8px 6px 18px', boxShadow: 'var(--shadow-card)',
          pointerEvents: 'auto',
          transition: 'padding 360ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1)), background 300ms ease, box-shadow 300ms ease',
        }}
      >
        {/* Logo lockup */}
        <Link href="/" aria-label="G2E home" className="nav-logo" style={{
          display: 'flex', alignItems: 'center', gap: '20px',
          marginRight: 'auto', textDecoration: 'none', flexShrink: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-emblem.png" alt="" aria-hidden="true" className="nav-emblem" style={{ display: 'block', height: '44px', width: 'auto' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-g2e.png" alt="G2E" className="nav-wordmark" style={{ display: 'block', height: '34px', width: 'auto' }} />
        </Link>

        {/* Desktop inline items */}
        <div className="nav-inline" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map(link => (
            <button key={link.href} type="button" onClick={() => showNotice(link.label)}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500,
                color: 'var(--ink-600)', padding: '9px 15px', border: 'none',
                background: 'transparent', borderRadius: 'var(--radius-pill)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 220ms, color 220ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--oat-200)'; e.currentTarget.style.color = 'var(--ink-900)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-600)' }}
            >
              {t(link.label)}
            </button>
          ))}
          <LangToggle />
          <Link href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
            background: 'var(--clay-500)', color: '#FAFAF7', padding: '10px 20px',
            borderRadius: 'var(--radius-pill)', textDecoration: 'none', flexShrink: 0,
            marginLeft: '4px', boxShadow: '0 6px 20px -8px rgba(73,85,61,0.55)',
            transition: 'background 180ms var(--ease-expo)',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--clay-600)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--clay-500)')}
          >
            {t('Get in touch')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', flexShrink: 0,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
          }}
        >
          <span style={{ position: 'relative', width: '20px', height: '14px', display: 'block' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, top: menuOpen ? '6px' : 0, height: '2px', borderRadius: '2px', background: 'var(--ink-900)', transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'transform 240ms var(--ease-expo), top 240ms var(--ease-expo), opacity 240ms' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, top: '6px', height: '2px', borderRadius: '2px', background: 'var(--ink-900)', opacity: menuOpen ? 0 : 1, transition: 'opacity 180ms' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: menuOpen ? '6px' : 0, height: '2px', borderRadius: '2px', background: 'var(--ink-900)', transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'transform 240ms var(--ease-expo), bottom 240ms var(--ease-expo)' }} />
          </span>
        </button>
      </nav>
    </header>

    {/* ── Mobile dropdown panel ─────────────────────────────────────────── */}
    <div
      className="nav-mobile-wrap"
      aria-hidden={!menuOpen}
      style={{ position: 'fixed', top: '72px', left: '16px', right: '16px', zIndex: 99, display: 'none' }}
    >
      {/* tap-away backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: -1,
          opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 240ms ease',
        }}
      />
      <div style={{
        margin: '0 auto', maxWidth: '460px',
        transformOrigin: 'top center',
        transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 240ms ease, transform 280ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1))',
        background: 'color-mix(in srgb, #FAFAF7 96%, transparent)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--sand-300)', borderRadius: '20px',
        boxShadow: '0 18px 50px -16px rgba(46,55,42,0.35)',
        padding: '10px', display: 'flex', flexDirection: 'column', gap: '2px',
      }}>
        {NAV_LINKS.map(link => (
          <button key={link.href} type="button"
            onClick={() => { showNotice(link.label); setMenuOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', textAlign: 'left',
              fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500,
              color: 'var(--ink-900)', padding: '14px 14px', border: 'none',
              background: 'transparent', borderRadius: '12px', cursor: 'pointer',
            }}
          >
            {t(link.label)}
            <span aria-hidden="true" style={{ color: 'var(--moss)', fontSize: '13px' }}>↗</span>
          </button>
        ))}
        <div style={{ height: '1px', background: 'var(--sand-300)', margin: '6px 8px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '4px' }}>
          <LangToggle compact />
          <Link href="#contact" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600,
            background: 'var(--clay-500)', color: '#FAFAF7', padding: '12px 22px',
            borderRadius: '999px', textDecoration: 'none',
            boxShadow: '0 6px 20px -8px rgba(73,85,61,0.55)',
          }}>
            {t('Get in touch')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>

    {/* ── "In development" toast ────────────────────────────────────────── */}
    {notice && (
      <div role="status" aria-live="polite" style={{
        position: 'fixed', top: '78px', left: '50%', zIndex: 101,
        transform: `translateX(-50%) translateY(${noticeOpen ? '0' : '-10px'})`,
        opacity: noticeOpen ? 1 : 0,
        transition: 'opacity 280ms ease, transform 320ms var(--ease-expo, cubic-bezier(0.16,1,0.3,1))',
        pointerEvents: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '10px 16px 10px 14px', borderRadius: '999px',
        background: 'color-mix(in srgb, #2E372A 92%, transparent)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(245,243,238,0.12)',
        boxShadow: '0 14px 34px -14px rgba(46,55,42,0.55)',
        whiteSpace: 'nowrap', maxWidth: 'calc(100vw - 32px)',
      }}>
        <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--clay-500, #7A8F5A)', animation: 'g2e-ping 1.8s var(--ease-expo, ease-out) infinite' }} />
          <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--clay-500, #7A8F5A)' }} />
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: 500, color: '#FAFAF7', letterSpacing: '-0.01em' }}>
          <strong style={{ fontWeight: 600 }}>{t(notice.label)}</strong>
          {' '}{t('is in development')}
        </span>
      </div>
    )}

    {/* Responsive + ping keyframes */}
    <style>{`
      @keyframes g2e-ping {
        0%   { transform: scale(1);   opacity: 0.55; }
        70%  { transform: scale(2.4); opacity: 0;    }
        100% { transform: scale(2.4); opacity: 0;    }
      }
      @media (max-width: 880px) {
        .nav-inline      { display: none !important; }
        .nav-burger      { display: inline-flex !important; }
        .nav-mobile-wrap { display: block !important; }
        .nav-emblem      { height: 38px !important; }
        .nav-wordmark    { height: 28px !important; }
        .nav-logo        { gap: 14px !important; }
      }
      @media (max-width: 420px) {
        .nav-emblem   { height: 32px !important; }
        .nav-wordmark { height: 24px !important; }
        .nav-logo     { gap: 11px !important; }
      }
    `}</style>
    </>
  )
}
