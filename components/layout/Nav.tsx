'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Phase II', href: '#phase2'   },
]

export default function Nav() {
  const headerRef   = useRef<HTMLElement>(null)
  const revealedRef = useRef(false)
  const lastY       = useRef(0)

  const revealNav = () => {
    if (revealedRef.current) return
    revealedRef.current = true
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      {
        opacity:    1,
        y:          0,
        duration:   1.1,
        ease:       'power4.out',
        clearProps: 'transform',
      }
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
        opacity:    0,
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
            background:          'rgba(10,12,10,0.72)',
            backdropFilter:      'blur(24px) saturate(140%)',
            WebkitBackdropFilter:'blur(24px) saturate(140%)',
            boxShadow:           '0 2px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(245,243,238,0.07)',
            padding:             '0 8px 0 16px',
            border:              '1px solid rgba(245,243,238,0.10)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="G2E home"
            style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}
          >
            <div style={{
              width:'36px', height:'36px', borderRadius:'999px',
              background:'rgba(245,243,238,0.10)',
              border:'1px solid rgba(245,243,238,0.14)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <span style={{
                fontFamily:'var(--font-display)', fontWeight:800,
                fontSize:'20px', color:'#FFFFFF',
                lineHeight:1, display:'block', marginTop:'2px',
              }}>g</span>
            </div>
            <span style={{
              fontFamily:'var(--font-display)', fontWeight:700,
              fontSize:'18px', letterSpacing:'-0.03em',
              color:'rgba(245,243,238,0.90)', lineHeight:1,
            }}>g2e</span>
          </Link>

          {/* Nav links */}
          <nav
            aria-label="Primary"
            style={{ display:'flex', alignItems:'center', marginLeft:'auto', gap:'24px' }}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily:'var(--font-sans)', fontSize:'13px',
                  fontWeight:400, color:'rgba(245,243,238,0.55)',
                  textDecoration:'none', transition:'color 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.95)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,238,0.55)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="#contact"
            style={{
              marginLeft:     '16px',
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              fontFamily:     'var(--font-sans)',
              fontSize:       '13px',
              fontWeight:     500,
              background:     'rgba(245,243,238,0.12)',
              color:          '#FFFFFF',
              padding:        '10px 16px 10px 18px',
              borderRadius:   '999px',
              textDecoration: 'none',
              border:         '1px solid rgba(245,243,238,0.16)',
              flexShrink:     0,
              transition:     'background 200ms var(--ease-expo), border-color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245,243,238,0.20)'
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.28)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(245,243,238,0.12)'
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.16)'
            }}
          >
            Join the mission
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
