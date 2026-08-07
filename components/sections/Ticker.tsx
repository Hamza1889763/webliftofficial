'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ROW_A = [
  'Web development',
  'App development',
  'Shopify & ecommerce',
  'Brand identity',
  'Social media',
]
const ROW_B = ['Next.js', 'React Native', 'Shopify', 'Framer', 'Webflow', 'Supabase']

function Row({
  items,
  reverse,
  duration,
  tone,
}: {
  items: string[]
  reverse?: boolean
  duration: number
  tone: 'solid' | 'outline'
}) {
  const reduce = useReducedMotion()
  const doubled = [...items, ...items]

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={reduce ? {} : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span
              className={
                tone === 'solid'
                  ? 'display text-[clamp(1.4rem,3.4vw,2.6rem)] text-ink'
                  : 'display text-[clamp(1.4rem,3.4vw,2.6rem)] text-transparent [-webkit-text-stroke:1px_rgb(4_33_31_/_0.45)]'
              }
            >
              {item}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ink/40" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/**
 * The only place gold is used as a large fill on the entire page — which is what
 * lets it work. It also does structural duty: a hard tonal cut that separates
 * the hero from the body, so the transition between grounds is authored rather
 * than accidental. Two rows travel in opposite directions; the outlined row
 * gives the band depth without adding a second colour.
 */
export default function Ticker() {
  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden bg-gold py-6 md:py-8"
    >
      <div className="flex flex-col gap-1">
        <Row items={ROW_A} duration={34} tone="solid" />
        <Row items={ROW_B} duration={44} reverse tone="outline" />
      </div>
      {/* Feathered edges so words don't clip hard against the viewport. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gold to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gold to-transparent md:w-28" />
    </div>
  )
}
