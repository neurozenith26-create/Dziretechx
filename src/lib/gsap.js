// Single place where GSAP plugins are registered. Importing from anywhere else
// risks double-registration or a component using ScrollTrigger before it exists.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Guarded so the prerender pass (which has no DOM) doesn't touch window.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export { gsap, ScrollTrigger, useGSAP }
