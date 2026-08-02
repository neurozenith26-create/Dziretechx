import { useEffect, useState } from 'react'

// Single gate every 3D component must pass through. Returns false during SSR and
// on the first client paint, so nothing WebGL-related can run before we know the
// device can handle it. Components render their static fallback until this flips.
const detect = () => {
  if (typeof window === 'undefined') return false

  // Respect the OS-level motion preference above everything else.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  if (window.innerWidth <= 768) return false

  // navigator.hardwareConcurrency is undefined on some browsers; treat unknown
  // as "not enough" rather than gambling on a weak device.
  if ((navigator.hardwareConcurrency || 0) <= 4) return false

  // Actually confirm a WebGL context can be created — feature detection alone
  // lies on machines with blocklisted drivers.
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    if (!gl) return false
    // Release it immediately; browsers cap simultaneous contexts.
    const lose = gl.getExtension('WEBGL_lose_context')
    if (lose) lose.loseContext()
    return true
  } catch {
    return false
  }
}

export const useCapability = () => {
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    const update = () => setCanRender3D(detect())
    update()

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      motionQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { canRender3D }
}

// Convenience for non-3D motion: reveals still run on mobile, just shorter.
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(q.matches)
    update()
    q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])

  return reduced
}

export default useCapability
