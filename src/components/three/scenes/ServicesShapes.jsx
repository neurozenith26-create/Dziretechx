import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'

/**
 * ONE canvas for the whole services grid — not one per card, which would mean
 * four WebGL contexts fighting for the same GPU.
 *
 * Each capability gets a wireframe solid, positioned to sit roughly behind its
 * card, tilting toward the cursor.
 */
const SHAPES = [
  { kind: 'box', color: '#00D4FF', pos: [-4.2, 1.4, 0] },
  { kind: 'torus', color: '#8B5CF6', pos: [0, 1.7, 0] },
  { kind: 'icosahedron', color: '#10B981', pos: [4.2, 1.4, 0] },
  { kind: 'octahedron', color: '#F59E0B', pos: [0, -1.9, 0] },
]

function Geometry({ kind }) {
  switch (kind) {
    case 'box':
      return <boxGeometry args={[1.25, 1.25, 1.25]} />
    case 'torus':
      return <torusGeometry args={[0.85, 0.3, 10, 32]} />
    case 'icosahedron':
      return <icosahedronGeometry args={[0.95, 0]} />
    default:
      return <octahedronGeometry args={[1.05, 0]} />
  }
}

function Shape({ kind, color, pos, index, isDark, pointer }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime

    // Idle rotation, each shape slightly out of phase.
    m.rotation.x += delta * (0.16 + index * 0.03)
    m.rotation.y += delta * (0.22 - index * 0.02)

    // Tilt toward the cursor, eased and clamped so it never spins wildly.
    const targetX = -pointer.current.y * 0.4
    const targetY = pointer.current.x * 0.5
    m.rotation.x += (targetX - m.rotation.x) * Math.min(1, delta * 0.6)
    m.rotation.y += (targetY - m.rotation.y) * Math.min(1, delta * 0.6)

    m.position.y = pos[1] + Math.sin(t * 0.6 + index) * 0.16
  })

  return (
    <mesh ref={ref} position={pos}>
      <Geometry kind={kind} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={isDark ? 0.4 : 0.28}
        depthWrite={false}
      />
    </mesh>
  )
}

function Rig({ isDark }) {
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * Math.min(1, delta * 3)
    pointer.current.y += (state.pointer.y - pointer.current.y) * Math.min(1, delta * 3)
  })

  return SHAPES.map((s, i) => (
    <Shape key={s.kind} {...s} index={i} isDark={isDark} pointer={pointer} />
  ))
}

export default function ServicesShapes({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 8.5], fov: 50 }}>
      <Rig isDark={isDark} />
    </SceneCanvas>
  )
}
