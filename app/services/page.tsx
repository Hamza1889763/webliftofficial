import type { Metadata } from 'next'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, apps, Shopify, brand identity and social media. Fixed scope and a written list of what each engagement excludes.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — WebLifts',
    description:
      'Five services, fixed scope, and what each one does not include. Lahore-based studio working across Pakistan and the Gulf.',
    images: ['/og-services.jpg'],
  },
}

export default function ServicesPage() {
  // Structured data — prices omitted intentionally.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': SERVICES.map((s) => ({
      '@type': 'Service',
      '@id': `https://weblifts.com/services#${s.id}`,
      name: s.title,
      description: s.summary,
      serviceType: s.title,
      provider: {
        '@type': 'ProfessionalService',
        name: SITE.name,
        telephone: SITE.phone,
        email: SITE.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
      },
      areaServed: ['PK', 'AE', 'SA', 'QA'],
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  )
}