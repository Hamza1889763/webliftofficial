'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Eyebrow from '@/components/atoms/Eyebrow'
import Icon from '@/components/atoms/Icon'

const QUOTES = [
  {
    quote:
      'They pushed back on half of what we asked for, and they were right every time. The site does one job now instead of eight.',
    name: 'Aizaz Ahmad',
    role: 'Founder, Prime Web Solutions',
    metric: 'Bounce rate 61% → 34%',
  },
  {
    quote:
      'We had a Shopify theme held together with apps. They rebuilt the storefront and our checkout stopped losing people.',
    name: 'Hina Qureshi',
    role: 'Head of ecommerce, Saffra',
    metric: 'Checkout completion +27 pts',
  },
  {
    quote:
      'The staging link updated every day. I have never worked with an agency where I could see progress without asking for it.',
    name: 'Omar Sheikh',
    role: 'Operations director, Northbay',
    metric: '14 hours a week returned to ops',
  },
]

/**
 * Testimonials as a single oversized quote with manual advance. One at a time,
 * set large, so it actually gets read — a three-across card row of testimonials
 * is scanned and ignored.
 */
export default function Voices() {
  const [i, setI] = useState(0)
  const q = QUOTES[i]
  const go = (d: number) => setI((v) => (v + d + QUOTES.length) % QUOTES.length)

  return (
    <section id="voices" data-section className="band on-ink overflow-hidden">
      <div className="shell">
        <Eyebrow index="078">In their words</Eyebrow>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="relative min-h-[19rem] md:min-h-[17rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: LIFT }}
              >
                <blockquote className="display text-[clamp(1.5rem,3.3vw,2.6rem)] leading-[1.18] tracking-[-0.02em] text-on-ink">
                  <span className="text-gold">“</span>
                  {q.quote}
                  <span className="text-gold">”</span>
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-on-ink">{q.name}</span>
                  <span aria-hidden className="h-px w-8 bg-white/16" />
                  <span className="mono text-on-ink-mute">{q.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: LIFT }}
                className="card-lift edge-gold p-7"
              >
                <span className="mono text-on-ink-mute">Outcome</span>
                <p className="display mt-3 text-[clamp(1.25rem,2.2vw,1.7rem)] text-gold">
                  {q.metric}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-6">
              {/* Progress ticks, same visual language as the altimeter. */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
                {QUOTES.map((_, k) => (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`Testimonial ${k + 1}`}
                    onClick={() => setI(k)}
                    className={`h-px transition-all duration-500 ease-lift ${
                      k === i ? 'w-10 bg-gold' : 'w-5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 rotate-180 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/14 transition-colors duration-400 hover:text-gold hover:ring-gold/50"
                >
                  <Icon name="arrow" size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/14 transition-colors duration-400 hover:text-gold hover:ring-gold/50"
                >
                  <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
