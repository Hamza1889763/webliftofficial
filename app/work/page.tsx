import type { Metadata } from 'next'
import { PROJECTS } from '@/lib/work'
import WorkClient from './WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from WebLifts — sites, stores and platforms for brands in Pakistan and the Gulf, with the numbers that changed after launch.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — WebLifts',
    description:
      'Case studies with real outcomes: checkout completion, enquiry volume, admin hours returned.',
    images: ['/og-work.jpg'],
  },
}

export default function WorkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work — WebLifts',
    hasPart: PROJECTS.map((p) => ({
      '@type': 'CreativeWork',
      '@id': `https://weblifts.com/work/${p.slug}`,
      name: p.name,
      about: p.sector,
      dateCreated: p.year,
      url: `https://weblifts.com/work/${p.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkClient />
    </>
  )
}