'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { journey, BEATS, beatEased } from '../journeyState'

/* ──────────────────────────────────────────────────────────────
   Scene 1 + 2 — the floating hydrochar.
   Real textured 3D model (Higgsfield image_to_3d from the biochar
   reference), centered. Idle: slow rotation, gentle float, subtle
   mouse tilt. On scroll (hero → identity beat): scales up + lifts
   slightly as the "Hydrochar" text resolves what it is.
   ────────────────────────────────────────────────────────────── */

const MODEL_PATH  = '/models/biochar.glb'
const TARGET_SIZE = 2.4 // normalized max dimension in world units

export default function Biochar() {
  const group = useRef<THREE.Group>(null)
  const spin  = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)

  // Clone, center the pivot, normalize scale, enable shadows + PBR env.
  const model = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    root.position.sub(center) // recenter pivot at origin
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const s = TARGET_SIZE / maxDim
    root.scale.setScalar(s)
    root.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) {
        m.castShadow = true
        m.receiveShadow = false
        const mat = m.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.envMapIntensity = 0.5
          mat.roughness = Math.min(1, (mat.roughness ?? 0.9) * 1.05)
          mat.needsUpdate = true
        }
      }
    })
    return root
  }, [scene])

  useFrame((state, delta) => {
    const g = group.current
    const sp = spin.current
    if (!g || !sp) return

    const t = state.clock.elapsedTime
    const p = journey.progress

    // Identity: scale up + lift slightly to clear the "Hydrochar" text.
    const idE = beatEased(p, BEATS.identity[0], BEATS.identity[1])
    // Descent: the chunk drops down + recedes into depth as we move to
    // the next page, settling small while the Who-We-Are copy resolves.
    const deE = beatEased(p, BEATS.descent[0], BEATS.descent[1])

    const liftY  = idE * 0.55
    const dropY  = deE * -3.0          // falls downward
    const recedeZ = deE * -2.2         // moves away from camera
    const scale  = THREE.MathUtils.lerp(1, 1.28, idE) * THREE.MathUtils.lerp(1, 0.6, deE)

    // Gentle float (sine), fades out as it descends.
    const floatY = Math.sin(t * (Math.PI * 2) / 4.5) * 0.05 * (1 - deE)

    g.position.x = 0 // centered
    g.position.y = THREE.MathUtils.lerp(g.position.y, liftY + dropY + floatY, 0.1)
    g.position.z = THREE.MathUtils.lerp(g.position.z, recedeZ, 0.1)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x || 1, scale, 0.08))

    // Slow, gentle rotation that eases off as it recedes (keeps the
    // strong front face toward camera rather than spinning fully).
    sp.rotation.y += delta * 0.22 * (1 - deE * 0.7)

    // Subtle mouse tilt (±~5°), eased, also fading on descent.
    const tilt = 1 - deE
    sp.rotation.x = THREE.MathUtils.lerp(sp.rotation.x, state.pointer.y * 0.08 * tilt, 0.05)
    sp.rotation.z = THREE.MathUtils.lerp(sp.rotation.z, state.pointer.x * 0.05 * tilt, 0.05)
  })

  // Light initial tilt so the form reads as a 3D rock, not a silhouette.
  useLayoutEffect(() => {
    if (spin.current) spin.current.rotation.set(0.1, 0.6, 0)
  }, [])

  return (
    <group ref={group}>
      <group ref={spin}>
        <primitive object={model} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
