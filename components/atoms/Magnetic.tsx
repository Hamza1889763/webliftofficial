'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic wrapper: the child drifts toward the cursor within its own bounds.
 * Kept subtle (18% of offset) so it reads as weight rather than a gimmick.
 */
export default function Magnetic({
  children,
  pull = 0.18,
  className = '',
}: {
  children: React.ReactNode
  pull?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * pull)
    y.set((e.clientY - (r.top + r.height / 2)) * pull)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}
