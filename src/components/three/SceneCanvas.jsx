import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { cn } from '../../utils/cn'

/**
 * Shared wrapper for every 3D canvas on the site. Enforces the rules in one
 * place rather than trusting each scene to remember them:
 *
 *  - transparent background, layered behind DOM content
 *  - pointer-events-none unless the scene is explicitly interactive
 *  - dpr capped at 1.5 so retina doesn't quadruple the fill cost
 *  - frameloop="never" whenever the section is off-screen, so an idle canvas
 *    costs nothing instead of burning a RAF loop for the whole page
 *  - aria-hidden: these are decorative and must never reach a screen reader
 */
export const SceneCanvas = ({
  children,
  className,
  camera = { position: [0, 0, 6], fov: 50 },
  interactive = false,
  rootMargin = '150px',
}) => {
  const wrapRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 overflow-hidden',
        !interactive && 'pointer-events-none',
        className
      )}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={camera}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          // Nothing here needs the depth buffer read back or a stencil pass.
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        {children}
      </Canvas>
    </div>
  )
}

export default SceneCanvas
