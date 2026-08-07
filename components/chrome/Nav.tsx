'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE, SECTIONS } from '@/lib/site'
import { useActiveSection } from '@/components/providers/useActiveSection'
import Icon from '@/components/atoms/Icon'
import Magnetic from '@/components/atoms/Magnetic'

const LINKS = SECTIONS.filter((s) =>
  ['services', 'work', 'ascent', 'process', 'pricing', 'brief'].includes(s.id)
)

/**
 * One navigation for the whole site — the original shipped two byte-identical
 * navbars. It floats as a glass pill, hides on scroll-down and returns on
 * scroll-up (so it never fights the content), and inverts its palette based on
 * which ground it is currently over, using the same observer as the altimeter.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lifted, setLifted] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const { theme } = useActiveSection()
  const dark = theme === 'dark'

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setLifted(y > 40)
    setHidden(y > 420 && y > prev && !open)
  })

  // Lock the page and close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Full class strings, never interpolated fragments — Tailwind only compiles
  // classes it can see literally in the source.
  const ink = dark ? 'text-on-ink' : 'text-on-mist'
  const link = dark
    ? 'text-on-ink/60 hover:text-on-ink'
    : 'text-on-mist/60 hover:text-on-mist'

  return (
    <>
      <a
        href="/services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: LIFT }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="shell flex items-center justify-between py-4 md:py-5">
          {/* Wordmark. Type, not a raster logo — sharper at every size and it
              needs no network request. The dot is the gold accent. */}
          <a
            href="/"
            className="group flex items-baseline gap-1.5"
            aria-label={`${SITE.name} — home`}
          >
            <span
              className={`display display--narrow text-xl leading-none transition-colors duration-500 ${ink}`}
            >
              Weblifts
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 ease-lift group-hover:-translate-y-1" />
          </a>

          {/* Desktop links — glass pill only once lifted off the hero. */}
          <nav
            className={`hidden items-center rounded-full p-1 transition-all duration-500 ease-lift md:flex ${
              lifted
                ? dark
                  ? 'bg-white/[0.055] backdrop-blur-xl ring-1 ring-inset ring-white/10'
                  : 'bg-white/70 backdrop-blur-xl ring-1 ring-inset ring-on-mist/8'
                : 'bg-transparent'
            }`}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`/${l.id}`}
                className={`mono group/link relative rounded-full px-5 py-2.5 transition-colors duration-300 ${link}`}
              >
                <span className="relative">
                  {l.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-400 ease-lift group-hover/link:scale-x-100"
                  />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-ink transition-shadow duration-500 ease-lift hover:shadow-[0_18px_40px_-14px_rgb(247_198_61_/_0.65)]"
              >
                <Icon name="whatsapp" size={16} />
                <span className="mono">Talk to us</span>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 md:hidden ${
                dark ? 'text-on-ink ring-1 ring-inset ring-white/14' : 'text-on-mist ring-1 ring-inset ring-on-mist/14'
              }`}
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile scroll progress — the altimeter's signal in a compact form. */}
        <motion.div
          aria-hidden
          className="h-px origin-left bg-gold lg:hidden"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.72, ease: LIFT }}
          >
            <div className="shell flex items-center justify-between py-4">
              <span className="display display--narrow text-xl text-on-ink">Weblifts</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-on-ink ring-1 ring-inset ring-white/14"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col justify-center gap-1">
              {LINKS.map((l, i) => (
                <span key={l.id} className="lift-mask">
                  <motion.a
                    href={`/${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.85, delay: 0.12 + i * 0.06, ease: LIFT }}
                    className="display flex items-baseline gap-4 py-2 text-[13vw] text-on-ink"
                  >
                    <span className="mono text-gold">{l.alt}</span>
                    {l.label}
                  </motion.a>
                </span>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: LIFT }}
              className="shell hairline-dark flex items-center justify-between gap-4 py-6"
            >
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-ink"
              >
                <Icon name="whatsapp" size={16} />
                <span className="mono">Talk to us</span>
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/14 transition-colors hover:text-gold"
              >
                <Icon name="instagram" size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}