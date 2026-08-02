import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/useCapability'
import { cn } from '../../utils/cn'

/**
 * Scroll-triggered reveal for headings, paragraphs, cards and images.
 *
 * The hidden state is applied by GSAP (gsap.from), never by CSS. If JS fails,
 * reduced-motion is set, or a ScrollTrigger never fires, the content is already
 * visible in the DOM — nothing can be left stranded at opacity 0.
 *
 * Direct children are the animation targets, so wrapping a list staggers it.
 */
export const Reveal = ({
  children,
  as: Tag = 'div',
  className,
  stagger = 0.15,
  duration = 0.8,
  delay = 0,
  y,
  start = 'top 75%',
  ...props
}) => {
  const scope = useRef(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      // Reduced motion: leave the DOM exactly as rendered — fully visible.
      if (reduced) return

      const el = scope.current
      if (!el) return

      const targets = el.children.length ? Array.from(el.children) : [el]
      if (!targets.length) return

      // Shorter, quicker travel on small screens.
      const isMobile = window.innerWidth < 768
      const distance = y ?? (isMobile ? 30 : 80)

      gsap.from(targets, {
        y: distance,
        opacity: 0,
        duration: isMobile ? duration * 0.75 : duration,
        delay,
        stagger,
        ease: 'power2.out',
        // Guarantees the final state is committed even if the tween is
        // interrupted (e.g. by a ScrollTrigger.refresh mid-flight).
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    },
    { scope, dependencies: [reduced] }
  )

  return (
    <Tag ref={scope} className={cn(className)} {...props}>
      {children}
    </Tag>
  )
}

export default Reveal
