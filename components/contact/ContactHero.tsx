'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Icon from '@/components/atoms/Icon'
import Magnetic from '@/components/atoms/Magnetic'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1920&q=85'

/** Live studio clock — same honest detail as the homepage hero. */
function StudioTime() {
  const [t, setT] = useState<string>('')
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: SITE.timezone,
      }).format(new Date())
    setT(fmt())
    const id = setInterval(() => setT(fmt()), 20_000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="mono text-on-ink-mute">
      {SITE.base} — <span className="text-on-ink">{t || '--:--'}</span>
    </span>
  )
}

type Channel = {
  id: string
  label: string
  value: string
  href: string
  meta: string
  icon?: 'whatsapp' | 'instagram'
  primary?: boolean
}

const CHANNELS: Channel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message the studio',
    href: SITE.whatsapp,
    meta: 'Replies within the hour, 9am–9pm PKT',
    icon: 'whatsapp',
    primary: true,
  },
  {
    id: 'email',
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    meta: 'Best for briefs and attachments',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    meta: 'Call or text, same number',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: SITE.instagramHandle,
    href: SITE.instagram,
    meta: 'See recent work and behind the scenes',
    icon: 'instagram',
  },
]

export default function ContactHero() {
  return (
    <>
      <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="WebLifts — get in touch"
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
            text="Get in touch"
            className="mono text-gold"
          />
          <Lift
            as="h1"
            onMount
            by="line"
            delay={0.2}
            text={'Tell us what\nyou\u2019re building.'}
            className="display display--wide mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,5.6rem)] text-on-ink"
          />
          <Reveal delay={0.45}>
            <p className="lede mx-auto mt-6 max-w-xl text-on-ink-mute">
              Pick whichever channel is easiest — a real person on the other
              end either way.
            </p>
          </Reveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-5"
          >
            <StudioTime />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </section>


    </>
  )
}