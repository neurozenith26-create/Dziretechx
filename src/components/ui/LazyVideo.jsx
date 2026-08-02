import { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

/**
 * Video that shows a poster immediately and only fetches the media once it is
 * near the viewport AND the page has finished loading.
 *
 * An <video autoplay> with a src attribute is fetched eagerly by every browser
 * regardless of preload="none". On mobile that pulled 1.6 MB into the critical
 * path and was the single largest payload on the page. Holding the src back
 * until after window load keeps the poster on screen — same first frame, so
 * nothing looks different — while the bytes move off the critical path.
 */
export const LazyVideo = ({ src, poster, className, wrapperClassName, style }) => {
  const wrapRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let io
    const arm = () => {
      if (typeof IntersectionObserver === 'undefined') {
        setShouldLoad(true)
        return
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            io.disconnect()
          }
        },
        { rootMargin: '200px' }
      )
      io.observe(el)
    }

    // Wait for load so the video never competes with LCP resources.
    if (document.readyState === 'complete') {
      arm()
    } else {
      window.addEventListener('load', arm, { once: true })
    }

    return () => {
      io?.disconnect()
      window.removeEventListener('load', arm)
    }
  }, [])

  return (
    <div ref={wrapRef} className={cn('relative', wrapperClassName)} style={style}>
      {shouldLoad ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={className}
        />
      ) : (
        <img src={poster} alt="" aria-hidden="true" className={className} />
      )}
    </div>
  )
}

export default LazyVideo
