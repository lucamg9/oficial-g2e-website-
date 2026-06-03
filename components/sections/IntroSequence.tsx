'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CLIP_COUNT  = 6
const SCROLL_DIST = 3600   // px — 600px per clip
const LERP        = 0.14

const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t
const ease   = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

const CLIPS = [
  '/intro/clips/1.mp4',
  '/intro/clips/2.mp4',
  '/intro/clips/3.mp4',
  '/intro/clips/4.mp4',
  '/intro/clips/5.mp4',
  '/intro/clips/6.mp4',
]

// One act per clip — text appears while that clip is playing
const ACTS = [
  {
    headline: 'Every day, cities generate thousands\nof tonnes of organic waste.',
    sub:      'It rots. It burns. It poisons the ground.',
    align:    'left'   as const,
  },
  {
    headline: 'What if that waste had\na different destination?',
    sub:      'We built one.',
    align:    'left'   as const,
  },
  {
    headline: '220°C. Controlled pressure.\nZero combustion.',
    sub:      'Hydrothermal Carbonization — the process that changes everything.',
    align:    'right'  as const,
  },
  {
    headline: 'Hydrochar.',
    sub:      'A mineral-grade carbon material — born from organic waste.',
    align:    'center' as const,
  },
  {
    headline: 'Applied to soil,\nit sequesters carbon for centuries.',
    sub:      'And makes barren land productive again.',
    align:    'left'   as const,
  },
  {
    headline: 'This is what we built.',
    sub:      "The world's largest hydrothermal carbonization plant. Mexico City.",
    align:    'center' as const,
  },
]

const HERO_STATS = [
  { value: '3 t/hr',    label: 'Live throughput'   },
  { value: '220°C',     label: 'Process temp'      },
  { value: 'World #1',  label: 'Largest HTC plant' },
  { value: 'Est. 2013', label: 'Bordo Poniente'    },
]

