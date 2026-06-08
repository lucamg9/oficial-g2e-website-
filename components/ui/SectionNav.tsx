'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const SECTIONS = [
  { id: 'hero-anchor', label: 'Hero',         scrollTop: 0 },
  { id: 'about',       label: 'Who We Are',   scrollTop: null },
  { id: 'timeline',    label: 'Our Story',    scrollTop: null },
  { id: 'how-it-works',label: 'How It Works', scrollTop: null },
  { id: 'phase2',      label: 'Phase II',     scrollTop: null },
  { id: 'contact',     label: 'Contact',      scrollTop: null },
]

export default function SectionNav() {
  const [open,   setOpen]   = useState(false)
  const [active, setActive] = useState(0)
  const menuRef             = useRef<HTMLDivElement>(null)

  /* ── Active section tracker ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrollY  = window.scrollY
      const vh       = window.innerHeight

      let best = 0
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const id = SECTIONS[i].id
        if (id === 'hero-anchor') {
          if (scrollY < 200) { best = 0; break }
          continue
        }
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= vh * 0.55) {
          best = i
          break
        }
      }
      setActive(best)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close on outside click ─────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* ── Navigate ───────────────────────────────────────────────────────── */
  const goTo = useCallback((idx: number) => {
    setOpen(false)
    const { id } = SECTIONS[idx]
    if (id === 'hero-anchor') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    // GSAP wraps pinned sections in a spacer div (data-gsap-pin-spacer).
    // The spacer holds the correct document position; the section itself
    // is position:fixed while pinned so its offsetTop would be wrong.
    const spacer = el.closest('[data-gsap-pin-spacer]') as HTMLElement | null
    window.scrollTo({ top: (spacer ?? el).offsetTop, behavior: 'smooth' })
  }, [])

  return (
    <div
      ref={menuRef}
      style={{
        position:   'fixed',
        right:      '24px',
        top:        '50%',
        transform:  'translateY(-50%)',
        zIndex:     9000,
        display:    'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        gap:        '8px',
      }}
    >
      {/* ── Section list ──────────────────────────────────────────────── */}
      <div
        style={{
          overflow:      'hidden',
          maxHeight:     open ? '360px' : '0px',
          opacity:       open ? 1 : 0,
          transform:     open ? 'translateY(0px) scale(1)' : 'translateY(8px) scale(0.97)',
          transition:    'max-height 300ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease, transform 220ms ease',
          transformOrigin: 'bottom right',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div style={{
          background:   'rgba(12,14,12,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:       '1px solid rgba(245,243,238,0.10)',
          borderRadius: '16px',
          padding:      '8px 6px',
          display:      'flex',
          flexDirection:'column',
          gap:          '2px',
          minWidth:     '164px',
          boxShadow:    '0 8px 32px rgba(0,0,0,0.40)',
        }}>
          {SECTIONS.map((s, i) => {
            const isActive = active === i
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '10px',
                  padding:       '9px 12px',
                  borderRadius:  '10px',
                  border:        'none',
                  background:    isActive ? 'rgba(245,243,238,0.08)' : 'transparent',
                  cursor:        'pointer',
                  width:         '100%',
                  textAlign:     'left',
                  transition:    'background 160ms',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(245,243,238,0.05)'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Active dot */}
                <span style={{
                  width:      '5px',
                  height:     '5px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background:   isActive ? 'var(--clay-500, #C5682E)' : 'rgba(245,243,238,0.22)',
                  transition:  'background 200ms',
                }} />
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         isActive ? '#F5F3EE' : 'rgba(245,243,238,0.50)',
                  transition:    'color 200ms',
                }}>
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Trigger pill ─────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close page sections' : 'Open page sections'}
        style={{
          display:        'flex',
          alignItems:     'center',
          gap:            '8px',
          padding:        '9px 14px 9px 12px',
          borderRadius:   '999px',
          border:         '1px solid rgba(245,243,238,0.14)',
          background:     'rgba(12,14,12,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          cursor:         'pointer',
          boxShadow:      '0 4px 20px rgba(0,0,0,0.32)',
          transition:     'border-color 200ms, background 200ms',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(245,243,238,0.28)'
          e.currentTarget.style.background  = 'rgba(20,22,20,0.92)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(245,243,238,0.14)'
          e.currentTarget.style.background  = 'rgba(12,14,12,0.88)'
        }}
      >
        {/* List icon */}
        <svg
          width="14" height="12" viewBox="0 0 14 12" fill="none"
          style={{ flexShrink: 0, opacity: open ? 0.9 : 0.65, transition: 'opacity 200ms' }}
        >
          <rect x="0" y="0"   width="14" height="2" rx="1" fill="#F5F3EE" />
          <rect x="0" y="5"   width="10" height="2" rx="1" fill="#F5F3EE" />
          <rect x="0" y="10"  width="6"  height="2" rx="1" fill="#F5F3EE" />
        </svg>

        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'rgba(245,243,238,0.65)',
          whiteSpace:    'nowrap',
        }}>
          Sections
        </span>
      </button>
    </div>
  )
}
