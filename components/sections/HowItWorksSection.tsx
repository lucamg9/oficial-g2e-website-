'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────
   HowItWorksSection — the transformation story.

   One continuous film (public/motion/hiw/story.mp4 — seven scenes
   crossfaded into a single all-keyframe clip) scrubbed by scroll, so
   the whole "garbage → value" process reads as ONE seamless story.
   Seven narrative beats fade through a floating glass step panel as
   the film advances. Beat transitions are clean fades (no gimmicks).
   ────────────────────────────────────────────────────────────── */

const STORY_SRC   = '/motion/hiw/story.mp4'
const SCROLL_DIST = 5200   // px of scroll the pinned film spans
const LERP        = 0.16   // currentTime easing toward the scroll target

const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t

// Seven beats, one per scene, mapped to scroll progress (0–1).
const BEATS = [
  { t: 0 / 7, phase: '01', label: 'Collection',            caption: 'We collect organic waste from across Mexico City.' },
  { t: 1 / 7, phase: '02', label: 'Intake',                caption: 'It arrives at the Bordo Poniente plant and enters the intake system.' },
  { t: 2 / 7, phase: '03', label: 'Slurry',                caption: 'Inside a sealed reactor, the waste becomes a homogeneous slurry.' },
  { t: 3 / 7, phase: '04', label: 'Pressure & heat',       caption: 'The reactor climbs to 220°C under controlled pressure.' },
  { t: 4 / 7, phase: '05', label: 'Hydrothermal reaction', caption: 'Carbon bonds form as the organic matter transforms, with zero CO₂ emissions.' },
  { t: 5 / 7, phase: '06', label: 'Carbonization',         caption: 'The reaction completes and hydrochar remains, a mineral grade carbon.' },
  { t: 6 / 7, phase: '07', label: 'Value at scale',        caption: 'Stable, measurable, replicable. Ready to replace coal and regenerate soil, at city scale.' },
]

