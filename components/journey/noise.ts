/* ──────────────────────────────────────────────────────────────
   Compact, dependency-free 3D value noise + fbm.
   Used to displace the biochar geometry into an irregular,
   porous carbon shape at build time (not animated per frame).
   ────────────────────────────────────────────────────────────── */

const fract = (x: number) => x - Math.floor(x)

function hash3(x: number, y: number, z: number): number {
  const h = x * 127.1 + y * 311.7 + z * 74.7
  return fract(Math.sin(h) * 43758.5453123)
}

const smooth = (t: number) => t * t * (3 - 2 * t)

/** 3D value noise, trilinearly interpolated. Returns ~0→1. */
export function valueNoise(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi,        yf = y - yi,        zf = z - zi
  const u = smooth(xf), v = smooth(yf), w = smooth(zf)

  const c000 = hash3(xi,     yi,     zi)
  const c100 = hash3(xi + 1, yi,     zi)
  const c010 = hash3(xi,     yi + 1, zi)
  const c110 = hash3(xi + 1, yi + 1, zi)
  const c001 = hash3(xi,     yi,     zi + 1)
  const c101 = hash3(xi + 1, yi,     zi + 1)
  const c011 = hash3(xi,     yi + 1, zi + 1)
  const c111 = hash3(xi + 1, yi + 1, zi + 1)

  const x00 = c000 + (c100 - c000) * u
  const x10 = c010 + (c110 - c010) * u
  const x01 = c001 + (c101 - c001) * u
  const x11 = c011 + (c111 - c011) * u
  const y0 = x00 + (x10 - x00) * v
  const y1 = x01 + (x11 - x01) * v
  return y0 + (y1 - y0) * w
}

/** Fractal Brownian motion — layered octaves of value noise. */
export function fbm(x: number, y: number, z: number, octaves = 4): number {
  let f = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    f += amp * valueNoise(x * freq, y * freq, z * freq)
    freq *= 2.1
    amp *= 0.5
  }
  return f
}
