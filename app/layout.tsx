import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import SmoothScroll from '@/components/providers/SmoothScroll'
import Grain from '@/components/atoms/Grain'
import Nav from '@/components/chrome/Nav'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'wdth'],
  variable: '--font-display',
})

const body = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://weblifts.com'),
  title: {
    default: 'WebLifts — Digital studio in Lahore',
    template: '%s — WebLifts',
  },
  description:
    'WebLifts is a digital studio in Lahore. We design and build sites, stores and apps for brands across Pakistan and the Gulf — most projects live in six weeks.',
  openGraph: {
    type: 'website',
    siteName: 'WebLifts',
    title: 'WebLifts — Digital studio in Lahore',
    description:
      'Sites, stores and apps for brands across Pakistan and the Gulf. Fixed scope, published prices, six-week launches.',
    images: ['/og.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#04211F',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} scroll-smooth data-scroll-behavior="smooth"`}
    >
      <body suppressHydrationWarning>
        <Grain />
        <Nav />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}