import type { Metadata, Viewport } from 'next'
import PageEffects from '@/components/PageEffects'
import { getApiOrigin } from '@/lib/env'
import { seoSite } from '@/lib/seo'

export const viewport: Viewport = {
  themeColor: '#e50914',
}

export const metadata: Metadata = {
  metadataBase: new URL(seoSite.siteUrl),
  title: {
    default: `${seoSite.siteName} | ${seoSite.defaultTitle}`,
    template: `%s | ${seoSite.siteName}`,
  },
  description: seoSite.defaultDescription,
  keywords: seoSite.defaultKeywords,
  authors: [{ name: seoSite.siteName, url: seoSite.siteUrl }],
  creator: seoSite.siteName,
  publisher: seoSite.siteName,
  category: 'religion',
  classification: 'Christian media and church resources',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: seoSite.siteUrl,
  },
  openGraph: {
    type: 'website',
    url: seoSite.siteUrl,
    title: `${seoSite.siteName} | ${seoSite.defaultTitle}`,
    description: seoSite.defaultDescription,
    siteName: seoSite.siteName,
    locale: 'en_NG',
    countryName: 'Nigeria',
    images: [
      {
        url: seoSite.defaultOgImage,
        width: 1200,
        height: 630,
        alt: seoSite.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${seoSite.siteName} | ${seoSite.defaultTitle}`,
    description: seoSite.defaultDescription,
    images: [seoSite.defaultOgImage],
  },
  icons: {
    icon: [{ url: '/images/favicon.png' }],
    shortcut: ['/images/favicon.png'],
    apple: [{ url: '/images/favicon.png', sizes: '180x180' }],
  },
  other: {
    'geo.region': 'NG-FC',
    'geo.placename': seoSite.churchAddress,
    'geo.address': seoSite.churchAddress,
    'geo.locality': seoSite.churchLocality,
    'geo.administrative_area': seoSite.churchRegion,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const apiOrigin = getApiOrigin()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins used heavily on every page */}
        <link rel="preconnect" href={apiOrigin} />
        <link rel="dns-prefetch" href={apiOrigin} />

        {/* Parallel CSS loading — avoids the @import waterfall from globals.css */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/lfc-jahi-media.css" />

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
        <PageEffects />
      </body>
    </html>
  )
}
