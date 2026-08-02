// Hard cap on simultaneous WebGL contexts.
//
// Six section canvases mounting as the user scrolls exceeded what the browser
// would grant, and three.js throws on failure:
//   "A WebGL context could not be created. Reason: Web page caused context loss
//    and was blocked"
// which unmounted the whole React tree and blanked the page mid-scroll.
//
// Only one scene may hold a context at a time — the one nearest the viewport
// centre. Everyone else shows their static fallback, which is visually almost
// identical since the scenes are low-opacity ambient decoration anyway.

const MAX_CONTEXTS = 1

const candidates = new Map() // id -> { distance, notify }
let activeIds = new Set()

const recompute = () => {
  const ranked = [...candidates.entries()]
    .filter(([, c]) => c.distance !== Infinity)
    .sort((a, b) => a[1].distance - b[1].distance)
    .slice(0, MAX_CONTEXTS)
    .map(([id]) => id)

  const next = new Set(ranked)

  const changed =
    next.size !== activeIds.size || [...next].some((id) => !activeIds.has(id))
  if (!changed) return

  const previous = activeIds
  activeIds = next

  candidates.forEach((c, id) => {
    const wasActive = previous.has(id)
    const isActive = next.has(id)
    if (wasActive !== isActive) c.notify(isActive)
  })
}

export const registerScene = (id, notify) => {
  candidates.set(id, { distance: Infinity, notify })
  return () => {
    candidates.delete(id)
    activeIds.delete(id)
    recompute()
  }
}

/** distance: px from viewport centre, or Infinity when off-screen. */
export const updateSceneDistance = (id, distance) => {
  const entry = candidates.get(id)
  if (!entry || entry.distance === distance) return
  entry.distance = distance
  recompute()
}