export default function HowItWorksSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const stickyRef   = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const phaseRef    = useRef<HTMLSpanElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const captionRef  = useRef<HTMLHeadingElement>(null)
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([])

  const targetTime  = useRef(0)
  const lerpedTime  = useRef(0)
  const rafRef      = useRef<number>(0)
  const activeBeat  = useRef(-1)

  // Captions are written imperatively by GSAP, so translate through a ref
  // that always holds the latest translator for the current language.
  const t = useT()
  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    // Both desktop and mobile scrub the film by scroll. Mobile loads a
    // seek-optimised version (frequent keyframes for smooth seeking) and is
    // primed with a muted play→pause, because iOS only paints seeked frames
    // after a video has played at least once.
    const mobile = window.matchMedia('(max-width: 900px)').matches
      || window.matchMedia('(pointer: coarse)').matches
    let onTouch: (() => void) | null = null

    if (mobile) {
      video.src = '/motion/hiw/story-hd.mp4'
      video.muted = true
      const prime = () => { video.play().then(() => video.pause()).catch(() => {}) }
      prime()
      onTouch = () => prime()
      document.addEventListener('touchstart', onTouch, { once: true })
    } else {
      try { video.pause(); video.currentTime = 0 } catch { /* ignore */ }
    }

    /* ── Scrub loop — ease currentTime toward the scroll target ──────────── */
    const tick = () => {
      if (video.readyState >= 2) {
        const next = lerpFn(lerpedTime.current, targetTime.current, LERP)
        if (Math.abs(next - lerpedTime.current) > 0.001) {
          lerpedTime.current = next
          try { video.currentTime = next } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    /* ── Clean beat transition: fade out → swap → fade up in ──────────── */
    const goToBeat = (idx: number) => {
      if (idx === activeBeat.current) return
      activeBeat.current = idx
      const beat = BEATS[idx]
      const caption = captionRef.current
      const label   = labelRef.current
      const phase   = phaseRef.current
      if (!caption || !label || !phase) return

      gsap.to([phase, label, caption], {
        opacity: 0, y: -8, duration: 0.22, ease: 'power2.in',
        onComplete() {
          phase.textContent   = beat.phase
          label.textContent   = tRef.current(beat.label)
          caption.textContent = tRef.current(beat.caption)
          gsap.fromTo([phase, label, caption],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 },
          )
        },
      })
    }

    const resetToStart = () => {
      activeBeat.current = -1
      targetTime.current = 0
      lerpedTime.current = 0
      try { video.currentTime = 0 } catch { /* ignore */ }
      const { current: caption } = captionRef
      const { current: label }   = labelRef
      const { current: phase }   = phaseRef
      if (caption) { gsap.set(caption, { opacity: 1, y: 0 }); caption.textContent = tRef.current(BEATS[0].caption) }
      if (label)   { gsap.set(label,   { opacity: 1, y: 0 }); label.textContent   = tRef.current(BEATS[0].label)   }
      if (phase)   { gsap.set(phase,   { opacity: 1, y: 0 }); phase.textContent   = BEATS[0].phase   }
      if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        dot.style.background = i === 0 ? '#7A8F5A' : 'rgba(245,243,238,0.20)'
        dot.style.transform  = i === 0 ? 'scaleY(2.8)' : 'scaleY(1)'
        dot.style.opacity    = i === 0 ? '1' : '0.38'
      })
    }

    const st = ScrollTrigger.create({
      trigger: section,
      pin:     stickyRef.current,
      start:   'top top',
      // Shorter pinned distance on phones/tablets so the film doesn't trap the
      // scroll; beats are progress-based so pacing stays correct.
      end:     `+=${mobile ? 2800 : SCROLL_DIST}`,
      scrub:   0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // Don't reset on forward leave — hold the final frame (G2E bags) and
      // the 7th beat as the section scrolls away into the next one.
      onLeaveBack() { resetToStart() },
      onUpdate(self) {
        const p = self.progress
        const dur = video.duration || 0
        targetTime.current = p * dur

        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`

        let beatIdx = 0
        for (let i = 0; i < BEATS.length; i++) if (p >= BEATS[i].t) beatIdx = i
        goToBeat(beatIdx)

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return
          const active = i <= beatIdx
          dot.style.background = active ? '#7A8F5A' : 'rgba(245,243,238,0.20)'
          dot.style.transform  = i === beatIdx ? 'scaleY(2.8)' : 'scaleY(1)'
          dot.style.opacity     = active ? '1' : '0.38'
        })
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
      if (onTouch) document.removeEventListener('touchstart', onTouch)
      try { video.pause() } catch { /* ignore */ }
    }
  }, [])

  // Re-translate the visible beat when the language changes (the caption is
  // written imperatively, so React won't update it on its own).
  useEffect(() => {
    const idx = activeBeat.current >= 0 ? activeBeat.current : 0
    const beat = BEATS[idx]
    if (phaseRef.current)   phaseRef.current.textContent   = beat.phase
    if (labelRef.current)   labelRef.current.textContent   = t(beat.label)
    if (captionRef.current) captionRef.current.textContent = t(beat.caption)
  }, [t])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How it works"
      style={{ position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{ height: '100vh', overflow: 'hidden', background: '#2E372A' }}
      >
        {/* One continuous film, scrubbed by scroll */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={STORY_SRC}
          poster="/motion/hiw/story-start.jpg"
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
        />

        {/* Forest scrim — grades the light footage into the section's dark
            cinematic mood so the light labels + glass panel stay legible. */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: 'rgba(46,55,42,0.50)', mixBlendMode: 'multiply',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: 'rgba(35,43,32,0.30)',
        }} />

        {/* Cinematic vignettes */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(46,55,42,0.32) 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to top right, rgba(46,55,42,0.88) 0%, rgba(46,55,42,0.28) 42%, transparent 66%)',
        }} />

        {/* ── Top-left section identifier ──────────────────────────────── */}
        <div style={{
          position: 'absolute', zIndex: 20,
          top: 'clamp(24px, 4vw, 48px)', left: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.40)' }}>{t('How it works')}</span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(245,243,238,0.18)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.20)' }}>{t('Hydrothermal carbonization')}</span>
        </div>

        {/* ── Right-side beat dots ─────────────────────────────────────── */}
        <div style={{
          position: 'absolute', right: 'clamp(24px, 4vw, 56px)', top: '50%', transform: 'translateY(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', pointerEvents: 'none',
        }}>
          {BEATS.map((_, i) => (
            <div
              key={i}
              ref={el => { dotsRef.current[i] = el }}
              style={{
                width: '3px', height: '14px', borderRadius: '99px',
                background: i === 0 ? '#7A8F5A' : 'rgba(245,243,238,0.20)',
                transform: i === 0 ? 'scaleY(2.8)' : 'scaleY(1)',
                transition: 'background 380ms ease, transform 380ms cubic-bezier(0.34,1.56,0.64,1), opacity 380ms ease',
                transformOrigin: 'center', opacity: i === 0 ? 1 : 0.38,
              }}
            />
          ))}
        </div>

        {/* ── Floating glass step panel (lower-left) ───────────────────── */}
        <div style={{
          position: 'absolute', zIndex: 20,
          left: 'clamp(24px, 5vw, 80px)', bottom: 'clamp(40px, 6vw, 76px)',
          width: 'min(520px, calc(100% - 48px))', padding: 'clamp(22px, 2.4vw, 30px)',
          borderRadius: 'var(--radius-xl)', background: 'rgba(26,32,22,0.52)',
          backdropFilter: 'blur(22px) saturate(135%)', WebkitBackdropFilter: 'blur(22px) saturate(135%)',
          border: '1px solid rgba(245,243,238,0.14)', boxShadow: '0 24px 64px -28px rgba(0,0,0,0.6)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--moss)', display: 'block', flexShrink: 0 }} />
            <span ref={phaseRef} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--fog-white)' }}>01</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(245,243,238,0.40)' }}>/ 07</span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(245,243,238,0.18)' }} />
            <span ref={labelRef} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.55)' }}>Collection</span>
          </div>

          <h3
            ref={captionRef}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', lineHeight: 1.12,
              letterSpacing: '-0.025em', color: 'var(--fog-white)', margin: '0 0 22px',
            }}
          >
            We collect organic waste from across Mexico City.
          </h3>

          <div aria-hidden="true" style={{ height: '2px', width: '100%', borderRadius: '99px', background: 'rgba(245,243,238,0.12)', overflow: 'hidden' }}>
            <div ref={progressRef} style={{ height: '100%', width: '100%', borderRadius: '99px', background: 'linear-gradient(to right, var(--moss), var(--sage-mist))', transformOrigin: 'left center', transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
