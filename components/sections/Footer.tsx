'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import Icon from '@/components/atoms/Icon'

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Web development', href: '/services/web' },
      { label: 'App development', href: '/services/apps' },
      { label: 'Shopify & ecommerce', href: '/services/commerce' },
      { label: 'Brand identity', href: '/services/brand' },
      { label: 'Social media', href: '/services/social' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Process', href: '#ascent' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Questions', href: '#questions' },
    ],
  },
]

/**
 * The wordmark set at viewport width is the footer's whole idea: the last thing
 * you see is the name at maximum scale, rising into place. Real destinations
 * throughout — the original pointed every footer link at "#".
 */
export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-ink">
      <div className="shell hairline-dark pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="group flex items-baseline gap-1.5">
              <span className="display display--narrow text-2xl text-on-ink">Weblifts</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 ease-lift group-hover:-translate-y-1" />
            </a>
            <p className="mt-5 max-w-xs text-s-1 leading-relaxed text-on-ink-mute">
              A digital studio in Lahore building sites, stores and apps for brands
              across Pakistan and the Gulf.
            </p>
            <div className="mt-7 flex gap-2.5">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/12 transition-all duration-400 hover:text-gold hover:ring-gold/45"
              >
                <Icon name="whatsapp" size={17} />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/12 transition-all duration-400 hover:text-gold hover:ring-gold/45"
              >
                <Icon name="instagram" size={17} />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mono text-gold">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-s-1 text-on-ink-mute transition-colors duration-300 hover:text-on-ink"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-gold transition-all duration-400 ease-lift group-hover:w-3"
                      />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mono text-gold">Contact</h2>
            <ul className="mt-5 space-y-3 text-s-1">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all text-on-ink-mute transition-colors hover:text-on-ink"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="text-on-ink-mute transition-colors hover:text-on-ink"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="text-on-ink-mute">{SITE.base}</li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-ink-mute transition-colors hover:text-gold"
                >
                  {SITE.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge. */}
      <div className="relative select-none px-[clamp(1.25rem,4vw,4.5rem)]">
        <span className="lift-mask">
          <motion.span
            initial={reduce ? undefined : { y: '32%' }}
            whileInView={reduce ? undefined : { y: '0%' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: LIFT }}
            className="display display--wide block whitespace-nowrap text-center text-[19vw] leading-[0.78] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255_/_0.16)]"
          >
            WEBLIFTS
          </motion.span>
        </span>
      </div>

      <div className="shell hairline-dark flex flex-col-reverse items-center justify-between gap-4 py-6 md:flex-row">
        <p className="mono text-on-ink-mute">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <ul className="mono flex gap-7">
          <li>
            <a href="/privacy" className="text-on-ink-mute transition-colors hover:text-gold">
              Privacy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-on-ink-mute transition-colors hover:text-gold">
              Terms
            </a>
          </li>
          <li>
            <a href="#top" className="text-on-ink-mute transition-colors hover:text-gold">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
