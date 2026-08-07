'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'

type Props = {
  /** Plain text. Split by line for masked reveal; words for character-ish feel. */
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  /** 'line' masks whole lines; 'word' masks each word (use for short headings). */
  by?: 'line' | 'word'
  delay?: number
  stagger?: number
  /** Animate on mount rather than on scroll — for the hero only. */
  onMount?: boolean
}

/**
 * The site's signature text reveal: type rises out of a hard mask edge.
 * Accessible by construction — the full string stays in one element for
 * screen readers via aria-label, and the visual fragments are aria-hidden.
 */
const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const

export default function Lift({
  text,
  as = 'span',
  className = '',
  by = 'line',
  delay = 0,
  stagger = 0.09,
  onMount = false,
}: Props) {
  const Tag = TAGS[as]
  const reduce = useReducedMotion()
  const parts = useMemo(
    () => (by === 'line' ? text.split('\n') : text.split(' ')),
    [text, by]
  )

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...(onMount
        ? { animate: 'shown' }
        : { whileInView: 'shown', viewport: { once: true, amount: 0.4 } })}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          aria-hidden
          className={by === 'line' ? 'lift-mask' : 'lift-mask inline-block'}
        >
          <motion.span
            className="block will-change-transform"
            variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
            transition={{ duration: 1.05, ease: LIFT }}
          >
            {part}
            {by === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
