'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import { SITE } from '@/lib/site'

const QA = [
  {
    q: 'Who owns the code and the accounts?',
    a: 'You do, from the first commit. Repositories, hosting, domain and analytics are created in your name or transferred to you at launch. We keep access only while you want us involved.',
  },
  {
    q: 'What happens if the project runs late?',
    a: 'The proposal names a launch date and the conditions attached to it — usually content and one feedback round per phase. If we miss the date for our own reasons, the final 20% is waived.',
  },
  {
    q: 'Can you work with our existing designer or developer?',
    a: 'Often, yes. We can take Figma files through to build, or build against your design system. We will tell you honestly at the scope call if the handover looks likely to cost you more than starting fresh.',
  },
  {
    q: 'Do you write the copy?',
    a: 'Copy direction is included on Studio and Platform: structure, headings and the argument each page makes. Full long-form copywriting is quoted separately.',
  },
  {
    q: 'How do payments work from outside Pakistan?',
    a: 'Bank transfer in USD or AED, or card via Wise or Payoneer. Invoices are issued per milestone with the exchange rate fixed at the date of the proposal.',
  },
  {
    q: 'What if we only need one page fixed?',
    a: 'We take small jobs at an hourly rate with a two-hour minimum. Message us on WhatsApp with what is broken and we will quote before starting.',
  },
]

/**
 * FAQ as hairline rows rather than boxed cards, so it stays quiet next to the
 * pricing section above it. The plus mark rotates to a minus — one element
 * doing both states instead of swapping icons.
 */
export default function Questions() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="questions" data-section className="band on-mist pt-0">
      <div className="shell">
        <div className="hairline-light grid gap-12 pt-16 md:pt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow index="094" tone="light">
              Questions
            </Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'Asked before\nyou ask.'}
              className="display max-w-[13ch] text-s2 text-on-mist"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-sm text-s-1 leading-relaxed text-on-mist-mute">
                Anything not covered here,{' '}
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-mist underline decoration-bronze/40 decoration-1 underline-offset-4 transition-colors hover:decoration-bronze"
                >
                  message us directly
                </a>
                . You&rsquo;ll get a person, usually within the hour.
              </p>
            </Reveal>
          </div>

          <ul>
            {QA.map((item, i) => {
              const on = open === i
              return (
                <li key={item.q} className="border-b border-on-mist/10 first:border-t">
                  <h3>
                    <button
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      aria-controls={`a-${i}`}
                      className="group flex w-full items-start gap-6 py-6 text-left"
                    >
                      <span
                        className={`display flex-1 text-[clamp(1.05rem,1.9vw,1.4rem)] transition-colors duration-400 ${
                          on ? 'text-on-mist' : 'text-on-mist/70 group-hover:text-on-mist'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-2 h-3 w-3 shrink-0 text-bronze"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                        <motion.span
                          className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current"
                          animate={{ rotate: on ? 90 : 0, opacity: on ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: LIFT }}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`a-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: LIFT }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 pr-10 text-s-1 leading-relaxed text-on-mist-mute">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
