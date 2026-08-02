import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'

/**
 * Slowly rotating wireframe globe with glowing surface nodes — the cloud
 * network metaphor, and the second-strongest 3D moment after the hero.
 *
 * Nodes are distributed with a Fibonacci sphere so they stay evenly spaced
 * instead of clustering at the poles the way naive lat/long sampling does.
 */
const NODE_COUNT = 46
const RADIUS = 2.5

function Globe({ isDark }) {
  const group = useRef(null)
  const nodesRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodes = useMemo(() => {
    const pts = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      pts.push(
        new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
          RADIUS * 1.01
        )
      )
    }
    return pts
  }, [])

  // Arcs between a handful of node pairs, drawn as short great-circle-ish curves.
  const arcs = useMemo(() => {
    const lines = []
    for (let i = 0; i < 14; i++) {
      const a = nodes[(i * 7) % nodes.length]
      const b = nodes[(i * 13 + 5) % nodes.length]
      const mid = a.clone().add(b).multiplyScalar(0.5).setLength(RADIUS * 1.42)
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      const pts = curve.getPoints(18)
      for (let k = 0; k < pts.length - 1; k++) {
        lines.push(pts[k].x, pts[k].y, pts[k].z, pts[k + 1].x, pts[k + 1].y, pts[k + 1].z)
      }
    }
    return new Float32Array(lines)
  }, [nodes])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.13
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.09
    }
    if (nodesRef.current) {
      const t = state.clock.elapsedTime
      nodes.forEach((p, i) => {
        dummy.position.copy(p)
        dummy.scale.setScalar(0.045 + Math.sin(t * 1.6 + i * 0.7) * 0.022)
        dummy.updateMatrix()
        nodesRef.current.setMatrixAt(i, dummy.matrix)
      })
      nodesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[RADIUS, 26, 18]} />
        <meshBasicMaterial
          color="#1E5FBB"
          wireframe
          transparent
          opacity={isDark ? 0.26 : 0.18}
          depthWrite={false}
        />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={arcs}
            count={arcs.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={isDark ? 0.34 : 0.24}
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={isDark ? 0.95 : 0.7}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </instancedMesh>
    </group>
  )
}

export default function ProductsGlobe({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
      <Globe isDark={isDark} />
    </SceneCanvas>
  )
}
