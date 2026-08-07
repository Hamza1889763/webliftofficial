'use client'

import { useScroll, useSpring, useTransform, motion } from 'framer-motion'
import { SECTIONS } from '@/lib/site'
import { useActiveSection } from '@/components/providers/useActiveSection'

/**
 * THE SIGNATURE ELEMENT.
 *
 * A fixed altimeter on the left edge: hairline track, a tick per section, a
 * gold indicator that travels with scroll, and a live mono readout of altitude.
 * It is genuinely functional — the ticks are labelled jump links — so the
 * numbering encodes position rather than decorating the page.
 *
 * Hidden below lg, where the nav's own progress bar carries the same signal.
 */
export default function Altimeter() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const top = useTransform(p, [0, 1], ['0%', '100%'])
  const { active, theme } = useActiveSection()

  const dark = theme === 'dark'
  const trackCls = dark ? 'bg-white/12' : 'bg-on-mist/12'
  const muteCls = dark ? 'text-on-ink-mute' : 'text-on-mist-mute'
  const accent = dark ? 'text-gold' : 'text-bronze'
  const activeAlt = SECTIONS.find((s) => s.id === active)?.alt ?? '000'

  return (
    <aside
      aria-label="Page position"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-screen w-[76px] flex-col items-center justify-center lg:flex"
    >
      {/* Live readout */}
      <div className="pointer-events-none absolute top-[calc(50%-13rem)] flex flex-col items-center gap-1">
        <motion.span
          key={activeAlt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`display display--narrow text-2xl leading-none ${accent}`}
        >
          {activeAlt}
        </motion.span>
        <span className={`mono text-[9px] tracking-[0.3em] ${muteCls}`}>ALT</span>
      </div>

      {/* Track */}
      <div className={`relative h-64 w-px ${trackCls}`}>
        <motion.span
          aria-hidden
          className="absolute -left-[3px] h-6 w-[7px] rounded-full bg-gold shadow-[0_0_16px_2px_rgb(247_198_61_/_0.5)]"
          style={{ top, translateY: '-50%' }}
        />

        <ul className="pointer-events-auto absolute inset-0">
          {SECTIONS.map((s, i) => {
            const isActive = s.id === active
            return (
              <li
                key={s.id}
                className="absolute left-0 -translate-y-1/2"
                style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
              >
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 py-1.5"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-500 ease-lift ${
                      isActive
                        ? 'w-5 bg-gold'
                        : `w-2.5 group-hover:w-4 ${dark ? 'bg-white/30' : 'bg-on-mist/30'}`
                    }`}
                  />
                  <span
                    className={`mono whitespace-nowrap text-[9px] transition-all duration-400 ${
                      isActive
                        ? `opacity-100 ${accent}`
                        : `opacity-0 group-hover:opacity-100 ${muteCls}`
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <span
        className={`mono absolute bottom-[calc(50%-13rem)] text-[9px] tracking-[0.3em] ${muteCls}`}
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll
      </span>
    </aside>
  )
}
