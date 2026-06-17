'use client'

import { useEffect, useRef } from 'react'

/* ──────────────────────────────────────────────────────────────
   RootHelix — an independent root system.

   Nothing at rest. As the user scrolls, several thick roots grow.
   Each root's growing TIP is pinned a fixed distance above the
   viewport bottom (spread across the lower screen via `lift`), so
   every tip stays visible and advances with the scroll — you can
   always see the end of each root growing. A few roots carry a
   large sideways `drift`, peeling off the vertical and running to
   the left/right until they leave the frame.

   Growth is a pure deterministic function of scroll `progress`
   (no time term), so scrolling back shrinks each root along the
   exact same path. Dark-brown earthy strokes on Stone-Ivory.
   ────────────────────────────────────────────────────────────── */

type Props = {
  /** Growth amount 0→1, updated by the parent on scroll (no re-render). */
  progressRef: React.RefObject<number>
  className?: string
  style?: React.CSSProperties
}

// `x0` start offset from centre (spreads the roots apart); `drift`
// horizontal wander toward the tip (big values run off the sides);
// `bend` how late the drift kicks in; `lift` px the tip rides above
// the viewport bottom (also staggers when it appears + spreads the
// tips up the screen). Thick strokes, dark browns.
const ROOTS = [
  { x0: -120, drift:   44, bend: 1.4, lift: 110, seed: 0.4, width: 5.4, alpha: 0.62, wob: 1.0, rgb: '40,26,15' },
  { x0:  -58, drift:  -54, bend: 1.4, lift: 300, seed: 1.2, width: 4.8, alpha: 0.58, wob: 1.0, rgb: '52,34,20' },
  { x0:    4, drift:   22, bend: 1.4, lift: 180, seed: 2.1, width: 6.2, alpha: 0.66, wob: 0.9, rgb: '36,23,13' }, // central, thickest
  { x0:   66, drift:   40, bend: 1.4, lift: 360, seed: 3.0, width: 4.6, alpha: 0.56, wob: 1.0, rgb: '52,34,20' },
  { x0:  126, drift:  -30, bend: 1.4, lift: 230, seed: 3.8, width: 5.0, alpha: 0.60, wob: 1.0, rgb: '40,26,15' },
  // roots that leave the vertical trail and grow sideways off the frame
  { x0:  -44, drift: -940, bend: 1.05, lift: 430, seed: 4.6, width: 4.6, alpha: 0.56, wob: 0.7, rgb: '46,30,18' }, // → far left
  { x0:   44, drift: 1000, bend: 1.00, lift: 520, seed: 5.4, width: 4.8, alpha: 0.58, wob: 0.7, rgb: '46,30,18' }, // → far right
  { x0:  -12, drift:  360, bend: 1.15, lift: 600, seed: 6.1, width: 4.0, alpha: 0.50, wob: 0.85, rgb: '60,40,24' }, // → mild right
]

const MAX_SAMPLES = 420
const TRAIL = 2000 // visible root length above the tip (exceeds any viewport)
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const clamp01 = (v: number) => clamp(v, 0, 1)

export default function RootHelix({ progressRef, className, style }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const svgRef   = useRef<SVGSVGElement>(null)
  const rootRefs = useRef<(SVGPathElement | null)[]>([])
  const tipRefs  = useRef<(SVGCircleElement | null)[]>([])
  const size     = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    if (!wrap || !svg) return

    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect()
      size.current = { w: r.width, h: r.height }
      svg.setAttribute('width', String(r.width))
      svg.setAttribute('height', String(r.height))
      svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`)
      lastP = -1
    })
    ro.observe(wrap)

    let raf = 0
    let lastP = -1
    let lastW = 0

    // Static organic wander — deterministic (function of y only).
    const gnarl = (y: number, seed: number) =>
      10 * Math.sin(y * 0.011 + seed) +
      6 * Math.sin(y * 0.029 + seed * 1.7) +
      3 * Math.sin(y * 0.062 + seed * 2.3)

    const draw = () => {
      const { w: W, h: H } = size.current
      const p = clamp01(progressRef.current ?? 0)

      if (W > 0 && H > 0 && (Math.abs(p - lastP) > 0.0003 || W !== lastW)) {
        lastP = p
        lastW = W

        const cx = W / 2
        const dy = Math.max(6, TRAIL / MAX_SAMPLES)

        ROOTS.forEach((R, i) => {
          // Tip pinned `lift` px above the viewport bottom (which maps to
          // section-y = p*H), so the end stays on screen as it grows.
          const tipY = clamp(p * H - R.lift, 0, H)
          const yStart = Math.max(0, tipY - TRAIL)
          const xAt = (y: number) =>
            cx + R.x0 + R.drift * Math.pow(clamp01(y / H), R.bend) + gnarl(y, R.seed) * R.wob

          const el = rootRefs.current[i]
          if (el) {
            if (tipY - yStart < 2) {
              el.setAttribute('d', '')
            } else {
              let d = `M${xAt(yStart).toFixed(1)} ${yStart.toFixed(1)}`
              for (let y = yStart + dy; y <= tipY; y += dy) {
                d += `L${xAt(y).toFixed(1)} ${y.toFixed(1)}`
              }
              el.setAttribute('d', d)
            }
          }

          const tip = tipRefs.current[i]
          if (tip) {
            if (tipY > 2 && p < 0.999) {
              tip.setAttribute('cx', xAt(tipY).toFixed(1))
              tip.setAttribute('cy', tipY.toFixed(1))
              tip.setAttribute('opacity', '0.7')
            } else {
              tip.setAttribute('opacity', '0')
            }
          }
        })
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [progressRef])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" style={style}>
      <svg ref={svgRef} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="root-tip-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {ROOTS.map((R, i) => (
          <path
            key={`root-${i}`}
            ref={(el) => { rootRefs.current[i] = el }}
            fill="none"
            stroke={`rgba(${R.rgb},${R.alpha})`}
            strokeWidth={R.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {ROOTS.map((R, i) => (
          <circle
            key={`tip-${i}`}
            ref={(el) => { tipRefs.current[i] = el }}
            r={R.width * 0.7}
            fill={`rgba(${R.rgb},0.9)`}
            filter="url(#root-tip-glow)"
            opacity="0"
          />
        ))}
      </svg>
    </div>
  )
}
