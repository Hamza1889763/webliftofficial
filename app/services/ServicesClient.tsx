'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import { SERVICES } from '@/lib/services'
import Nav from '@/components/chrome/Nav'
import Footer from '@/components/sections/Footer'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Magnetic from '@/components/atoms/Magnetic'

// ---------------------------------------------------------------------------
// Unsplash hero + per-service imagery
// ---------------------------------------------------------------------------

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80'

const SERVICE_IMAGES: Record<string, string> = {
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
  commerce:
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80',
  brand:
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80',
  social:
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80',
}

function resolveServiceImage(service: (typeof SERVICES)[number]): string {
  return SERVICE_IMAGES[service.id] ?? service.image
}

export default function ServicesClient() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = SERVICES[active]

  useEffect(() => {
    const id = window.location.hash.slice(1)
    const i = SERVICES.findIndex((s) => s.id === id)
    if (i >= 0) setActive(i)
  }, [])

  const select = useCallback((i: number) => {
    setActive(i)
    window.history.replaceState(null, '', `#${SERVICES[i].id}`)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }
    const step = map[e.key]
    if (step) {
      e.preventDefault()
      const next = (active + step + SERVICES.length) % SERVICES.length
      select(next)
      tabs.current[next]?.focus()
    }
    if (e.key === 'Home') {
      e.preventDefault()
      select(0)
      tabs.current[0]?.focus()
    }
    if (e.key === 'End') {
      e.preventDefault()
      select(SERVICES.length - 1)
      tabs.current[SERVICES.length - 1]?.focus()
    }
  }

  const waLink = `${SITE.whatsapp}?text=${encodeURIComponent(
    `Hi WebLifts — I'd like to talk about ${current.title.toLowerCase()}.`
  )}`

  return (
    <>
      <Nav />

      <main>
        {/* ================================================================
            0 — FULL-BLEED HERO IMAGE
            h-screen so it fills the viewport; glow centred on the copy.
            ================================================================ */}
        <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="WebLifts — studio workspace"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Ink overlay */}
          <div className="absolute inset-0 bg-ink/70" />

          {/* Gold glow — centred on copy, not stuck to top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
            style={{
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.28) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />

          {/* Centred copy */}
          <div className="shell relative z-10 flex h-full flex-col items-center justify-center text-center">
            <Lift
              as="p"
              onMount
              by="word"
              stagger={0.06}
              delay={0.1}
              text="What we do"
              className="mono text-gold"
            />
            <Lift
              as="h1"
              onMount
              by="line"
              delay={0.2}
              text={'Five services.\nEvery scope\npublished.'}
              className="display display--wide mt-4 max-w-[14ch] text-[clamp(2.6rem,7.5vw,6rem)] text-on-ink"
            />
            <Reveal delay={0.45}>
              <p className="lede mx-auto mt-6 max-w-xl text-on-ink-mute">
                Each engagement is scoped in writing before we start — including a list
                of what it does <em className="not-italic text-on-ink">not</em> cover.
              </p>
            </Reveal>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </section>

        {/* ================================================================
            1 — INDEX (ink)
            ================================================================ */}
        <section className="relative isolate overflow-hidden on-ink pb-16 pt-20 md:pb-24 md:pt-28">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.18) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />

          <div className="shell">
            <Eyebrow index="/ services">What we do</Eyebrow>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <Lift
                as="h2"
                onMount
                by="line"
                delay={0.15}
                text={'Five services.\nEvery scope\npublished.'}
                className="display display--wide max-w-[14ch] text-[clamp(2.6rem,7.5vw,6rem)] text-on-ink"
              />
              <Reveal delay={0.35}>
                <p className="lede text-on-ink-mute">
                  Each one is scoped in writing before we start, including a list of
                  what it does <em className="not-italic text-on-ink">not</em> cover.
                  You will never get an invoice you did not see coming.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 md:mt-20">
              <ul className="hairline-dark">
                {SERVICES.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.06, ease: LIFT }}
                    className="border-b border-white/8"
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={() => select(i)}
                      className="group flex items-baseline gap-4 py-4 md:gap-8 md:py-5"
                    >
                      <span className="mono shrink-0 text-gold">{s.index}</span>
                      <span className="display flex-1 text-[clamp(1.1rem,2.6vw,1.75rem)] text-on-ink/70 transition-colors duration-400 group-hover:text-on-ink">
                        {s.title}
                      </span>
                      <span className="mono hidden shrink-0 text-on-ink-mute sm:block">
                        {s.timeline}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-500 ease-lift group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <Icon name="arrow" size={16} />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================================================================
            2 — EXPLORER (mist)
            ================================================================ */}
        <section className="band on-mist overflow-hidden">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {/* Media + meta panel */}
              <Reveal className="order-2 lg:order-1">
                <div className="lg:sticky lg:top-28">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-ink">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={current.id}
                        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.05 }}
                        animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: LIFT }}
                        className="absolute inset-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resolveServiceImage(current)}
                          alt=""
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-teal/45 mix-blend-color" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                      <span className="mono text-on-ink">
                        <span className="text-gold">{current.index}</span>
                        <span className="text-on-ink-mute"> / 05</span>
                      </span>
                      <span className="mono rounded-full bg-ink/50 px-3.5 py-2 text-on-ink backdrop-blur-md">
                        {current.timeline}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <span className="mono text-on-ink-mute">Built with</span>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {current.stack.map((t, i) => (
                          <motion.li
                            key={t}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.2 + i * 0.05, ease: LIFT }}
                            className="mono rounded-full px-3.5 py-2 text-on-ink ring-1 ring-inset ring-white/18 backdrop-blur-sm"
                          >
                            {t}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-end gap-4 rounded-2xl bg-on-mist/[0.04] px-6 py-5 ring-1 ring-inset ring-on-mist/8">
                    <Button href="#talk" variant="outline-dark" magnetic={false}>
                      Get a quote
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Tablist */}
              <div className="order-1 lg:order-2">
                <div
                  role="tablist"
                  aria-label="Services"
                  aria-orientation="vertical"
                  onKeyDown={onKeyDown}
                  className="hairline-light"
                >
                  {SERVICES.map((s, i) => {
                    const on = active === i
                    return (
                      <div key={s.id} id={s.id} className="scroll-mt-28 border-b border-on-mist/10">
                        <button
                          ref={(el) => { tabs.current[i] = el }}
                          role="tab"
                          id={`tab-${s.id}`}
                          aria-selected={on}
                          aria-controls={`panel-${s.id}`}
                          tabIndex={on ? 0 : -1}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => select(i)}
                          className="group flex w-full items-start gap-5 py-6 text-left md:gap-7 md:py-7"
                        >
                          <span
                            className={`mono mt-2 shrink-0 transition-colors duration-400 ${
                              on ? 'text-bronze' : 'text-on-mist/30'
                            }`}
                          >
                            {s.index}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-3">
                              <Icon
                                name={s.icon}
                                size={20}
                                className={`shrink-0 transition-all duration-500 ease-lift ${
                                  on
                                    ? 'text-bronze opacity-100'
                                    : '-translate-x-1 text-on-mist/40 opacity-0'
                                }`}
                              />
                              <span
                                className={`display text-[clamp(1.5rem,3.4vw,2.15rem)] transition-colors duration-400 ${
                                  on ? 'text-on-mist' : 'text-on-mist/45'
                                }`}
                              >
                                {s.title}
                              </span>
                            </span>
                            <span
                              className={`mt-1.5 block text-s-1 transition-colors duration-400 ${
                                on ? 'text-bronze' : 'text-on-mist/40'
                              }`}
                            >
                              {s.problem}
                            </span>
                          </span>

                          <span
                            aria-hidden
                            className={`mt-2 shrink-0 transition-all duration-500 ease-lift ${
                              on ? 'rotate-90 text-bronze' : 'text-on-mist/20'
                            }`}
                          >
                            <Icon name="arrow" size={18} />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              role="tabpanel"
                              id={`panel-${s.id}`}
                              aria-labelledby={`tab-${s.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: LIFT }}
                              className="overflow-hidden"
                            >
                              <div className="pb-8 pl-0 md:pl-12">
                                <p className="max-w-xl text-s-1 leading-relaxed text-on-mist-mute">
                                  {s.detail}
                                </p>

                                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                                  <div>
                                    <h3 className="mono text-bronze">In scope</h3>
                                    <ul className="mt-3.5 space-y-2.5">
                                      {s.includes.map((line) => (
                                        <li
                                          key={line}
                                          className="flex gap-3 text-s-1 leading-relaxed text-on-mist-mute"
                                        >
                                          <span
                                            aria-hidden
                                            className="mt-[0.6em] h-px w-3 shrink-0 bg-bronze"
                                          />
                                          {line}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="rounded-2xl bg-on-mist/[0.04] p-5 ring-1 ring-inset ring-on-mist/8">
                                    <h3 className="mono text-on-mist-mute">Not included</h3>
                                    <ul className="mt-3.5 space-y-2.5">
                                      {s.excludes.map((line) => (
                                        <li
                                          key={line}
                                          className="flex gap-3 text-s-1 leading-relaxed text-on-mist/45"
                                        >
                                          <span
                                            aria-hidden
                                            className="mt-[0.55em] h-2.5 w-2.5 shrink-0 rotate-45 border-b border-l border-on-mist/25"
                                          />
                                          {line}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <p className="mono mt-6 inline-flex items-center gap-2 rounded-full bg-on-mist/[0.04] px-4 py-2.5 text-on-mist-mute ring-1 ring-inset ring-on-mist/8">
                                  <span className="text-bronze">Best for</span>
                                  {s.bestFor}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            3 — SCOPE TABLE (ink)
            ================================================================ */}
        <section className="band on-ink">
          <div className="shell">
            <Eyebrow index="/ compare">Side by side</Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'All five,\non one screen.'}
              className="display max-w-[15ch] text-s3 text-on-ink"
            />

            <Reveal delay={0.1}>
              <div className="no-bar mt-12 overflow-x-auto md:mt-16">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <caption className="sr-only">
                    WebLifts services compared by timeline and fit
                  </caption>
                  <thead>
                    <tr className="border-b border-white/12">
                      {['Service', 'Best for', 'Timeline'].map((h) => (
                        <th key={h} scope="col" className="mono py-4 pr-6 text-on-ink-mute">
                          {h}
                        </th>
                      ))}
                      <th scope="col" className="sr-only">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES.map((s, i) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: LIFT }}
                        className="group border-b border-white/8 transition-colors duration-400 hover:bg-white/[0.03]"
                      >
                        <th scope="row" className="py-5 pr-6 align-top font-normal">
                          <span className="flex items-center gap-3">
                            <Icon name={s.icon} size={18} className="shrink-0 text-gold" />
                            <span className="display text-lg text-on-ink">{s.title}</span>
                          </span>
                        </th>
                        <td className="py-5 pr-6 align-top text-s-1 text-on-ink-mute">
                          {s.bestFor}
                        </td>
                        <td className="mono py-5 pr-6 align-top text-on-ink-mute">
                          {s.timeline}
                        </td>
                        <td className="py-5 align-top text-right">
                          <a
                            href={`#${s.id}`}
                            onClick={() => select(i)}
                            className="mono inline-flex items-center gap-2 text-on-ink-mute transition-colors duration-300 hover:text-gold"
                          >
                            Scope
                            <span
                              aria-hidden
                              className="transition-transform duration-500 ease-lift group-hover:translate-x-1"
                            >
                              <Icon name="arrow" size={14} />
                            </span>
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            4 — HOW SCOPING WORKS (mist)
            ================================================================ */}
        <section className="band on-mist">
          <div className="shell">
            <Eyebrow index="/ terms" tone="light">
              How scoping works
            </Eyebrow>

            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <Lift
                as="h2"
                by="line"
                text={'The rules,\nbefore you ask.'}
                className="display max-w-[13ch] text-s2 text-on-mist"
              />

              <dl className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    t: 'The quote is fixed',
                    d: 'The figure in your proposal is the figure you pay. It changes only if you add something outside the written scope, and then only after you approve the new number in writing.',
                  },
                  {
                    t: 'Two revision rounds per phase',
                    d: 'Structure, design and build each get two rounds. A third is billed hourly — not to punish you, but because unlimited revisions are how projects quietly double in cost.',
                  },
                  {
                    t: 'Payment in three parts',
                    d: '40% to reserve the slot, 40% when the build starts, 20% on launch. Overseas clients pay by bank transfer, Wise or Payoneer, with the rate fixed at proposal date.',
                  },
                  {
                    t: 'You own everything',
                    d: 'Code, designs, domain, hosting and analytics are in your name from day one. If you leave, nothing has to be handed back because it was never ours.',
                  },
                ].map((r, i) => (
                  <motion.div
                    key={r.t}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: LIFT }}
                    className="card-paper p-7"
                  >
                    <dt className="display text-[clamp(1.05rem,1.8vw,1.3rem)] text-on-mist">
                      {r.t}
                    </dt>
                    <dd className="mt-2.5 text-s-1 leading-relaxed text-on-mist-mute">{r.d}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ================================================================
            5 — CTA (ink)
            ================================================================ */}
        <section id="talk" className="relative isolate overflow-hidden on-ink scroll-mt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.2) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />

          <div className="shell py-[clamp(5rem,11vh,9rem)] text-center">
            <Eyebrow index="/ next">Next step</Eyebrow>
            <div className="flex flex-col items-center">
              <Lift
                as="h2"
                by="word"
                stagger={0.07}
                text="Tell us what's broken."
                className="display display--wide max-w-[18ch] text-[clamp(2.2rem,6.5vw,5rem)] text-on-ink"
              />
              <Reveal delay={0.2}>
                <p className="lede mx-auto mt-7 text-on-ink-mute">
                  Describe the problem rather than the service. We&rsquo;ll tell you which
                  of the five you need — including when the answer is none of them.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Magnetic>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-ink transition-shadow duration-500 ease-lift hover:shadow-[0_20px_48px_-16px_rgb(247_198_61_/_0.65)]"
                    >
                      <Icon name="whatsapp" size={18} />
                      <span className="mono">
                        Ask about {current.title.toLowerCase()}
                      </span>
                    </a>
                  </Magnetic>
                  <Button href="/#brief" variant="outline-light">
                    Send a full brief
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="mono mt-8 text-on-ink-mute">
                  Replies within the hour, 9am–9pm PKT
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}