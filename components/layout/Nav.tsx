'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Story',   href: '#story'   },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const headerRef   = useRef<HTMLElement>(null)
  const revealedRef = useRef(false)   // sync ref for the scroll handler
  const lastY       = useRef(0)

  /* ─── Reveal animation (called once) ─────────────────────────────── */
  const revealNav = () => {
    if (revealedRef.current) return
    revealedRef.current = true
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      {
        opacity:  1,
        y:        0,
        duration: 0.9,
        ease:     'power3.out',
        clearProps: 'transform',   // let CSS take over after
      }
    )
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // Start invisible
    gsap.set(header, { opacity: 0, y: -20 })

    // Return visitor: already scrolled past intro — reveal immediately
    if (sessionStorage.getItem('g2e-intro-seen') || window.scrollY > window.innerHeight * 1.5) {
      revealNav()
    }

    // Listen for the hero-reveal event dispatched by IntroSequence
    const onReveal = () => revealNav()
    window.addEventListener('g2e:hero-reveal', onReveal)

    // Hide/show on scroll direction (only active after reveal)
    const onScroll = () => {
      if (!revealedRef.current) return
      const y = window.scrollY
      const shouldHide = y > lastY.current && y > 120
      header.style.transform = shouldHide ? 'translateY(-110%)' : 'translateY(0)'
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('g2e:hero-reveal', onReveal)
      window.removeEventListener('scroll', onScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header
      ref={headerRef}
      aria-label="Site navigation"
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        right:      0,
        zIndex:     50,
        height:     'var(--nav-h)',
        display:    'flex',
        alignItems: 'center',
        transition: 'transform 420ms var(--ease-expo)',
        opacity:    0,          // GSAP overrides this after reveal
        willChange: 'transform, opacity',
      }}
    >
      <div className="g2e-container" style={{ width: '100%' }}>
        <div
          style={{
            display:             'flex',
            alignItems:          'center',
            height:              '56px',
            borderRadius:        'var(--radius-pill)',
            background:          'rgba(245,243,238,0.80)',
            backdropFilter:      'blur(24px) saturate(160%)',
            WebkitBackdropFilter:'blur(24px) saturate(160%)',
            boxShadow:           '0 2px 20px rgba(20,19,15,0.10), inset 0 1px 0 rgba(255,255,255,0.65)',
            padding:             '0 8px 0 16px',
            border:              '1px solid rgba(20,19,15,0.07)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="G2E home"
            style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}
          >
            <div
              style={{
                width:'40px', height:'40px', borderRadius:'999px',
                background:'var(--bg-dark)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}
            >
              <span style={{
                fontFamily:'var(--font-display)', fontWeight:800,
                fontSize:'24px', color:'var(--bone-100)',
                lineHeight:1, display:'block', marginTop:'2px',
              }}>g</span>
            </div>
            <span style={{
              fontFamily:'var(--font-display)', fontWeight:700,
              fontSize:'20px', letterSpacing:'-0.03em',
              color:'var(--bg-dark)', lineHeight:1,
            }}>g2e</span>
          </Link>

          {/* Nav links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex"
            style={{ display:'flex', alignItems:'center', marginLeft:'auto', gap:'28px' }}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily:'var(--font-sans)', fontSize:'14px',
                  fontWeight:400, color:'var(--ink-muted)',
                  textDecoration:'none', transition:'color 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="#contact"
            style={{
              marginLeft:'20px',
              display:'inline-flex', alignItems:'center', gap:'10px',
              fontFamily:'var(--font-sans)', fontSize:'13px', fontWeight:500,
              background:'var(--bg-dark)', color:'var(--bone-100)',
              padding:'11px 18px 11px 20px', borderRadius:'999px',
              textDecoration:'none', border:'none', flexShrink:0,
              transition:'background 200ms var(--ease-expo)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--hc-700)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-dark)')}
          >
            Join the mission
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
