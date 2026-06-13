/* ──────────────────────────────────────────────────────────────
   Shared journey state — a single mutable singleton read by both
   the DOM scroll hook and the R3F scene (inside the Canvas).
   Using a module singleton (not React state/context) keeps the
   scroll hot-path at zero re-renders: the DOM writes `target`,
   useFrame lerps `progress` toward it and reads it every frame.
   ────────────────────────────────────────────────────────────── */

export const journey = {
  /** Smoothed 0→1 progress through the whole journey (what scenes read). */
  progress: 0,
  /** Raw 0→1 progress from scroll position (what the DOM writes). */
  target: 0,
}

/**
 * Scene beats as [start, end] fractions of total journey progress.
 * One shared timeline so every scene + overlay agrees on "where we are".
 * Beats intentionally overlap so motion + copy hand off seamlessly.
 * Extended scene-by-scene as the journey grows.
 */
export const BEATS = {
  hero:     [0.00, 0.08] as const, // floating biochar, curious
  identity: [0.08, 0.22] as const, // biochar centers + scales, "Hydrochar" reveal
  descent:  [0.22, 0.40] as const, // biochar drops down + recedes into the next page
  whoweare: [0.36, 0.66] as const, // "Who we are" copy resolves as it settles
} as const

/** Total scroll length of the journey, in viewport-heights. */
export const SCENES = 4.5

/** Linear 0→1 progress of `p` within [start,end], clamped. */
export function beat(p: number, start: number, end: number): number {
  if (end === start) return p >= end ? 1 : 0
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}

/** Smoothstep eased 0→1 within [start,end]. */
export function beatEased(p: number, start: number, end: number): number {
  const k = beat(p, start, end)
  return k * k * (3 - 2 * k)
}
