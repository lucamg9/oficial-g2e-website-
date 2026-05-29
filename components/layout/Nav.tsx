'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Technology', href: '#technology' },
  { label: 'Process',    href: '#process'    },
  { label: 'Products',   href: '#products'   },
  { label: 'Scale',      href: '#scale'      },
  { label: 'About',      href: '#about'      },
]

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY.current || y < 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 420ms var(--ease-expo)',
      }}
    >
      <div className="g2e-container" style={{ width: '100%' }}>
        {/* Pill nav — frosted glass */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '56px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(245,243,238,0.75)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            boxShadow: '0 2px 16px rgba(20,19,15,0.08), inset 0 1px 0 rgba(255,255,255,0.60)',
            padding: '0 8px 0 16px',
            border: '1px solid rgba(20,19,15,0.07)',
          }}
        >
          {/* Logo — g disc + g2e wordmark */}
          <Link
            href="/"
            aria-label="G2E home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '999px',
                background: 'var(--bg-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '24px',
                  color: 'var(--bone-100)',
                  lineHeight: 1,
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                g
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '20px',
                letterSpacing: '-0.03em',
                color: 'var(--bg-dark)',
                lineHeight: 1,
              }}
            >
              g2e
            </span>
          </Link>

          {/* Nav links */}
          <nav
            aria-label="Primary"
            style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '28px' }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--ink-muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — primary pill with arrow */}
          <Link
            href="#contact"
            style={{
              marginLeft: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              background: 'var(--bg-dark)',
              color: 'var(--bone-100)',
              padding: '11px 18px 11px 20px',
              borderRadius: '999px',
              textDecoration: 'none',
              border: 'none',
              flexShrink: 0,
              transition: 'background 200ms var(--ease-expo)',
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
