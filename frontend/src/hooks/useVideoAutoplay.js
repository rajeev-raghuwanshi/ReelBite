import { useEffect } from 'react'

// Hook attaches an IntersectionObserver to videos inside the provided containerRef.
// When a video is >= 60% visible, it will play (muted). Otherwise it will pause.
export default function useVideoAutoplay(containerRef, options = {}) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const videos = () => Array.from(container.querySelectorAll('video.reel-video'))

    const playIfVisible = (entries) => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.intersectionRatio >= 0.6) {
          // try to play; ignore promise
          const p = video.play()
          if (p && typeof p.then === 'function') p.catch(() => {/* autoplay blocked */})
        } else {
          try { video.pause() } catch (e) {}
        }
      })
    }

    const observer = new IntersectionObserver(playIfVisible, {
      threshold: [0.25, 0.5, 0.6, 0.75]
    })

    // observe existing videos
    videos().forEach(v => observer.observe(v))

    // watch for dynamically added videos
    const mo = new MutationObserver(() => {
      videos().forEach(v => {
        if (!v._observed) {
          observer.observe(v)
          v._observed = true
        }
      })
    })
    mo.observe(container, { childList: true, subtree: true })

    // cleanup
    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [containerRef, options])
}
