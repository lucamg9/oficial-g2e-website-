'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '3 t/hr',    label: 'Live throughput'      },
  { value: '220°C',     label: 'Process temperature'  },
  { value: 'World #1',  label: 'Largest HTC plant'    },
  { value: 'Est. 2013', label: 'Bordo Poniente, CDMX' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const children = Array.from(content.querySelectorAll<HTMLElement>('[data-reveal]'))

    // Set initial hidden state for all content elements
    children.forEach(child => {
      gsap.set(child, { opacity: 0, y: 36 })
    })

    const ctx = gsap.context(() => {

      // ── Section entrance ─────────────────────────────────────────────
      // Rises from below with a scale + y scrub as it enters the viewport.
      // Combined with zIndex: 10 on the section, this overlays the pinned
      // IntroSequence video during the last portion of its scroll.
      gsap.fromTo(section,
        { y: 60, scale: 0.97 },
        {
          y: 0, scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',   // section top hits viewport bottom
            end:   'top 20%',      // section top is 20% from viewport top
            scrub: 0.8,
          },
        }
      )

      // ── Content cascade ───────────────────────────────────────────────
      // Fires once when section is comfortably in view.
      ScrollTrigger.create({
        trigger: section,
        start:   'top 65%',
        once:    true,
        onEnter() {
          gsap.to(children, {
            opacity:  1,
            y:        0,
            duration: 0.9,
            ease:     'power3.out',
            stagger:  0.13,
          })
        },
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="G2E — From landfill to fuel"
      style={{
        position:     'relative',
        minHeight:    '100vh',
        background:   'var(--bg-dark)',
        display:      'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        overflow:     'hidden',
        zIndex:       10,                  // renders above GSAP-pinned IntroSequence
        borderRadius: '20px 20px 0 0',    // card rising from below
        willChange:   'transform',
      }}
    >
      {/* ── Hero image ───────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <picture>
          <source srcSet="/assets/hero-image.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-image.jpg"
            alt=""
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center 35%',
              display:        'block',
            }}
          />
        </picture>
        {/* Dark tint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,10,0.45)' }} />
        {/* Bottom vignette — text legibility */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to bottom, rgba(10,12,10,0) 0%, rgba(10,12,10,0.94) 100%)',
        }} />
        {/* Left vignette */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
          background: 'linear-gradient(to right, rgba(20,19,15,0.40) 0%, rgba(20,19,15,0) 100%)',
        }} />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="g2e-container"
        style={{
          position:      'relative',
          zIndex:        1,
          paddingTop:    'calc(var(--nav-h) + var(--space-12))',
          paddingBottom: 'var(--space-12)',
          display:       'flex',
          flexDirection: 'column',
        }}
      >
        {/* Eyebrow */}
        <div
          data-reveal
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-5)' }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.70)',
          }}>
            G2E · Green to Energy
          </span>
          <div style={{ height: '1px', width: '28px', background: 'rgba(245,243,238,0.16)' }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-2xs)',
            letterSpacing: 'var(--ls-eyebrow)',
            textTransform: 'uppercase',
            color:         'rgba(245,243,238,0.40)',
          }}>
            Bordo Poniente · CDMX · Est. 2013
          </span>
        </div>

        {/* Headline */}
        <h1
          data-reveal
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    800,
            fontSize:      'clamp(3.2rem, 7vw, 7rem)',
            lineHeight:    0.95,
            letterSpacing: '-0.035em',
            color:         '#FFFFFF',
            maxWidth:      '760px',
            marginBottom:  'var(--space-6)',
          }}
        >
          From landfill<br />
          to fuel.<br />
          <span style={{ color: 'rgba(245,243,238,0.72)' }}>In hours.</span>
        </h1>

        {/* Lede */}
        <p
          data-reveal
          style={{
            fontFamily:   'var(--font-sans)',
            fontWeight:   300,
            fontSize:     'clamp(1rem, 1.5vw, 1.15rem)',
            lineHeight:   1.72,
            color:        'rgba(245,243,238,0.82)',
            maxWidth:     '480px',
            marginBottom: 'var(--space-8)',
          }}
        >
          We collect organic waste from Mexico City and transform it into hydrochar —
          a mineral-grade carbon material that replaces coal and regenerates soil.
        </p>

        {/* CTAs */}
        <div
          data-reveal
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}
        >
          <a
            href="#contact"
            className="glass-btn"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '10px',
              fontFamily:     'var(--font-sans)',
              fontSize:       '15px',
              fontWeight:     500,
              color:          '#FFFFFF',
              padding:        '14px 24px',
              textDecoration: 'none',
            }}
          >
            Join the mission
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>

          <a
            href="#about"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              fontFamily:     'var(--font-sans)',
              fontSize:       '14px',
              fontWeight:     400,
              color:          'rgba(245,243,238,0.62)',
              padding:        '13px 20px',
              borderRadius:   '999px',
              border:         '1px solid rgba(245,243,238,0.18)',
              textDecoration: 'none',
              transition:     'border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.42)'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.18)'
              e.currentTarget.style.color = 'rgba(245,243,238,0.62)'
            }}
          >
            Who we are
          </a>
        </div>

        {/* Stat strip */}
        <div
          data-reveal
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="glass-card"
              style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '110px' }}
            >
              <span style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    700,
                fontSize:      'clamp(1.2rem, 2vw, 1.6rem)',
                lineHeight:    1,
                letterSpacing: '-0.025em',
                color:         '#FFFFFF',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '10px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color:         'rgba(245,243,238,0.60)',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Partnership line */}
        <div
          data-reveal
          style={{
            marginTop:    'var(--space-7)',
            paddingTop:   'var(--space-5)',
            borderTop:    '1px solid rgba(245,243,238,0.08)',
            display:      'flex',
            alignItems:   'center',
            gap:          'var(--space-5)',
            flexWrap:     'wrap',
          }}
        >
          {['UNAM partner', 'Mexican Government', 'International partnerships', 'Phase II · 2027'].map((item, i) => (
            <span key={i} style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-2xs)',
              letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase',
              color:         'rgba(245,243,238,0.42)',
              display:       'flex',
              alignItems:    'center',
              gap:           'var(--space-5)',
            }}>
              {i > 0 && <span style={{ opacity: 0.3 }}>·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '32px',
          right:         'var(--container-pad)',
          zIndex:        1,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '8px',
        }}
      >
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(245,243,238,0.20)',
          writingMode:   'vertical-rl',
        }}>
          Scroll
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,243,238,0.20)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
