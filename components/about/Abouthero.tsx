'use client'

import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=85'

export default function AboutHero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
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
          text="About Weblifts"
          className="mono text-gold"
        />
        <Lift
          as="h1"
          onMount
          by="line"
          delay={0.2}
          text={'A digital studio\nbuilt for the\nwork, not the pitch.'}
          className="display display--wide mt-4 max-w-[18ch] text-[clamp(2.4rem,7vw,5.6rem)] text-on-ink"
        />
        <Reveal delay={0.45}>
          <p className="lede mx-auto mt-6 max-w-xl text-on-ink-mute">
            WebLifts is a Lahore-based studio designing and building digital
            products for brands across Pakistan and the Gulf. Small by
            design, so every project stays close to the people running it.
          </p>
        </Reveal>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  )
}