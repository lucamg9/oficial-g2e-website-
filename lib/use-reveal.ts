'use client'

/**
 * useReveal — bidirectional scroll-reveal using IntersectionObserver + GSAP.
 *
 * Works with Lenis (no GSAP ScrollTrigger dependency).
 * Fires on scroll DOWN (animate in) and resets on scroll UP (element
 * leaves the bottom of the viewport) so it re-animates next time.
 *
 * IMPORTANT: pass the RefObject itself, NOT ref.current.
 * The hook resolves .current inside useEffect (after mount).
 */

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'

export type RevealItem = {
  ref:        RefObject<HTMLElement | null>
  from?:      gsap.TweenVars   // initial / reset state  (default: opacity 0, y 80)
  to?:        gsap.TweenVars   // extra props for animate-in
  delay?:     number
  duration?:  number           // default 1.0
  ease?:      string           // default 'power4.out'
  threshold?: number           // 0–1, default 0.10
  margin?:    string           // rootMargin, default '0px 0px -80px 0px'
}

export type StaggerGroup = {
  refs:       RefObject<HTMLElement | null>[]
  from?:      gsap.TweenVars
  stagger?:   number           // default 0.14
  duration?:  number           // default 0.95
  ease?:      string
  threshold?: number
  margin?:    string
}

export function useReveal(
  items:  RevealItem[]   = [],
  groups: StaggerGroup[] = [],
) {
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    /* ── Individual elements ─────────────────────────────────────────── */
    items.forEach(({
      ref,
      from      = { opacity: 0, y: 80 },
      to        = {},
      delay     = 0,
      duration  = 1.0,
      ease      = 'power4.out',
      threshold = 0.10,
      margin    = '0px 0px -80px 0px',
    }) => {
      const el = ref.current
      if (!el) return

      gsap.set(el, from)

      let hasAnimatedIn = false

      const obs = new IntersectionObserver(entries => {
        const entry = entries[0]

        if (entry.intersectionRatio >= threshold) {
          /* ── Entering viewport (scroll down) — animate IN ────────── */
          if (!hasAnimatedIn) {
            hasAnimatedIn = true
            gsap.killTweensOf(el)
            gsap.to(el, {
              opacity: 1, y: 0, x: 0,
              duration, ease, delay,
              overwrite: true,
              ...to,
            })
          }

        } else if (entry.intersectionRatio === 0) {
          /* ── Fully outside viewport ──────────────────────────────── */
          const rect = entry.boundingClientRect

          if (rect.top > window.innerHeight * 0.85) {
            /* Element is below viewport — user scrolled UP → RESET */
            hasAnimatedIn = false
            gsap.killTweensOf(el)
            gsap.to(el, {
              ...from,
              duration:  0.5,
              ease:      'power2.in',
              overwrite: true,
            })
          }
          /* rect.bottom < 0 → above viewport (scrolled past) → stay visible */
        }

      }, { threshold: [0, threshold], rootMargin: margin })

      obs.observe(el)
      observers.push(obs)
    })

    /* ── Stagger groups ──────────────────────────────────────────────── */
    groups.forEach(({
      refs,
      from      = { opacity: 0, y: 80 },
      stagger   = 0.14,
      duration  = 0.95,
      ease      = 'power4.out',
      threshold = 0.08,
      margin    = '0px 0px -60px 0px',
    }) => {
      const valid = refs.map(r => r.current).filter((el): el is HTMLElement => el !== null)
      if (!valid.length) return

      gsap.set(valid, from)

      let hasAnimatedIn = false

      /* Observe first element — when it enters, stagger all in */
      const obs = new IntersectionObserver(entries => {
        const entry = entries[0]

        if (entry.intersectionRatio >= threshold) {
          if (!hasAnimatedIn) {
            hasAnimatedIn = true
            gsap.killTweensOf(valid)
            gsap.to(valid, {
              opacity: 1, y: 0, x: 0,
              duration, ease, stagger,
              overwrite: true,
            })
          }

        } else if (entry.intersectionRatio === 0) {
          const rect = entry.boundingClientRect
          if (rect.top > window.innerHeight * 0.85) {
            /* Reset all — user scrolled UP past the group */
            hasAnimatedIn = false
            gsap.killTweensOf(valid)
            gsap.to(valid, {
              ...from,
              duration:  0.5,
              ease:      'power2.in',
              stagger:   stagger * 0.5,
              overwrite: true,
            })
          }
        }

      }, { threshold: [0, threshold], rootMargin: margin })

      obs.observe(valid[0])
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
