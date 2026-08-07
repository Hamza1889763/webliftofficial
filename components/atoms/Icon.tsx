/**
 * Custom icon set. Drawn on a shared 24px grid with a 1.6 stroke and round
 * caps so they sit together as a family. The WhatsApp mark is the real glyph —
 * the previous generic chat bubble misrepresented the primary contact channel.
 */
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export type IconName =
  | 'whatsapp'
  | 'instagram'
  | 'arrow'
  | 'plus'
  | 'code'
  | 'device'
  | 'cart'
  | 'mark'
  | 'signal'

export default function Icon({
  name,
  size = 20,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
    focusable: false as const,
  }

  switch (name) {
    case 'whatsapp':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.42 1.31-1.96 1.36-.54.05-1.03.19-3.5-.83-2.98-1.23-4.85-4.35-5-4.56-.14-.2-1.18-1.62-1.18-3.09s.76-2.18 1.03-2.48c.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.34 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.16 1.4Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common} {...S}>
          <rect x="3" y="3" width="18" height="18" rx="5.4" />
          <circle cx="12" cy="12" r="3.9" />
          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...common} {...S}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common} {...S}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'code':
      return (
        <svg {...common} {...S}>
          <path d="M8.5 8 4 12l4.5 4M15.5 8 20 12l-4.5 4M13.4 5.2l-2.8 13.6" />
        </svg>
      )
    case 'device':
      return (
        <svg {...common} {...S}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
          <path d="M10.6 5.4h2.8" />
          <path d="M12 18.2h.01" />
        </svg>
      )
    case 'cart':
      return (
        <svg {...common} {...S}>
          <path d="M3 4h2.2l1.9 10.4a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.3L20 7.4H6.2" />
          <circle cx="9.4" cy="19.4" r="1.3" />
          <circle cx="16.9" cy="19.4" r="1.3" />
        </svg>
      )
    case 'mark':
      return (
        <svg {...common} {...S}>
          <path d="M12 3.2 20 20H4l8-16.8Z" />
          <path d="M12 10.4 15.6 18H8.4L12 10.4Z" />
        </svg>
      )
    case 'signal':
      return (
        <svg {...common} {...S}>
          <path d="M4 20V14M9.3 20V9M14.7 20v-7.4M20 20V4" />
        </svg>
      )
  }
}
