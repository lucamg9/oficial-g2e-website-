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
 * Extended scene-by-scene as the journey grows.
 */
export const BEATS = {
  hero:     [0.00, 0.10] as const, // floating biochar, curious
  identity: [0.10, 0.24] as const, // biochar centers + scales, "Hydrochar" reveal
} as const

/** Linear 0→1 progress of `p` within [start,end], clamped. */
export function beat(p: number, start: number, end: number): number {
  if (end === start) return p >= end ? 1 : 0
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}
