'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { fbm } from '../noise'
import { journey, BEATS, beat } from '../journeyState'

/* ──────────────────────────────────────────────────────────────
   Scene 1 + 2 — the floating hydrochar.
   Procedural irregular carbon chunk (icosahedron + fbm displacement).
   Idle: slow Y rotation, gentle float, subtle mouse tilt.
   On scroll (hero → identity beat): drifts from right to center,
   scales up, as the "Hydrochar" text resolves what it is.
   ────────────────────────────────────────────────────────────── */

const REST_X = 1.7   // resting position, right-of-center
const DISPLACE = 0.34 // surface roughness amplitude

function makeBiocharGeometry(): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1.2, 5)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const dir = v.clone().normalize()
    // Two noise scales: large lumps + finer porous detail.
    const lump = fbm(dir.x * 2.0 + 11, dir.y * 2.0 + 7, dir.z * 2.0 + 3, 4)
    const fine = fbm(dir.x * 6.0, dir.y * 6.0, dir.z * 6.0, 3)
    const d = (lump - 0.5) * 2 * DISPLACE + (fine - 0.5) * 0.10
    v.addScaledVector(dir, d)
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  geo.computeVertexNormals()
  return geo
}

export default function Biochar() {
  const group = useRef<THREE.Group>(null)
  const mesh  = useRef<THREE.Mesh>(null)
  const geometry = useMemo(makeBiocharGeometry, [])

  useFrame((state, delta) => {
    const g = group.current
    const m = mesh.current
    if (!g || !m) return

    const t = state.clock.elapsedTime
    const p = journey.progress

    // Hero → identity transition: drift to center + scale up.
    const k = beat(p, BEATS.identity[0], BEATS.identity[1])
    const eased = k * k * (3 - 2 * k) // smoothstep
    const x = THREE.MathUtils.lerp(REST_X, 0, eased)
    const scale = THREE.MathUtils.lerp(1, 1.4, eased)

    // Gentle float (sine), independent of scroll.
    const floatY = Math.sin(t * (Math.PI * 2) / 4) * 0.06

    g.position.x = THREE.MathUtils.lerp(g.position.x, x, 0.08)
    g.position.y = floatY
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x || 1, scale, 0.08))

    // Slow auto-rotation: ~one turn / 18s, plus the mesh keeps turning.
    m.rotation.y += delta * 0.35

    // Subtle mouse tilt (±~5°), eased.
    const tiltX = state.pointer.y * 0.09
    const tiltZ = state.pointer.x * 0.06
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, tiltX, 0.05)
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, tiltZ, 0.05)
  })

  return (
    <group ref={group} position={[REST_X, 0, 0]}>
      <mesh ref={mesh} geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#1A1A14"
          roughness={0.92}
          metalness={0.06}
          flatShading={false}
        />
      </mesh>
    </group>
  )
}
