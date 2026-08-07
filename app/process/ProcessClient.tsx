'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { LIFT } from '@/lib/motion'
import { PHASES, WEEKS, RISKS, IMAGES, type Owner } from '@/lib/process'
import Nav from '@/components/chrome/Nav'
import Footer from '@/components/sections/Footer'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

/** Ownership drives colour. Gold = your task, so your obligations are the most
 *  visually prominent thing on the chart. That's deliberate. */
const OWNER_BAR: Record<Owner, string> = {
  studio: 'bg-teal-lift ring-1 ring-inset ring-white/12',
  client: 'bg-gold',
  shared: 'bg-teal-lift ring-1 ring-inset ring-gold/45',
}

const OWNER_TEXT: Record<Owner, string> = {
  studio: 'text-on-ink',
  client: 'text-ink',
  shared: 'text-on-ink',
}

const OWNER_LABEL: Record<Owner, string> = {
  studio: 'We do this',
  client: 'You do this',
  shared: 'Together',
}

/**
 * The site's standard photographic treatment: teal duotone over the image, then
 * an ink gradient weighted to whichever edge carries text. Applied identically
 * everywhere so photography from different sources still reads as one set.
 */
function Graded({
  src,
  alt = '',
  priority,
  sizes,
  className = '',
  gradient = 'bottom',
}: {
  src: string
  alt?: string
  priority?: boolean
  sizes: string
  className?: string
  gradient?: 'bottom' | 'full' | 'left'
}) {
  const grad = {
    bottom: 'bg-gradient-to-t from-ink via-ink/45 to-transparent',
    full: 'bg-gradient-to-t from-ink via-ink/82 to-ink/60',
    left: 'bg-gradient-to-r from-ink via-ink/40 to-transparent',
  }[gradient]

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-teal/50 mix-blend-color" />
      <div aria-hidden className={`absolute inset-0 ${grad}`} />
    </div>
  )
}

