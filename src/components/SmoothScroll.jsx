import { useEffect } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { useTheme } from '../context/ThemeContext'

/**
 * Native scrolling. No smooth-scroll library.
 *
 * Lenis was measured costing ~440ms of extra scripting and ~330ms of extra
 * long-task time across a 3s scroll, and — more importantly — interpolated
 * scrolling never tracks the wheel 1:1, which is exactly what "laggy" feels
 * like. The browser's own scrolling is GPU-driven, has zero input latency and
 * cannot be beaten for responsiveness.
 *
 * Nothing else needed changing: lib/scroll.js already falls back to native
 * scrollIntoView when no Lenis instance is registered, so all seven nav
 * anchors, the footer columns, both hero CTAs and scroll-to-top keep working.
 *
 * This component stays because the ScrollTrigger refresh hooks below still
 * matter — triggers cache element offsets and go stale when layout height
 * changes.
 */
export const SmoothScroll = ({ children }) => {
  const { theme } = useTheme()

  useEffect(() => {
    let cancelled = false

    // Web fonts swapping in reflows every text block.
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh()
      })
    }

    // Late-loading images — all marketing images are lazy.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Theme toggle can change rendered heights; deferred past the 300ms colour
  // transition in index.css.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => clearTimeout(id)
  }, [theme])

  return children
}

export default SmoothScroll
