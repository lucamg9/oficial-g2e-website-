'use client'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Biochar from './scenes/Biochar'
import { journey } from './journeyState'

/* Lerps the smoothed journey.progress toward the raw scroll target.
   Mounted first so it runs before scenes read progress each frame. */
function ProgressDriver() {
  useFrame((_, delta) => {
    // Frame-rate-independent smoothing toward the scroll target.
    const a = 1 - Math.pow(0.0015, delta)
    journey.progress = THREE.MathUtils.lerp(journey.progress, journey.target, a)
  })
  return null
}

/* All scene contents live inside the Canvas. Lighting follows the
   CLAUDE.md brief: soft directional key from top-left, low ambient,
   kept bright + editorial (never dark/cinematic). */
export default function JourneyScene() {
  return (
    <>
      <ProgressDriver />

      <ambientLight intensity={0.55} color="#F4F2ED" />
      <hemisphereLight args={['#FAFAF7', '#AEB79D', 0.45]} />
      <directionalLight position={[-5, 6, 4]} intensity={2.4} color="#FFF8EC" />
      <directionalLight position={[4, 1, 2]} intensity={0.6} color="#AEB79D" />

      <Biochar />
    </>
  )
}
