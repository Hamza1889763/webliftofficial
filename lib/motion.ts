import type { Transition, Variants } from 'framer-motion'

/**
 * One easing curve for the entire site. Every reveal, hover and transition
 * uses LIFT so the whole page reads as a single coordinated motion system
 * rather than a collection of unrelated effects.
 */
export const LIFT = [0.16, 1, 0.3, 1] as const
export const SWIFT = [0.4, 0, 0.2, 1] as const

export const tLift = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: LIFT,
})

/** Masked upward lift — the site's signature reveal. */
export const liftIn: Variants = {
  hidden: { y: '108%' },
  shown: { y: '0%' },
}

/** For blocks that can't be masked (media, cards). */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34 },
  shown: { opacity: 1, y: 0 },
}

/** Parent that staggers children. Pair with liftIn or riseIn. */
export const stagger = (each = 0.075, delayChildren = 0): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: each, delayChildren } },
})

/** Shared viewport config so every section triggers at the same threshold. */
export const inView = { once: true, amount: 0.25 } as const
