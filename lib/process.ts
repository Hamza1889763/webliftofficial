/**
 * One process definition for the site: the homepage Ascent section and /process
 * both read from here.
 *
 * `owner` is what makes the schedule grid worth building. Most agency timelines
 * show only what the agency does, which hides the real cause of overruns — the
 * client-owned tasks nobody scheduled. Here they're on the same chart.
 */
export type Owner = 'studio' | 'client' | 'shared'

/* ==========================================================================
   IMAGES — every URL on the page lives here, so swapping the whole set is one
   edit rather than a hunt through JSX.
   --------------------------------------------------------------------------
   These are Unsplash CDN URLs. Two things before launch:

   1. VERIFY EACH ONE. Open the URL and check the photo is what the phase
      needs. Photo IDs are opaque — nobody can tell what one depicts by
      reading it.
   2. REPLACE THEM. Download the ones you keep to /public/process/ and change
      these strings to local paths ('/process/design.jpg'). Hotlinking leaves
      your page dependent on a third party you don't control, and Unsplash
      serves no cache headers you can rely on.

   While they're remote, next.config.ts needs:
     images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
   ========================================================================== */

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const IMAGES = {
  /** Wide, low-detail, works under heavy grading and text. */
  header: U('1497366754035-f200968a6e72', 2000),
  /** Warm, human, no faces close enough to identify. */
  cta: U('1497366811353-6870744d04b2', 2000),
  phase: {
    scope: U('1517048676732-d65bc937f952'),
    structure: U('1531403009284-440f080d1e12'),
    content: U('1493printed'), // ← intentionally invalid, see note below
    design: U('1561070791-2526d30994b5'),
    build: U('1517694712202-14dd9538aa97'),
    launch: U('1454165804606-c3d57bc86b40'),
  },
} as const

/*  NOTE ON `content`: I left a deliberately broken ID there rather than guess.
    The content phase is your client's own copy and photography, so the image
    should show *their* material being gathered — a shoot, a folder of product
    shots, notes. Pick that one yourself; a generic stock photo undercuts the
    one row on the chart you most want a client to take seriously.            */

export type Phase = {
  id: keyof typeof IMAGES.phase
  /** Human label, e.g. 'Weeks 2–3'. Derived text, not used for layout. */
  week: string
  /** Zero-indexed inclusive week range, used to place the bar on the grid. */
  start: number
  end: number
  owner: Owner
  title: string
  /** One line, used on the homepage timeline. */
  body: string
  /** Longer detail, /process only. */
  detail: string
  /** What we need from you before this phase can finish. */
  from: string[]
  /** What you have in your hands when it ends. */
  gives: string[]
  /** Alt text. Describes the photo, not the phase — the heading already says that. */
  alt: string
}

export const WEEKS = ['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6'] as const

