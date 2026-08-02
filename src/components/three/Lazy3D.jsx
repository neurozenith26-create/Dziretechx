import { Suspense } from 'react'
import { useCapability } from '../../hooks/useCapability'

/**
 * Gate + lazy boundary for every 3D scene.
 *
 * When the device can't handle WebGL — small screen, reduced-motion, weak CPU,
 * no GL context — the children are never rendered, so React.lazy never fires
 * and three.js is never downloaded. That is what keeps the 3D chunk off mobile
 * entirely rather than merely hidden.
 *
 * `fallback` renders in both the "can't do 3D" and "still loading" cases, so
 * the box is always filled and nothing shifts.
 */
export const Lazy3D = ({ children, fallback = null }) => {
  const { canRender3D } = useCapability()

  if (!canRender3D) return fallback

  return <Suspense fallback={fallback}>{children}</Suspense>
}

export default Lazy3D
