'use client'

import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'

export default function Story() {
  return (
    <section id="story" data-section className="band on-mist">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow index="014" tone="light">
              How we work
            </Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'No agency\nlayers. Just\nthe work.'}
              className="display max-w-[13ch] text-s2 text-on-mist"
            />
          </div>

          <Reveal delay={0.12}>
            <div className="max-w-xl space-y-6 text-s-1 leading-relaxed text-on-mist-mute">
              <p>
                WebLifts was built on a simple premise: the people who scope
                your project should be the same people who build it. No
                handoffs between sales and delivery, no brief that gets
                reinterpreted three times before it reaches a developer.
              </p>
              <p>
                That structure hasn&rsquo;t changed as the studio has grown.
                You get a named lead on WhatsApp from the first call, a
                written scope before any work starts, and direct access to
                the people building your product throughout the engagement.
              </p>
              <p>
                Today that&rsquo;s real estate platforms, beverage brands and
                booking systems for clients across Pakistan, the Gulf and the
                US &mdash; delivered by a small, senior team, by design.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}