import { Component } from 'react'

/**
 * Decorative 3D must never be able to take the page down.
 *
 * WebGL context creation can fail for reasons entirely outside our control:
 * the browser refusing another context, a driver reset, a GPU process crash,
 * or a lost context under memory pressure. three.js throws in those cases, and
 * without a boundary that throw unmounts the whole React tree — the site goes
 * blank while scrolling.
 *
 * Catching here degrades a failed scene to its static fallback and leaves the
 * rest of the page untouched.
 */
export class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // Not fatal, but worth surfacing in dev so a real bug isn't hidden.
    if (import.meta.env.DEV) {
      console.warn('[3D] scene failed, falling back to static:', error)
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}

export default ThreeErrorBoundary
