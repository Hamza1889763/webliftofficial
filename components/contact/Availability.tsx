'use client'

import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import Eyebrow from '@/components/atoms/Eyebrow'

const INFO = [
  {
    label: 'Based in',
    value: SITE.base,
    note: 'Working with clients across Pakistan and the Gulf',
  },
  {
    label: 'Studio hours',
    value: '9am – 9pm PKT',
    note: 'Seven days a week on WhatsApp',
  },
  {
    label: 'Typical reply',
    value: 'Under 1 hour',
    note: 'Written proposals within two working days',
  },
  {
    label: 'Languages',
    value: 'English, Urdu',
    note: 'Written scope always in English',
  },
]

export default function Availability() {
  return (
    <section id="availability" data-section className="band on-mist pt-0">
      <div className="shell">
        <div className="hairline-light pt-16 md:pt-20">
          <Eyebrow index="018" tone="light">
            Good to know
          </Eyebrow>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-4">
          {INFO.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: LIFT }}
              className="card-paper p-6 md:p-7"
            >
              <span className="mono text-bronze">{item.label}</span>
              <p className="display mt-3 text-[clamp(1.15rem,2vw,1.45rem)] text-on-mist">
                {item.value}
              </p>
              <p className="mt-2 text-s-1 leading-relaxed text-on-mist-mute">
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}