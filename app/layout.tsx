import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis-provider'
import { LanguageProvider } from '@/lib/i18n'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ContactFab from '@/components/layout/ContactFab'
import ScrollRevealInit from '@/components/ui/ScrollRevealInit'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'G2E · Transforming Waste into Value',
    template: '%s | G2E · Transforming Waste into Value',
  },
  description:
    "G2E transforms organic waste into hydrochar, a clean burning coal replacement and agricultural soil regenerant. Operating the world's largest hydrothermal carbonization plant in Mexico City.",
  keywords: [
    'hydrothermal carbonization',
    'hydrochar',
    'organic waste',
    'clean energy',
    'carbon credits',
    'sustainable materials',
    'coal replacement',
    'Mexico cleantech',
    'decarbonization',
    'UNAM',
  ],
  openGraph: {
    type: 'website',
    siteName: 'G2E · Transforming Waste into Value',
    title: 'G2E · Transforming Waste into Value',
    description:
      'Transforming organic waste into hydrochar, a premium coal replacement, soil regenerant, and premium carbon credit generator.',
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
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <LanguageProvider>
          <LenisProvider>
            <ScrollRevealInit />
            <Nav />
            <main>{children}</main>
            <Footer />
            <ContactFab />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
