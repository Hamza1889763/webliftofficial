/**
 * One project list for the whole site: the homepage bento section, the /work
 * ledger, and every case study read from here. Previously the homepage held its
 * own copy, so the two could disagree about what you'd shipped.
 *
 * `results` is the part that earns the page. A portfolio proves you can produce
 * a screenshot; a number proves you moved something.
 */
export type Result = {
  /** Keep short — this is set at display size. */
  value: string
  label: string
  /** How it was measured. Vague metrics read as invented, because usually they are. */
  source: string
}

export type Project = {
  slug: string
  name: string
  sector: string
  location: string
  year: string
  /** Shown in the homepage grid and the ledger row. One line, past tense. */
  headline: string
  services: string[]
  stack: string[]
  duration: string
  /** Case study body. */
  brief: string
  problem: string[]
  approach: string[]
  outcome: string[]
  results: Result[]
  quote?: { text: string; name: string; role: string }
  cover: string
  shots: { src: string; caption: string }[]
  /** Bento span for the homepage grid. Only the first four need these. */
  span?: string
  ratio?: string
  /** Live site, if it's public. */
  url?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'meridian',
    name: 'Meridian Interiors',
    sector: 'Interior design',
    location: 'Dubai, UAE',
    year: '2025',
    headline: 'Enquiries up 3.1× in the first quarter after launch',
    services: ['Web development', 'Brand identity'],
    stack: ['Next.js', 'Sanity', 'Vercel'],
    duration: '7 weeks',
    brief:
      'A studio with fifteen years of completed projects and a website that showed four of them, behind a contact form nobody submitted.',
    problem: [
      'Meridian were winning work almost entirely by referral. Their site ranked for their own name and nothing else, and the portfolio — the single reason anyone visits an interior design studio online — sat three clicks deep behind a gallery plugin that took eleven seconds to load on mobile.',
      'The enquiry form asked for eleven fields including budget range, which is the question a prospective client is least willing to answer before they trust you.',
    ],
    approach: [
      'We rebuilt the site around the portfolio rather than around a homepage. Every project became its own indexable page with real photography, materials used, and square footage — the details clients actually search for.',
      'The enquiry form went from eleven fields to three: name, contact, and what room. Budget is a conversation, not a form field.',
      'Image delivery moved to responsive AVIF with blur placeholders, which took the mobile portfolio from 11s to under 2s on a throttled 4G connection.',
    ],
    outcome: [
      'The site now ranks on the first page for eight project-type searches it previously had no presence for. Two thirds of enquiries arrive from pages that did not exist before the rebuild.',
    ],
    results: [
      { value: '3.1×', label: 'Enquiries per month', source: 'CRM, Q1 2025 vs Q1 2024' },
      { value: '11s → 1.8s', label: 'Mobile portfolio load', source: 'Lighthouse, throttled 4G' },
      { value: '61% → 34%', label: 'Bounce rate', source: 'GA4, 90 days post-launch' },
    ],
    quote: {
      text: 'They pushed back on half of what we asked for, and they were right every time. The site does one job now instead of eight.',
      name: 'Aizaz Ahmad',
      role: 'Principal, Meridian Interiors',
    },
    cover: '/work/meridian/cover.jpg',
    shots: [
      { src: '/work/meridian/01.jpg', caption: 'Project index — filterable by room, material and scale' },
      { src: '/work/meridian/02.jpg', caption: 'Case study template, built for photography first' },
      { src: '/work/meridian/03.jpg', caption: 'Three-field enquiry, down from eleven' },
    ],
    span: 'md:col-span-7',
    ratio: 'aspect-[16/11]',
    url: 'https://meridian.example',
  },
  {
    slug: 'saffra',
    name: 'Saffra',
    sector: 'Ecommerce',
    location: 'Lahore, PK',
    year: '2025',
    headline: 'Checkout completion from 41% to 68%',
    services: ['Shopify & ecommerce'],
    stack: ['Shopify', 'Liquid', 'Klaviyo'],
    duration: '5 weeks',
    brief:
      'A growing modest-wear label losing three in five customers between cart and confirmation.',
    problem: [
      'Saffra had reached PKR 1.4m a month on a marketplace theme held together by fourteen apps. Each app added script weight; together they pushed the cart page past six seconds on mobile, where 88% of their traffic came from.',
      'The checkout asked for a full billing address before showing shipping cost — so customers discovered the delivery charge after committing effort, which is the most reliable way to lose them.',
    ],
    approach: [
      'We audited every app against what it actually did, replaced nine of them with theme code, and cancelled PKR 31,000 a month in subscriptions in the process.',
      'Shipping cost moved to the product page. Cash on delivery — still 70% of Pakistani ecommerce orders — became the first payment option rather than the last.',
      'The theme was rebuilt around a single-column mobile checkout with address autofill for the six cities that make up most of their volume.',
    ],
    outcome: [
      'Checkout completion rose 27 points in the first eight weeks, and the app savings alone covered a third of the project cost within a year.',
    ],
    results: [
      { value: '+27 pts', label: 'Checkout completion', source: 'Shopify analytics, 8 weeks' },
      { value: 'PKR 31k/mo', label: 'App costs removed', source: 'Subscription audit' },
      { value: '6.2s → 1.4s', label: 'Cart page, mobile', source: 'Lighthouse, throttled 4G' },
    ],
    quote: {
      text: 'We had a theme held together with apps. They rebuilt the storefront and our checkout stopped losing people.',
      name: 'Hina Qureshi',
      role: 'Head of ecommerce, Saffra',
    },
    cover: '/work/saffra/cover.jpg',
    shots: [
      { src: '/work/saffra/01.jpg', caption: 'Product page with shipping shown before the cart' },
      { src: '/work/saffra/02.jpg', caption: 'Single-column mobile checkout, COD first' },
      { src: '/work/saffra/03.jpg', caption: 'Collection grid rebuilt in theme code' },
    ],
    span: 'md:col-span-5',
    ratio: 'aspect-[4/5]',
  },
  {
    slug: 'northbay',
    name: 'Northbay Logistics',
    sector: 'B2B platform',
    location: 'Karachi, PK',
    year: '2024',
    headline: 'Manual dispatch entry cut by 14 hours a week',
    services: ['Web development', 'App development'],
    stack: ['Next.js', 'Supabase', 'React Native'],
    duration: '11 weeks',
    brief:
      'A freight operator running 200 daily consignments through a shared spreadsheet and a WhatsApp group.',
    problem: [
      'Every consignment was entered twice — once by the dispatcher in a spreadsheet, once by the driver in a WhatsApp message that someone later transcribed. Errors surfaced days later, usually as a billing dispute.',
      'There was no way for a client to check where their freight was without phoning the office, which consumed most of two people\u2019s afternoons.',
    ],
    approach: [
      'A dispatch dashboard replaced the spreadsheet, with a driver app that captures pickup and delivery with a photo and a timestamp. Entry happens once, at the point it occurs.',
      'Clients got a tracking link per consignment — no login, just a signed URL — which removed the phone calls without building a customer portal nobody would have adopted.',
      'The whole thing runs on Supabase with row-level security, so Northbay pay under USD 30 a month in infrastructure.',
    ],
    outcome: [
      'Double entry is gone. The two staff who spent afternoons on the phone now handle client onboarding instead.',
    ],
    results: [
      { value: '14 hrs/wk', label: 'Admin time returned', source: 'Time audit, month 3' },
      { value: '0', label: 'Duplicate entries', source: 'Down from ~40/week' },
      { value: '< $30/mo', label: 'Running cost', source: 'Supabase + Vercel' },
    ],
    quote: {
      text: 'The staging link updated every day. I have never worked with an agency where I could see progress without asking for it.',
      name: 'Omar Sheikh',
      role: 'Operations director, Northbay',
    },
    cover: '/work/northbay/cover.jpg',
    shots: [
      { src: '/work/northbay/01.jpg', caption: 'Dispatch board — 200 consignments at a glance' },
      { src: '/work/northbay/02.jpg', caption: 'Driver app, built for one hand and poor signal' },
      { src: '/work/northbay/03.jpg', caption: 'Client tracking link, no login required' },
    ],
    span: 'md:col-span-5',
    ratio: 'aspect-[4/5]',
  },
  {
    slug: 'olive-house',
    name: 'Olive House',
    sector: 'Hospitality',
    location: 'Abu Dhabi, UAE',
    year: '2024',
    headline: 'Direct bookings overtook third-party in five months',
    services: ['Web development', 'Brand identity'],
    stack: ['Next.js', 'Sanity', 'Cloudbeds'],
    duration: '8 weeks',
    brief:
      'A twenty-two room boutique hotel paying 18% commission on nearly every booking.',
    problem: [
      'Olive House took 84% of bookings through third-party platforms. Their own site had a booking widget that opened in a new tab, lost the room selection, and could not show a total price until the final step.',
      'Guests who found them on a platform had no reason to book direct, because the direct route was harder and no cheaper.',
    ],
    approach: [
      'Direct booking was rebuilt inline — room, dates and total price on one page, no redirect. The engine stayed the same; only the surface changed.',
      'A direct-only rate, 8% below platform price, was made visible on every room card. Half the commission, passed to the guest.',
      'The identity work gave the property a reason to be found by name: a wordmark, photography direction, and a set of room pages worth linking to.',
    ],
    outcome: [
      'Direct bookings passed platform bookings in month five and have stayed ahead since. On current volume the commission saved pays for the project roughly every eleven weeks.',
    ],
    results: [
      { value: '16% → 54%', label: 'Direct booking share', source: 'PMS, months 1–5' },
      { value: '11 weeks', label: 'Commission saved to cover build', source: 'At current volume' },
      { value: '4 steps → 1', label: 'Booking flow', source: 'Direct reservation path' },
    ],
    cover: '/work/olive-house/cover.jpg',
    shots: [
      { src: '/work/olive-house/01.jpg', caption: 'Inline booking — room, dates, total on one page' },
      { src: '/work/olive-house/02.jpg', caption: 'Room pages built to rank by name' },
      { src: '/work/olive-house/03.jpg', caption: 'Identity and photography direction' },
    ],
    span: 'md:col-span-7',
    ratio: 'aspect-[16/11]',
  },
  {
    slug: 'zenith-clinic',
    name: 'Zenith Dental',
    sector: 'Healthcare',
    location: 'Lahore, PK',
    year: '2024',
    headline: 'Online appointment bookings from zero to 140 a month',
    services: ['Web development'],
    stack: ['Next.js', 'Sanity', 'Twilio'],
    duration: '4 weeks',
    brief: 'A three-chair dental practice taking every appointment by phone.',
    problem: [
      'The practice fielded roughly 60 booking calls a week, most outside consulting hours and many missed. There was no online option at all.',
    ],
    approach: [
      'A booking flow tied to the practice calendar, with SMS confirmation and a reminder 24 hours ahead. Urdu and English throughout, since roughly half of enquiries came in Urdu.',
      'Treatment pages were written to answer the questions people actually search — cost, pain, recovery time — rather than to list equipment.',
    ],
    outcome: [
      'Missed-call bookings effectively disappeared. No-shows fell by more than a third once SMS reminders were running.',
    ],
    results: [
      { value: '140/mo', label: 'Online bookings', source: 'Booking system, month 6' },
      { value: '−38%', label: 'No-show rate', source: 'Practice records, 6 months' },
    ],
    cover: '/work/zenith-clinic/cover.jpg',
    shots: [
      { src: '/work/zenith-clinic/01.jpg', caption: 'Booking flow in Urdu and English' },
      { src: '/work/zenith-clinic/02.jpg', caption: 'Treatment pages written around real searches' },
    ],
  },
  {
    slug: 'kaya-studio',
    name: 'Kaya Studio',
    sector: 'Brand identity',
    location: 'Sharjah, UAE',
    year: '2024',
    headline: 'A full identity system delivered in three weeks',
    services: ['Brand identity', 'Social media'],
    stack: ['Figma', 'Canva templates'],
    duration: '3 weeks',
    brief: 'A ceramics studio whose every touchpoint looked like a different business.',
    problem: [
      'Kaya had grown from a market stall to a workshop with staff, and the visual identity had grown by accident — four typefaces, three logo versions, and social posts made by whoever was free.',
    ],
    approach: [
      'A single wordmark with three lockups, a two-typeface system, and a colour palette drawn from their own glazes rather than a trend deck.',
      'The deliverable that mattered was a set of editable Canva templates, so the studio could keep making posts without keeping a designer.',
    ],
    outcome: [
      'Nine months on the identity is still being applied correctly, which is the only real test of a brand kit.',
    ],
    results: [
      { value: '3 weeks', label: 'Brief to delivery', source: 'Project record' },
      { value: '24', label: 'Editable templates shipped', source: 'Handover pack' },
    ],
    cover: '/work/kaya-studio/cover.jpg',
    shots: [
      { src: '/work/kaya-studio/01.jpg', caption: 'Wordmark and lockups' },
      { src: '/work/kaya-studio/02.jpg', caption: 'Palette drawn from the studio glazes' },
      { src: '/work/kaya-studio/03.jpg', caption: 'Editable templates for the studio team' },
    ],
  },
]

/** Homepage bento uses the first four. */
export const FEATURED = PROJECTS.filter((p) => p.span)

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)

/** Filter chips on /work, derived from the data so they can never go stale. */
export const ALL_SERVICES = Array.from(
  new Set(PROJECTS.flatMap((p) => p.services))
).sort()
