'use client'

import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Eyebrow from '@/components/atoms/Eyebrow'

const VALUES = [
  {
    title: 'We say no',
    body: 'If a request will make your product worse, we tell you before we build it, not after you\u2019ve paid for it.',
  },
  {
    title: 'You always know who',
    body: 'Every message reaches one of the three of us directly. No rotating juniors, no "let me check with the team."',
  },
  {
    title: 'It has to actually work',
    body: 'On a mid-range phone, on a slow connection, for the person your business actually serves \u2014 not just in the demo.',
  },
]

export default function Values() {
  return (
    <section id="values" data-section className="band on-mist pt-0">
      <div className="shell">
        <div className="hairline-light pt-16 md:pt-24">
          <Eyebrow index="044" tone="light">
            What we hold to
          </Eyebrow>
          <Lift
            as="h2"
            by="line"
            text={'Small studio,\nfew rules.'}
            className="display max-w-[15ch] text-s2 text-on-mist"
          />
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: LIFT }}
              className="card-paper p-7 md:p-8"
            >
              <span className="mono text-bronze">0{i + 1}</span>
              <h3 className="display mt-4 text-[clamp(1.2rem,2vw,1.5rem)] text-on-mist">
                {v.title}
              </h3>
              <p className="mt-2.5 text-s-1 leading-relaxed text-on-mist-mute">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}