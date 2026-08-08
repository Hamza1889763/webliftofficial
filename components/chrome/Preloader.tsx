'use client'

import { use, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import { usePathname } from 'next/dist/client/components/navigation'

/**
 * Load sequence: an altitude readout climbs 000 → 100 while a gold rule spans
 * the viewport, then the whole panel lifts away — establishing the ascent
 * language before the hero is even visible. Skipped entirely for reduced motion.
 */
export default function Preloader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const [n, setN] = useState(0)

  const pathname = usePathname();

  if (pathname === '/services' || pathname.startsWith('/work')) {
    return null;
  }

  useEffect(() => {
    if (reduce) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const DUR = 1500
    let raf = 0

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR)
      // Ease-out so the count decelerates into 100 instead of arriving flatly.
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 260)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [reduce])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  if (reduce) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: LIFT }}
          aria-hidden
        >
          <div className="px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(2rem,6vh,4rem)]">
            <div className="flex items-end justify-between gap-8">
              <span className="display display--narrow text-[clamp(4rem,16vw,11rem)] leading-[0.8] text-on-ink">
                {String(n).padStart(3, '0')}
              </span>
              <span className="mono pb-3 text-gold">Weblifts / ascending</span>
            </div>
            <div className="mt-6 h-px w-full bg-white/12">
              <motion.div
                className="h-full bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: n / 100 }}
                style={{ originX: 0 }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
