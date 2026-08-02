import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { setLenis } from '../lib/scroll'
import { ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useCapability'
import { useTheme } from '../context/ThemeContext'

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
  const { theme } = useTheme()

  // Every ScrollTrigger caches element offsets. Anything that changes layout
  // height after those are measured leaves triggers firing at the wrong scroll
  // position, so recompute on the three things that actually move the page.
  useEffect(() => {
    // 1. Web fonts swapping in reflows every text block.
    let cancelled = false
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh()
      })
    }

    // 2. Late-loading images (all marketing images are lazy).
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // 3. Theme toggle: colour transitions and the light/dark variants can change
  //    rendered heights. Deferred past the 300ms CSS transition in index.css.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => clearTimeout(id)
  }, [theme])

  useEffect(() => {
    if (reduced) return

    // Lenis runs its own RAF (autoRaf default). Driving it from gsap.ticker
    // instead saves one loop, but couples scrolling to this effect succeeding:
    // lenisRef.current is null on the first mount, the effect bailed early, the
    // ticker was never attached, and with autoRaf disabled Lenis never stepped
    // — the page could not be scrolled at all. Never make scrolling depend on
    // an effect landing in the right order.
    let cancelled = false
    let frame

    const attach = () => {
      if (cancelled) return
      const lenis = lenisRef.current?.lenis
      if (!lenis) {
        // Ref not populated yet — try again next frame rather than giving up.
        frame = requestAnimationFrame(attach)
        return
      }
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.refresh()
    }

    attach()

    return () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
      const lenis = lenisRef.current?.lenis
      if (lenis) lenis.off('scroll', ScrollTrigger.update)
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
      // autoRaf left ON deliberately: Lenis must be able to scroll the page on
      // its own, independent of any effect wiring up correctly.
      // lerp 0.1 trails the wheel far enough behind the cursor that it reads as
      // input lag rather than smoothing. 0.16 still glides but tracks input.
      // Touch is left native (syncTouch off) — hijacking it on phones is the
      // classic cause of "the page feels stuck".
      options={{
        lerp: 0.16,
        smoothWheel: true,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
