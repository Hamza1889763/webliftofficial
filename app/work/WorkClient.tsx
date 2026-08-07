'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

import { LIFT } from '@/lib/motion'
import Nav from '@/components/chrome/Nav'
import Footer from '@/components/sections/Footer'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

// ---------------------------------------------------------------------------
// Unsplash hero
// ---------------------------------------------------------------------------

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80'

// ---------------------------------------------------------------------------
// Per-project Unsplash covers
// ---------------------------------------------------------------------------
const PROJECT_COVERS: Record<string, string> = {
  sipz: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
  'mr-holdings':
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
  'moose-on-the-run':
    'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=900&q=80',
  smartbite:
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df5?auto=format&fit=crop&w=900&q=80',
}

function cover(slug: string, fallback: string): string {
  return PROJECT_COVERS[slug] ?? fallback
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
const WORK_PROJECTS = [
  {
    slug: 'sipz',
    name: 'Sipz with a Twist',
    headline: 'Full UI/UX redesign from dark crimson to rose-red white',
    sector: 'Beverage / Lifestyle',
    year: '2024',
    services: ['UI/UX', 'Flutter'],
    cover: cover('sipz', '/work/sipz/cover.jpg'),
  },
  {
    slug: 'mr-holdings',
    name: 'MR Holdings',
    headline: 'Luxury real estate platform with property search and CMS',
    sector: 'Real Estate',
    year: '2024',
    services: ['Web Development', 'CMS'],
    cover: cover('mr-holdings', '/work/mr-holdings/cover.jpg'),
  },
  {
    slug: 'moose-on-the-run',
    name: 'Moose on the Run',
    headline: '24/7 convenience store site with menu navigation and Sipz banner',
    sector: 'F&B / Retail',
    year: '2024',
    services: ['Web Development', 'UI/UX'],
    cover: cover('moose-on-the-run', '/work/moose-on-the-run/cover.jpg'),
  },
  {
    slug: 'smartbite',
    name: 'SmartBite',
    headline: 'Food-tech ordering platform with real-time menu management',
    sector: 'Food Tech',
    year: '2024',
    services: ['Web Development', 'UI/UX'],
    cover: cover('smartbite', '/work/smartbite/cover.jpg'),
  },
]

const ALL_PROJECT_SERVICES = [
  ...new Set(WORK_PROJECTS.flatMap((p) => p.services)),
]

// ---------------------------------------------------------------------------
// Cursor-following preview
// ---------------------------------------------------------------------------
function Preview({ src, visible }: { src: string | null; visible: boolean }) {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {visible && src && (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: LIFT }}
            className="relative -ml-[11rem] -mt-[7rem] h-[14rem] w-[22rem] overflow-hidden rounded-2xl bg-teal shadow-[0_40px_80px_-30px_rgb(0_0_0_/_0.7)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-teal/25 mix-blend-color" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function WorkClient() {
  const [filter, setFilter] = useState<string>('All')
  const [hovered, setHovered] = useState<string | null>(null)

  const shown = useMemo(
    () =>
      filter === 'All'
        ? WORK_PROJECTS
        : WORK_PROJECTS.filter((p) => p.services.includes(filter)),
    [filter]
  )

  const previewSrc = WORK_PROJECTS.find((p) => p.slug === hovered)?.cover ?? null

  return (
    <>
      <Nav />
      <Preview src={previewSrc} visible={Boolean(hovered)} />

      <main>
        {/* ================================================================
            0 — FULL-BLEED HERO
            Single occurrence — no duplicate header below this.
            ================================================================ */}
        <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="WebLifts work showcase"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-ink/72" />

          {/* Gold glow — centred on the copy, not the top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
            style={{
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.28) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />

          {/* Copy */}
          <div className="shell relative z-10 flex h-full flex-col items-center justify-center text-center">
            <Lift
              as="p"
              onMount
              by="word"
              stagger={0.06}
              delay={0.1}
              text="Selected projects"
              className="mono text-gold"
            />
            <Lift
              as="h1"
              onMount
              by="line"
              delay={0.2}
              text={'What changed\nafter we\nshipped.'}
              className="display display--wide mt-4 max-w-[13ch] text-[clamp(2.6rem,7.5vw,6rem)] text-on-ink"
            />
            <Reveal delay={0.45}>
              <p className="lede mx-auto mt-6 max-w-xl text-on-ink-mute">
                Every project below carries the number it moved and how that
                number was measured. Where we don&rsquo;t have a figure we
                haven&rsquo;t invented one.
              </p>
            </Reveal>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </section>

        {/* ================================================================
            1 — LEDGER (ink)
            ================================================================ */}
        <section className="on-ink pb-[clamp(4rem,10vh,8rem)] pt-12">
          <div className="shell">
            {/* Filters */}
            <Reveal>
              <div className="hairline-dark flex flex-wrap items-center gap-2 py-6">
                <span className="mono mr-2 text-on-ink-mute">Filter</span>
                {['All', ...ALL_PROJECT_SERVICES].map((s) => {
                  const on = filter === s
                  return (
                    <button
                      key={s}
                      onClick={() => setFilter(s)}
                      aria-pressed={on}
                      className={`mono rounded-full px-4 py-2.5 transition-all duration-400 ease-lift ${
                        on
                          ? 'bg-gold text-ink'
                          : 'text-on-ink-mute ring-1 ring-inset ring-white/12 hover:text-on-ink hover:ring-white/25'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
                <span className="mono ml-auto text-on-ink-mute">
                  {shown.length} {shown.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
            </Reveal>

            {/* Rows */}
            <ul onMouseLeave={() => setHovered(null)}>
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: LIFT }}
                    onMouseEnter={() => setHovered(p.slug)}
                    className="border-b border-white/8"
                  >
                    <Link
                      href={`/work/${p.slug}`}
                      className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-6 md:grid-cols-[3rem_1.6fr_1fr_auto_auto] md:gap-x-8 md:py-8"
                    >
                      <span className="mono self-start text-gold md:self-center">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span className="display block text-[clamp(1.4rem,3.6vw,2.5rem)] leading-tight text-on-ink/75 transition-colors duration-400 group-hover:text-on-ink">
                          {p.name}
                        </span>
                        <span className="mt-1.5 block text-s-1 text-on-ink-mute md:hidden">
                          {p.headline}
                        </span>
                      </span>

                      {/* Touch thumbnail */}
                      <span className="col-span-2 mt-1 block overflow-hidden rounded-xl lg:hidden">
                        <span className="relative block aspect-[16/9]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.cover}
                            alt=""
                            loading={i < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 block bg-teal/25 mix-blend-color" />
                        </span>
                      </span>

                      <span className="hidden text-s-1 text-on-ink-mute md:block">
                        {p.headline}
                      </span>

                      <span className="mono hidden whitespace-nowrap text-on-ink-mute lg:block">
                        {p.sector}
                      </span>

                      <span className="mono hidden text-on-ink-mute md:block">{p.year}</span>

                      <span
                        aria-hidden
                        className="hidden shrink-0 -translate-x-2 text-gold opacity-0 transition-all duration-500 ease-lift group-hover:translate-x-0 group-hover:opacity-100 md:block"
                      >
                        <Icon name="arrow" size={18} />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {shown.length === 0 && (
              <p className="py-16 text-center text-on-ink-mute">
                Nothing under that filter yet.{' '}
                <button
                  onClick={() => setFilter('All')}
                  className="text-gold underline underline-offset-4"
                >
                  Show everything
                </button>
              </p>
            )}
          </div>
        </section>

        {/* ================================================================
            2 — CTA (mist)
            ================================================================ */}
        <section className="band on-mist">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <Eyebrow index="/ next" tone="light">
                  Your turn
                </Eyebrow>
                <Lift
                  as="h2"
                  by="line"
                  text={'Same process,\nyour numbers.'}
                  className="display max-w-[14ch] text-s3 text-on-mist"
                />
              </div>
              <Reveal delay={0.15}>
                <div className="lg:text-right">
                  <p className="max-w-sm text-on-mist-mute lg:ml-auto">
                    Tell us which number matters most and we&rsquo;ll tell you
                    whether we can move it.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3 lg:justify-end">
                    <Button href="/#brief" variant="gold">
                      Start a project
                    </Button>
                    <Button href="/services" variant="outline-dark">
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