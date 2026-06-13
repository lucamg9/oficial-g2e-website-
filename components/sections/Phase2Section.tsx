'use client'

/* Phase II / 2027 vision — final narrative section before Contact */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {
    value:   '$150M',
    label:   'Investment · Phase II',
    context: 'Capital committed to building 10 new modules at Bordo Poniente.',
  },
  {
    value:   '10',
    label:   'New modules · 2027',
    context: 'Each module identical to the world\'s largest HTC plant.',
  },
  {
    value:   '792 t',
    label:   'Waste processed daily',
    context: 'Enough organic waste to decarbonize a mid-size Mexican city.',
  },
  {
    value:   '170',
    label:   'Long-term module target',
    context: 'One replicable model. Any city. Any scale.',
  },
]

const PRODUCTS = [
  {
    title: 'Biological fertilizer',
    body:  'Hydrochar can cut chemical fertilizer use by up to 50% in corn and beans while keeping yields the same. It returns carbon and nutrients to the soil. Validated with COLPOS, CIMMYT, and SADER.',
  },
  {
    title: 'Mineral coal replacement',
    body:  'Replaces thermal coal in power generation and metallurgical coal in steel production. Decarbonizes two of the hardest industries to clean up.',
  },
  {
    title: 'Premium carbon credits',
    body:  'Credits based on technology — not forests — with proven permanence and measurable social impact. Phase II will generate ~1,040,000 credits per year. The kind responsible companies are looking for.',
  },
]

