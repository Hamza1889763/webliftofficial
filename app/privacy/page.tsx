import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import PolicyHero from '@/components/legal/PolicyHero'
import PolicyBody, { type PolicySection } from '@/components/legal/PolicyBody'


export const metadata: Metadata = {
  title: 'Privacy Policy — WebLifts',
  description:
    'How WebLifts collects, uses and protects information from visitors and clients.',
  alternates: { canonical: '/privacy' },
}

const UPDATED = 'August 9, 2026'

const SECTIONS: PolicySection[] = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    paragraphs: [
      'We collect information you give us directly — through the project brief form, email, WhatsApp or a scope call — such as your name, email address, phone number, company name and details about your project.',
      'We also collect limited technical information automatically when you visit this site, including pages viewed, device and browser type, and general location derived from IP address, via standard analytics tools.',
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    paragraphs: ['We use the information we collect to:'],
    list: [
      'Respond to enquiries and prepare project proposals',
      'Deliver, support and invoice work you\u2019ve engaged us for',
      'Understand how visitors use this site so we can improve it',
      'Send project-related updates, and occasionally studio updates you can opt out of at any time',
    ],
  },
  {
    id: 'cookies-analytics',
    title: 'Cookies & analytics',
    paragraphs: [
      'This site uses cookies and similar technologies for basic functionality and to understand traffic through analytics software. These do not identify you personally. You can disable cookies in your browser settings, though some site features may not work as intended.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    paragraphs: [
      'We rely on a small number of third-party services to run the studio and this site — including email and WhatsApp for communication, hosting and analytics providers, and payment processors for invoicing. Each handles data under its own privacy policy, and we only share what\u2019s necessary for them to provide their service to us.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    paragraphs: [
      'We keep project and client information for as long as needed to deliver the work, meet our accounting and legal obligations, and support you afterward. Enquiry details from projects that didn\u2019t go ahead are retained for a reasonable period and then deleted.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      'You can ask us at any time what information we hold about you, request a copy of it, ask us to correct it, or ask us to delete it where we\u2019re not required to keep it for legal or contractual reasons. Contact us using the details below to make a request.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: "Children's privacy",
    paragraphs: [
      'Our services are intended for businesses and individuals over the age of 18. We do not knowingly collect information from children.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy as the studio and the tools we use change. The date at the top of this page reflects the most recent revision. Material changes will be reflected here before they take effect.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    paragraphs: [
      `Questions about this policy or your data can be sent to ${SITE.email} or via WhatsApp. We're based in ${SITE.base}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <main>
        <PolicyHero
          eyebrow="Legal"
          index="008"
          title="Privacy Policy"
          updated={UPDATED}
        />
        <PolicyBody
          intro="This policy explains what information WebLifts collects when you visit this site or work with us as a client, and how that information is used. This is a general summary of our practices — for anything specific to a project, your written proposal takes precedence."
          sections={SECTIONS}
        />
      </main>
    </>
  )
}