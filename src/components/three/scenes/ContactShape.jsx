import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'

/**
 * One minimal slow-rotating abstract solid behind the contact section.
 * Offset to the side so it never sits under the form, and the canvas is
 * pointer-events-none so it can never intercept a click on an input.
 */
function Shape({ isDark }) {
  const outer = useRef(null)
  const inner = useRef(null)

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.11
      outer.current.rotation.x += delta * 0.05
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.17
      inner.current.rotation.z += delta * 0.07
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06
      inner.current.scale.setScalar(s)
    }
  })

  return (
    <group position={[2.6, 0.2, 0]}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={isDark ? 0.24 : 0.16}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={isDark ? 0.3 : 0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function ContactShape({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <Shape isDark={isDark} />
    </SceneCanvas>
  )
}
