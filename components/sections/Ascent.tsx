'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'

/**
 * Numbering is justified here and only here: this genuinely is a sequence, and
 * the week range is information the reader needs. Elsewhere on the site the
 * indices come from the altimeter's real page positions.
 */
const STEPS = [
  {
    week: 'Week 0',
    title: 'Scope call',
    body: 'Forty-five minutes on what the site has to achieve and what it must not break. You leave with a fixed price and a date.',
    you: 'Your goals, brand assets, access',
  },
  {
    week: 'Week 1',
    title: 'Structure',
    body: 'Sitemap, page flows and copy direction agreed in writing before a single screen is designed. Cheapest place to change your mind.',
    you: 'One round of feedback',
  },
  {
    week: 'Weeks 2–3',
    title: 'Design',
    body: 'Two key screens first, then the rest once the direction is signed off. Reviewed in the browser, not as flat images.',
    you: 'Sign-off on direction',
  },
  {
    week: 'Weeks 4–5',
    title: 'Build',
    body: 'Components, content, integrations. You get a staging link on day one of this phase and it updates as we go.',
    you: 'Content, if not written by us',
  },
  {
    week: 'Week 6',
    title: 'Launch',
    body: 'Performance and accessibility pass, redirects, analytics, then go live. Thirty days of fixes start the day it ships.',
    you: 'Final approval',
  },
]

export default function Ascent() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 72%', 'end 55%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 26 })
  const glowY = useTransform(fill, [0, 1], ['0%', '100%'])

  return (
    <section id="ascent" data-section className="band on-mist overflow-hidden">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="066" tone="light">
              How it runs
            </Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'Six weeks,\nstep by step.'}
              className="display max-w-[15ch] text-s3 text-on-mist"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-on-mist-mute lg:text-right">
              You always know what phase we&rsquo;re in and what we need from you next.
            </p>
          </Reveal>
        </div>

        {/* Ascent track. The line fills as you scroll — the same gesture as the
            altimeter, applied to time instead of page depth. */}
        <div ref={track} className="relative mt-16 md:mt-24">
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-0 w-px bg-on-mist/12 md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-bronze via-gold to-bronze"
              style={{ scaleY: fill }}
            />
            <motion.span
              className="absolute -left-[3px] h-2 w-[7px] rounded-full bg-bronze shadow-[0_0_14px_2px_rgb(184_135_26_/_0.5)]"
              style={{ top: glowY, translateY: '-50%' }}
            />
          </div>

          <ol className="space-y-12 md:space-y-0">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.85, ease: LIFT }}
                  className={`relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
                    i > 0 ? 'md:-mt-8' : ''
                  }`}
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-mist ring-1 ring-on-mist/15 md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-bronze" />
                  </span>

                  <div
                    className={
                      right
                        ? 'md:col-start-2 md:pl-4 md:pt-24'
                        : 'md:col-start-1 md:pr-4 md:text-right'
                    }
                  >
                    <span className="mono text-bronze">{s.week}</span>
                    <h3 className="display mt-3 text-[clamp(1.5rem,3vw,2.2rem)] text-on-mist">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-s-1 leading-relaxed text-on-mist-mute ${
                        right ? '' : 'md:ml-auto'
                      }`}
                    >
                      {s.body}
                    </p>
                    <p
                      className={`mono mt-4 inline-flex gap-2 rounded-full bg-on-mist/[0.04] px-3.5 py-2 text-on-mist-mute ring-1 ring-inset ring-on-mist/8`}
                    >
                      <span className="text-bronze">You:</span> {s.you}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
