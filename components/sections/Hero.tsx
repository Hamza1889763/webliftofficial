'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import { useMouseParallax } from '@/lib/useMouse'
import Lift from '@/components/atoms/Lift'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

/** Live studio clock — a small honest detail that says a person is on the other end. */
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

const FACTS = [
  { n: '48', unit: 'projects', note: 'shipped since 2023' },
  { n: '6', unit: 'weeks', note: 'typical build to launch' },
  { n: '98', unit: 'lighthouse', note: 'median performance score' },
]

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const { ref: mouseRef, mx, my } = useMouseParallax(1)

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  })
  // Content lifts and fades away; the video pushes down. Depth on exit.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const contentO = useTransform(scrollYProgress, [0, 0.62], [1, 0])
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])

  // Mouse parallax, opposite directions for foreground and background.
  const bgX = useTransform(mx, (v) => v * -18)
  const bgY = useTransform(my, (v) => v * -14)
  const glowX = useTransform(mx, (v) => v * 46)
  const glowY = useTransform(my, (v) => v * 36)

  useEffect(() => {
    video.current?.play().catch(() => {})
  }, [])

  return (
    <section
      ref={section}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <div ref={mouseRef} className="absolute inset-0 -z-10">
        {/* Media plate */}
        <motion.div className="absolute inset-0" style={{ y: mediaY, scale: mediaScale }}>
          <motion.div className="absolute -inset-8" style={{ x: bgX, y: bgY }}>
            <video
              ref={video}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=85"
              aria-hidden
            >
              <source src="/heromain.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        {/* Grade: the video is treated, not merely darkened. Teal duotone plus a
            bottom-weighted ink gradient guarantees text contrast at every size. */}
        <div className="absolute inset-0 bg-teal/55 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/38" />

        {/* Cursor-tracked gold bloom — the only ambient light in the composition. */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/3 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[110px]"
            style={{
              x: glowX,
              y: glowY,
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.24) 0%, rgb(247 198 61 / 0) 68%)',
            }}
          />
        )}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentO }}
        className="relative flex flex-1 flex-col justify-end pb-10 pt-32"
      >
        <div className="shell">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="mono text-gold">Digital studio</span>
            <span aria-hidden className="h-px w-8 bg-white/16" />
            <StudioTime />
          </motion.div>

          {/* Headline. Set wide on the width axis, near-zero leading, masked lift
              per line. This is the 3-second moment. */}
          <Lift
            as="h1"
            onMount
            delay={0.45}
            stagger={0.1}
            by="line"
            text={'We build sites\nand apps that\nmove numbers.'}
            className="display display--wide max-w-[19ch] text-[clamp(2.6rem,8.4vw,7.5rem)] text-on-ink"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: LIFT }}
            >
              <p className="lede text-on-ink-mute">
                A small studio in Lahore working with brands across Pakistan and the
                Gulf. Design, build, launch — most projects go live in six weeks.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#brief" variant="gold">
                  Start a project
                </Button>
                <Button href="#work" variant="outline-light">
                  See the work
                </Button>
              </div>
            </motion.div>

            {/* Facts replace the placeholder avatar row: real numbers, mono set,
                right-aligned as a counterweight to the headline. */}
            <motion.dl
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: LIFT }}
              className="flex gap-8 lg:gap-11"
            >
              {FACTS.map((f) => (
                <div key={f.unit} className="max-w-[8.5rem]">
                  <dt className="sr-only">{f.note}</dt>
                  <dd>
                    <span className="display display--narrow block text-4xl leading-none text-gold">
                      {f.n}
                    </span>
                    <span className="mono mt-2 block text-on-ink">{f.unit}</span>
                    <span className="mt-1 block text-s-1 leading-snug text-on-ink-mute">
                      {f.note}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* Horizon: a single gold hairline drawn across the full viewport. The
            hero's one graphic gesture — everything above it is the ascent. */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 1.15, ease: LIFT }}
          className="mt-12 h-px w-full origin-left bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0"
        />

        <div className="shell mt-5 flex items-center justify-between">
          <a
            href="#services"
            className="group flex items-center gap-3 text-on-ink-mute transition-colors hover:text-gold"
          >
            <motion.span
              animate={reduce ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full ring-1 ring-inset ring-white/16"
            >
              <Icon name="arrow" size={15} />
            </motion.span>
            <span className="mono">Scroll to explore</span>
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mono hidden text-on-ink-mute transition-colors hover:text-gold sm:block"
          >
            {SITE.instagramHandle}
          </a>
        </div>
      </motion.div>
    </section>
  )
}