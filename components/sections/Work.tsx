'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

// 1. Import your central data and type 
// (Make sure to adjust '@/lib/data' to the actual path of your projects file)
import { PROJECTS, type Project } from '@/lib/work'

// 2. Filter out 'smartbite' and grab exactly the first 4 remaining projects
const DISPLAY_PROJECTS = PROJECTS.filter((p) => p.slug !== 'smartbite').slice(0, 4)

function Card({ p, i }: { p: Project; i: number }) {
  const imageSrc = p.image || p.cover || ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: (i % 2) * 0.09, ease: LIFT }}
      className="group relative md:col-span-6"
    >
      <a href={`/work/${p.slug}`} className="block">
        <div className="relative aspect-[16/11] overflow-hidden rounded-4xl bg-teal">
          <Image
            src={imageSrc}
            alt={`${p.name} — ${p.sector}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={i < 2 ? 'eager' : 'lazy'}
            className="object-cover transition-transform duration-[1100ms] ease-lift will-change-transform group-hover:scale-[1.06]"
          />

          {/* Subtle teal wash for brand consistency */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-transparent to-black/10" />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
            <span className="mono rounded-full bg-black/40 px-4 py-1.5 text-[0.8rem] text-white/90 backdrop-blur-md">
              {p.year}
            </span>
            <span className="flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 ease-lift group-hover:translate-y-0 group-hover:opacity-100">
              <Icon name="arrow" size={16} />
            </span>
          </div>

          {/* Bottom meta */}
          <div className="absolute left-0 bottom-0 p-4 md:p-6 max-w-full">
            {/* Added 'w-fit' so the background only takes up as much space as the text */}
            <div className="w-fit rounded-3xl bg-black/40 px-5 py-4 backdrop-blur-md transition-colors duration-500 ease-out group-hover:bg-black/60 md:px-7 md:py-5">
              <p className="mono text-[0.8rem] text-gold md:text-[0.9rem]">{p.sector}</p>
              <h3 className="display mt-1 text-[clamp(1.4rem,3vw,2rem)] text-white">
                {p.name}
              </h3>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
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

        {/* 2×2 window grid — equal columns, equal rows */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-12">
          {DISPLAY_PROJECTS.map((p, i) => (
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