'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Lenis smooth scrolling, loaded only when the user hasn't asked for reduced
 * motion. Imported dynamically so the library never reaches the bundle for
 * users who won't use it.
 *
 *   npm i lenis
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    let raf = 0
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let cancelled = false

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      })
      const loop = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [reduce])

  return <>{children}</>
}