export default function Phase2Section() {
  /* ── Element refs ────────────────────────────────────────────────────── */
  const sectionRef        = useRef<HTMLElement>(null)
  const headlineBandRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef        = useRef<HTMLDivElement>(null)
  const headlineRef       = useRef<HTMLHeadingElement>(null)
  const ledeRef           = useRef<HTMLParagraphElement>(null)
  const statCardRefs      = useRef<(HTMLDivElement | null)[]>([])
  const productsLabelRef  = useRef<HTMLDivElement>(null)
  const productLeftRefs   = useRef<(HTMLDivElement | null)[]>([])
  const productRightRefs  = useRef<(HTMLParagraphElement | null)[]>([])
  const ctaHeadingRef     = useRef<HTMLHeadingElement>(null)
  const ctaActionsRef     = useRef<HTMLDivElement>(null)
  const ctaCredibilityRef = useRef<HTMLDivElement>(null)

  /* ── Scroll animations ───────────────────────────────────────────────── */
  useEffect(() => {

    /* ── Set all initial hidden states ───────────────────────────────────
       Done in JS (not JSX) so content is visible if JS fails.
    ────────────────────────────────────────────────────────────────────── */
    const allEls = [
      eyebrowRef.current,
      headlineRef.current,
      ledeRef.current,
      productsLabelRef.current,
      ctaHeadingRef.current,
      ctaActionsRef.current,
      ctaCredibilityRef.current,
    ]
    allEls.forEach(el => { if (el) gsap.set(el, { opacity: 0 }) })

    gsap.set(eyebrowRef.current,       { y: 56 })
    gsap.set(headlineRef.current,      { y: 110 })
    gsap.set(ledeRef.current,          { y: 56 })
    gsap.set(ctaHeadingRef.current,    { y: 72 })
    gsap.set(ctaActionsRef.current,    { y: 44 })

    const statEls = statCardRefs.current.filter((el): el is HTMLDivElement => el !== null)
    gsap.set(statEls, { opacity: 0, y: 88 })

    const leftEls  = productLeftRefs.current.filter((el): el is HTMLDivElement => el !== null)
    const rightEls = productRightRefs.current.filter((el): el is HTMLParagraphElement => el !== null)
    gsap.set(leftEls,  { opacity: 0, x: -88 })
    gsap.set(rightEls, { opacity: 0, x:  88 })

    /* ── Parallax — RAF loop reading window.scrollY ──────────────────────
       Works with Lenis because Lenis drives window.scrollY via scrollTo().
       Band lifts -90px over the section's full scroll range.
    ────────────────────────────────────────────────────────────────────── */
    let rafId = 0
    const tickParallax = () => {
      const section = sectionRef.current
      const band    = headlineBandRef.current
      if (section && band) {
        const rect     = section.getBoundingClientRect()
        const total    = window.innerHeight + rect.height
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total))
        gsap.set(band, { y: -120 * progress })
      }
      rafId = requestAnimationFrame(tickParallax)
    }
    rafId = requestAnimationFrame(tickParallax)

    /* ── IntersectionObserver — fires reliably regardless of scroll lib ──
       Threshold 0.12 = trigger when 12% of element is visible.
       rootMargin pushes the trigger zone 60px up from viewport bottom
       so animations start just as the element comes into view.
    ────────────────────────────────────────────────────────────────────── */

    /* Helper — animate one element in */
    const animIn = (el: Element, vars: gsap.TweenVars) =>
      gsap.to(el, { opacity: 1, y: 0, x: 0, duration: 0.85, ease: 'power3.out', ...vars })

    /* Single-element observer (fire once, unobserve) */
    const makeObserver = (
      el: Element | null,
      vars: gsap.TweenVars = {},
      opts: IntersectionObserverInit = {}
    ) => {
      if (!el) return null
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return
        animIn(el, vars)
        obs.disconnect()
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...opts })
      obs.observe(el)
      return obs
    }

    /* ── Eyebrow ──────────────────────────────────────────────────────── */
    const o1 = makeObserver(eyebrowRef.current, { duration: 0.75 })

    /* ── Headline + lede inside band ─────────────────────────────────── */
    const o2 = makeObserver(headlineBandRef.current, {}, { threshold: 0.08 })
    // Once band is in view, cascade: h2 → lede
    const bandObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      gsap.to(headlineRef.current, {
        opacity: 1, y: 0, duration: 1.15, ease: 'power4.out',
      })
      gsap.to(ledeRef.current, {
        opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', delay: 0.28,
      })
      bandObs.disconnect()
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    if (headlineBandRef.current) bandObs.observe(headlineBandRef.current)

    /* ── Stat cards — staggered rise when first card enters ─────────── */
    const statObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      gsap.to(statEls, {
        opacity:  1,
        y:        0,
        duration: 1.0,
        ease:     'power4.out',
        stagger:  0.16,
      })
      statObs.disconnect()
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    if (statEls[0]) statObs.observe(statEls[0])

    /* ── Products label ──────────────────────────────────────────────── */
    const o3 = makeObserver(productsLabelRef.current, { duration: 0.60 })

    /* ── Product rows — split entrance per row ───────────────────────── */
    const rowObservers: IntersectionObserver[] = []
    productLeftRefs.current.forEach((leftEl, i) => {
      const rightEl = productRightRefs.current[i]
      if (!leftEl) return
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return
        // Left slides from left
        gsap.to(leftEl, {
          opacity: 1, x: 0, duration: 1.0, ease: 'power4.out',
        })
        if (rightEl) gsap.to(rightEl, {
          opacity: 1, x: 0, duration: 1.0, ease: 'power4.out', delay: 0.14,
        })
        obs.disconnect()
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
      obs.observe(leftEl)
      rowObservers.push(obs)
    })

    /* ── CTA heading → actions → credibility ─────────────────────────── */
    const ctaObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      gsap.to(ctaHeadingRef.current, {
        opacity: 1, y: 0, duration: 1.05, ease: 'power4.out',
      })
      gsap.to(ctaActionsRef.current, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.22,
      })
      gsap.to(ctaCredibilityRef.current, {
        opacity: 1, duration: 0.70, ease: 'power2.out', delay: 0.42,
      })
      ctaObs.disconnect()
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    if (ctaHeadingRef.current) ctaObs.observe(ctaHeadingRef.current)

    /* ── Cleanup ─────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId)
      ;[o1, o2, o3, bandObs, statObs, ctaObs, ...rowObservers]
        .forEach(obs => obs?.disconnect())
    }
  }, [])

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="phase2"
      aria-label="Phase II — 2027 vision"
      style={{
        background: 'var(--cream-100)',
        position:   'relative',
        overflow:   'clip',   /* clip not hidden — preserves scroll ctx for GSAP */
      }}
    >
      {/* Top hairline */}
      <div style={{ height: '1px', background: 'var(--sand-300)' }} />

      <div
        className="g2e-container"
        style={{
          paddingTop:    'clamp(72px, 9vw, 120px)',
          paddingBottom: 'clamp(72px, 9vw, 120px)',
        }}
      >

        {/* ── Eyebrow ─────────────────────────────────────────────── */}
        <div
          ref={eyebrowRef}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '10px',
            marginBottom: '36px',
          }}
        >
          <span style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '6px',
            padding:      '4px 12px',
            background:   'var(--oat-150)',
            border:       '1px solid var(--sand-300)',
            borderRadius: '999px',
          }}>
            <span style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   'var(--clay-500)',
              flexShrink:   0,
            }} />
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color:         'var(--ink-600)',
            }}>
              Phase II · 2027
            </span>
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '10px',
            letterSpacing: '0.10em',
            color:         'var(--ink-500)',
          }}>
            Where we are going
          </span>
        </div>

        {/* ── Headline band ─────────────────────────────────────────── */}
        <div
          ref={headlineBandRef}
          style={{
            background:   'var(--forest-900)',
            borderRadius: 'var(--radius-2xl, 24px)',
            padding:      'clamp(40px, 6vw, 80px) clamp(32px, 5vw, 72px)',
            marginBottom: 'clamp(40px, 6vw, 72px)',
            position:     'relative',
            overflow:     'hidden',
            willChange:   'transform',
          }}
        >
          {/* Radial tint */}
          <div aria-hidden="true" style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 70% 80% at 0% 50%, rgba(73,85,61,0.60) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              ref={headlineRef}
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(3rem, 7vw, 7rem)',
                lineHeight:    0.94,
                letterSpacing: '-0.04em',
                color:         '#FAFAF7',
                margin:        '0 0 clamp(28px, 4vw, 48px)',
              }}
            >
              One plant.<br />
              <span style={{ color: 'rgba(245,243,238,0.55)' }}>Ten modules.</span><br />
              <span style={{ color: 'rgba(245,243,238,0.28)' }}>170 cities.</span>
            </h2>

            <p
              ref={ledeRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize:   'clamp(0.95rem, 1.5vw, 1.12rem)',
                lineHeight: 1.72,
                color:      'rgba(245,243,238,0.62)',
                maxWidth:   '520px',
                margin:     0,
              }}
            >
              Construction begins 2027. Phase II turns one proven reactor into
              scalable urban infrastructure — replicable in every city that needs it.
            </p>
          </div>
        </div>

        {/* ── Stat cards ───────────────────────────────────────────── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap:                 '12px',
          marginBottom:        'clamp(40px, 6vw, 72px)',
        }}>
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              ref={el => { statCardRefs.current[i] = el }}
              style={{
                background:    '#FAFAF7',
                border:        '1px solid var(--sand-300)',
                borderRadius:  '20px',
                padding:       'clamp(24px, 3vw, 36px)',
                display:       'flex',
                flexDirection: 'column',
                gap:           '10px',
                boxShadow:     '0 2px 8px rgba(22,25,15,0.04), 0 8px 24px -8px rgba(22,25,15,0.07)',
                willChange:    'opacity, transform',
              }}
            >
              <span style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(2.2rem, 3.8vw, 3.4rem)',
                lineHeight:    1,
                letterSpacing: '-0.045em',
                color:         'var(--forest-800)',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '9.5px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase' as const,
                color:         'var(--ink-500)',
              }}>
                {stat.label}
              </span>
              <div style={{ height: '1px', background: 'var(--sand-300)' }} />
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize:   'clamp(0.78rem, 0.95vw, 0.86rem)',
                lineHeight: 1.6,
                color:      'var(--ink-600)',
                margin:     0,
              }}>
                {stat.context}
              </p>
            </div>
          ))}
        </div>

        {/* ── Three products ───────────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>

          {/* Section label */}
          <div
            ref={productsLabelRef}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '10px',
              marginBottom: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color:         'var(--ink-500)',
            }}>
              Three products
            </span>
            <div style={{ height: '1px', width: '24px', background: 'var(--sand-300)' }} />
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color:         'var(--ink-500)',
              opacity:       0.55,
            }}>
              One technology
            </span>
          </div>

          {/* Stacked editorial rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PRODUCTS.map((p, i) => (
              <div key={i}>
                <div style={{
                  display:             'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap:                 'clamp(24px, 5vw, 72px)',
                  alignItems:          'start',
                  padding:             'clamp(28px, 4vw, 48px) 0',
                }}>

                  {/* Left — number + title */}
                  <div
                    ref={el => { productLeftRefs.current[i] = el }}
                    style={{
                      display:       'flex',
                      flexDirection: 'column',
                      gap:           '16px',
                      willChange:    'opacity, transform',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '10px',
                        letterSpacing: '0.14em',
                        color:         'var(--ink-500)',
                        opacity:       0.6,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        display:      'inline-block',
                        width:        '5px',
                        height:       '5px',
                        borderRadius: '50%',
                        background:   'var(--clay-500)',
                        flexShrink:   0,
                      }} />
                    </div>
                    <h3 style={{
                      fontFamily:    'var(--font-display)',
                      fontWeight:    800,
                      fontSize:      'clamp(1.4rem, 2.4vw, 2rem)',
                      lineHeight:    1.1,
                      letterSpacing: '-0.03em',
                      color:         'var(--ink-900)',
                      margin:        0,
                    }}>
                      {p.title}
                    </h3>
                  </div>

                  {/* Right — body copy */}
                  <p
                    ref={el => { productRightRefs.current[i] = el }}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 400,
                      fontSize:   'clamp(0.88rem, 1.15vw, 1rem)',
                      lineHeight: 1.72,
                      color:      'var(--ink-600)',
                      margin:     0,
                      paddingTop: '8px',
                      willChange: 'opacity, transform',
                    }}
                  >
                    {p.body}
                  </p>
                </div>

                {i < PRODUCTS.length - 1 && (
                  <div style={{ height: '1px', background: 'var(--sand-300)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA close ────────────────────────────────────────────── */}
        <div style={{
          borderTop:  '1px solid var(--sand-300)',
          paddingTop: 'clamp(40px, 5vw, 64px)',
        }}>

          <h3
            ref={ctaHeadingRef}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(1.8rem, 3.2vw, 2.8rem)',
              lineHeight:    1.06,
              letterSpacing: '-0.03em',
              color:         'var(--forest-900)',
              marginBottom:  'clamp(24px, 3vw, 36px)',
              maxWidth:      '640px',
              willChange:    'opacity, transform',
            }}
          >
            Ready to be part<br />of Phase II?
          </h3>

          <div
            ref={ctaActionsRef}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '12px',
              flexWrap:      'wrap',
              marginBottom:  'clamp(32px, 4vw, 48px)',
              willChange:    'opacity, transform',
            }}
          >
            <a
              href="#contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '10px',
                fontFamily:     'var(--font-sans)',
                fontSize:       '15px',
                fontWeight:     600,
                background:     'var(--clay-500)',
                color:          '#FAFAF7',
                padding:        '14px 26px',
                borderRadius:   '999px',
                textDecoration: 'none',
                boxShadow:      '0 6px 20px -8px rgba(73,85,61,0.50)',
                transition:     'background 180ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--clay-600)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--clay-500)')}
            >
              Join the mission
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                fontFamily:     'var(--font-sans)',
                fontSize:       '14px',
                fontWeight:     500,
                color:          'var(--forest-800)',
                padding:        '13px 22px',
                borderRadius:   '999px',
                border:         '1px solid var(--forest-800)',
                textDecoration: 'none',
                transition:     'background 180ms, color 180ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--forest-800)'
                e.currentTarget.style.color = '#FAFAF7'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--forest-800)'
              }}
            >
              Request our deck
            </a>
          </div>

          <div
            ref={ctaCredibilityRef}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '20px',
              flexWrap:   'wrap',
              willChange: 'opacity',
            }}
          >
            {[
              'UNAM · Partner',
              'Mexican Government',
              'Construction 2027',
              'Bordo Poniente · CDMX',
            ].map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {i > 0 && (
                  <span style={{
                    display:      'inline-block',
                    width:        '3px',
                    height:       '3px',
                    borderRadius: '50%',
                    background:   'var(--sand-300)',
                  }} />
                )}
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '9.5px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase' as const,
                  color:         'var(--ink-500)',
                }}>
                  {item}
                </span>
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
