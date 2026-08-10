import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import SmoothScroll from '@/components/providers/SmoothScroll'
import Grain from '@/components/atoms/Grain'
import Nav from '@/components/chrome/Nav'
import Footer from '@/components/sections/Footer'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script'
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
    images: ['/logo.jpeg'],
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
      className={`${display.variable} ${body.variable} ${mono.variable} scroll-smooth`}
    >
      <body suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TNWWJZRR6D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TNWWJZRR6D');
          `}
        </Script>

        <Grain />
        <Nav />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}