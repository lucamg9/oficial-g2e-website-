'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────────────
   HydrocharCanvas — the real biochar model (public/models/
   biochar.glb) rendered live and rotating on a VERY slow turn.
   Transparent background so the card's soft surface shows behind
   it; a drei ContactShadows plane grounds it like a real object.
   Lazy-mounted from the hero (next/dynamic, ssr:false) with the
   PNG as the instant fallback, so it never blocks first paint.
   ────────────────────────────────────────────────────────────── */

const MODEL_URL = '/models/biochar.glb'
const SPIN_SPEED = 0.07 // rad/sec — ~90s per full rotation, intentionally slow

function Biochar() {
  const { scene } = useGLTF(MODEL_URL)
  const group = useRef<THREE.Group>(null)

  // Center the model on the origin and normalise its scale so it
  // always frames nicely regardless of the GLB's authored units.
  const { offset, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return {
      offset: center.clone().multiplyScalar(-1),
      scale:  1.95 / maxDim,
    }
  }, [scene])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * SPIN_SPEED
  })

  // Lifted up in the frame so the contact shadow below has room to fade
  // out fully instead of being clipped at the canvas (viewport) edge.
  return (
    <group ref={group} scale={scale} rotation={[0.18, 0, 0]} position={[0, 0.22, 0]}>
      <primitive object={scene} position={offset.toArray()} />
    </group>
  )
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export default function HydrocharCanvas() {
  // Default to supported (avoids a flash); downgrade to the still image
  // only if WebGL is genuinely unavailable on this device.
  const [supported, setSupported] = useState(true)
  useEffect(() => { setSupported(webglAvailable()) }, [])

  if (!supported) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/assets/generated/hydrochar-real.png"
        alt="A piece of hydrochar, the carbon-rich material G2E produces from organic waste."
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          filter: 'drop-shadow(0 26px 26px rgba(46,55,42,0.30))',
        }}
      />
    )
  }

  return (
    <Canvas
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.4], fov: 32 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      {/* Soft, warm, editorial lighting — no HDR network fetch. */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[-3, 4, 3]} intensity={1.9} color="#FFF6E8" />
      <directionalLight position={[3, 1.5, -2]} intensity={0.5} color="#E8EEDF" />

      <Suspense fallback={null}>
        <Biochar />
        <ContactShadows
          position={[0, -0.92, 0]}
          opacity={0.30}
          scale={5.5}
          blur={3.2}
          far={3}
          resolution={512}
          color="#2E372A"
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(MODEL_URL)
