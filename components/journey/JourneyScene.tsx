'use client'

import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Biochar from './scenes/Biochar'
import { journey } from './journeyState'

/* Lerps the smoothed journey.progress toward the raw scroll target.
   Mounted first so it runs before scenes read progress each frame. */
function ProgressDriver() {
  useFrame((_, delta) => {
    const a = 1 - Math.pow(0.0015, delta)
    journey.progress = THREE.MathUtils.lerp(journey.progress, journey.target, a)
  })
  return null
}

/* All scene contents live inside the Canvas. Lighting follows the
   CLAUDE.md brief: soft directional key from top-left, low ambient,
   bright + editorial. A studio environment gives the textured model
   realistic PBR reflections; a soft contact shadow grounds it like
   the reference photo. */
export default function JourneyScene() {
  return (
    <>
      <ProgressDriver />

      <ambientLight intensity={0.4} color="#F4F2ED" />
      <hemisphereLight args={['#FAFAF7', '#AEB79D', 0.4]} />
      <directionalLight position={[-5, 6, 4]} intensity={2.2} color="#FFF8EC" castShadow />
      <directionalLight position={[4, 1, 2]} intensity={0.5} color="#AEB79D" />

      <Biochar />

      {/* Soft shadow beneath the floating chunk (matches the reference). */}
      <ContactShadows
        position={[0, -1.7, 0]}
        scale={6}
        blur={2.6}
        opacity={0.42}
        far={4}
        color="#2E372A"
        frames={Infinity}
      />

      {/* IBL for realistic material reflections; not shown as background. */}
      <Environment preset="studio" environmentIntensity={0.45} />
    </>
  )
}
