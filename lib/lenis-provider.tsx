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

    // GSAP + Lenis integration
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
