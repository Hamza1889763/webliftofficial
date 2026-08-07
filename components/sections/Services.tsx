'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Icon, { type IconName } from '@/components/atoms/Icon'

type Service = {
  id: string
  index: string
  title: string
  summary: string
  deliverables: string[]
  from: string
  icon: IconName
  video: string
  poster: string
}

/** Real scope and a starting price per service — the original listed neither,
 *  which is the single biggest reason agency service sections don't convert. */
const SERVICES: Service[] = [
  {
    id: 'web',
    index: '01',
    title: 'Web development',
    summary:
      'Marketing sites and web apps built in Next.js. Fast on a mid-range Android, indexable on day one.',
    deliverables: ['Design system', 'Next.js build', 'CMS', 'Analytics + SEO setup'],
    from: 'PKR 180k',
    icon: 'code',
    video: '/webdev.mp4',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85',
  },
  {
    id: 'app',
    index: '02',
    title: 'App development',
    summary:
      'Cross-platform apps in React Native, shipped to both stores with the release pipeline set up for your team.',
    deliverables: ['Product flows', 'iOS + Android build', 'Store submission', 'Crash reporting'],
    from: 'PKR 420k',
    icon: 'device',
    video: '/appdev.mp4',
    poster: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=85',
  },
  {
    id: 'commerce',
    index: '03',
    title: 'Shopify & ecommerce',
    summary:
      'Custom Shopify themes and checkout work, tuned against your own funnel data rather than a template demo.',
    deliverables: ['Custom theme', 'Product data', 'Payments + shipping', 'Conversion review'],
    from: 'PKR 240k',
    icon: 'cart',
    video: '/shopify.mp4',
    poster: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85',
  },
  {
    id: 'brand',
    index: '04',
    title: 'Brand identity',
    summary:
      'Wordmark, type, colour and the rules for using them — delivered as a kit your team can actually apply.',
    deliverables: ['Logo suite', 'Type + colour system', 'Guidelines', 'Social templates'],
    from: 'PKR 150k',
    icon: 'mark',
    video: '/branding.mp4',
    poster: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85',
  },
  {
    id: 'social',
    index: '05',
    title: 'Social media',
    summary:
      'Monthly content built around one measurable goal, with reporting you can read in two minutes.',
    deliverables: ['Content calendar', 'Design + copy', 'Scheduling', 'Monthly report'],
    from: 'PKR 90k / mo',
    icon: 'signal',
    video: '/socialmedia.mp4',
    poster: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85',
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const current = SERVICES[active]

  return (
    <section id="services" data-section className="band on-mist overflow-hidden">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="020" tone="light">
              What we do
            </Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'Five things,\ndone properly.'}
              className="display max-w-[16ch] text-s3 text-on-mist"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-on-mist-mute lg:text-right">
              Each engagement is scoped and priced before we start. No retainers you
              can&rsquo;t exit.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ---- Media panel. Asymmetric: sticky on desktop so the list scrolls
                  past a fixed frame, which keeps the video in play. ---- */}
          <Reveal className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-ink lg:aspect-[5/6]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current.id}
                    initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.06 }}
                    animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: LIFT }}
                    className="absolute inset-0"
                  >
                    <video
                      key={current.video}
                      className="h-full w-full object-cover"
                      src={current.video}
                      poster={current.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-teal/40 mix-blend-color" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Frame furniture: index counter and starting price. Reads as an
                    instrument panel, which is the same language as the altimeter. */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="mono text-on-ink">
                    <span className="text-gold">{current.index}</span>
                    <span className="text-on-ink-mute"> / 05</span>
                  </span>
                  <span className="mono rounded-full bg-ink/45 px-3.5 py-2 text-on-ink backdrop-blur-md">
                    from {current.from}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <ul className="flex flex-wrap gap-2">
                    {current.deliverables.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18 + i * 0.06, ease: LIFT }}
                        className="mono rounded-full px-3.5 py-2 text-on-ink ring-1 ring-inset ring-white/18 backdrop-blur-sm"
                      >
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Index list ---- */}
          <div className="order-1 lg:order-2">
            <ul className="hairline-light">
              {SERVICES.map((s, i) => {
                const on = active === i
                return (
                  <li key={s.id} className="border-b border-on-mist/10">
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-expanded={on}
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

                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: LIFT }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-3 block max-w-md text-s-1 leading-relaxed text-on-mist-mute">
                                {s.summary}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>

                      <span
                        aria-hidden
                        className={`mt-2 shrink-0 transition-all duration-500 ease-lift ${
                          on ? 'translate-x-1 text-bronze' : 'text-on-mist/20'
                        }`}
                      >
                        <Icon name="arrow" size={18} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <Reveal delay={0.1}>
              <p className="mt-8 text-s-1 text-on-mist-mute">
                Not sure which one you need?{' '}
                <a
                  href="#brief"
                  className="text-on-mist underline decoration-bronze/40 decoration-1 underline-offset-4 transition-colors hover:decoration-bronze"
                >
                  Send us the problem instead
                </a>{' '}
                and we&rsquo;ll tell you.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}