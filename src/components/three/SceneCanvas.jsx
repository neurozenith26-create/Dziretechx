import { useEffect, useId, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { cn } from '../../utils/cn'
import { registerScene, updateSceneDistance } from './contextRegistry'

/**
 * Shared wrapper for every 3D canvas on the site. Enforces the rules in one
 * place rather than trusting each scene to remember them:
 *
 *  - transparent background, layered behind DOM content
 *  - pointer-events-none unless the scene is explicitly interactive
 *  - dpr capped at 1.5 so retina doesn't quadruple the fill cost
 *  - aria-hidden: decorative, must never reach a screen reader
 *  - AT MOST ONE live WebGL context across the whole page, arbitrated by
 *    contextRegistry. Mounting all six at once exceeded the browser's context
 *    budget and crashed the page mid-scroll.
 *  - frameloop="never" whenever the section is off-screen, so even the one
 *    live context costs nothing while it isn't visible.
 */
export const SceneCanvas = ({
  children,
  className,
  camera = { position: [0, 0, 6], fov: 50 },
  interactive = false,
  rootMargin = '200px',
}) => {
  const wrapRef = useRef(null)
  const id = useId()
  const [inView, setInView] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // Claim/release the single context slot based on distance to viewport centre.
  useEffect(() => {
    const unregister = registerScene(id, setIsActive)
    return unregister
  }, [id])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const measure = () => {
      const r = el.getBoundingClientRect()
      const viewportCentre = window.innerHeight / 2
      const elementCentre = r.top + r.height / 2
      updateSceneDistance(id, Math.abs(elementCentre - viewportCentre))
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) measure()
        else updateSceneDistance(id, Infinity)
      },
      { rootMargin }
    )
    io.observe(el)

    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const visible = r.bottom > -200 && r.top < window.innerHeight + 200
      if (visible) measure()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [id, rootMargin])

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
      {isActive && (
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, 1.5]}
          camera={camera}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            // Let the browser reclaim this context under memory pressure
            // instead of failing the next one outright.
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: 'transparent' }}
        >
          {children}
        </Canvas>
      )}
    </div>
  )
}

export default SceneCanvas
