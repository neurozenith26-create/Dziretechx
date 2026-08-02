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

    // rAF-throttled. Calling getBoundingClientRect directly in a scroll handler
    // forces a synchronous layout on every scroll event, and with several
    // scenes mounted that layout thrash was a major source of scroll jank.
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        measure()
      })
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
          // 1.5 -> 1.25 is a ~30% cut in fragments shaded per frame. These are
          // soft wireframes and additive points, so the difference is not
          // visible, but it buys real headroom while scrolling.
          dpr={[1, 1.25]}
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
