import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
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
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '830291019499390');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=830291019499390&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
