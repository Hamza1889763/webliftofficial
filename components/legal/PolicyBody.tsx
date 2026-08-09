'use client'

export type PolicySection = {
  id: string
  title: string
  paragraphs: string[]
  list?: string[]
}

export default function PolicyBody({
  intro,
  sections,
}: {
  intro?: string
  sections: PolicySection[]
}) {
  return (
    <section className="on-mist py-[clamp(3rem,8vh,6rem)]">
      <div className="shell">
        {intro && (
          <p className="max-w-[68ch] text-s1 leading-[1.7] text-on-mist-mute">{intro}</p>
        )}

        <div className={`grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20 ${intro ? 'mt-12' : ''}`}>
          {/* Table of contents — desktop only, sticky alongside the prose */}
          <nav aria-label="On this page" className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <span className="mono text-on-mist-mute">On this page</span>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-s-1 text-on-mist-mute transition-colors duration-300 hover:text-on-mist"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((s, i) => (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <span className="mono text-bronze">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display mt-2 max-w-[36ch] text-[clamp(1.3rem,2.4vw,1.8rem)] text-on-mist">
                  {s.title}
                </h2>
                <div className="mt-4 max-w-[62ch] space-y-4 text-s-1 leading-[1.7] text-on-mist-mute">
                  {s.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="ml-1 list-disc space-y-2 pl-4 marker:text-bronze">
                      {s.list.map((item, li) => (
                        <li key={li}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}