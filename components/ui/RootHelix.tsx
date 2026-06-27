'use client'

import { useEffect, useRef } from 'react'

/* ──────────────────────────────────────────────────────────────
   RootHelix — a living root system that grows on scroll.

   Nothing at rest. As the user scrolls, several roots grow downward
   from a point: each root's growing TIP is pinned a fixed distance
   above the viewport bottom (spread across the lower screen via
   `lift`), so every tip stays visible and advances with the scroll.
   A few roots carry a large sideways `drift`, peeling off the
   vertical and running to the left/right until they leave the frame.

   Each root is drawn as a TAPERING FILLED RIBBON — thick where it
   emerged, narrowing to a fine point at the growing tip — wrapped in
   a soft brown depth gradient, and fringed with fine ROOT HAIRS that
   fade in along the grown length. The result reads as real roots
   reaching through soil, not flat lines.

   Growth is a pure deterministic function of scroll `progress` (no
   time term), so scrolling back retraces every root along the exact
   same path.
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
// tips up the screen). `thick` is the full ribbon thickness at the
// base; `hair` scales the root-hair density/length.
type Root = {
  x0: number; drift: number; bend: number; lift: number
  seed: number; thick: number; alpha: number; wob: number; hair: number
}

const ROOTS: Root[] = [
  // primary, thicker roots
  { x0: -120, drift:   44, bend: 1.4,  lift: 110, seed: 0.4, thick: 13, alpha: 0.92, wob: 1.0, hair: 1.0 },
  { x0:  -58, drift:  -54, bend: 1.4,  lift: 300, seed: 1.2, thick: 11, alpha: 0.90, wob: 1.0, hair: 1.0 },
  { x0:    4, drift:   22, bend: 1.4,  lift: 180, seed: 2.1, thick: 15, alpha: 0.95, wob: 0.9, hair: 1.1 }, // central, thickest
  { x0:   66, drift:   40, bend: 1.4,  lift: 360, seed: 3.0, thick: 11, alpha: 0.90, wob: 1.0, hair: 1.0 },
  { x0:  126, drift:  -30, bend: 1.4,  lift: 230, seed: 3.8, thick: 12, alpha: 0.92, wob: 1.0, hair: 1.0 },
  // roots that leave the vertical and run sideways off the frame
  { x0:  -44, drift: -940, bend: 1.05, lift: 430, seed: 4.6, thick: 10, alpha: 0.88, wob: 0.7, hair: 0.8 }, // → far left
  { x0:   44, drift: 1000, bend: 1.00, lift: 520, seed: 5.4, thick: 10, alpha: 0.88, wob: 0.7, hair: 0.8 }, // → far right
  { x0:  -12, drift:  360, bend: 1.15, lift: 600, seed: 6.1, thick:  8, alpha: 0.82, wob: 0.85, hair: 0.7 }, // → mild right
  // finer secondary roots — add density to the system
  { x0:  -90, drift:  120, bend: 1.5,  lift: 200, seed: 7.3, thick:  6, alpha: 0.78, wob: 1.2, hair: 1.2 },
  { x0:   34, drift: -150, bend: 1.5,  lift: 470, seed: 8.1, thick:  6, alpha: 0.78, wob: 1.2, hair: 1.2 },
  { x0:   96, drift:  -90, bend: 1.5,  lift: 340, seed: 9.0, thick:  5, alpha: 0.74, wob: 1.3, hair: 1.3 },
  { x0:  -30, drift:  210, bend: 1.45, lift: 560, seed: 9.8, thick:  5, alpha: 0.74, wob: 1.3, hair: 1.3 },
]

const TRAIL    = 1500            // visible root length above the tip
const DY       = 7               // centreline sample spacing (px)
const TIP_LEN  = 120             // px over which the tip narrows to a point
const TOP_LEN  = 90              // px over which the emerging end fades in
const HAIR_STEP = 5              // emit a hair every Nth sample

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const clamp01 = (v: number) => clamp(v, 0, 1)
// deterministic pseudo-random from two seeds
const rand = (a: number, b: number) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export default function RootHelix({ progressRef, className, style }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const svgRef    = useRef<SVGSVGElement>(null)
  const ribbonRefs = useRef<(SVGPathElement | null)[]>([])
  const hairRefs   = useRef<(SVGPathElement | null)[]>([])
  const tipRefs    = useRef<(SVGCircleElement | null)[]>([])
  const size      = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    if (!wrap || !svg) return

    // Phones/tablets: pull the camera back (smaller geometry = less zoomed-in,
    // finer roots read sharper) and do far less work per frame (coarser
    // sampling, shorter trail, fewer roots, sparser hairs) so growth stays
    // smooth and doesn't starve the milestone-card reveals.
    const mobile = window.matchMedia('(max-width: 900px)').matches
      || window.matchMedia('(pointer: coarse)').matches
    const S         = mobile ? 0.62 : 1
    const DYv       = mobile ? 16 : DY
    const TRAILv    = mobile ? 760 : TRAIL
    const HAIRSTEPv = mobile ? 11 : HAIR_STEP
    const TIP_LENv  = TIP_LEN * S
    const TOP_LENv  = TOP_LEN * S
    const MAXR      = mobile ? 8 : ROOTS.length

    let lastP = -1
    let lastW = 0

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

    // Static organic wander — deterministic (function of y only).
    const gnarl = (y: number, seed: number) =>
      10 * Math.sin(y * 0.011 + seed) +
      6 * Math.sin(y * 0.029 + seed * 1.7) +
      3 * Math.sin(y * 0.062 + seed * 2.3)

    // Half-width at a point, given how far it is from the tip and from the
    // emerging top — pointed at the tip, softly fading in at the top.
    const halfWidthAt = (distFromTip: number, distFromTop: number, full: number) => {
      const hw = full / 2
      let f = 1
      if (distFromTip < TIP_LENv) f = Math.min(f, 0.10 + 0.90 * Math.pow(clamp01(distFromTip / TIP_LENv), 0.7))
      if (distFromTop < TOP_LENv) f = Math.min(f, 0.30 + 0.70 * clamp01(distFromTop / TOP_LENv))
      return hw * f
    }

    const draw = () => {
      const { w: W, h: H } = size.current
      const p = clamp01(progressRef.current ?? 0)

      if (W > 0 && H > 0 && (Math.abs(p - lastP) > 0.0003 || W !== lastW)) {
        lastP = p
        lastW = W
        const cx = W / 2

        ROOTS.forEach((R, ri) => {
          const ribbon = ribbonRefs.current[ri]
          const hairsEl = hairRefs.current[ri]
          const tipEl   = tipRefs.current[ri]

          // Drop the finest secondary roots on phones — fewer ribbons to
          // rebuild each frame.
          if (ri >= MAXR) {
            if (ribbon) ribbon.setAttribute('d', '')
            if (hairsEl) hairsEl.setAttribute('d', '')
            if (tipEl) tipEl.setAttribute('opacity', '0')
            return
          }

          // Tip pinned `lift` px above the viewport bottom (which maps to
          // section-y = p*H), so the end stays on screen as it grows.
          const tipY   = clamp(p * H - R.lift * S, 0, H)
          const yStart = Math.max(0, tipY - TRAILv)

          if (tipY - yStart < 6) {
            if (ribbon) ribbon.setAttribute('d', '')
            if (hairsEl) hairsEl.setAttribute('d', '')
            if (tipEl) tipEl.setAttribute('opacity', '0')
            return
          }

          const xAt = (y: number) =>
            cx + R.x0 * S + R.drift * S * Math.pow(clamp01(y / H), R.bend) + gnarl(y, R.seed) * R.wob * S

          // Sample the centreline.
          const ys: number[] = []
          for (let y = yStart; y < tipY; y += DYv) ys.push(y)
          ys.push(tipY)
          const n = ys.length
          const xs = ys.map(xAt)

          // Build the tapering ribbon with proper per-sample normals, plus
          // collect edge points + normals for the hairs pass.
          const left: string[] = []
          const right: string[] = []
          const edgeL: { x: number; y: number; nx: number; ny: number; hw: number }[] = []

          for (let i = 0; i < n; i++) {
            const y = ys[i]
            const x = xs[i]
            const px = xs[Math.max(0, i - 1)], py = ys[Math.max(0, i - 1)]
            const qx = xs[Math.min(n - 1, i + 1)], qy = ys[Math.min(n - 1, i + 1)]
            let tx = qx - px, ty = qy - py
            const tl = Math.hypot(tx, ty) || 1
            tx /= tl; ty /= tl
            const nx = -ty, ny = tx                       // unit normal
            const hw = halfWidthAt(tipY - y, y - yStart, R.thick * S)
            const lx = x + nx * hw, ly = y + ny * hw
            const rx = x - nx * hw, ry = y - ny * hw
            left.push(`${lx.toFixed(1)} ${ly.toFixed(1)}`)
            right.push(`${rx.toFixed(1)} ${ry.toFixed(1)}`)
            edgeL.push({ x, y, nx, ny, hw })
          }

          // Ribbon outline: down the left edge, back up the right edge.
          let d = `M${left[0]}`
          for (let i = 1; i < n; i++) d += `L${left[i]}`
          for (let i = n - 1; i >= 0; i--) d += `L${right[i]}`
          d += 'Z'
          if (ribbon) ribbon.setAttribute('d', d)

          // Root hairs — short whiskers angled outward + down, fading in
          // along the grown length and thinning toward the tip.
          let hd = ''
          for (let i = 2; i < n - 2; i += HAIRSTEPv) {
            const e = edgeL[i]
            const dft = tipY - e.y
            const dfs = e.y - yStart
            const fade = clamp01(dft / 220) * clamp01(dfs / 140)
            if (fade < 0.06) continue
            const side = (i % (HAIRSTEPv * 2) === 0) ? 1 : -1
            const len = (5 + rand(R.seed, i) * 11) * fade * R.hair * S
            if (len < 2) continue
            // anchor on the edge, push outward along the normal + slight down
            const ax = e.x + e.nx * e.hw * side
            const ay = e.y + e.ny * e.hw * side
            const dirx = e.nx * side * 0.85
            const diry = 0.5 + Math.abs(e.ny) * 0.3        // bias downward
            const dl = Math.hypot(dirx, diry) || 1
            const ex = ax + (dirx / dl) * len
            const ey = ay + (diry / dl) * len
            // gentle curve via a control point
            const cxp = ax + (dirx / dl) * len * 0.5 + side * 2
            const cyp = ay + (diry / dl) * len * 0.5 + 1.5
            hd += `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${cxp.toFixed(1)} ${cyp.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
          }
          if (hairsEl) hairsEl.setAttribute('d', hd)

          // Moist root cap at the growing tip.
          if (tipEl) {
            if (tipY > 4 && p < 0.999) {
              tipEl.setAttribute('cx', xs[n - 1].toFixed(1))
              tipEl.setAttribute('cy', ys[n - 1].toFixed(1))
              tipEl.setAttribute('r', String(Math.max(1.4, R.thick * S * 0.16)))
              tipEl.setAttribute('opacity', '0.55')
            } else {
              tipEl.setAttribute('opacity', '0')
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
          {/* Vertical earth gradient — deep wet brown up top, warmer lower. */}
          <linearGradient id="root-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0"   stopColor="#241608" />
            <stop offset="0.5" stopColor="#3c2615" />
            <stop offset="1"   stopColor="#56381f" />
          </linearGradient>
          <filter id="root-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Root hairs sit behind the ribbons so the bodies read cleanly. */}
        {ROOTS.map((R, i) => (
          <path
            key={`hair-${i}`}
            ref={(el) => { hairRefs.current[i] = el }}
            fill="none"
            stroke={`rgba(74,52,32,${R.alpha * 0.42})`}
            strokeWidth={0.9}
            strokeLinecap="round"
            filter="url(#root-soft)"
          />
        ))}

        {/* Tapering ribbon bodies. */}
        {ROOTS.map((R, i) => (
          <path
            key={`root-${i}`}
            ref={(el) => { ribbonRefs.current[i] = el }}
            fill="url(#root-fill)"
            fillOpacity={R.alpha}
            stroke="rgba(26,16,8,0.35)"
            strokeWidth={0.6}
          />
        ))}

        {/* Moist tip caps. */}
        {ROOTS.map((_, i) => (
          <circle
            key={`tip-${i}`}
            ref={(el) => { tipRefs.current[i] = el }}
            fill="rgba(90,64,38,0.9)"
            opacity="0"
          />
        ))}
      </svg>
    </div>
  )
}
