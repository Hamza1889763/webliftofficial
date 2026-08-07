import type { IconName } from '@/components/atoms/Icon'

/**
 * One service list for the whole site. The homepage section and /services both
 * read from here — previously the array was duplicated, so the two pages could
 * quietly disagree about what you sell and for how much.
 *
 * `excludes` is the field that matters. Publishing what is *not* in scope is
 * the single most trust-building thing an agency site can do, and almost none
 * of them do it.
 */
export type Service = {
  id: string
  index: string
  title: string
  /** One line. Used in the homepage teaser and the scope table. */
  summary: string
  /** The situation this service is the answer to. Not a sales pitch. */
  problem: string
  /** Two or three sentences of substance. No aphorisms. */
  detail: string
  bestFor: string
  includes: string[]
  excludes: string[]
  stack: string[]
  timeline: string
  from: string
  icon: IconName
  image: string
}

export const SERVICES: Service[] = [
  {
    id: 'web',
    index: '01',
    title: 'Web development',
    summary: 'Marketing sites and web apps in Next.js.',
    problem: 'Your site looks fine but nobody enquires.',
    detail:
      'We rebuild the site around one action you want visitors to take, then make it fast enough that they stay long enough to take it. Server-rendered, indexable on day one, and editable by your team without calling us.',
    bestFor: 'Companies whose site is their main sales channel',
    includes: [
      'Design system and component library',
      'Next.js build, deployed to Vercel',
      'CMS your team can actually use',
      'Technical SEO and structured data',
      'Analytics and conversion tracking',
      '30 days of fixes after launch',
    ],
    excludes: [
      'Long-form copywriting (quoted separately)',
      'Ongoing content updates after handover',
      'Paid ad management',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Sanity', 'Vercel'],
    timeline: '3–6 weeks',
    from: 'PKR 180,000',
    icon: 'code',
    image: '/services/web.jpg',
  },
  {
    id: 'app',
    index: '02',
    title: 'App development',
    summary: 'Cross-platform apps in React Native, shipped to both stores.',
    problem: 'You need an app but not two engineering teams.',
    detail:
      'One codebase for iOS and Android, submitted to both stores under your developer accounts. We set up the release pipeline and crash reporting so your team can ship updates after we leave.',
    bestFor: 'Products with a repeat-use case, not a brochure in an app',
    includes: [
      'Product flows and screen designs',
      'iOS and Android build from one codebase',
      'Store listings and submission',
      'Crash reporting and analytics',
      'Release pipeline your team can run',
      '90 days of fixes after launch',
    ],
    excludes: [
      'Apple and Google developer fees',
      'Backend API build (scoped as a separate platform engagement)',
      'App Store Optimisation campaigns',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Sentry'],
    timeline: '8–12 weeks',
    from: 'PKR 420,000',
    icon: 'device',
    image: '/services/app.jpg',
  },
  {
    id: 'commerce',
    index: '03',
    title: 'Shopify & ecommerce',
    summary: 'Custom Shopify themes tuned against your own funnel data.',
    problem: 'Traffic arrives, carts fill, checkout loses them.',
    detail:
      'We start in your analytics, not in Figma — find where the funnel leaks, then rebuild the theme around those steps. Custom code instead of a stack of apps, which is usually also cheaper per month.',
    bestFor: 'Stores past their first PKR 1m in sales',
    includes: [
      'Custom theme, no marketplace template',
      'Product data structure and collections',
      'Payments, shipping and tax setup',
      'Checkout and funnel review with findings',
      'App audit — we remove what we can replace',
      '30 days of fixes after launch',
    ],
    excludes: [
      'Product photography',
      'Shopify Plus licence fees',
      'Inventory and fulfilment operations',
    ],
    stack: ['Shopify', 'Liquid', 'Hydrogen', 'Klaviyo', 'GA4'],
    timeline: '4–7 weeks',
    from: 'PKR 240,000',
    icon: 'cart',
    image: '/services/commerce.jpg',
  },
  {
    id: 'brand',
    index: '04',
    title: 'Brand identity',
    summary: 'Wordmark, type and colour, delivered as a kit your team can apply.',
    problem: 'Every document your company sends out looks like a different company.',
    detail:
      'A wordmark, a type and colour system, and written rules for using them. Delivered with editable templates, so the identity survives contact with whoever makes your next social post.',
    bestFor: 'Businesses about to invest in a site, store or campaign',
    includes: [
      'Logo suite — primary, mark, lockups',
      'Type and colour system with usage rules',
      'Written guidelines, 12–20 pages',
      'Editable social and document templates',
      'All source files, fonts licensed to you',
    ],
    excludes: [
      'Trademark registration or legal search',
      'Print production and supplier management',
      'Naming (quoted separately)',
    ],
    stack: ['Figma', 'Illustrator', 'Canva templates'],
    timeline: '3–5 weeks',
    from: 'PKR 150,000',
    icon: 'mark',
    image: '/services/brand.jpg',
  },
  {
    id: 'social',
    index: '05',
    title: 'Social media',
    summary: 'Monthly content built around one measurable goal.',
    problem: 'You post consistently and it has changed nothing.',
    detail:
      'We pick one goal per quarter — enquiries, saves, store visits — and build the calendar backwards from it. The monthly report is one page and says whether the number moved.',
    bestFor: 'Brands with something to show, not just something to say',
    includes: [
      'Quarterly goal and content strategy',
      'Monthly calendar, 12–16 posts',
      'Design and copy for every post',
      'Scheduling and community replies',
      'One-page monthly report',
    ],
    excludes: [
      'Paid ad spend and campaign management',
      'Video production and on-site shoots',
      'Influencer sourcing and fees',
    ],
    stack: ['Figma', 'Later', 'Meta Suite', 'Notion'],
    timeline: 'Monthly, cancel any time',
    from: 'PKR 90,000 / mo',
    icon: 'signal',
    image: '/services/social.jpg',
  },
]

export const getService = (id: string) => SERVICES.find((s) => s.id === id)
