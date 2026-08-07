# WebLifts — rebuild

A ground-up redesign, not a restyle. Same brand hexes, same business, same
WhatsApp-first conversion path; everything else is new.

---

## The concept

The name is *WebLifts*, so **ascent** is the organising idea and it shows up as
structure rather than decoration:

- **The altimeter rail** (`components/chrome/Altimeter.tsx`) — the signature
  element. A fixed hairline on the left edge with a tick per section, a gold
  indicator that tracks scroll, and a live mono altitude readout. It is a real
  navigation control, so its numbering encodes position instead of ornamenting
  the page. Collapses to a 1px progress line in the nav below `lg`.
- **One reveal, everywhere.** Every heading rises out of a hard mask edge; every
  card rises on the same `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing on this site
  slides sideways. One orchestrated motion idea beats twelve scattered effects.
- **The process section applies the same gesture to time** — a gold line that
  fills as you scroll through the six weeks.

## What changed from the original

| Original | Now | Why |
|---|---|---|
| Montserrat `font-black` on every element | Bricolage Grotesque (display, variable width axis) + Instrument Sans (body, 400/500) + JetBrains Mono (data) | Nothing had hierarchy because everything shouted |
| White-dominant, teal as accent | Ink-dominant, mist as relief, teal for surfaces | The white/teal/gold ratio is what made it read as a template |
| Gold as a large fill in 3 consecutive sections | Gold as a fill **exactly once** (the ticker), otherwise 1px edges and small accents | Used everywhere, gold stopped meaning "important" |
| 6 sections of identical `bg-white py-32 border-t` | Alternating ink/mist grounds, authored transitions, no two adjacent sections match | Scroll fatigue set in around Process |
| `navbar.tsx` + byte-identical `servicesNavbar.tsx` | One `Nav`, palette auto-inverts per ground | — |
| Service list with no scope or price | Scope, deliverables and a starting figure per service; a published pricing section in PKR/USD | The biggest conversion gap in the original |
| "TRUSTED BY 50+ BRANDS" over A/B/C/D placeholder avatars | Three real figures with sources | Placeholder social proof is worse than none |
| Cards described in adjectives ("PREMIUM DESIGN") | Cards describe outcomes ("Checkout completion 41% → 68%") | — |
| Footer links all `href="#"`, `text-white/25` (fails AA) | Real destinations, AA-compliant text | — |
| No focus styles, no reduced-motion, generic chat-bubble "WhatsApp" icon | Global `:focus-visible`, motion honoured in CSS *and* per component, real WhatsApp glyph | — |

Two rendering bugs from the original are fixed rather than carried over: the
hero's secondary button declared `border-[#F7C63D]` **and**
`border-[#083A39]/30` so the gold outline never painted, and `GrainOverlay` sat
at `z-[70]` above the nav with `mix-blend-overlay` on white, where it was
invisible.

---

## Design tokens

All colours live once, in `app/globals.css`, as space-separated RGB channels so
Tailwind's `/opacity` modifier reads the same values the raw CSS does.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#04211F` | deepest ground — hero, work, brief |
| `teal` | `#083A39` | brand mid — cards, form surface |
| `teal-lift` | `#0D4C4A` | raised surface on ink |
| `mist` | `#EDF2F0` | cool relief ground (deliberately not cream) |
| `paper` | `#FAFCFB` | raised surface on mist |
| `gold` | `#F7C63D` | accent — brand, unchanged |
| `bronze` | `#B8871A` | the same accent, AA-safe on light grounds |

Type roles are `.display` / `.display--wide` / `.display--narrow`, `.lede`,
`.mono`. Sizes are a fluid 7-step `clamp()` scale (`--step--1` … `--step-5`).

---

## Install

```bash
npm i next react react-dom framer-motion lenis
npm i -D tailwindcss postcss autoprefixer typescript @types/react @types/node
```

Requires Next.js 14+ (App Router) and Tailwind 3.4+. Fonts come from
`next/font/google` — self-hosted at build time, no runtime request, no layout
shift.

Copy `app/`, `components/`, `lib/` and `tailwind.config.ts` into the project.
The imports assume the `@/*` path alias:

```json
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
```

## Assets expected in `/public`

```
heromain.mp4            hero background (also add hero-poster.jpg)
webdev.mp4  appdev.mp4  shopify.mp4  branding.mp4  socialmedia.mp4
posters/*.jpg           one poster per service video
work/meridian.jpg  work/saffra.jpg  work/northbay.jpg  work/olive.jpg
og.jpg                  1200×630 social card
```

Service videos are `preload="none"` and only the active one is mounted, so the
page ships one video on first paint. The two lead case-study images are eager;
the rest lazy-load via `next/image`.

## Placeholder content to replace

Project names, results, testimonials, prices and the three hero figures are
plausible placeholders. **Swap them for real numbers before launch** — invented
metrics are the one thing that will undo the credibility the rest of the design
is buying.

## Performance notes

- One `IntersectionObserver` serves both the nav's colour inversion and the
  altimeter (`providers/useActiveSection.ts`), not one per component.
- Mouse parallax runs through a single `requestAnimationFrame`, is pointer-only,
  and never touches React state — it writes to Framer motion values.
- Lenis is dynamically imported and skipped entirely under
  `prefers-reduced-motion`, so it never reaches those users' bundles.
- Marquee and parallax animate `transform` only. No layout-triggering properties
  animate anywhere on the page.

## Accessibility

- Global `:focus-visible` ring in gold at 3px offset.
- `prefers-reduced-motion` handled globally in CSS *and* branched in
  `Lift`, `Reveal`, `Magnetic`, `Preloader` and both parallax surfaces.
- Masked text keeps the full string on one element via `aria-label`; the visual
  fragments are `aria-hidden`, so screen readers get sentences, not word soup.
- Skip link, `aria-expanded` on all disclosures, `aria-modal` + Escape + scroll
  lock on the mobile sheet, `role="status"` `aria-live` on the form.
- Case-study result lines are visible on touch and hover-enhanced on pointer —
  no content is hover-only.

## One thing I'd push further

The `Work` grid is currently four static case studies. The next version should
pin the section and scrub through project frames horizontally on vertical
scroll — that's the natural home for a GSAP `ScrollTrigger` pin, and it's the
one section here still recognisable as a grid of cards.
