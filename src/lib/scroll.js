// Central scroll helper.
//
// Lenis takes over the scroll container, which makes native
// element.scrollIntoView({ behavior: 'smooth' }) fight the Lenis RAF loop —
// the page either jumps or stalls halfway. Every in-page navigation must route
// through here instead.
//
// Falls back to native smooth scrolling when Lenis is not mounted (the admin
// routes, reduced-motion users, or before hydration), so navigation keeps
// working in every case.

let lenisInstance = null

export const setLenis = (instance) => {
  lenisInstance = instance
}

export const getLenis = () => lenisInstance

/**
 * @param target CSS selector, element, or a number offset (0 === top of page)
 */
export const scrollTo = (target, options = {}) => {
  if (typeof window === 'undefined') return

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2, ...options })
    return
  }

  // --- native fallback ---
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export const scrollToTop = () => scrollTo(0)
