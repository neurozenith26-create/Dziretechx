import { cn } from '../../utils/cn'

/**
 * Static stand-ins shown wherever a 3D canvas can't run (mobile, reduced-motion,
 * weak device, no WebGL) and while a scene chunk is loading.
 *
 * Deliberately pure CSS rather than screenshot images: they cost zero bytes,
 * need no art pipeline, adapt to light and dark automatically, and can't cause
 * a layout shift because they're absolutely positioned in the same box the
 * canvas would occupy. Colours are the locked brand tokens —
 * brand #1E5FBB, cyan #00D4FF, violet #8B5CF6.
 */

const Base = ({ className, style }) => (
  <div
    aria-hidden="true"
    className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
    style={style}
  />
)

// Hero: deep constellation glow. The existing 2D ParticleField still renders
// underneath this on capable and incapable devices alike, so the hero is never
// visually empty.
export const HeroFallback = () => (
  <Base
    style={{
      background:
        'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(30,95,187,0.28) 0%, transparent 60%),' +
        'radial-gradient(ellipse 45% 40% at 72% 30%, rgba(0,212,255,0.18) 0%, transparent 60%),' +
        'radial-gradient(ellipse 50% 45% at 60% 75%, rgba(139,92,246,0.16) 0%, transparent 65%)',
    }}
  />
)

export const AboutFallback = () => (
  <Base
    className="opacity-70 dark:opacity-100"
    style={{
      background:
        'radial-gradient(ellipse 55% 45% at 20% 30%, rgba(0,212,255,0.10) 0%, transparent 60%),' +
        'radial-gradient(ellipse 50% 45% at 80% 65%, rgba(139,92,246,0.10) 0%, transparent 60%)',
    }}
  />
)

export const ServicesFallback = () => (
  <Base
    className="opacity-60 dark:opacity-100"
    style={{
      background:
        'radial-gradient(ellipse 40% 60% at 15% 20%, rgba(0,212,255,0.08) 0%, transparent 55%),' +
        'radial-gradient(ellipse 40% 60% at 85% 80%, rgba(139,92,246,0.08) 0%, transparent 55%)',
    }}
  />
)

export const ProductsFallback = () => (
  <Base
    className="opacity-70 dark:opacity-100"
    style={{
      background:
        'radial-gradient(circle 38% at 50% 50%, rgba(30,95,187,0.16) 0%, rgba(0,212,255,0.07) 45%, transparent 70%)',
    }}
  />
)

export const WhyUsFallback = () => (
  <Base
    className="opacity-60 dark:opacity-100"
    style={{
      background:
        'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(30,95,187,0.10) 0%, transparent 65%)',
    }}
  />
)

export const ContactFallback = () => (
  <Base
    className="opacity-70 dark:opacity-100"
    style={{
      background:
        'radial-gradient(circle 30% at 70% 40%, rgba(139,92,246,0.12) 0%, transparent 65%)',
    }}
  />
)