export const PHASES: Phase[] = [
  {
    id: 'scope',
    week: 'Week 0',
    start: 0,
    end: 0,
    owner: 'shared',
    title: 'Scope call',
    body: 'Forty-five minutes on what the site has to achieve and what it must not break.',
    detail:
      'One call, forty-five minutes, no deck. We want to know which number you are trying to move, what you have tried already, and what in your current setup absolutely cannot break. Then we go away and write it down.',
    from: ['Your goal, in one sentence', 'Access to current analytics', 'Brand assets, if any exist'],
    gives: ['Written scope', 'Fixed price', 'A launch date and the conditions attached to it'],
    alt: 'Two people talking across a table with notes between them',
  },
  {
    id: 'structure',
    week: 'Week 1',
    start: 1,
    end: 1,
    owner: 'studio',
    title: 'Structure',
    body: 'Sitemap, page flows and copy direction agreed in writing before anything is designed.',
    detail:
      'The cheapest week to change your mind. We map every page, what each one argues, and the single action it asks for. You see this as a document, not a design — because arguing about layout while the structure is still wrong wastes both our time.',
    from: ['One round of feedback, within three working days'],
    gives: ['Sitemap', 'Page-by-page outline', 'Copy direction per page'],
    alt: 'Hand-drawn page flows and boxes sketched on paper',
  },
  {
    id: 'content',
    week: 'Weeks 2–5',
    start: 2,
    end: 5,
    owner: 'client',
    title: 'Your content',
    body: 'Copy, photography and product data, gathered while we design and build.',
    detail:
      'This runs the whole length of the project and it is the single most common reason launches slip. It is on the chart for that reason. We will give you a checklist in week 1 with a deadline per item, and we will chase you — politely, but we will chase.',
    from: ['Final copy, or a brief for us to write it', 'Photography', 'Product or service data'],
    gives: ['A checklist with per-item deadlines', 'A shared folder and a weekly nudge'],
    alt: 'Product photographs laid out and being selected',
  },
  {
    id: 'design',
    week: 'Weeks 2–3',
    start: 2,
    end: 3,
    owner: 'studio',
    title: 'Design',
    body: 'Two key screens first, then the rest once the direction is signed off.',
    detail:
      'We design the two hardest screens before anything else — usually the homepage and whichever page does the actual converting. You review them in a browser at real sizes, not as flat images in a slide. Once the direction is signed off, the remaining pages follow quickly because the system already exists.',
    from: ['Sign-off on direction after round one', 'Two rounds of feedback total'],
    gives: ['Key screens in-browser', 'Full page set', 'Design system and component inventory'],
    alt: 'Type specimens and colour swatches arranged on a surface',
  },
  {
    id: 'build',
    week: 'Weeks 3–5',
    start: 3,
    end: 5,
    owner: 'studio',
    title: 'Build',
    body: 'Components, content and integrations, on a staging link that updates daily.',
    detail:
      'Build overlaps design deliberately — the component library starts while the last pages are still being drawn. You get a staging URL on day one of this phase and it updates as we commit, so progress is something you can check rather than something you have to ask about.',
    from: ['Remaining content', 'Access to any third-party accounts we integrate'],
    gives: ['Staging link, updated daily', 'Working integrations', 'CMS you can edit'],
    alt: 'A code editor open on a screen in a dim room',
  },
  {
    id: 'launch',
    week: 'Week 6',
    start: 6,
    end: 6,
    owner: 'shared',
    title: 'Launch',
    body: 'Performance and accessibility pass, redirects, analytics, then live.',
    detail:
      'A checked list, not a leap: Lighthouse and accessibility pass on a throttled connection, every old URL redirected, analytics and conversion tracking verified with a real test event. Then we go live, together, at a time you choose — not on a Friday evening.',
    from: ['Final approval', 'DNS access, or someone who has it on the call'],
    gives: ['Live site', 'Redirect map', 'Analytics verified', '30 days of fixes, starting now'],
    alt: 'A dashboard of graphs on a monitor',
  },
]

/** Client-owned rows, used for the summary count on /process. */
export const CLIENT_PHASES = PHASES.filter((p) => p.owner === 'client')

export const getPhase = (id: string) => PHASES.find((p) => p.id === id)

/**
 * What actually causes overruns, and what we do about each. Published for the
 * same reason the services page publishes exclusions — naming the failure mode
 * in advance is what stops it becoming an argument later.
 */
export const RISKS = [
  {
    cause: 'Content arrives late',
    effect: 'The most common cause of a slipped launch, by a wide margin.',
    fix: 'A checklist in week 1 with a deadline per item, and a weekly nudge. If content is more than two weeks late we pause and reschedule rather than compress the build.',
  },
  {
    cause: 'Feedback comes from six people',
    effect: 'Contradictory notes stall a phase for days.',
    fix: 'One named approver on your side. Others can comment; one person decides.',
  },
  {
    cause: 'Scope grows mid-build',
    effect: 'A new page or integration lands after the structure is locked.',
    fix: 'We quote it as an addition with its own price and date. Nothing is absorbed silently, and nothing delays the original launch.',
  },
  {
    cause: 'Third-party access is missing',
    effect: 'Payment gateways and DNS registrars can take days to unlock.',
    fix: 'We list every account we will need in week 1, so the waiting happens in parallel rather than at the end.',
  },
] as const