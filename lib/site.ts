/** Single source of truth for content the whole site shares. */
export const SITE = {
  name: 'WebLifts',
  tagline: 'Digital studio',
  email: 'webliftofficial@gmail.com',
  phone: '+92 303 4258433',
  whatsapp: 'https://wa.me/923068999247',
  instagram:
    'https://www.instagram.com/webliftofficial924?igsh=NTJkZXNrNWoxeDRo&utm_source=qr',
  instagramHandle: '@webliftofficial924',
  base: 'Lahore, PK',
  timezone: 'Asia/Karachi',
} as const

/**
 * Sections double as the altimeter's tick marks and the nav's link set, so
 * order and labels live in exactly one place. `alt` is the altitude readout
 * shown on the rail — it encodes scroll depth, which is real information.
 */
export const SECTIONS = [
  { id: 'top', label: 'Top', alt: '000', theme: 'dark' },
  { id: 'services', label: 'Services', alt: '020', theme: 'mist' },
  { id: 'work', label: 'Work', alt: '038', theme: 'dark' },
  { id: 'capability', label: 'Capability', alt: '052', theme: 'dark' },
  { id: 'ascent', label: 'Process', alt: '066', theme: 'mist' },
  { id: 'voices', label: 'Clients', alt: '078', theme: 'dark' },
  { id: 'pricing', label: 'Pricing', alt: '086', theme: 'mist' },
  { id: 'questions', label: 'FAQ', alt: '094', theme: 'mist' },
  { id: 'brief', label: 'Start', alt: '100', theme: 'dark' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
