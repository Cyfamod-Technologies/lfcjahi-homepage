import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import SingleMessageClient from '@/components/SingleMessageClient'
import { fetchMessages, fetchMessageById } from '@/lib/api'
import { sortByDate } from '@/lib/utils'
import { buildMessageMetadata, buildPageMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const message = await fetchMessageById(decodeURIComponent(id))
  if (!message) {
    return buildPageMetadata({
      path: `/messages/${encodeURIComponent(id)}`,
      title: 'Message Not Found',
      description: 'The requested audio message could not be found in the LFC-JAHI MEDIA library.',
      noIndex: true,
    })
  }

  return buildMessageMetadata(message)
}

export async function generateStaticParams() {
  const messages = await fetchMessages()
  return messages.map((m) => ({ id: encodeURIComponent(m.id) }))
}

export default async function MessagePage({ params }: PageProps) {
  const { id } = await params
  const messages = await fetchMessages()
  const sorted = sortByDate(messages)
  const message = sorted.find((m) => m.id === decodeURIComponent(id)) || sorted[0]

  if (!message) notFound()

  const related = sorted.filter((m) => m.id !== message.id).slice(0, 4)

  const backToLibraryAction = (
    <Link href="/#message-library" className="gen-button">
      <div className="gen-button-block">
        <span className="gen-button-line-left"></span>
        <span className="gen-button-text">Back to Library</span>
      </div>
    </Link>
  )

  return (
    <>
      <div id="gen-loading">
        <div id="gen-loading-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-1.png" alt="loading" />
        </div>
      </div>

      <Navbar activeItem="single-message" headerAction={backToLibraryAction} />

      <SingleMessageClient message={message} related={related} />

      <Footer minimal />
      <BackToTop />
    </>
  )
}
