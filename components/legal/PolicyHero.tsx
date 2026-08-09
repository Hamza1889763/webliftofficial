'use client'

import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'

export default function PolicyHero({
  eyebrow,
  index,
  title,
  updated,
}: {
  eyebrow: string
  index: string
  title: string
  updated: string
}) {
  return (
    <section className="relative bg-ink pb-14 pt-[clamp(6.5rem,15vh,10rem)] md:pb-16">
      <div className="shell">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <Lift
          as="h1"
          onMount
          by="line"
          delay={0.15}
          text={title}
          className="display display--wide mt-4 max-w-[20ch] text-[clamp(2rem,5.5vw,3.6rem)] text-on-ink"
        />
        <Reveal delay={0.4}>
          <p className="mono mt-6 text-on-ink-mute">Last updated {updated}</p>
        </Reveal>
      </div>
    </section>
  )
}