export default function ProcessClient() {
  const [active, setActive] = useState<string>('scope')
  const header = useRef<HTMLElement>(null)
  const current = PHASES.find((p) => p.id === active) ?? PHASES[0]

  // Slow parallax on the header photograph, matching the homepage hero.
  const { scrollYProgress } = useScroll({
    target: header,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (PHASES.some((p) => p.id === id)) setActive(id)
  }, [])

  const select = useCallback((id: string) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  return (
    <>
      <Nav />

      <main>
        {/* ================================================================
            1 — HEADER (ink) — photographic, heavily graded
            ================================================================ */}
        <section
          ref={header}
          className="relative isolate overflow-hidden on-ink pb-12 pt-36 md:pb-16 md:pt-44"
        >
          <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
            <Graded src={IMAGES.header} sizes="100vw" priority gradient="full" />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.2) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />

          <div className="shell">
            <Eyebrow index="/ process">How it runs</Eyebrow>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
              <Lift
                as="h1"
                onMount
                by="line"
                delay={0.15}
                text={'Six weeks.\nNothing\nimprovised.'}
                className="display display--wide max-w-[13ch] text-[clamp(2.6rem,7.5vw,6rem)] text-on-ink"
              />
              <Reveal delay={0.35}>
                <p className="lede text-on-ink-mute">
                  You will always know which phase we are in and what we need from you
                  next. The tasks in gold below are yours — they are on the schedule
                  because that is where projects actually slip.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            2 — SCHEDULE GRID (ink)  ← the signature. No photography here:
            the chart is the thing worth looking at.
            ================================================================ */}
        <section className="on-ink pb-[clamp(4rem,10vh,8rem)]">
          <div className="shell">
            {/* Legend */}
            <Reveal>
              <div className="hairline-dark flex flex-wrap items-center gap-x-7 gap-y-3 py-6">
                <span className="mono text-on-ink-mute">Schedule</span>
                {(['studio', 'client', 'shared'] as Owner[]).map((o) => (
                  <span key={o} className="mono flex items-center gap-2.5 text-on-ink-mute">
                    <span aria-hidden className={`h-3 w-6 rounded-full ${OWNER_BAR[o]}`} />
                    {OWNER_LABEL[o]}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* ---- Desktop chart ---- */}
            <div className="mt-8 hidden md:block">
              <div
                className="grid items-end gap-x-2 pb-3"
                style={{ gridTemplateColumns: `11rem repeat(${WEEKS.length}, minmax(0, 1fr))` }}
              >
                <span className="mono text-on-ink-mute">Phase</span>
                {WEEKS.map((w) => (
                  <span key={w} className="mono text-center text-on-ink-mute">
                    {w}
                  </span>
                ))}
              </div>

              <div className="relative border-t border-white/10">
                {/* Column rules, drawn once behind every row. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 grid gap-x-2"
                  style={{ gridTemplateColumns: `11rem repeat(${WEEKS.length}, minmax(0, 1fr))` }}
                >
                  <span />
                  {WEEKS.map((w) => (
                    <span key={w} className="border-l border-white/[0.06]" />
                  ))}
                </div>

                {PHASES.map((p, i) => {
                  const on = active === p.id
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.7, delay: i * 0.07, ease: LIFT }}
                      className="relative grid items-center gap-x-2 border-b border-white/8"
                      style={{
                        gridTemplateColumns: `11rem repeat(${WEEKS.length}, minmax(0, 1fr))`,
                      }}
                    >
                      <button
                        onClick={() => select(p.id)}
                        aria-pressed={on}
                        className="py-3.5 pr-4 text-left"
                      >
                        <span
                          className={`block truncate text-s-1 transition-colors duration-400 ${
                            on ? 'text-gold' : 'text-on-ink/65 hover:text-on-ink'
                          }`}
                        >
                          {p.title}
                        </span>
                      </button>

                      {/* Bar. +2 because column 1 is the label. Inline gridColumn
                          because Tailwind can't see `col-start-${n}`. */}
                      <button
                        onClick={() => select(p.id)}
                        aria-label={`${p.title}, ${p.week}, ${OWNER_LABEL[p.owner]}`}
                        className="group my-2.5 flex items-center"
                        style={{ gridColumn: `${p.start + 2} / ${p.end + 3}` }}
                      >
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease: LIFT }}
                          className={`flex h-9 w-full origin-left items-center rounded-full px-4 transition-all duration-500 ease-lift ${
                            OWNER_BAR[p.owner]
                          } ${on ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                        >
                          <span className={`mono truncate ${OWNER_TEXT[p.owner]}`}>{p.week}</span>
                        </motion.span>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* ---- Mobile: same data as rows. A Gantt at 380px is unreadable,
                   so it doesn't try. ---- */}
            <ul className="mt-8 md:hidden">
              {PHASES.map((p) => {
                const on = active === p.id
                return (
                  <li key={p.id} className="border-b border-white/8">
                    <button
                      onClick={() => select(p.id)}
                      aria-pressed={on}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span
                        aria-hidden
                        className={`h-8 w-1.5 shrink-0 rounded-full ${OWNER_BAR[p.owner]}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-s-1 transition-colors ${
                            on ? 'text-gold' : 'text-on-ink/75'
                          }`}
                        >
                          {p.title}
                        </span>
                        <span className="mono mt-1 block text-on-ink-mute">
                          {p.week} — {OWNER_LABEL[p.owner]}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 transition-transform duration-400 ${
                          on ? 'rotate-90 text-gold' : 'text-on-ink-mute'
                        }`}
                      >
                        <Icon name="arrow" size={16} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* ---- Selected phase detail — now split image / text.
                   The photograph swaps with the panel, which makes selecting a
                   phase feel like arriving somewhere. ---- */}
            <div className="mt-10 scroll-mt-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: LIFT }}
                  className="card-lift edge-gold overflow-hidden"
                >
                  <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Media */}
                    <div className="relative min-h-[16rem] lg:min-h-[26rem]">
                      <motion.div
                        key={`img-${current.id}`}
                        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.06 }}
                        animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                        transition={{ duration: 0.85, ease: LIFT }}
                        className="absolute inset-0"
                      >
                        <Graded
                          src={IMAGES.phase[current.id]}
                          alt={current.alt}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          gradient="bottom"
                        />
                      </motion.div>

                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                        <span className="mono text-gold">{current.week}</span>
                        <span className="mono rounded-full bg-ink/50 px-3.5 py-2 text-on-ink backdrop-blur-md">
                          {OWNER_LABEL[current.owner]}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
                        <h2 className="display text-[clamp(1.6rem,5vw,2.2rem)] text-on-ink">
                          {current.title}
                        </h2>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="p-7 md:p-10">
                      <h2 className="display hidden text-[clamp(1.6rem,3.4vw,2.4rem)] text-on-ink lg:block">
                        {current.title}
                      </h2>
                      <p className="max-w-[62ch] text-s1 leading-[1.7] text-on-ink-mute lg:mt-4">
                        {current.detail}
                      </p>

                      <div className="mt-9 grid gap-8 sm:grid-cols-2">
                        <div>
                          <h3 className="mono text-gold">What we need from you</h3>
                          <ul className="mt-4 space-y-2.5">
                            {current.from.map((line) => (
                              <li
                                key={line}
                                className="flex gap-3 text-s-1 leading-relaxed text-on-ink-mute"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.6em] h-px w-3 shrink-0 bg-gold"
                                />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="mono text-on-ink-mute">What you end up with</h3>
                          <ul className="mt-4 space-y-2.5">
                            {current.gives.map((line) => (
                              <li
                                key={line}
                                className="flex gap-3 text-s-1 leading-relaxed text-on-ink-mute"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.55em] h-2.5 w-2.5 shrink-0 rotate-45 border-b border-l border-white/30"
                                />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ================================================================
            3 — RESPONSIBILITY SPLIT (mist) — no imagery, text-dense by design
            ================================================================ */}
        <section className="band on-mist">
          <div className="shell">
            <Eyebrow index="/ split" tone="light">
              Who does what
            </Eyebrow>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <Lift
                as="h2"
                by="line"
                text={'Two lists,\nno overlap.'}
                className="display max-w-[13ch] text-s3 text-on-mist"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Reveal>
                  <div className="card-paper h-full p-7">
                    <h3 className="mono text-bronze">Ours</h3>
                    <ul className="mt-5 space-y-3">
                      {[
                        'Every deadline on the chart above',
                        'Design, build, testing and deployment',
                        'Hosting and domain setup in your name',
                        'Performance and accessibility passes',
                        'Redirects from every old URL',
                        'Thirty days of fixes after launch',
                      ].map((l) => (
                        <li
                          key={l}
                          className="flex gap-3 text-s-1 leading-relaxed text-on-mist-mute"
                        >
                          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-bronze" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="card-paper h-full p-7">
                    <h3 className="mono text-on-mist-mute">Yours</h3>
                    <ul className="mt-5 space-y-3">
                      {[
                        'One named approver who can decide',
                        'Feedback within three working days per round',
                        'Copy and photography, per the week-1 checklist',
                        'Access to third-party accounts we integrate',
                        'Someone with DNS access on the launch call',
                        'Payment at each of the three milestones',
                      ].map((l) => (
                        <li
                          key={l}
                          className="flex gap-3 text-s-1 leading-relaxed text-on-mist-mute"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.6em] h-px w-3 shrink-0 bg-on-mist/25"
                          />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            4 — WHAT GOES WRONG (ink) — no imagery, four dense cards
            ================================================================ */}
        <section className="band on-ink">
          <div className="shell">
            <Eyebrow index="/ risk">What slows projects down</Eyebrow>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <Lift
                as="h2"
                by="line"
                text={'Four ways this\ngoes late.'}
                className="display max-w-[15ch] text-s3 text-on-ink"
              />
              <Reveal delay={0.15}>
                <p className="max-w-xs text-on-ink-mute lg:text-right">
                  Every one of these has happened to us. Here is what we changed so it
                  happens less.
                </p>
              </Reveal>
            </div>

            <dl className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
              {RISKS.map((r, i) => (
                <motion.div
                  key={r.cause}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.85, delay: (i % 2) * 0.08, ease: LIFT }}
                  className="card-lift flex flex-col p-7 md:p-8"
                >
                  <dt>
                    <span className="mono text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="display mt-3 block text-[clamp(1.15rem,2vw,1.5rem)] text-on-ink">
                      {r.cause}
                    </span>
                  </dt>
                  <dd className="mt-3 flex flex-1 flex-col">
                    <p className="text-s-1 leading-relaxed text-on-ink-mute">{r.effect}</p>
                    <p className="mt-5 border-t border-white/10 pt-5 text-s-1 leading-relaxed text-on-ink-mute">
                      <span className="mono mr-2 text-gold">Our fix</span>
                      {r.fix}
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================================================================
            5 — CTA (ink, photographic) — closes on the same note it opened
            ================================================================ */}
        <section className="relative isolate overflow-hidden on-ink">
          <Graded
            src={IMAGES.cta}
            sizes="100vw"
            gradient="full"
            className="-z-10"
          />

          <div className="shell py-[clamp(5rem,11vh,9rem)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <Eyebrow index="/ next">Week zero</Eyebrow>
                <Lift
                  as="h2"
                  by="line"
                  text={'It starts with\none call.'}
                  className="display display--wide max-w-[14ch] text-s3 text-on-ink"
                />
              </div>
              <Reveal delay={0.15}>
                <div className="lg:text-right">
                  <p className="max-w-sm text-on-ink-mute lg:ml-auto">
                    Forty-five minutes, no deck, no obligation. You leave with a written
                    scope and a fixed price whether or not you go ahead.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3 lg:justify-end">
                    <Button href="/#brief" variant="gold">
                      Book the scope call
                    </Button>
                    <Button href="/services" variant="outline-light">
                      See services
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}