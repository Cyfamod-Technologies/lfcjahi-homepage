import { redirect } from 'next/navigation'
import { fetchMessages } from '@/lib/api'
import { sortByDate } from '@/lib/utils'

export default async function MessagesIndexPage() {
  const messages = await fetchMessages()
  const latest = sortByDate(messages)[0]
  if (latest) {
    redirect(`/messages/${encodeURIComponent(latest.id)}`)
  }
  redirect('/')
}