export default function IntroSequence() {
  const sectionRef     = useRef<HTMLDivElement>(null)
  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([])
  const actRefs        = useRef<(HTMLDivElement | null)[]>([])
  const headlineRefs   = useRef<(HTMLHeadingElement | null)[]>([])
  const subRefs        = useRef<(HTMLParagraphElement | null)[]>([])
  const logoRef        = useRef<HTMLDivElement>(null)
  const heroImgRef     = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const skipRef        = useRef<HTMLButtonElement>(null)
  const heroFiredRef   = useRef(false)

  // Scrub state
  const targetClipIdx = useRef(0)
  const targetTime    = useRef(0)
  const lerpedTime    = useRef(0)
  const rafRef        = useRef<number>(0)
  const activeClipIdx = useRef(0)

  /* ─── Auto-skip on return visit ──────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!sessionStorage.getItem('g2e-intro-seen')) return
    const t = setTimeout(() => {
      const section = sectionRef.current
      if (!section) return
      window.scrollTo({ top: section.offsetTop + SCROLL_DIST + 10, behavior: 'instant' })
    }, 80)
    return () => clearTimeout(t)
  }, [])

  /* ─── RAF lerp loop ───────────────────────────────────────────────────── */
  const startRaf = useCallback(() => {
    const tick = () => {
      const video = videoRefs.current[targetClipIdx.current]
      if (video && video.readyState >= 2) {
        const next = lerpFn(lerpedTime.current, targetTime.current, LERP)
        if (Math.abs(next - lerpedTime.current) > 0.0005) {
          lerpedTime.current = next
          try { video.currentTime = next } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  /* ─── Clip crossfade ─────────────────────────────────────────────────── */
  const switchClip = useCallback((nextIdx: number) => {
    if (nextIdx === activeClipIdx.current) return
    const prevIdx = activeClipIdx.current
    activeClipIdx.current = nextIdx
    lerpedTime.current = 0

    const prev = videoRefs.current[prevIdx]
    const next = videoRefs.current[nextIdx]
    if (!next) return

    next.style.zIndex     = '2'
    next.style.transition = 'opacity 500ms ease'
    next.style.opacity    = '1'

    setTimeout(() => {
      if (prev) {
        prev.style.transition = 'opacity 500ms ease'
        prev.style.opacity    = '0'
        prev.style.zIndex     = '1'
      }
    }, 200)
  }, [])

  /* ─── Apply visual state from scroll progress ────────────────────────── */
  const applyProgress = useCallback((p: number) => {
    const ZONE_W    = 1 / CLIP_COUNT   // width of each clip zone
    const FADE_IN   = 0.18             // fraction of zone used to fade in
    const FADE_OUT  = 0.18             // fraction of zone used to fade out

    ACTS.forEach((act, i) => {
      const headEl = headlineRefs.current[i]
      const subEl  = subRefs.current[i]
      const wrap   = actRefs.current[i]
      if (!wrap) return

      const zoneStart = i * ZONE_W
      const local     = (p - zoneStart) / ZONE_W  // 0–1 within this zone

      const inP  = Math.max(0, Math.min(1, local / FADE_IN))
      const outP = Math.max(0, Math.min(1, (1 - local) / FADE_OUT))
      const actP = Math.min(inP, outP)

      wrap.style.opacity = actP > 0 ? '1' : '0'
      if (actP === 0) return

      if (headEl) {
        const entryY = (1 - inP)  *  24
        const exitY  = (1 - outP) * -20
        const y      = entryY + (inP >= 1 ? exitY : 0)
        const blur   = (1 - actP) * 5
        headEl.style.opacity   = String(actP)
        headEl.style.transform = `translateY(${y}px)`
        headEl.style.filter    = `blur(${blur.toFixed(2)}px)`
      }

      // Sub lags slightly
      if (subEl) {
        const sInP  = Math.max(0, Math.min(1, (local - 0.04) / FADE_IN))
        const sOutP = Math.max(0, Math.min(1, (1 - local - 0.04) / FADE_OUT))
        const sActP = Math.min(sInP, sOutP)
        const entryY = (1 - sInP)  *  18
        const exitY  = (1 - sOutP) * -16
        const y      = entryY + (sInP >= 1 ? exitY : 0)
        const blur   = (1 - sActP) * 4
        subEl.style.opacity   = String(Math.max(0, sActP))
        subEl.style.transform = `translateY(${y}px)`
        subEl.style.filter    = `blur(${blur.toFixed(2)}px)`
      }
    })

    // G2E identity card: appears in last clip zone 0.86–0.97
    const logoIn  = ease(Math.max(0, Math.min(1, (p - 0.86) / 0.06)))
    const logoOut = 1 - ease(Math.max(0, Math.min(1, (p - 0.93) / 0.04)))
    const logoOp  = logoIn * logoOut
    if (logoRef.current) {
      logoRef.current.style.opacity   = String(logoOp)
      logoRef.current.style.transform = `translateY(${(1 - logoIn) * 22}px)`
    }

    // Hero image dissolves in 0.92 → 0.99
    const heroImgP = ease(Math.max(0, Math.min(1, (p - 0.92) / 0.07)))
    if (heroImgRef.current) heroImgRef.current.style.opacity = String(heroImgP)

    // Hero content rises in 0.95 → 1.0
    const hcP = ease(Math.max(0, Math.min(1, (p - 0.95) / 0.05)))
    if (heroContentRef.current) {
      heroContentRef.current.style.opacity   = String(hcP)
      heroContentRef.current.style.transform = `translateY(${(1 - hcP) * 30}px)`
    }

    // Skip button fades out at 0.88 → 0.93
    if (skipRef.current) {
      const skipOp = Math.max(0, 1 - Math.max(0, (p - 0.88) / 0.05))
      skipRef.current.style.opacity       = String(skipOp)
      skipRef.current.style.pointerEvents = skipOp < 0.05 ? 'none' : 'auto'
    }

    // Nav reveal — fires once at 0.93
    if (p >= 0.93 && !heroFiredRef.current) {
      heroFiredRef.current = true
      window.dispatchEvent(new CustomEvent('g2e:hero-reveal'))
    }
  }, [])

  /* ─── ScrollTrigger ───────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Pause all videos, show first
    videoRefs.current.forEach(v => {
      if (!v) return
      try { v.pause(); v.currentTime = 0 } catch { /* ignore */ }
    })
    const first = videoRefs.current[0]
    if (first) { first.style.opacity = '1'; first.style.zIndex = '2' }

    startRaf()

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     `+=${SCROLL_DIST}`,
      pin:     true,
      scrub:   true,
      onUpdate(self) {
        const p = self.progress

        const zone    = Math.min(p * CLIP_COUNT, CLIP_COUNT - 0.0001)
        const clipIdx = Math.floor(zone)
        const clipPrg = zone - clipIdx

        targetClipIdx.current = clipIdx
        const video = videoRefs.current[clipIdx]
        targetTime.current = clipPrg * (video?.duration || 0)

        switchClip(clipIdx)
        applyProgress(p)
      },
    })

    const videos = videoRefs.current.slice()
    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
      videos.forEach(v => { try { v?.pause() } catch { /* ignore */ } })
    }
  }, [startRaf, switchClip, applyProgress])

  /* ─── Skip handler ────────────────────────────────────────────────────── */
  const handleSkip = useCallback(() => {
    sessionStorage.setItem('g2e-intro-seen', '1')
    if (!heroFiredRef.current) {
      heroFiredRef.current = true
      window.dispatchEvent(new CustomEvent('g2e:hero-reveal'))
    }
    const section = sectionRef.current
    if (!section) return
    window.scrollTo({ top: section.offsetTop + SCROLL_DIST + 10, behavior: 'smooth' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="G2E introduction"
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      {/* ── Video clips — stacked, scrubbed by scroll ─────────────────── */}
      {CLIPS.map((src, i) => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          key={src}
          ref={el => { videoRefs.current[i] = el }}
          src={src}
          muted
          playsInline
          preload="auto"
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            background: '#0A0908',
            display:    'block',
            zIndex:     1,
            opacity:    0,
            willChange: 'contents',
          }}
        />
      ))}

      {/* ── Edge vignette ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.40) 100%)',
          pointerEvents: 'none',
          zIndex:        3,
        }}
      />

      {/* ── Act overlays ──────────────────────────────────────────────── */}
      {ACTS.map((act, i) => (
        <div
          key={i}
          ref={el => { actRefs.current[i] = el }}
          style={{
            position:       'absolute',
            inset:          0,
            zIndex:         4,
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'flex-end',
            padding:        'clamp(32px, 5vw, 80px)',
            paddingBottom:  'clamp(64px, 10vh, 120px)',
            alignItems:     act.align === 'right'  ? 'flex-end'
                          : act.align === 'center' ? 'center'
                          :                          'flex-start',
            opacity:        0,
            pointerEvents:  'none',
            textAlign:      act.align,
          }}
        >
          <div style={{
            display:        'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom:   '20px', padding: '6px 14px',
            background:     'rgba(245,243,238,0.08)', backdropFilter: 'blur(12px)',
            border:         '1px solid rgba(245,243,238,0.14)', borderRadius: '999px',
          }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--forest-light)', display:'block' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,243,238,0.50)' }}>
              {String(i + 1).padStart(2,'0')} / 06
            </span>
          </div>

          <h2
            ref={el => { headlineRefs.current[i] = el }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 5rem)', lineHeight: 1.0,
              letterSpacing: '-0.03em', color: '#FFFFFF',
              maxWidth: act.align === 'center' ? '900px' : '640px',
              whiteSpace: 'pre-line', marginBottom: '20px',
              textShadow: '0 2px 24px rgba(0,0,0,0.50)',
              willChange: 'transform, opacity, filter',
            }}
          >
            {act.headline}
          </h2>

          <p
            ref={el => { subRefs.current[i] = el }}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', lineHeight: 1.6,
              color: 'rgba(245,243,238,0.75)', maxWidth: '520px',
              textShadow: '0 1px 8px rgba(0,0,0,0.35)',
              willChange: 'transform, opacity, filter',
            }}
          >
            {act.sub}
          </p>
        </div>
      ))}

      {/* ── G2E identity moment ───────────────────────────────────────── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', opacity: 0, pointerEvents: 'none', gap: '14px',
        }}
      >
        <div style={{
          width:'80px', height:'80px', borderRadius:'50%',
          background:'rgba(245,243,238,0.10)', backdropFilter:'blur(20px) saturate(140%)',
          border:'1px solid rgba(245,243,238,0.20)',
          display:'flex', alignItems:'center', justifyContent:'center',
          marginBottom:'6px', boxShadow:'0 0 60px rgba(245,243,238,0.08)',
        }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'42px', fontWeight:800, color:'#F5F3EE', lineHeight:1, marginTop:'4px' }}>g</span>
        </div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(245,243,238,0.48)' }}>
          Green to Energy · CDMX
        </p>
        <p style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(0.8rem, 1.1vw, 0.95rem)', color:'rgba(245,243,238,0.32)', letterSpacing:'0.06em', marginTop:'4px' }}>
          ↓ Scroll to continue
        </p>
      </div>

      {/* ── Hero image — dissolves over video ─────────────────────────── */}
      <div
        ref={heroImgRef}
        aria-hidden="true"
        style={{ position:'absolute', inset:0, zIndex:6, opacity:0 }}
      >
        <picture>
          <source srcSet="/assets/hero-image.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-image.jpg"
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 35%', display:'block' }}
          />
        </picture>
        <div style={{ position:'absolute', inset:0, background:'rgba(10,12,10,0.42)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'62%', background:'linear-gradient(to bottom, rgba(10,12,10,0) 0%, rgba(10,12,10,0.94) 100%)' }} />
        <div style={{ position:'absolute', top:0, bottom:0, left:0, width:'45%', background:'linear-gradient(to right, rgba(10,12,10,0.38) 0%, rgba(10,12,10,0) 100%)' }} />
      </div>

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div
        ref={heroContentRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 7,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--container-pad)',
          paddingBottom: 'clamp(40px, 6vh, 80px)',
          opacity: 0, pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'clamp(20px, 3vh, 32px)' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-2xs)', letterSpacing:'var(--ls-eyebrow)', textTransform:'uppercase', color:'rgba(245,243,238,0.55)' }}>
            G2E — Green to Energy
          </span>
          <div style={{ height:'1px', width:'24px', background:'rgba(245,243,238,0.18)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-2xs)', letterSpacing:'var(--ls-eyebrow)', textTransform:'uppercase', color:'rgba(245,243,238,0.32)' }}>
            Bordo Poniente · CDMX · Est. 2013
          </span>
        </div>

        <h1 style={{
          fontFamily:'var(--font-display)', fontWeight:800,
          fontSize:'clamp(3rem, 7vw, 7rem)', lineHeight:0.93,
          letterSpacing:'-0.04em', color:'#FFFFFF',
          maxWidth:'780px', marginBottom:'clamp(20px, 3vh, 36px)',
          textShadow:'0 2px 40px rgba(0,0,0,0.35)',
        }}>
          Waste in.<br />
          <span style={{ color:'rgba(245,243,238,0.80)' }}>Hydrochar out.</span><br />
          <span style={{ fontSize:'0.52em', fontWeight:300, letterSpacing:'-0.02em', color:'rgba(245,243,238,0.38)' }}>
            In hours, not centuries.
          </span>
        </h1>

        <p style={{
          fontFamily:'var(--font-sans)', fontWeight:300,
          fontSize:'clamp(0.95rem, 1.5vw, 1.15rem)', lineHeight:1.72,
          color:'rgba(245,243,238,0.78)', maxWidth:'460px',
          marginBottom:'clamp(24px, 4vh, 40px)',
          textShadow:'0 1px 12px rgba(0,0,0,0.25)',
        }}>
          We take Mexico City&apos;s organic waste and transform it into hydrochar —
          a mineral-grade carbon material that replaces coal, regenerates soil,
          and generates premium carbon credits.
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', marginBottom:'clamp(24px, 4vh, 40px)' }}>
          <a href="#contact" className="glass-btn" style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontFamily:'var(--font-sans)', fontSize:'14px', fontWeight:500, color:'#FFFFFF', padding:'13px 22px', textDecoration:'none', pointerEvents:'auto' }}>
            Join the mission
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
          <a href="#about" style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontFamily:'var(--font-sans)', fontSize:'13px', fontWeight:400, color:'rgba(245,243,238,0.65)', padding:'12px 18px', borderRadius:'999px', border:'1px solid rgba(245,243,238,0.18)', textDecoration:'none', pointerEvents:'auto', transition:'border-color 200ms, color 200ms' }}>
            Who we are
          </a>
        </div>

        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'clamp(16px, 3vh, 28px)' }}>
          {HERO_STATS.map(stat => (
            <div key={stat.value} className="glass-card" style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:'3px', minWidth:'90px' }}>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1rem, 1.6vw, 1.35rem)', lineHeight:1, letterSpacing:'-0.02em', color:'#FFFFFF' }}>
                {stat.value}
              </span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.09em', textTransform:'uppercase', color:'rgba(245,243,238,0.50)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ paddingTop:'clamp(12px, 2vh, 20px)', borderTop:'1px solid rgba(245,243,238,0.08)', display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
          {['UNAM partner', 'Mexican Government', 'International partnerships', 'Phase II · 2027'].map((item, i) => (
            <span key={i} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'var(--ls-eyebrow)', textTransform:'uppercase', color:'rgba(245,243,238,0.38)', display:'flex', alignItems:'center', gap:'20px' }}>
              {i > 0 && <span style={{ opacity:0.30 }}>·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Skip button ───────────────────────────────────────────────── */}
      <button
        ref={skipRef}
        onClick={handleSkip}
        style={{
          position:'fixed', top:'24px', right:'24px', zIndex:100,
          display:'inline-flex', alignItems:'center', gap:'8px',
          padding:'10px 18px',
          background:'rgba(245,243,238,0.10)',
          backdropFilter:'blur(16px) saturate(140%)',
          WebkitBackdropFilter:'blur(16px) saturate(140%)',
          border:'1px solid rgba(245,243,238,0.18)', borderRadius:'999px',
          fontFamily:'var(--font-sans)', fontSize:'13px', fontWeight:500,
          color:'rgba(245,243,238,0.80)', cursor:'pointer',
          transition:'background 180ms, color 180ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(245,243,238,0.20)'; e.currentTarget.style.color='#F5F3EE' }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(245,243,238,0.10)'; e.currentTarget.style.color='rgba(245,243,238,0.80)' }}
      >
        Skip
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </section>
  )
}
