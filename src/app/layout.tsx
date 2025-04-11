import { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

// Configure Hebrew font
const heebo = Heebo({
  subsets: ['hebrew'],
  display: 'swap',
  variable: '--font-heebo',
})

// Define metadata
export const metadata: Metadata = {
  title: 'מסעדה גמא',
  description: 'מסעדה מוביל המספק שירות מקצועי ואיכותי. הזמינו תור עוד היום!',
  keywords: 'מסעדה, שירות, איכות, מקצועיות, ישראל',
  openGraph: {
    title: 'מסעדה גמא',
    description: 'מסעדה מוביל המספק שירות מקצועי ואיכותי. הזמינו תור עוד היום!',
    url: 'https://www.restaurantgamma.co.il',
    siteName: 'מסעדה גמא',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        width: 1200,
        height: 630,
        alt: 'מסעדה גמא',
      },
    ],
  },
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-right min-h-screen flex flex-col">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  )
}