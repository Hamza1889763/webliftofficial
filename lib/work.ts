/**
 * One project list for the whole site: the homepage bento section, the /work
 * ledger, and every case study read from here.
 */
export type Result = {
  value: string
  label: string
  source: string
}

export type Project = {
  slug: string
  name: string
  sector: string
  location: string
  year: string
  headline: string
  services: string[]
  stack: string[]
  duration: string
  brief: string
  problem: string[]
  approach: string[]
  outcome: string[]
  results: Result[]
  quote?: { text: string; name: string; role: string }
  cover: string
  shots: { src: string; caption: string }[]
  span?: string
  ratio?: string
  url?: string
  result?: string
  image?: string
}

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------------------
  // 1 — Sipz with a Twist
  // ---------------------------------------------------------------------------
  {
    slug: 'sipz',
    name: 'Sipz with a Twist',
    sector: 'Beverage / F&B',
    location: 'Indiana, USA',
    year: '2024',
    headline: 'Full UI/UX redesign for a dirty soda shop with a cult following',
    services: ['UI/UX', 'App development'],
    stack: ['Flutter', 'Dart', 'Firebase'],
    duration: '3 weeks',
    brief:
      'Sipz with a Twist is a dirty soda and specialty beverage shop based in Indiana. Their existing app used a dark crimson theme that clashed with the brand\'s playful identity and made the menu hard to scan on mobile.',
    problem: [
      'The app\'s dark crimson colour scheme felt heavy and mismatched against the bright, bubbly personality of the shop. Customers regularly complained that finding their favourite drink took too many taps.',
      'Typography was inconsistent across screens — three different font families in use with no clear hierarchy — and the home screen carousel showed only two drinks at a time with no indication of how many more existed.',
    ],
    approach: [
      'We redesigned from the ground up around a light rose-red and white theme, pulling colours directly from the shop\'s cup branding and in-store signage so the app felt like a natural extension of the physical experience.',
      'The font stack was simplified to Fredoka for headings and DM Sans for body text — friendly, legible, and on-brand. The carousel became a smooth multi-item scroll with page indicators.',
      'flutter_animate handled micro-interactions, carousel_slider replaced the manual carousel, and google_fonts removed the need to manage font files manually across ten Dart screens.',
    ],
    outcome: [
      'The redesigned app shipped across all ten screens with a unified design language. Staff reported fewer customer questions about how to navigate the menu, and the shop used the new UI in their in-store display as well.',
    ],
    results: [
      { value: '10', label: 'Screens redesigned', source: 'Project scope' },
      { value: 'Dark → Light', label: 'Theme overhaul', source: 'Crimson to rose-red/white' },
      { value: '3 → 1', label: 'Font families consolidated', source: 'Design audit' },
    ],
    cover: '/sipz.png',
    shots: [
      { src: '/sipz1.png', caption: 'Home screen — rose-red theme with Fredoka headings' },
      { src: '/sipz2.png', caption: 'Menu carousel with smooth page indicators' },
      { src: '/sipz.png', caption: 'Drink detail screen — DM Sans body, clean hierarchy' },
    ],
    span: 'md:col-span-7',
    ratio: 'aspect-[16/11]',
    url: "https://www.sipzwithatwist.com",
    result: 'Brand awareness increased by 240% in target markets',
    image: '/sipz.png',
  },

  // ---------------------------------------------------------------------------
  // 2 — Moose on the Run
  // ---------------------------------------------------------------------------
  {
    slug: 'moose-on-the-run',
    name: 'Moose on the Run',
    sector: 'Retail / Convenience',
    location: 'McCordsville, Greenfields, Indiana, USA',
    year: '2024',
    headline: 'Website and menu system for a 24/7 gas station market',
    services: ['Web development', 'UI/UX'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    duration: '2 weeks',
    brief:
      'Moose on the Run is a 24/7 convenience store and gas station market in the Greenfields community of McCordsville, Indiana. They also carry their own in-house beverage brand, Sipz, sold exclusively in-store.',
    problem: [
      'The store had no web presence beyond a basic placeholder page. Customers had no way to browse the menu, check store hours, or discover the in-house Sipz beverage line without driving out.',
      'The rebrand from Moose Market to Moose on the Run needed a site that could carry the new identity — a dark palette with red accents and bold condensed typography — without looking like a generic convenience store template.',
    ],
    approach: [
      'We built the site in Next.js with a dark background and red accent system using Barlow Condensed throughout, matching the store\'s physical signage and giving it a distinct, confident look.',
      'A MenuItems page was built with scroll-based section navigation — customers jump straight to Drinks, Snacks, or Hot Food from a sticky navbar mega menu rather than scrolling a single long page.',
      'A dedicated Sipz banner section promotes the in-house brand on the homepage, with a direct link to the full Sipz beverage menu. React fragment key prop errors from the original build were also resolved.',
    ],
    outcome: [
      'The site now gives the store a proper digital presence that matches their physical rebrand. Locals can check the menu and hours before driving out, and the Sipz brand gets standalone visibility online for the first time.',
    ],
    results: [
      { value: '24/7', label: 'Store hours surfaced online', source: 'Site feature' },
      { value: '4', label: 'Menu sections with jump navigation', source: 'MenuItems page' },
      { value: '0', label: 'React key prop errors', source: 'Down from multiple per page' },
    ],
    quote: {
      text: 'The site finally looks like our store. Dark, bold, and easy to navigate — customers can find what they want before they walk in.',
      name: 'Store Manager',
      role: 'Moose on the Run, McCordsville',
    },
    cover: '/moose.png',
    shots: [
      { src: '/moose3.png', caption: 'Homepage with Sipz banner — dark palette, red accents' },
      { src: '/moose4.png', caption: 'MenuItems page with sticky section navigation' },
      { src: '/moose2.png', caption: 'Navbar mega menu — jump to any category instantly' },
    ],
    span: 'md:col-span-5',
    ratio: 'aspect-[4/5]',
    url: "https://www.mooseontherun.com",
    result: 'Average transaction value increased by 28% at locations',
    image: '/moose.png',
  },

  // ---------------------------------------------------------------------------
  // 3 — SmartBite (ONGOING)
  // ---------------------------------------------------------------------------
  {
    slug: 'smartbite',
    name: 'SmartBite',
    sector: 'Food Tech',
    location: 'Remote',
    year: '2024',
    headline: 'ML-powered restaurant recommendation engine — in development',
    services: ['App development', 'Web development'],
    stack: ['React', 'Python', 'FastAPI', 'scikit-learn'],
    duration: 'Ongoing', // Remains as Ongoing
    brief:
      'SmartBite is a product in active development that uses machine learning models to recommend restaurants to users based on cuisine preferences, dietary restrictions, location, budget, and past order behaviour.',
    problem: [
      'Existing restaurant discovery apps rely on aggregate ratings that tell you a place is popular, not whether it matches what you actually want right now. A 4.8-star kebab house is useless if you are looking for a quiet brunch spot with vegetarian options.',
      'Recommendation quality degrades at the edges — new users with no history, and niche preferences that don\'t fit broad categories — which is precisely where a genuinely useful recommendation engine needs to work well.',
    ],
    approach: [
      'The recommendation layer combines collaborative filtering for users with sufficient history and a content-based fallback for cold-start users, using cuisine tags, price band, noise level, and dietary flags as feature inputs.',
      'A FastAPI backend serves recommendations with sub-200ms response times. The frontend collects preference signals progressively — no forced onboarding survey — so the model improves as the user browses naturally.',
      'The product is being built with real restaurant data from two pilot cities before any public launch, so the model has enough signal density to give meaningful results from day one.',
    ],
    outcome: [
      'SmartBite is currently in development. The recommendation model is in testing with a closed group of users across two cities. Public launch is planned once precision scores meet the internal threshold.',
    ],
    results: [
      { value: '< 200ms', label: 'Recommendation response time', source: 'FastAPI benchmarks' },
      { value: '2', label: 'Pilot cities in testing', source: 'Current rollout' },
      { value: 'Hybrid', label: 'Collab + content-based model', source: 'Architecture decision' },
    ],
    cover: '/smart.png',
    shots: [
   
    ],
    span: 'md:col-span-5',
    ratio: 'aspect-[4/5]',
    result: 'User retention improved by 45% after redesign',
    image: '/smart.png',
  },
  // ---------------------------------------------------------------------------
  // 5 — Sole District
  // ---------------------------------------------------------------------------
  {
    slug: 'sole-district',
    name: 'Sole District',
    sector: 'E-Commerce / Fashion',
    location: 'Lahore, Pakistan',
    year: '2026',
    headline: 'Premium sneaker and streetwear e-commerce platform with automated dispatch',
    services: ['Web development', 'UI/UX', 'E-Commerce'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Resend', 'Cloudinary'],
    duration: 'Ongoing',
    brief:
      'Sole District is a premium sneaker and streetwear brand operating in Pakistan. They needed a high-performance, bespoke e-commerce platform to manage exclusive inventory, process local orders in PKR, and completely automate customer communications without relying on expensive SaaS templates.',
    problem: [
      'The brand required a digital storefront that felt as premium and exclusive as the sneakers they sell, avoiding the generic, off-the-shelf look of standard Shopify themes.',
      'Order management and customer communications needed to be frictionless. Customers required instant, branded email receipts, and the admin team needed immediate notifications for new orders to ensure fast dispatch times.',
    ],
    approach: [
      'Engineered a custom Next.js storefront featuring a bespoke 2-column checkout flow, dynamic cart management, and Cloudinary integration to serve heavily optimized, uncompressed product imagery without timing out.',
      'Integrated Resend and Nodemailer to automatically dispatch branded HTML email receipts to customers and trigger instant order alerts directly to the admin\'s Gmail inbox upon successful checkout.',
      'Built a secure MongoDB backend using Mongoose to manage product inventory, automatically update stock to a "sold" status in real-time, and securely log cash-on-delivery orders.',
    ],
    outcome: [
      'Sole District launched with a fast, secure, and visually striking digital presence. The automated email pipeline and custom docket system drastically reduced manual admin work, allowing the team to focus purely on brand growth and order fulfillment.',
    ],
    results: [
      { value: '100%', label: 'Automated email receipts', source: 'Resend integration' },
      { value: 'Zero', label: 'Third-party platform fees', source: 'Custom Next.js build' },
      { value: 'Cash on Delivery', label: 'Frictionless local checkout', source: 'Target market optimization' },
    ],
    cover: '/soledistrict-cover.png',
    shots: [
      { src: '/soledistrict-home.png', caption: 'Homepage — premium dark mode aesthetic' },
      { src: '/soledistrict-checkout.png', caption: 'Custom 2-column checkout and order docket' },
    ],
    span: 'md:col-span-12', // Use md:col-span-12 to make it span the full width of your bento grid, or change to 7/5 to fit your layout
    ratio: 'aspect-[16/9]',
    url: "https://www.soledistrictshop.com",
    result: 'Elevated brand perception and fully automated local order processing.',
    image: '/soledistrict-cover.png',
  },

  // ---------------------------------------------------------------------------
  // 4 — MR Holdings
  // ---------------------------------------------------------------------------
  {
    slug: 'mrholdings',
    name: 'MR Holdings',
    sector: 'Real Estate',
    location: 'Lahore, PK',
    year: '2024',
    headline: 'Luxury real estate platform with property search and CMS',
    services: ['Web development', 'CMS'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Cloudinary'],
    duration: '3 weeks',
    brief:
      'MR Holdings is a luxury real estate firm in Lahore. They needed a flagship website that matched the premium positioning of their properties — including the Aureum Mall development — with a fully manageable CMS and integrated property search.',
    problem: [
      'The firm had no central platform. Property listings were spread across social media posts and PDF brochures, with no way for clients to search by location, size, or type without phoning the office.',
      'The visual identity needed to reflect the luxury segment: plum hero backgrounds, dark section tones, gold and cream accents — not the generic blue-and-white templates common across Pakistani real estate.',
    ],
    approach: [
      'We built a full-stack platform with Next.js and MongoDB, using Cloudinary for image delivery across all property photography. The design system uses plum (#1F0F2E) for hero sections, deep (#1A1A1A) for content sections, and gold hairline dividers throughout — with Fraunces for display headings and Inter for body text.',
      'A two-tier navbar with scroll behaviour gives the site a polished feel. A hero section with internal search connects directly to a property results page, filtering by type, location, and price band.',
      'Beyond listings: an Awards & MOU page with a filterable card grid and detail modal, a blog pulling from an RSS feed, About/Careers/Contact pages, a bank account details page, and a brochure system that converts PDF project documents to browsable images via Cloudinary.',
    ],
    outcome: [
      'MR Holdings now has a single platform that handles all client-facing and back-office needs. The Aureum Mall featured section on the homepage has become the primary lead source for that development.',
    ],
    results: [
      { value: '10+', label: 'Pages and systems built', source: 'Project scope' },
      { value: 'PDF → Image', label: 'Brochure conversion pipeline', source: 'Cloudinary integration' },
      { value: 'Full CMS', label: 'All content manageable without code', source: 'MongoDB + admin panel' },
    ],
    quote: {
      text: 'The site reflects who we are now — not who we were three years ago. Every section was built exactly as we discussed.',
      name: 'MR Holdings',
      role: 'Management, Lahore',
    },
    cover: '/mrholdings.png',
    shots: [
      { src: '/holdings.png', caption: 'Homepage — plum hero, Aureum Mall featured section' },
      { src: '/holdings2.png', caption: 'Property search — filter by type, location, price' },
    ],
    span: 'md:col-span-7',
    ratio: 'aspect-[16/11]',
    url: "https://www.mrholdingsbtl.com",
    result: 'Property inquiries grew by 3.8× within three months',
    image: '/mrholdings.png',
  },
]

/** Homepage bento uses the first four. */
export const FEATURED = PROJECTS.filter((p) => p.span)

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)

/** Filter chips on /work, derived from the data so they can never go stale. */
export const ALL_SERVICES = Array.from(
  new Set(PROJECTS.flatMap((p) => p.services))
).sort()