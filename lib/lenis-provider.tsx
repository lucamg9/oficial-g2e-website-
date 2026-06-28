'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

// Module-level handle to the live Lenis instance. The context value is captured
// at first render (when the ref is still null), so components that need the
// instance imperatively — e.g. SectionNav's scroll-to — read it through here.
// Null on touch devices (Lenis isn't created there) so callers fall back to
// native scrolling.
let activeLenis: Lenis | null = null
export function getLenis() {
  return activeLenis
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Touch devices keep their native momentum scrolling — Lenis adds a JS
    // rAF layer that fights iOS/Android inertial scroll and makes pinned
    // scrub sections feel laggy. ScrollTrigger reads native scroll directly
    // when Lenis isn't driving it, so the mobile experience stays smooth.
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis
    activeLenis = lenis

    // GSAP + Lenis integration
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      activeLenis = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
