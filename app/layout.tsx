import type { Metadata } from 'next'
import { Newsreader, Geist, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis-provider'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ContactFab from '@/components/layout/ContactFab'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'G2E — Green to Energy',
    template: '%s | G2E — Green to Energy',
  },
  description:
    'G2E transforms organic waste into hydrochar — a clean-burning coal replacement and agricultural soil regenerant. Operating the world\'s largest hydrothermal carbonization plant.',
  keywords: [
    'hydrothermal carbonization',
    'hydrochar',
    'organic waste',
    'clean energy',
    'carbon credits',
    'sustainable materials',
    'coal replacement',
    'Mexico cleantech',
  ],
  openGraph: {
    type: 'website',
    siteName: 'G2E — Green to Energy',
    title: 'G2E — Green to Energy',
    description:
      'Transforming organic waste into hydrochar — a premium coal replacement and soil regenerant.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LenisProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ContactFab />
        </LenisProvider>
      </body>
    </html>
  )
}
