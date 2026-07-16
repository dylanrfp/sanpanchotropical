import type { Metadata } from 'next'
import { Inter_Tight, Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  title: 'San Pancho Tropical | Eco-Luxe Sanctuary',
  description: 'Experience the tropics in our beautiful eco-luxe sanctuary.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${interDisplay.variable} ${inter.variable} ${outfit.variable} bg-base-light text-base-dark antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
