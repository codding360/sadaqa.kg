import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SourceAnalytics } from '@/components/source-analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sadaqa.kg - Пожертвования на лечение',
  description: 'Помогаем собрать средства на лечение. Безопасные пожертвования через банки Кыргызстана.',
  generator: 'marat.dev',
  keywords: ['Пожертвования', 'Сборы на лечение', 'Сборы на операции', 'Сборы на лекарства', 'Помощь', 'Лечение', 'Кыргызстан'],
  openGraph: {
    title: 'Sadaqa.kg - Пожертвования на лечение',
    description: 'Помогаем собрать средства на лечение. Безопасные пожертвования через банки Кыргызстана.',
    url: 'https://sadaqa.kg',
    siteName: 'Sadaqa.kg',
    images: [
      {
        url: 'https://sadaqa.kg/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sadaqa.kg - Пожертвования на лечение',
      }
    ],
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadaqa.kg - Пожертвования на лечение',
    description: 'Помогаем собрать средства на лечение. Безопасные пожертвования через банки Кыргызстана.',
    images: ['https://sadaqa.kg/logo.png'],
    creator: '@marat.dev',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sadaqa.kg',
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
