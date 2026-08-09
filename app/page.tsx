import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import Capability from '@/components/sections/Capability'
import Ascent from '@/components/sections/Ascent'
import Voices from '@/components/sections/Voices'
import Questions from '@/components/sections/Questions'
import Brief from '@/components/sections/Brief'
import Altimeter from '@/components/chrome/Altimeter'
import Preloader from '@/components/chrome/Preloader'
/**
 * Storytelling order, and the tonal grounds alternate so no two adjacent
 * sections share a background:
 *
 *   ink   Hero          the thesis
 *   gold  Ticker        the tonal cut
 *   mist  Services      what we do, priced
 *   ink   Work          proof it works
 *   ink   Capability    why us, on the same ground so it reads as one chapter
 *   mist  Ascent        how it runs
 *   ink   Voices        third-party proof
 *   mist  Pricing       the numbers
 *   mist  Questions     objection handling, same chapter as pricing
 *   ink   Brief         the ask
 */
export default function Home() {
  return (
    <>
    <Altimeter />
      <Hero />
      <Ticker />
      <Services />
      <Work />
      <Capability />
      <Ascent />
      <Voices />
      <Questions />
      <Brief />
    </>
  )
}
