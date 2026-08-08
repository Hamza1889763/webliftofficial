import type { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import Availability from '@/components/contact/Availability'
import Brief from '@/components/sections/Brief'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact — Weblifts',
  description:
    'Reach the Weblifts studio directly — WhatsApp, email, phone or the project brief form. Based in Lahore, working across Pakistan and the Gulf.',
}

/**
 * Grounds alternate the same way the rest of the site does:
 *
 *   ink   ContactHero   the ask, and every direct channel, up front
 *   mist  Availability  practical info before the form
 *   ink   Brief         the form itself (reused from the homepage)
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Availability />
      <Brief />
      <Footer />
    </>
  )
}