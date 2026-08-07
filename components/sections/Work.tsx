'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

type Project = {
  slug: string
  name: string
  sector: string
  year: string
  /** The outcome, not the adjective. This is what makes a gallery persuasive. */
  result: string
  image: string
  /** Bento span. Deliberately uneven so the grid reads as a composition. */
  span: string
  ratio: string
}

const PROJECTS: Project[] = [
  {
    slug: 'sipz',
    name: 'Sipz',
    sector: 'Beverage company — America',
    year: '2025',
    result: 'Brand awareness increased by 240% in target markets',
    image: '/work/sipz.jpg',
    span: 'md:col-span-6',
    ratio: 'aspect-[16/11]',
  },
  {
    slug: 'smartbite',
    name: 'SmartBite',
    sector: 'Application — Global',
    year: '2025',
    result: 'User retention improved by 45% after redesign',
    image: '/work/smartbite.jpg',
    span: 'md:col-span-6',
    ratio: 'aspect-[4/5]',
  },
  {
    slug: 'mrholdings',
    name: 'MR Holdings',
    sector: 'Real estate website — UAE',
    year: '2024',
    result: 'Property inquiries grew by 3.8× within three months',
    image: '/work/mrholdings.jpg',
    span: 'md:col-span-5',
    ratio: 'aspect-[4/5]',
  },
  {
    slug: 'moose-on-the-run',
    name: 'Moose on the Run',
    sector: 'Gas station & market — America',
    year: '2024',
    result: 'Average transaction value increased by 28% at locations',
    image: '/work/moose-on-the-run.jpg',
    span: 'md:col-span-7',
    ratio: 'aspect-[16/11]',
  },
]

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: (i % 2) * 0.09, ease: LIFT }}
      className={`group relative ${p.span}`}
    >
      <a href={`/work/${p.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-4xl bg-teal ${p.ratio}`}>
          {/* Image placeholder - replace with actual images */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/40 via-teal to-teal-lift/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm uppercase tracking-[0.2em] text-on-ink/30 opacity-50">
                {p.name}
              </span>
            </div>
            {/* Uncomment when you have actual images:
            <Image
              src={p.image}
              alt={`${p.name} — ${p.sector}`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              loading={i < 2 ? 'eager' : 'lazy'}
              className="object-cover transition-transform duration-[1100ms] ease-lift will-change-transform group-hover:scale-[1.06]"
            />
            */}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/20 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
            <span className="mono text-on-ink-mute">{p.year}</span>
            <span className="flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 ease-lift group-hover:translate-y-0 group-hover:opacity-100">
              <Icon name="arrow" size={16} />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="mono text-gold">{p.sector}</p>
            <h3 className="display mt-3 text-[clamp(1.5rem,3vw,2.4rem)] text-on-ink">
              {p.name}
            </h3>
            <p className="mt-2 max-w-sm text-s-1 leading-relaxed text-on-ink-mute transition-all duration-600 ease-lift md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              {p.result}
            </p>
          </div>
        </div>
      </a>
    </motion.article>
  )
}

/**
 * Bento gallery on the ink ground. Uneven column spans and alternating aspect
 * ratios mean no two rows repeat, which is what stops a case-study grid from
 * looking like a template.
 */
export default function Work() {
  return (
    <section id="work" data-section className="band on-ink">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="038">Selected work</Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'Proof, not\na portfolio.'}
              className="display max-w-[15ch] text-s3 text-on-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-on-ink-mute lg:text-right">
              Four projects, and what changed for the business after we shipped.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href="/work" variant="outline-light">
            All projects
          </Button>
        </Reveal>
      </div>
    </section>
  )
}