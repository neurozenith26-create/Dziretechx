import { useEffect, useRef, useState } from 'react'

/**
 * True while the element is on (or near) screen.
 *
 * The site runs a lot of purely decorative infinite animations — floating orbs,
 * orbital rings, the team orbit, CTA particles, footer shapes. framer-motion
 * keeps every one of them ticking whether or not the section is visible, and
 * each tick writes inline styles, which is why style recalculation measured
 * ~1.3s across a 3s scroll regardless of what else was disabled.
 *
 * Gating those loops on visibility means only the section you are actually
 * looking at costs anything.
 */
export const useNearViewport = (options = {}) => {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      // No observer support: keep animations on rather than freezing the design.
      setNear(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: options.rootMargin ?? '150px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [options.rootMargin])

  return [ref, near]
}

export default useNearViewport
