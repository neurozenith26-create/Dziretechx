import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'

/**
 * Ambient flowing gradient mesh, cyan -> violet. Purely atmospheric: a low
 * subdivision plane whose vertices ripple on a couple of sine waves, coloured
 * by a vertex gradient. No lighting, no textures, negligible cost.
 */
function Mesh({ isDark }) {
  const ref = useRef(null)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 13, 48, 28)
    const colors = []
    const cyan = new THREE.Color('#00D4FF')
    const violet = new THREE.Color('#8B5CF6')
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getX(i) / 22 + 0.5 + (pos.getY(i) / 13 + 0.5)) / 2
      const c = cyan.clone().lerp(violet, THREE.MathUtils.clamp(t, 0, 1))
      colors.push(c.r, c.g, c.b)
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [])

  const base = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.35
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3]
      const y = base[i * 3 + 1]
      pos.setZ(i, Math.sin(x * 0.35 + t) * 0.6 + Math.cos(y * 0.45 - t * 0.8) * 0.45)
    }
    pos.needsUpdate = true
  })

  return (
    <mesh ref={ref} geometry={geometry} rotation={[-0.62, 0, 0.18]} position={[0, -1, 0]}>
      <meshBasicMaterial
        vertexColors
        wireframe
        transparent
        opacity={isDark ? 0.16 : 0.11}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function AboutMesh({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <Mesh isDark={isDark} />
    </SceneCanvas>
  )
}
