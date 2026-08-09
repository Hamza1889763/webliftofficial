import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import PolicyHero from '@/components/legal/PolicyHero'
import PolicyBody, { type PolicySection } from '@/components/legal/PolicyBody'


export const metadata: Metadata = {
  title: 'Terms of Service — WebLifts',
  description: 'The terms that apply when you engage WebLifts for a project.',
  alternates: { canonical: '/terms' },
}

const UPDATED = 'August 9, 2026'

const SECTIONS: PolicySection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    paragraphs: [
      `By engaging ${SITE.name} for a project, or using this website, you agree to these terms. If you don't agree with any part of them, please contact us before proceeding — we're happy to talk through anything that doesn't sit right.`,
    ],
  },
  {
    id: 'services',
    title: 'Services provided',
    paragraphs: [
      'We provide web development, app development, ecommerce, brand identity and social media services. The specific scope, deliverables, timeline and price for any engagement are set out in a written proposal agreed before work begins — that document, not this page, governs the details of a given project.',
    ],
  },
  {
    id: 'engagement-payment',
    title: 'Project engagement & payment',
    paragraphs: [
      'Projects are scoped and priced individually. Unless otherwise agreed in writing, payment runs in milestones tied to project phases, as set out in the proposal. Work on the next phase begins once the previous milestone payment is received.',
      'Prices exclude tax unless stated otherwise. Late payment may pause active work until the account is settled.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    paragraphs: [
      'Ownership of the final deliverables — code, designs and content created specifically for your project — transfers to you on full payment, unless the proposal states otherwise. We retain the right to display completed work in our own portfolio and marketing, unless you request otherwise in writing.',
      'Third-party assets used in a project (fonts, stock libraries, plugins) remain subject to their own licenses.',
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Client responsibilities',
    paragraphs: ['To keep a project on schedule, we ask that you:'],
    list: [
      'Provide content, feedback and approvals within the timeframes agreed in the proposal',
      'Provide accurate information and necessary access (accounts, assets, credentials) when requested',
      'Review and respond to milestone deliverables in a timely manner',
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    paragraphs: [
      'We treat information shared with us during a project as confidential and won\u2019t disclose it to third parties without your consent, except where required by law. A separate NDA can be signed on request before sensitive information is shared.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    paragraphs: [
      `${SITE.name} will deliver work with reasonable skill and care, but we can't guarantee specific business outcomes (traffic, sales, rankings) resulting from a project, since these depend on many factors outside our control. Our liability for any claim relating to a project is limited to the fees paid for that project.`,
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    paragraphs: [
      'Either party may end an engagement with written notice, as set out in the proposal. You\u2019ll be invoiced for work completed and costs incurred up to the point of termination; we\u2019ll hand over completed and in-progress work on final payment.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    paragraphs: [
      `These terms are governed by the laws of Pakistan. Any dispute arising from a project will first be addressed directly between the parties before any other action is taken.`,
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    paragraphs: [
      'We may update these general terms from time to time; the date at the top of this page reflects the most recent revision. Terms for an active project are governed by the proposal agreed at the time, not by later changes to this page.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    paragraphs: [
      `Questions about these terms can be sent to ${SITE.email} or via WhatsApp. We're based in ${SITE.base}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <main>
        <PolicyHero
          eyebrow="Legal"
          index="009"
          title="Terms of Service"
          updated={UPDATED}
        />
        <PolicyBody
          intro="These terms apply whenever you engage WebLifts for a project or use this website. They're written in plain language on purpose — where they conflict with your signed proposal for a specific project, the proposal governs."
          sections={SECTIONS}
        />
      </main>
    </>
  )
}