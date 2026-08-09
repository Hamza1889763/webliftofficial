'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

import { LIFT } from '@/lib/motion'
import type { Project } from '@/lib/work'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

/** Prose block. Narrow measure, generous leading — this is the one place on the
 *  site where someone is expected to read several paragraphs in a row. */
function Chapter({
  label,
  title,
  paras,
}: {
  label: string
  title: string
  paras: string[]
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
      <div className="md:sticky md:top-28 md:self-start">
        <span className="mono text-bronze">{label}</span>
      </div>
      <div>
        <Lift
          as="h2"
          by="line"
          text={title}
          className="display text-[clamp(1.5rem,3vw,2.1rem)] text-on-mist"
        />
        <div className="mt-5 space-y-5">
          {paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="max-w-[62ch] text-s1 leading-[1.7] text-on-mist-mute">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudyClient({
  project: p,
  next,
}: {
  project: Project
  next: Project
}) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const coverY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <>

      <main>
        {/* ================================================================
            1 — HERO (ink)
            ================================================================ */}
        <section ref={heroRef} className="relative isolate overflow-hidden on-ink">
          <div className="absolute inset-0 -z-10">
            <motion.div className="absolute inset-0" style={{ y: coverY, scale: coverScale }}>
              <Image
                src={p.cover}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={100}
                unoptimized={false}
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-teal/50 mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
          </div>

          <div className="shell pb-14 pt-36 md:pb-20 md:pt-48">
            <Reveal>
              <Link
                href="/work"
                className="mono group inline-flex items-center gap-2.5 text-on-ink-mute transition-colors hover:text-gold"
              >
                <span
                  aria-hidden
                  className="inline-block rotate-180 transition-transform duration-500 ease-lift group-hover:-translate-x-1"
                >
                  <Icon name="arrow" size={14} />
                </span>
                All work
              </Link>
            </Reveal>

            <div className="mt-8">
              <Lift
                as="h1"
                onMount
                by="line"
                delay={0.2}
                text={p.name}
                className="display display--wide text-[clamp(2.6rem,8vw,6.5rem)] text-on-ink"
              />
              <Reveal delay={0.4}>
                <p className="lede mt-6 text-gold">{p.headline}</p>
              </Reveal>
            </div>

            {/* Meta bar — the instrument-panel language, applied to project facts. */}
            <Reveal delay={0.5}>
              <dl className="hairline-dark mt-12 grid grid-cols-2 gap-x-8 gap-y-6 pt-8 md:grid-cols-4">
                {[
                  { k: 'Sector', v: p.sector },
                  { k: 'Location', v: p.location },
                  { k: 'Duration', v: p.duration },
                  { k: 'Year', v: p.year },
                ].map((m) => (
                  <div key={m.k}>
                    <dt className="mono text-on-ink-mute">{m.k}</dt>
                    <dd className="mt-2 text-on-ink">{m.v}</dd>
                  </div>
                ))}
                <div className="col-span-2 md:col-span-4">
                  <dt className="mono text-on-ink-mute">Services</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="mono rounded-full px-3.5 py-2 text-on-ink ring-1 ring-inset ring-white/14"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="mono rounded-full px-3.5 py-2 text-on-ink-mute ring-1 ring-inset ring-white/8"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            2 — RESULTS (mist)
            Placed before the narrative, not after. Someone scanning this page
            wants the outcome first; the story is for whoever stays.
            ================================================================ */}
        <section className="on-mist py-[clamp(3.5rem,8vh,6rem)]">
          <div className="shell">
            <dl className="grid gap-4 md:grid-cols-3">
              {p.results.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.85, delay: i * 0.08, ease: LIFT }}
                  className="card-paper p-7 md:p-8"
                >
                  <dt className="sr-only">{r.label}</dt>
                  <dd>
                    <span className="display display--narrow block text-[clamp(2.2rem,5vw,3.4rem)] leading-none text-bronze">
                      {r.value}
                    </span>
                    <span className="mt-4 block text-on-mist">{r.label}</span>
                    {/* How it was measured. Unsourced metrics read as invented. */}
                    <span className="mono mt-2.5 block text-on-mist-mute">{r.source}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================================================================
            3 — NARRATIVE (mist)
            ================================================================ */}
        <section className="on-mist pb-[clamp(4rem,10vh,8rem)]">
          <div className="shell space-y-16 md:space-y-24">
            <Reveal>
              <p className="display max-w-[24ch] text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.2] text-on-mist">
                {p.brief}
              </p>
            </Reveal>

            <Chapter label="The problem" title="What wasn't working" paras={p.problem} />

            {/* First shot breaks the prose — full bleed within the shell. */}
            {p.shots && p.shots.length > 0 && (
              <Reveal>
                <figure>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-teal">
                    <Image
                      src={p.shots[0].src}
                      alt={p.shots[0].caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 85vw"
                      quality={100}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mono mt-4 text-on-mist-mute">
                    {p.shots[0].caption}
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <Chapter label="The approach" title="What we did" paras={p.approach} />

            {/* Remaining shots, two up. */}
            {p.shots && p.shots.length > 1 && (
              <div className="grid gap-5 md:grid-cols-2">
                {p.shots.slice(1).map((s, i) => (
                  <motion.figure
                    key={s.src}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: LIFT }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-teal">
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        quality={100}
                        className="object-cover transition-transform duration-[1100ms] ease-lift group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="mono mt-4 text-on-mist-mute">{s.caption}</figcaption>
                  </motion.figure>
                ))}
              </div>
            )}

            <Chapter label="The outcome" title="Where it landed" paras={p.outcome} />
          </div>
        </section>

        {/* ================================================================
            4 — QUOTE (ink)
            ================================================================ */}
        {p.quote && (
          <section className="on-ink py-[clamp(4rem,10vh,8rem)]">
            <div className="shell">
              <Reveal>
                <figure className="mx-auto max-w-4xl text-center">
                  <blockquote className="display text-[clamp(1.5rem,3.6vw,2.8rem)] leading-[1.2] text-on-ink">
                    <span className="text-gold">&ldquo;</span>
                    {p.quote.text}
                    <span className="text-gold">&rdquo;</span>
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    <span className="text-on-ink">{p.quote.name}</span>
                    <span aria-hidden className="h-px w-8 bg-white/16" />
                    <span className="mono text-on-ink-mute">{p.quote.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </section>
        )}

        {/* ================================================================
            5 — NEXT PROJECT (ink)
            Ends on forward motion rather than a dead end.
            ================================================================ */}
        <section className="on-ink pb-[clamp(4rem,9vh,7rem)]">
          <div className="shell">
            <Link href={`/work/${next.slug}`} className="group block">
              <div className="hairline-dark flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="mono text-on-ink-mute">Next project</span>
                  <span className="display mt-3 block text-[clamp(2rem,6vw,4rem)] text-on-ink/70 transition-colors duration-500 group-hover:text-on-ink">
                    {next.name}
                  </span>
                  <span className="mt-2 block text-s-1 text-on-ink-mute">{next.headline}</span>
                </div>

                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-teal md:h-32 md:w-56">
                  <Image
                    src={next.cover}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="14rem"
                    quality={100}
                    className="object-cover transition-transform duration-[900ms] ease-lift group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-teal/25 mix-blend-color" />
                </div>
              </div>
            </Link>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/#brief" variant="gold">
                Start a project
              </Button>
              {p.url && (
                <Button href={p.url} variant="outline-light" external>
                  Visit the live site
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

    </>
  )
}