import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { setLenis } from '../lib/scroll'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useCapability'

/**
 * Smooth scrolling for the marketing page only — the admin routes keep native
 * scrolling so the submissions table and modal behave normally.
 *
 * Two things must be wired up or the rest of the site breaks:
 *  1. lenis.on('scroll', ScrollTrigger.update) — otherwise every ScrollTrigger
 *     reads a stale scroll position and reveals fire at the wrong time.
 *  2. setLenis(...) — so lib/scroll.js can route nav clicks through Lenis
 *     instead of native scrollIntoView, which Lenis would fight.
 */
export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both run on one RAF loop rather than
    // two competing ones.
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(raf)
      setLenis(null)
    }
  }, [reduced])

  // Reduced motion: no smooth-scroll layer at all. lib/scroll.js falls back to
  // native behaviour, so every nav link still works.
  if (reduced) return children

  return (
    <ReactLenis
      root
      ref={lenisRef}
      // autoRaf off because GSAP's ticker drives it above.
      options={{ lerp: 0.1, smoothWheel: true, touchMultiplier: 1.5, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
