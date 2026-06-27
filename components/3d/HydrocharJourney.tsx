'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────
   HydrocharJourney — the hero→Who-We-Are transition.

   The biochar lives on a fixed layer pinned over its hero anchor.
   As the user scrolls the hero out, the piece is scrubbed along a
   trajectory: first it drifts to the horizontal centre of the
   viewport, then it travels straight down and fades. Because the
   Who-We-Are section sits at a higher z-index and rises from below
   as an opaque mass, the biochar sinks behind it — like the sun
   setting behind mountains.

   Layout/position reference comes from #hydrochar-anchor, an
   invisible box the hero reserves in its right column, so the
   resting state is pixel-identical to the static composition.
   ────────────────────────────────────────────────────────────── */

const HydrocharCanvas = dynamic(() => import('@/components/3d/HydrocharCanvas'), {
  ssr: false,
  loading: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/generated/hydrochar-real.webp"
      alt=""
      decoding="async"
      style={{
        width: '100%', height: '100%', objectFit: 'contain',
        filter: 'drop-shadow(0 26px 26px rgba(46,55,42,0.30))',
      }}
    />
  ),
})

export default function HydrocharJourney() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const anchor = document.getElementById('hydrochar-anchor')
    const hero = document.getElementById('intro')
    if (!wrap || !anchor || !hero) return

    // Pin the fixed layer onto the anchor's resting position. Using
    // document coords (rect + scroll) keeps it correct even if the
    // effect initialises while the page is already scrolled.
    const place = () => {
      const r = anchor.getBoundingClientRect()
      wrap.style.width  = `${r.width}px`
      wrap.style.height = `${r.height}px`
      wrap.style.left   = `${r.left + window.scrollX}px`
      wrap.style.top    = `${r.top + window.scrollY}px`
    }

    // Scroll-driven targets, recomputed on every refresh so they stay
    // correct across resizes / breakpoint changes.
    let dx = 0
    let downY = 0
    const compute = () => {
      const r = anchor.getBoundingClientRect()
      dx = window.innerWidth / 2 - (r.left + r.width / 2)
      downY = window.innerHeight * 0.62
    }

    place()
    compute()

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })

    // Phase 1 (0 → 45%): drift to the horizontal centre, grow slightly.
    tl.to(wrap, { x: () => dx, ease: 'power2.inOut', duration: 0.45 }, 0)
      .to(wrap, { scale: 1.06, ease: 'power1.out', duration: 0.45 }, 0)
    // Phase 2 (40 → 100%): full vertical descent + fade behind the section.
      .to(wrap, { y: () => downY, ease: 'power1.in', duration: 0.6 }, 0.4)
      .to(wrap, { scale: 0.9, ease: 'power1.in', duration: 0.6 }, 0.4)
      .to(wrap, { autoAlpha: 0, ease: 'power1.in', duration: 0.32 }, 0.66)

    const onRefreshInit = () => { place(); compute() }
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

    const onResize = () => { place(); compute(); ScrollTrigger.refresh() }
    window.addEventListener('resize', onResize)

    // Re-place once the model/layout settle.
    const settle = window.setTimeout(() => { place(); compute(); ScrollTrigger.refresh() }, 300)
    ScrollTrigger.refresh()

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(settle)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        zIndex:        2,
        pointerEvents: 'none',
        willChange:    'transform, opacity',
      }}
    >
      <HydrocharCanvas />
    </div>
  )
}
