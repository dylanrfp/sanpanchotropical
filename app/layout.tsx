import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter_Tight, Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollRevealObserver from '@/components/ScrollRevealObserver'

const interDisplay = Inter_Tight({ 
  subsets: ['latin'], 
  variable: '--font-inter-display',
  style: ['normal', 'italic']
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'San Pancho Tropical | Beach-Town Villas',
  description: 'Discover private beach-town villas in San Pancho, Mexico. Book your stay with local hosts who have called San Pancho home for over 20 years.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K6TFLLST');`,
          }}
        />
        {/* End Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2YJCQH8LLY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2YJCQH8LLY');
          `}
        </Script>
      </head>
      <body className={`${interDisplay.variable} ${inter.variable} ${outfit.variable} bg-base-light text-base-dark antialiased min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6TFLLST"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollRevealObserver />
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
