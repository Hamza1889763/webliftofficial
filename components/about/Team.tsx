'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LIFT } from '@/lib/motion'
import Lift from '@/components/atoms/Lift'
import Reveal from '@/components/atoms/Reveal'
import Eyebrow from '@/components/atoms/Eyebrow'
import Icon from '@/components/atoms/Icon'

type Member = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

/**
 * EDIT ME — swap in real names, roles, bios and photos.
 * Images go in /public/team/ — e.g. /public/team/hamza.jpeg
 * Recommended: portrait crop, 4:5, consistent lighting across all three.
 */
const FOUNDER: Member = {
  id: 'founder',
  name: 'Hamza Nayyar Butt',
  role: 'Founder & Lead Developer',
  bio: 'Leads every engagement from scope to launch and writes code on every project that ships. Responsible for technical direction, timelines and the final sign-off before anything goes live.',
  image: '/team/hamza.jpeg',
  linkedin: 'https://linkedin.com/in/yourhandle',
}

const COFOUNDERS: Member[] = [
  {
    id: 'bakir',
    name: 'Muhammad Bakir Ali',
    role: 'Co-Founder, Design & Front-end',
    bio: 'Owns the interface layer of every build — from first wireframe to the final pixel. Focused on interactions that feel deliberate rather than assembled.',
    image: '/team/bakir.jpeg',
    linkedin: 'https://linkedin.com/in/friendtwohandle',
  },
  {
    id: 'raahim',
    name: 'Raahim Asad',
    role: 'Co-Founder, Back-end & Infrastructure',
    bio: 'Handles the systems clients never see — authentication, payments, data architecture — and the on-call fixes when something needs attention outside business hours.',
    image: '/team/raahim.jpeg',
    linkedin: 'https://linkedin.com/in/friendthreehandle',
  },
]

/**
 * EDIT ME — placeholder names/roles below, swap for your real team when ready.
 * Same image folder convention: /public/team/name.jpeg
 */
const TEAM_MEMBERS: Member[] = [
  {
    id: 'member-four',
    name: 'Areeba Khan',
    role: 'UI/UX Designer',
    bio: 'Owns wireframes and visual design handoff for every build.',
    image: '/team/place-holder.png',
  },
  {
    id: 'member-five',
    name: 'Talha Siddiqui',
    role: 'Project Manager',
    bio: 'Keeps timelines honest and client updates on schedule.',
    image: '/team/place-holder.png',
  },
  {
    id: 'member-six',
    name: 'Fatima Zahra',
    role: 'QA & Support Lead',
    bio: 'Tests every release and handles post-launch fixes.',
    image: '/team/place-holder.png',
  },
]

/**
 * Honest, not headcount-padding: real capabilities we bring in per project,
 * without inventing people who don't exist. Add real names here once you
 * bring on dedicated hires or regular collaborators.
 */
const SPECIALISTS = [
  {
    title: 'QA & Testing',
    body: 'Every build is checked across devices and connection speeds before it reaches you.',
  },
  {
    title: 'DevOps & Infrastructure',
    body: 'Deployment, monitoring and uptime handled by the same standards on every project.',
  },
  {
    title: 'Copy & Content',
    body: 'Structure and copy direction included on larger engagements, full copywriting on request.',
  },
]

function MemberRow({
  member,
  imageSize = 'md',
  tier = 'cofounder',
}: {
  member: Member
  imageSize?: 'lg' | 'md'
  tier?: 'founder' | 'cofounder'
}) {
  const ring = tier === 'founder' ? 'ring-gold/40' : 'ring-bronze/35'

  return (
    <div
      className={`group grid gap-6 ${
        imageSize === 'lg'
          ? 'sm:grid-cols-[220px_1fr] sm:gap-10'
          : 'sm:grid-cols-[160px_1fr] sm:gap-7'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-teal ring-1 ring-inset ${ring} ${
          imageSize === 'lg' ? 'aspect-[4/5]' : 'aspect-square'
        }`}
      >
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes={imageSize === 'lg' ? '220px' : '160px'}
          className="object-cover transition-transform duration-700 ease-lift group-hover:scale-[1.04]"
        />
        
        {/* Badge only on the founder portrait — co-founders are labelled by
            the section kicker above the grid instead, no per-card badge. */}
        {tier === 'founder' && (
          <span className="mono absolute left-3 top-3 rounded-full bg-gold px-3 py-1.5 text-ink">
            Founder
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h3
          className={`display text-on-ink ${
            imageSize === 'lg'
              ? 'text-[clamp(1.5rem,2.6vw,2rem)]'
              : 'text-[clamp(1.2rem,2vw,1.5rem)]'
          }`}
        >
          {member.name}
        </h3>
        <p className="mono mt-1.5 text-bronze">{member.role}</p>
        <p className="mt-3 max-w-md text-s-1 leading-relaxed text-on-ink-mute">
          {member.bio}
        </p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-4 flex h-10 w-10 items-center justify-center rounded-full text-on-ink-mute ring-1 ring-inset ring-white/14 transition-colors duration-400 hover:text-gold hover:ring-gold/45"
          >
            <Icon name="arrow" size={16} />
          </a>
        )}
      </div>
    </div>
  )
}

