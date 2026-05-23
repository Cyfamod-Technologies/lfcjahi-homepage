import type { Metadata } from 'next'
import type { Message } from './types'
import { formatDate } from './utils'

const siteUrl = 'https://lfcjahi.com'
const siteName = 'LFC-JAHI MEDIA'
const churchAddress = 'Katampe Rd, Kado, Jiru 900108, Federal Capital Territory'
const churchLocality = 'Kado, Jiru'
const churchRegion = 'Federal Capital Territory'
const defaultTitle = 'Powerful Audio Messages & Sermons'
const defaultDescription =
  'Access and download powerful audio messages and sermons from Living Faith Church Jahi. Grow spiritually with life-transforming teachings from anointed ministers.'
const defaultOgImage = `${siteUrl}/images/background/asset-41.jpg`
const defaultKeywords = [
  'LFC-JAHI MEDIA',
  'Living Faith Church Jahi',
  'Winners Chapel Jahi',
  'LFC Jahi Abuja',
  'audio messages',
  'sermons',
  'Christian teachings',
  'church media library',
  'Abuja church',
]

type PageSeoOptions = {
  path?: string
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

function buildUrl(path = '/') {
  return new URL(path, siteUrl).toString()
}

function withSiteName(title: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`
}

export const seoSite = {
  siteUrl,
  siteName,
  churchAddress,
  churchLocality,
  churchRegion,
  defaultTitle,
  defaultDescription,
  defaultOgImage,
  defaultKeywords,
}

export function buildPageMetadata({
  path = '/',
  title,
  description,
  keywords = [],
  image = defaultOgImage,
  type = 'website',
  noIndex = false,
}: PageSeoOptions): Metadata {
  const fullTitle = withSiteName(title)
  const canonical = buildUrl(path)

  return {
    title,
    description,
    applicationName: siteName,
    alternates: {
      canonical,
    },
    keywords: [...defaultKeywords, ...keywords],
    category: 'religion',
    classification: 'Christian media and church resources',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
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
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description,
      siteName,
      locale: 'en_NG',
      countryName: 'Nigeria',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    other: {
      'geo.region': 'NG-FC',
      'geo.placename': churchAddress,
      'geo.address': churchAddress,
      'geo.locality': churchLocality,
      'geo.administrative_area': churchRegion,
    },
  }
}

export function buildMessageMetadata(message: Message): Metadata {
  const formattedDate = formatDate(message.date, 'long')
  const description =
    message.description ||
    `${message.title} from ${message.pastor} in the ${message.series} series, preached on ${formattedDate}. Listen online or download from ${siteName}.`
  const path = `/messages/${encodeURIComponent(message.id)}`
  const image = message.image || defaultOgImage
  const title = `${message.title} | ${message.pastor}`
  const pageMetadata = buildPageMetadata({
    path,
    title,
    description,
    image,
    type: 'article',
    keywords: [
      message.title,
      message.pastor,
      message.series,
      message.scripture,
      'audio sermon',
      'faith message',
    ],
  })
  const publishedTime = new Date(message.date)

  return {
    ...pageMetadata,
    openGraph: {
      type: 'article',
      url: buildUrl(path),
      title: withSiteName(title),
      description,
      siteName,
      locale: 'en_NG',
      countryName: 'Nigeria',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: withSiteName(title),
        },
      ],
      publishedTime: Number.isNaN(publishedTime.getTime()) ? undefined : publishedTime.toISOString(),
      authors: [message.pastor],
      tags: [message.series, message.scripture, message.pastor],
    },
  }
}
