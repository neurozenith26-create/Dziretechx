import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SceneCanvas } from '../SceneCanvas'
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsap'

// Locked brand tokens.
const CYAN = new THREE.Color('#00D4FF')
const VIOLET = new THREE.Color('#8B5CF6')
const BRAND = new THREE.Color('#1E5FBB')

// Tuned down from 150/320/14. The link buffer is static, but every extra line
// is still per-frame vertex work on top of Lenis and ScrollTrigger; this reads
// the same on screen and leaves noticeably more headroom while scrolling.
const NODE_COUNT = 95
const MAX_LINK_DIST = 2.7
const MAX_LINKS = 140
const PULSE_COUNT = 8

// Deterministic scatter — a fixed seed keeps the layout identical between
// reloads and avoids Math.random() drifting the composition every visit.
const rand = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildGraph() {
  const positions = new Float32Array(NODE_COUNT * 3)
  const colors = new Float32Array(NODE_COUNT * 3)
  const sizes = new Float32Array(NODE_COUNT)
  const nodes = []

  for (let i = 0; i < NODE_COUNT; i++) {
    // Wide and shallow: the constellation spans the hero rather than sitting
    // in a ball in the middle. Z gives the depth layering.
    const x = (rand(i, 1) - 0.5) * 16
    const y = (rand(i, 2) - 0.5) * 9
    const z = (rand(i, 3) - 0.5) * 7

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    nodes.push(new THREE.Vector3(x, y, z))

    // Mix cyan -> violet by depth so the two accents read as layers.
    const t = rand(i, 4)
    const c = CYAN.clone().lerp(VIOLET, t)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    sizes[i] = 0.04 + rand(i, 5) * 0.07
  }

  // Link near neighbours, capped so the line count can't explode.
  const linkPos = []
  const linkCol = []
  const pairs = []
  outer: for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodes[i].distanceTo(nodes[j]) > MAX_LINK_DIST) continue
      linkPos.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      linkCol.push(BRAND.r, BRAND.g, BRAND.b, CYAN.r, CYAN.g, CYAN.b)
      pairs.push([i, j])
      if (pairs.length >= MAX_LINKS) break outer
    }
  }

  return {
    positions,
    colors,
    sizes,
    nodes,
    linkPositions: new Float32Array(linkPos),
    linkColors: new Float32Array(linkCol),
    pairs,
  }
}

function Constellation({ isDark }) {
  const group = useRef(null)
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const pulsesRef = useRef(null)

  // Scroll progress through the hero, written by ScrollTrigger and read in
  // useFrame. Kept in a ref so scroll updates never trigger a React render.
  const progress = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  const graph = useMemo(() => buildGraph(), [])

  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, (_, i) => ({
        pair: graph.pairs[Math.floor(rand(i, 9) * graph.pairs.length)] ?? [0, 1],
        offset: rand(i, 10),
        speed: 0.16 + rand(i, 11) * 0.22,
      })),
    [graph]
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useGSAP(() => {
    const hero = document.querySelector('#hero')
    if (!hero) return

    // The single scrub on the page. Drives Z drift + fade as the hero exits.
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })

    return () => st.kill()
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = progress.current

    // Past ~92% of the hero exit the scene is essentially invisible. Skipping
    // the per-frame work there means the constellation stops costing anything
    // for the rest of the page instead of animating behind an opacity of 0.02.
    if (p > 0.92) {
      if (group.current) group.current.visible = false
      return
    }
    if (group.current) group.current.visible = true

    if (group.current) {
      // Mouse parallax, eased. Kept small so it reads as depth, not wobble.
      const px = state.pointer.x
      const py = state.pointer.y
      pointer.current.x += (px - pointer.current.x) * Math.min(1, delta * 2.5)
      pointer.current.y += (py - pointer.current.y) * Math.min(1, delta * 2.5)

      group.current.rotation.y = pointer.current.x * 0.22 + t * 0.015
      group.current.rotation.x = -pointer.current.y * 0.14

      // Scroll-linked: drift back in Z as the hero leaves.
      group.current.position.z = -p * 9
    }

    const fade = 1 - p

    if (pointsRef.current) {
      pointsRef.current.material.opacity = (isDark ? 0.95 : 0.75) * fade
    }
    if (linesRef.current) {
      linesRef.current.material.opacity = (isDark ? 0.22 : 0.16) * fade
    }

    // Travelling pulses along the links.
    if (pulsesRef.current) {
      pulses.forEach((pulse, i) => {
        const [a, b] = pulse.pair
        const from = graph.nodes[a]
        const to = graph.nodes[b]
        const k = (pulse.offset + t * pulse.speed) % 1
        dummy.position.lerpVectors(from, to, k)
        const s = (0.055 + Math.sin(k * Math.PI) * 0.05) * fade
        dummy.scale.setScalar(Math.max(s, 0.0001))
        dummy.updateMatrix()
        pulsesRef.current.setMatrixAt(i, dummy.matrix)
      })
      pulsesRef.current.instanceMatrix.needsUpdate = true
      pulsesRef.current.material.opacity = fade
    }
  })

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={graph.positions}
            count={NODE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={graph.colors}
            count={NODE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          size={0.11}
          sizeAttenuation
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={graph.linkPositions}
            count={graph.linkPositions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={graph.linkColors}
            count={graph.linkColors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} />
      </lineSegments>

      <instancedMesh ref={pulsesRef} args={[undefined, undefined, PULSE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </instancedMesh>
    </group>
  )
}

export default function HeroConstellation({ isDark = true }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 9], fov: 55 }}>
      <Constellation isDark={isDark} />
    </SceneCanvas>
  )
}
