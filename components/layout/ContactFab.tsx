'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ContactFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 320ms var(--ease-expo), transform 320ms var(--ease-expo)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <Link
        href="#contact"
        aria-label="Get in touch with G2E"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 500,
          background: 'var(--hydrochar-900)',
          color: 'var(--bone-100)',
          padding: '13px 20px',
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-pop)',
          transition: 'background 200ms, transform 80ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hydrochar-700)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--hydrochar-900)')}
      >
        Get in touch
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
        </svg>
      </Link>
    </div>
  )
}
