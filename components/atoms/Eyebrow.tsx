/**
 * Section label. The leading index is a real position in the page sequence and
 * matches the altimeter rail, so the numbering carries information.
 */
export default function Eyebrow({
  index,
  children,
  tone = 'dark',
}: {
  index: string
  children: React.ReactNode
  tone?: 'dark' | 'light'
}) {
  const accent = tone === 'dark' ? 'text-gold' : 'text-bronze'
  const body = tone === 'dark' ? 'text-on-ink-mute' : 'text-on-mist-mute'
  const rule = tone === 'dark' ? 'bg-white/14' : 'bg-on-mist/12'

  return (
    <div className="mb-7 flex items-center gap-4">
      <span className={`mono ${accent}`}>{index}</span>
      <span aria-hidden className={`h-px w-10 ${rule}`} />
      <span className={`mono ${body}`}>{children}</span>
    </div>
  )
}
