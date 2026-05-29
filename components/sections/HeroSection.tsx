'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  // Simple staggered entry on mount
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const children = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(14px)'
      setTimeout(() => {
        child.style.transition = `opacity 700ms var(--ease-expo) ${i * 90}ms, transform 700ms var(--ease-expo) ${i * 90}ms`
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      }, 120)
    })
  }, [])

  return (
    <section
      id="hero"
      aria-label="G2E — Waste, transmuted"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--hydrochar-900)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* ── GIF background ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/motion/1.gif"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.38,
          }}
        />
        {/* Overlay — Hydrochar 60% for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(17,20,15,0.62)',
          }}
        />
        {/* Bottom vignette — eases into content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(17,20,15,0) 0%, rgba(17,20,15,0.85) 100%)',
          }}
        />
      </div>

      {/* ── Main content — left-aligned, editorial ──── */}
      <div
        className="g2e-container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'calc(var(--nav-h) + var(--space-16))',
          paddingBottom: 'var(--space-12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <div ref={contentRef} style={{ maxWidth: '760px' }}>

          {/* Eyebrow */}
          <div
            data-reveal
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: 'var(--space-6)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.45)',
              }}
            >
              [ 01 ]
            </span>
            <div
              style={{
                height: '1px',
                width: '36px',
                background: 'rgba(242,239,231,0.18)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.45)',
              }}
            >
              From landfill to megawatt
            </span>
          </div>

          {/* Headline — Roman + Italic mix, tight */}
          <h1
            data-reveal
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-6xl)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-display)',
              color: 'var(--bone-100)',
              marginBottom: 'var(--space-6)',
              fontWeight: 400,
            }}
          >
            Waste,<br />
            <em>transmuted.</em>
          </h1>

          {/* Lede */}
          <p
            data-reveal
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--lh-loose)',
              color: 'rgba(242,239,231,0.70)',
              maxWidth: '520px',
              marginBottom: 'var(--space-8)',
              fontWeight: 300,
            }}
          >
            We process the organic waste your city already collects,
            and return it as hydrochar — a drop-in replacement for mineral coal.
          </p>

          {/* CTAs */}
          <div
            data-reveal
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary — bone pill */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 500,
                background: 'var(--bone-100)',
                color: 'var(--hydrochar-900)',
                padding: '14px 22px 14px 26px',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bone-200)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bone-100)')}
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
              </svg>
            </a>

            {/* Secondary — ghost */}
            <a
              href="#process"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 500,
                background: 'transparent',
                color: 'var(--bone-100)',
                padding: '13px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(242,239,231,0.22)',
                textDecoration: 'none',
                transition: 'border-color 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(242,239,231,0.50)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242,239,231,0.22)')}
            >
              See how it works
            </a>
          </div>
        </div>

        {/* ── Credibility strip ────────────────────── */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid rgba(242,239,231,0.10)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)',
            flexWrap: 'wrap',
          }}
        >
          {[
            "World's largest HTC plant",
            'In partnership with UNAM',
            'Ciudad de México',
            'Est. 2013',
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: 'var(--ls-eyebrow)',
                textTransform: 'uppercase',
                color: 'rgba(242,239,231,0.32)',
              }}
            >
              {i > 0 && (
                <span style={{ marginRight: 'var(--space-6)', opacity: 0.4 }}>·</span>
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          right: 'var(--container-pad)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(242,239,231,0.28)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(242,239,231,0.28)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
