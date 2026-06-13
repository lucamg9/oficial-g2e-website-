'use client'

import { Canvas } from '@react-three/fiber'
import JourneyScene from './JourneyScene'

/* ──────────────────────────────────────────────────────────────
   The single persistent WebGL canvas for the whole journey.
   Fills its (pinned) parent. Transparent so the Stone Ivory page
   shows through — the 3D lives *on* the brand canvas, not in a box.
   ────────────────────────────────────────────────────────────── */

export default function JourneyCanvas() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <JourneyScene />
      </Canvas>
    </div>
  )
}
