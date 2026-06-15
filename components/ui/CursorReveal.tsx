'use client'

import { useEffect, useRef } from 'react'

/* ──────────────────────────────────────────────────────────────
   CursorReveal — a hidden image layer that is only visible inside
   a small, soft bubble that follows the cursor. A short trail of
   lagging points keeps the bubble gooey/liquid as you move. Built
   with a live CSS radial-gradient mask (no per-pixel DOM, no extra
   deps) so it stays smooth. Desktop / fine-pointer only; disabled
   under reduced-motion.
   ────────────────────────────────────────────────────────────── */

type Props = {
  /** Image revealed inside the bubble. */
  src: string
  /** Bubble radius in px (~half of the visible diameter). */
  radius?: number
  /** Number of trailing points — more = longer gooey tail. */
  trail?: number
  className?: string
}

export default function CursorReveal({
  src,
  radius = 130,
  trail = 6,
  className,
}: Props) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    // Trail of points; head chases the cursor, each point chases the
    // one before it, so overlapping soft circles blob together.
    const pts = Array.from({ length: trail }, () => ({ x: -9999, y: -9999 }))
    const target = { x: -9999, y: -9999 }
    const prevHead = { x: -9999, y: -9999 }
    const vel = { x: 0, y: 0 } // smoothed cursor velocity (px/frame)
    let inside = false
    let lastMove = 0
    let placed = false
    let raf = 0

    // The cornfield is only revealed while the cursor is actually moving;
    // when it pauses for this long the bubble fades back out.
    const IDLE_MS = 140

    const onMove = (e: MouseEvent) => {
      const rect = layer.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      lastMove = performance.now()
      target.x = x
      target.y = y
      if (inside && !placed) {
        // Snap the whole trail to entry point to avoid a sweep-in streak.
        pts.forEach(p => { p.x = x; p.y = y })
        placed = true
      }
    }

    const tick = () => {
      // Head eases toward the cursor; tail eases toward its predecessor.
      pts[0].x += (target.x - pts[0].x) * 0.30
      pts[0].y += (target.y - pts[0].y) * 0.30
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.38
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.38
      }

      // Smoothed head velocity — drives how the form deforms with motion.
      vel.x += ((pts[0].x - prevHead.x) - vel.x) * 0.25
      vel.y += ((pts[0].y - prevHead.y) - vel.y) * 0.25
      prevHead.x = pts[0].x
      prevHead.y = pts[0].y

      const moving = inside && performance.now() - lastMove < IDLE_MS
      layer.style.opacity = moving ? '1' : '0'

      if (placed) {
        const head = pts[0]
        const layers: string[] = []

        // Tight, clean edge — a defined circle, not a soft cloud.
        const soft = (r: number, x: number, y: number) =>
          `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 0%, #000 64%, rgba(0,0,0,0) 84%)`

        // At rest it's a clean circle. Movement stretches it into an oval
        // along the direction of travel — built from a few same-size
        // circles strung along the motion axis so the union stays smooth.
        const speed = Math.hypot(vel.x, vel.y)
        const flow = Math.min(speed / 22, 1)        // 0 (still) → 1 (fast)
        const dir = Math.atan2(vel.y, vel.x)
        const reach = radius * 0.62 * flow           // how far the oval extends
        const cos = Math.cos(dir)
        const sin = Math.sin(dir)

        layers.push(soft(radius, head.x, head.y))
        if (flow > 0.03) {
          layers.push(soft(radius * 0.94, head.x + cos * reach, head.y + sin * reach))
          layers.push(soft(radius * 0.94, head.x - cos * reach, head.y - sin * reach))
          // Mid points keep the capsule continuous when stretched far.
          layers.push(soft(radius * 0.97, head.x + cos * reach * 0.5, head.y + sin * reach * 0.5))
          layers.push(soft(radius * 0.97, head.x - cos * reach * 0.5, head.y - sin * reach * 0.5))
        }

        const mask = layers.join(', ')
        layer.style.webkitMaskImage = mask
        layer.style.maskImage = mask
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [radius, trail])

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={className}
      style={{
        position:           'absolute',
        inset:              0,
        zIndex:             0,
        opacity:            0,
        transition:         'opacity 320ms var(--ease-expo)',
        pointerEvents:      'none',
        backgroundImage:    `url(${src})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        // Slightly muted so the peek stays calm against the canvas.
        filter:             'saturate(0.96) brightness(1.02)',
        // Start fully masked-out; the rAF loop supplies the live mask.
        WebkitMaskImage:    'radial-gradient(circle 0px at -9999px -9999px, #000, transparent)',
        maskImage:          'radial-gradient(circle 0px at -9999px -9999px, #000, transparent)',
        maskRepeat:         'no-repeat',
        WebkitMaskRepeat:   'no-repeat',
      }}
    />
  )
}
