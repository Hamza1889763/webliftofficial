'use client'

import Magnetic from './Magnetic'

type Variant = 'gold' | 'outline-light' | 'ink' | 'outline-dark'

const base =
  'group relative inline-flex items-center gap-3 rounded-full px-8 py-4 mono ' +
  'transition-[background-color,color,box-shadow] duration-500 ease-lift ' +
  'disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  // Primary. Gold as a small, high-intent surface only.
  gold: 'bg-gold text-ink shadow-[0_14px_34px_-14px_rgb(247_198_61_/_0.55)] hover:shadow-[0_20px_48px_-14px_rgb(247_198_61_/_0.7)]',
  // Secondary on dark. Fixes the original's conflicting border classes.
  'outline-light':
    'text-on-ink ring-1 ring-inset ring-white/22 hover:ring-gold/70 hover:text-gold',
  ink: 'bg-ink text-on-ink hover:bg-teal',
  'outline-dark':
    'text-on-mist ring-1 ring-inset ring-on-mist/18 hover:ring-bronze/60 hover:text-bronze',
}

type Props = {
  children: React.ReactNode
  variant?: Variant
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  external?: boolean
  className?: string
  magnetic?: boolean
}

/**
 * One button component for the whole site. The trailing rule that extends on
 * hover is the shared micro-detail — it echoes the altimeter's tick marks.
 */
export default function Button({
  children,
  variant = 'gold',
  href,
  type = 'button',
  onClick,
  external,
  className = '',
  magnetic = true,
}: Props) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 h-px w-4 bg-current opacity-45 transition-all duration-500 ease-lift group-hover:w-8 group-hover:opacity-100"
      />
    </>
  )

  const cls = `${base} ${variants[variant]} ${className}`

  const el = href ? (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  )

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}
