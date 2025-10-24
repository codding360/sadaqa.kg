import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SourceAnalytics } from '@/components/source-analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ссылки на пожертвования',
  description: 'Ссылки на пожертвования',
  generator: 'marat.dev',
  keywords: ['Ссылки на пожертвования', 'Пожертвования', 'Сборы', 'Сборы на лечение', 'Сборы на операции', 'Сборы на лекарства', 'Сборы на медицину'],
  openGraph: {
    title: 'Ссылки на пожертвования',
    description: 'Ссылки на пожертвования',
    siteName: 'Ссылки на пожертвования',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ссылки на пожертвования',
    description: 'Ссылки на пожертвования',
    images: ['/logo.png'],
    creator: '@marat.dev',
  },
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
        <SourceAnalytics 
          enableConsoleLogging={true}
        />
      </body>
    </html>
  )
}
