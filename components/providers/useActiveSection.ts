'use client'

import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '@/lib/site'

/**
 * Tracks which section owns the viewport. Both the altimeter and the nav read
 * from this, so the nav can invert its colours against whichever ground it is
 * currently sitting on — one observer, not one per component.
 */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('top')

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    )
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top band of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id as SectionId)
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  const theme = SECTIONS.find((s) => s.id === active)?.theme ?? 'dark'
  return { active, theme: theme as 'dark' | 'mist' }
}
