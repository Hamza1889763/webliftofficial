'use client'

import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Icon from '@/components/atoms/Icon'

type Cell = {
  title: string
  body: string
  span: string
  kind?: 'stat' | 'plain' | 'accent'
  stat?: string
  statLabel?: string
}

const CELLS: Cell[] = [
  {
    title: 'Speed is a feature',
    body: 'We budget performance before we design. Median Lighthouse score across our last ten launches, measured on 4G.',
    span: 'md:col-span-5 md:row-span-2',
    kind: 'stat',
    stat: '98',
    statLabel: 'median lighthouse',
  },
  {
    title: 'Built to hand over',
    body: 'Clean component architecture and a written README, so your next developer inherits a project rather than a puzzle.',
    span: 'md:col-span-4',
  },
  {
    title: 'Indexable on day one',
    body: 'Semantic markup, server rendering, structured data and a sitemap — not an SEO plugin bolted on after launch.',
    span: 'md:col-span-3',
  },
  {
    title: 'One person owns your build',
    body: 'You get a named lead with a direct WhatsApp line. No account manager relaying messages between you and the work.',
    span: 'md:col-span-4',
    kind: 'accent',
  },
  {
    title: 'Tested on the real thing',
    body: 'Every build is checked on a mid-range Android over a throttled connection, because that is what most of your visitors are on.',
    span: 'md:col-span-3',
  },
  {
    title: 'Support that ends when you say',
    body: 'Thirty days of fixes included, then a monthly plan you can cancel in one message. Your code and accounts stay yours throughout.',
    span: 'md:col-span-5',
  },
]

/**
 * Bento capability grid. Replaces the original's three separate grids with fake
 * empty spacer columns — one real grid, uneven spans, and a single spotlight
 * cell carrying the animated figure so the boldness lands in one place.
 */
export default function Capability() {
  return (
    <section id="capability" data-section className="band on-ink pt-0">
      <div className="shell">
        <div className="hairline-dark pt-16 md:pt-24">
          <Eyebrow index="052">Why teams pick us</Eyebrow>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Lift
              as="h2"
              by="line"
              text={'The boring parts,\ntaken seriously.'}
              className="display max-w-[18ch] text-s3 text-on-ink"
            />
            <Reveal delay={0.15}>
              <p className="max-w-xs text-on-ink-mute lg:text-right">
                Anyone can make a page look good in a screenshot. These are the
                things you feel six months later.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:auto-rows-[minmax(11rem,auto)]">
          {CELLS.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.07, ease: LIFT }}
              className={`card-lift ${c.kind === 'accent' ? 'edge-gold' : ''} flex flex-col p-7 md:p-8 ${c.span}`}
            >
              {c.kind === 'stat' && (
                <div className="mb-auto">
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: LIFT }}
                    className="display display--narrow block text-[clamp(4rem,9vw,7rem)] leading-[0.85] text-gold"
                  >
                    {c.stat}
                  </motion.span>
                  <span className="mono mt-3 block text-on-ink-mute">{c.statLabel}</span>
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-full bg-gradient-to-r from-gold/50 to-transparent"
                  />
                </div>
              )}

              <div className={c.kind === 'stat' ? 'mt-8' : 'mt-auto'}>
                <h3 className="display text-[clamp(1.15rem,1.9vw,1.5rem)] text-on-ink">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-s-1 leading-relaxed text-on-ink-mute">{c.body}</p>
              </div>

              {c.kind === 'accent' && (
                <span className="mono mt-6 inline-flex items-center gap-2 self-start text-gold">
                  Direct line
                  <Icon name="whatsapp" size={14} />
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
