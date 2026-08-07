'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'

/**
 * Scroll reveal for blocks that can't be text-masked. Deliberately limited to
 * a single direction (up) plus opacity — the ascent concept means nothing on
 * this site slides sideways.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 34,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  distance?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: LIFT }}
    >
      {children}
    </motion.div>
  )
}