function TeamCard({ member, i }: { member: Member; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay: i * 0.08, ease: LIFT }}
      className="group flex gap-5"
    >
      <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-2xl bg-teal ring-1 ring-inset ring-white/10 transition-all duration-400 sm:w-32 group-hover:ring-gold/35">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="128px"
          className="object-cover transition-all duration-500 ease-lift group-hover:grayscale-0 group-hover:scale-[1.04]"
        />
        
      </div>
      <div className="min-w-0 pt-1">
        <h4 className="display text-[clamp(1.1rem,1.8vw,1.35rem)] text-on-ink">
          {member.name}
        </h4>
        <p className="mono mt-1 text-bronze">{member.role}</p>
        {member.bio && (
          <p className="mt-2 text-s-1 leading-relaxed text-on-ink-mute">{member.bio}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" data-section className="band on-ink overflow-hidden">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="030">The team</Eyebrow>
            <Lift
              as="h2"
              by="line"
              text={'The people behind\nevery build.'}
              className="display max-w-[18ch] text-s3 text-on-ink"
            />
          </div>
          <Reveal delay={0.15}>
            {/* Top-right sub headline — highlighted with a gold pill so it
                reads as a callout instead of blending into the muted copy
                around it. */}
            <span className="mono inline-block rounded-full bg-[#f7c63d]/10 px-4 py-2 text-[#f7c63d] ring-1 ring-inset ring-[#f7c63d]/30 lg:ml-auto">
              A small, senior team
            </span>
            <p className="mt-3 max-w-xs text-on-ink-mute lg:ml-auto lg:text-right">
              Every project is reviewed and built by the people you actually
              talk to.
            </p>
          </Reveal>
        </div>

        {/* ---- Founder ---- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LIFT }}
          className="mt-14 border-b border-white/10 pb-12 md:mt-20 md:pb-16"
        >
          <MemberRow member={FOUNDER} imageSize="lg" tier="founder" />
        </motion.div>

        {/* ---- Co-founders — two columns ---- */}
        <div className="mt-12 md:mt-16">
          <span className="mono mb-6 inline-flex items-center gap-2 rounded-full bg-[#f7c63d]/10 px-4 py-2 text-[#f7c63d] ring-1 ring-inset ring-[#f7c63d]/30">
            Co-Founders
          </span>
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 md:gap-12 md:pb-16">
            {COFOUNDERS.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: LIFT }}
              >
                <MemberRow member={m} imageSize="md" tier="cofounder" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---- Team — everyone beyond founder/co-founders, three columns ---- */}
        <div className="mt-12 border-b border-white/10 pb-12 md:mt-16 md:pb-16">
          <span className="mono mb-7 flex items-center gap-2 text-on-ink-mute">
            Team
            <span aria-hidden className="h-px w-8 bg-white/20" />
          </span>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            {TEAM_MEMBERS.map((m, i) => (
              <TeamCard key={m.id} member={m} i={i} />
            ))}
          </div>
        </div>

        {/* ---- Specialists — capabilities, not invented headcount ---- */}
        <div className="mt-12 md:mt-16">
          <Reveal>
            <p className="mono text-on-ink-mute">On every engagement</p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SPECIALISTS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: LIFT }}
                className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10 transition-colors duration-400 hover:ring-gold/25"
              >
                <h4 className="display text-[clamp(1.05rem,1.6vw,1.25rem)] text-on-ink">
                  {s.title}
                </h4>
                <p className="mt-2 text-s-1 leading-relaxed text-on-ink-mute">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}