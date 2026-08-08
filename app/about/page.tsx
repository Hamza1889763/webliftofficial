import type { Metadata } from 'next'
import AboutHero from '@/components/about/Abouthero'
import Story from '@/components/about/Story'
import Team from '@/components/about/Team'
import Values from '@/components/about/Values'
import Brief from '@/components/sections/Brief'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About — Weblifts',
  description:
    'Weblifts is a three-person digital studio in Lahore. Meet the people who design, build and ship every project.',
}

/**
 * Grounds alternate the same way the homepage does, so no two adjacent
 * sections share a background:
 *
 *   ink   AboutHero   the thesis — who we are
 *   mist  Story       how it started
 *   ink   Team        the people, in detail — the page's centerpiece
 *   mist  Values      what we hold to
 *   ink   Brief       the ask
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Team />
      <Values />
      <Brief />
      <Footer />
    </>
  )
}