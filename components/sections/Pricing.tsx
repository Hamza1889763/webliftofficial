'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'

type Currency = 'PKR' | 'USD'

const TIERS = [
  {
    name: 'Launch',
    for: 'One clear offer, live fast',
    price: { PKR: '180,000', USD: '650' },
    weeks: '3 weeks',
    includes: [
      'Up to 5 pages',
      'Custom design, no template',
      'CMS for your own edits',
      'Analytics + technical SEO',
      '30 days of fixes',
    ],
  },
  {
    name: 'Studio',
    for: 'Growing companies with a real funnel',
    price: { PKR: '420,000', USD: '1,500' },
    weeks: '6 weeks',
    featured: true,
    includes: [
      'Up to 14 pages',
      'Design system + component library',
      'Copy direction included',
      'Integrations (CRM, payments, booking)',
      '90 days of fixes',
      'Named lead on WhatsApp',
    ],
  },
  {
    name: 'Platform',
    for: 'Products, portals and stores',
    price: { PKR: 'From 900,000', USD: 'From 3,200' },
    weeks: '10 weeks+',
    includes: [
      'Web app or custom ecommerce',
      'Accounts, roles, dashboards',
      'API and third-party work',
      'Load and accessibility testing',
      'Handover docs + team walkthrough',
    ],
  },
]

/**
 * Published prices in both currencies — the studio quotes in PKR locally and
 * USD for Gulf clients, so the toggle reflects how the business actually works
 * rather than being a decorative control.
 */
export default function Pricing() {
  const [cur, setCur] = useState<Currency>('PKR')

  return (
    <section id="pricing" data-section className="band on-mist">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="086" tone="light">
              Engagements
            </Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'Prices, in\npublic.'}
              className="display max-w-[14ch] text-s3 text-on-mist"
            />
          </div>

          <Reveal delay={0.12}>
            <div
              role="group"
              aria-label="Currency"
              className="inline-flex rounded-full bg-on-mist/[0.05] p-1 ring-1 ring-inset ring-on-mist/10"
            >
              {(['PKR', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCur(c)}
                  aria-pressed={cur === c}
                  className={`mono relative rounded-full px-5 py-2.5 transition-colors duration-400 ${
                    cur === c ? 'text-paper' : 'text-on-mist-mute hover:text-on-mist'
                  }`}
                >
                  {cur === c && (
                    <motion.span
                      layoutId="cur"
                      transition={{ duration: 0.45, ease: LIFT }}
                      className="absolute inset-0 rounded-full bg-on-mist"
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3 lg:items-start">
          {TIERS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: LIFT }}
              className={
                t.featured
                  ? 'card-lift edge-gold relative flex flex-col p-8 md:p-10 lg:-mt-6'
                  : 'card-paper flex flex-col p-8 md:p-10'
              }
            >
              {t.featured && (
                <span className="mono absolute right-8 top-8 text-gold">Most chosen</span>
              )}

              <h3
                className={`display text-[clamp(1.4rem,2.4vw,1.85rem)] ${
                  t.featured ? 'text-on-ink' : 'text-on-mist'
                }`}
              >
                {t.name}
              </h3>
              <p
                className={`mt-1.5 text-s-1 ${
                  t.featured ? 'text-on-ink-mute' : 'text-on-mist-mute'
                }`}
              >
                {t.for}
              </p>

              <p className="mt-8 flex items-baseline gap-2">
                <span
                  className={`display display--narrow text-[clamp(2.2rem,5vw,3.2rem)] leading-none ${
                    t.featured ? 'text-gold' : 'text-on-mist'
                  }`}
                >
                  {t.price[cur]}
                </span>
                <span className={`mono ${t.featured ? 'text-on-ink-mute' : 'text-on-mist-mute'}`}>
                  {cur}
                </span>
              </p>
              <p className={`mono mt-3 ${t.featured ? 'text-on-ink-mute' : 'text-on-mist-mute'}`}>
                {t.weeks}
              </p>

              <ul
                className={`mt-8 space-y-3 border-t pt-8 ${
                  t.featured ? 'border-white/10' : 'border-on-mist/10'
                }`}
              >
                {t.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-s-1 leading-relaxed">
                    <span
                      aria-hidden
                      className={`mt-[0.55em] h-px w-3 shrink-0 ${
                        t.featured ? 'bg-gold' : 'bg-bronze'
                      }`}
                    />
                    <span className={t.featured ? 'text-on-ink-mute' : 'text-on-mist-mute'}>
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-2">
                <Button
                  href="#brief"
                  variant={t.featured ? 'gold' : 'outline-dark'}
                  className="w-full justify-between"
                >
                  Start {t.name.toLowerCase()}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-s-1 text-on-mist-mute">
            All figures exclude tax. Payment runs 40% to start, 40% at build, 20% on
            launch — set out in the proposal before you commit.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
