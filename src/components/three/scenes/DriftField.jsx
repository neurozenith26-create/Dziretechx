import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'

/**
 * Faint particle drift, used behind Why Us. Deliberately understated — this
 * section is dense with stats and copy, so the motion must not compete.
 */
const COUNT = 220

const rand = (i, salt) => {
  const x = Math.sin(i * 91.7 + salt * 47.3) * 43758.5453
  return x - Math.floor(x)
}

function Drift({ isDark }) {
  const ref = useRef(null)

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rand(i, 1) - 0.5) * 18
      positions[i * 3 + 1] = (rand(i, 2) - 0.5) * 11
      positions[i * 3 + 2] = (rand(i, 3) - 0.5) * 5
      speeds[i] = 0.08 + rand(i, 4) * 0.16
    }
    return { positions, speeds }
  }, [])

  useFrame((state, delta) => {
    const pos = ref.current?.geometry.attributes.position
    if (!pos) return
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speeds[i] * delta
      if (y > 5.5) y = -5.5
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1E5FBB"
        transparent
        opacity={isDark ? 0.5 : 0.32}
        size={0.07}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

export default function DriftField({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 9], fov: 50 }}>
      <Drift isDark={isDark} />
    </SceneCanvas>
  )
}
