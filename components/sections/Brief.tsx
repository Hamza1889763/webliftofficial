'use client'

import { useId, useState } from 'react'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { SITE } from '@/lib/site'
import { useMouseParallax } from '@/lib/useMouse'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Icon from '@/components/atoms/Icon'
import Magnetic from '@/components/atoms/Magnetic'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const SERVICES = [
  'Web development',
  'App development',
  'Shopify & ecommerce',
  'Brand identity',
  'Social media',
  'Not sure yet',
]

const BUDGETS = ['Under PKR 200k', 'PKR 200k – 500k', 'PKR 500k – 1m', 'Over PKR 1m']

/**
 * Field with a label that sits above the input at all times — floating labels
 * that vanish on focus remove context exactly when the user needs it most.
 */
function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string
  hint?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mono mb-2.5 flex items-baseline gap-2 text-on-ink-mute">
        {label}
        {required && <span className="text-gold">required</span>}
      </span>
      {children}
      {hint && <span className="mt-2 block text-s-1 text-on-ink-mute/70">{hint}</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl bg-white/[0.04] px-4 py-3.5 text-on-ink placeholder:text-on-ink-mute/50 ' +
  'ring-1 ring-inset ring-white/12 transition-all duration-400 ease-lift ' +
  'hover:ring-white/20 focus:bg-white/[0.07] focus:ring-gold/60 focus:outline-none'

export default function Brief() {
  const [status, setStatus] = useState<Status>('idle')
  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const formId = useId()
  const reduce = useReducedMotion()
  const { ref, mx, my } = useMouseParallax(1)
  const bloomX = useTransform(mx, (v) => v * 90)
  const bloomY = useTransform(my, (v) => v * 60)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    // Honeypot: bots fill hidden fields, humans never see them.
    if (data.get('company_url')) return

    setStatus('sending')
    try {
      const res = await fetch('/api/brief', { method: 'POST', body: data })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="brief" data-section className="relative isolate overflow-hidden on-ink">
      {/* Cursor-tracked bloom shared by the CTA and the form — one light source
          for the whole closing act. */}
      <div ref={ref} className="absolute inset-0 -z-10">
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60 blur-[120px]"
            style={{
              x: bloomX,
              y: bloomY,
              background:
                'radial-gradient(circle, rgb(247 198 61 / 0.2) 0%, rgb(247 198 61 / 0) 70%)',
            }}
          />
        )}
      </div>

      {/* ---- Closing statement ---- */}
      <div className="shell pb-4 pt-[clamp(5.5rem,12vh,11rem)] text-center">
        <Eyebrow index="100">Next step</Eyebrow>
        <div className="flex flex-col items-center">
          <Lift
            as="h2"
            by="word"
            stagger={0.07}
            text="Tell us what you're trying to fix."
            className="display display--wide max-w-[22ch] text-[clamp(2.4rem,7vw,6rem)] text-on-ink"
          />
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-8 text-on-ink-mute">
              One form, four minutes. You get a written scope and a fixed price back
              within two working days — or a straight no if we&rsquo;re not the right fit.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- Brief ---- */}
      <div className="shell pb-[clamp(4rem,9vh,8rem)] pt-14">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Direct channels first: for this market WhatsApp converts better than
              a form, so it is not buried underneath one. */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h3 className="display text-s2 text-on-ink">Prefer to just talk?</h3>
              <div className="mt-7 flex flex-col gap-3">
                <Magnetic>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-gold px-6 py-5 text-ink transition-shadow duration-500 ease-lift hover:shadow-[0_22px_50px_-18px_rgb(247_198_61_/_0.6)]"
                  >
                    <Icon name="whatsapp" size={22} />
                    <span className="flex-1">
                      <span className="mono block">WhatsApp</span>
                      <span className="mt-1 block text-s-1 opacity-70">
                        Replies within the hour, 9am–9pm PKT
                      </span>
                    </span>
                    <span className="transition-transform duration-500 ease-lift group-hover:translate-x-1">
                      <Icon name="arrow" size={18} />
                    </span>
                  </a>
                </Magnetic>

                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-4 rounded-2xl px-6 py-5 text-on-ink ring-1 ring-inset ring-white/12 transition-colors duration-400 hover:ring-gold/40"
                >
                  <span className="flex-1">
                    <span className="mono block text-on-ink-mute">Email</span>
                    <span className="mt-1 block break-all">{SITE.email}</span>
                  </span>
                  <span className="text-on-ink-mute transition-all duration-500 ease-lift group-hover:translate-x-1 group-hover:text-gold">
                    <Icon name="arrow" size={18} />
                  </span>
                </a>

                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 rounded-2xl px-6 py-5 text-on-ink ring-1 ring-inset ring-white/12 transition-colors duration-400 hover:ring-gold/40"
                >
                  <span className="flex-1">
                    <span className="mono block text-on-ink-mute">Phone</span>
                    <span className="mt-1 block">{SITE.phone}</span>
                  </span>
                  <span className="text-on-ink-mute transition-all duration-500 ease-lift group-hover:translate-x-1 group-hover:text-gold">
                    <Icon name="arrow" size={18} />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: LIFT }}
                className="card-lift edge-gold flex min-h-[26rem] flex-col justify-center p-9 text-center md:p-12"
                role="status"
              >
                <span className="mono text-gold">Brief received</span>
                <p className="display mt-5 text-s2 text-on-ink">
                  We&rsquo;ll come back to you within two working days.
                </p>
                <p className="mx-auto mt-4 max-w-sm text-s-1 leading-relaxed text-on-ink-mute">
                  If it&rsquo;s urgent, message the WhatsApp line and mention that you
                  sent a brief — we&rsquo;ll pull it up.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="card-lift p-7 md:p-10"
                aria-describedby={`${formId}-status`}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Your name" required>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Habib Ahmad"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      name="company"
                      autoComplete="organization"
                      placeholder="Company or brand"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="WhatsApp">
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+92 300 0000000"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Chip selects instead of native dropdowns: fewer taps on mobile
                    and the whole option set stays visible. */}
                <fieldset className="mt-8">
                  <legend className="mono mb-3 flex items-baseline gap-2 text-on-ink-mute">
                    What do you need <span className="text-gold">required</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <label key={s} className="cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={s}
                          required
                          checked={service === s}
                          onChange={() => setService(s)}
                          className="peer sr-only"
                        />
                        <span className="mono block rounded-full px-4 py-2.5 text-on-ink-mute ring-1 ring-inset ring-white/12 transition-all duration-300 hover:text-on-ink peer-checked:bg-gold peer-checked:text-ink peer-checked:ring-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="mono mb-3 text-on-ink-mute">Budget range</legend>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={b}
                          checked={budget === b}
                          onChange={() => setBudget(b)}
                          className="peer sr-only"
                        />
                        <span className="mono block rounded-full px-4 py-2.5 text-on-ink-mute ring-1 ring-inset ring-white/12 transition-all duration-300 hover:text-on-ink peer-checked:bg-white/10 peer-checked:text-on-ink peer-checked:ring-gold/50 peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7">
                  <Field
                    label="The problem"
                    required
                    hint="What isn't working today, and what would count as fixed?"
                  >
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Our site gets traffic but almost nobody fills in the enquiry form…"
                      className={`${inputCls} resize-y`}
                    />
                  </Field>
                </div>

                {/* Honeypot — visually and programmatically hidden. */}
                <div aria-hidden className="absolute -left-[9999px]">
                  <label>
                    Company URL
                    <input name="company_url" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-ink transition-shadow duration-500 ease-lift hover:shadow-[0_20px_48px_-16px_rgb(247_198_61_/_0.65)] disabled:opacity-60"
                    >
                      <span className="mono">
                        {status === 'sending' ? 'Sending' : 'Send brief'}
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-4 bg-current opacity-50 transition-all duration-500 ease-lift group-hover:w-8 group-hover:opacity-100"
                      />
                    </button>
                  </Magnetic>

                  <p
                    id={`${formId}-status`}
                    role="status"
                    aria-live="polite"
                    className="text-s-1 text-on-ink-mute"
                  >
                    {status === 'error'
                      ? 'The brief didn’t send. Check your connection and try again, or message the WhatsApp line.'
                      : 'We reply to every brief, including the ones we turn down.'}
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
