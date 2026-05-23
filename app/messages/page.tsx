import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { fetchMessages } from '@/lib/api'
import { sortByDate } from '@/lib/utils'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/messages',
  title: 'Message Library Redirect',
  description: 'Redirects visitors to the latest available audio message from LFC-JAHI MEDIA.',
  keywords: ['latest sermon', 'audio message archive'],
  noIndex: true,
})

export default async function MessagesIndexPage() {
  const messages = await fetchMessages()
  const latest = sortByDate(messages)[0]
  if (latest) {
    redirect(`/messages/${encodeURIComponent(latest.id)}`)
  }
  redirect('/')
}
