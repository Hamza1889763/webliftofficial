import type { Metadata } from 'next'
import { PHASES } from '@/lib/process'
import ProcessClient from './ProcessClient'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How a WebLifts project runs: six weeks, six phases, and a schedule that shows which tasks are ours and which are yours. Including what usually causes delays and how we prevent it.',
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'Process — WebLifts',
    description:
      'Six weeks from scope call to launch, with every phase, deliverable and dependency published in advance.',
    images: ['/og-process.jpg'],
  },
}

export default function ProcessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How a WebLifts project runs',
    description:
      'Six phases from scope call to launch, typically completed in six weeks.',
    totalTime: 'P6W',
    step: PHASES.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.title,
      text: p.detail,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProcessClient />
    </>
  )
}