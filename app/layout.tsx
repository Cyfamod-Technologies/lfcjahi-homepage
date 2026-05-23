import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#e50914',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lfcjahi.com'),
  title: {
    default: 'LFC-JAHI MEDIA | Powerful Audio Messages & Sermons',
    template: '%s | LFC-JAHI MEDIA',
  },
  description: 'Access and download powerful audio messages and sermons from Living Faith Church Jahi. Grow spiritually with life-transforming teachings from anointed ministers.',
  keywords: ['LFC-JAHI MEDIA', 'Living Faith Church Jahi', 'Winners Chapel Jahi', 'audio messages', 'sermons', 'Christian teachings', 'Abuja church'],
  authors: [{ name: 'LFC-JAHI MEDIA' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'LFC-JAHI MEDIA',
    locale: 'en_NG',
    images: [{ url: 'https://lfcjahi.com/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://lfcjahi.com/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon.png" />
        {/* Inline script to prevent dark mode flash before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('darkMode');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = stored === 'true' || (prefersDark && stored !== 'false');
                if (isDark) document.documentElement.setAttribute('data-dark-mode', 'true');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
