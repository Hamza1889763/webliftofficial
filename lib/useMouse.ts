'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Normalised pointer position (-1..1) relative to a container, spring-smoothed.
 * Stays at zero when the user prefers reduced motion or has no fine pointer,
 * so consumers need no branching of their own.
 */
export function useMouseParallax(strength = 1) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength)
        y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength)
      })
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, strength, x, y])

  return { ref, mx: sx, my: sy }
}
