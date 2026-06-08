'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Message } from '@/lib/types'
import { parseDate, normalizeService, sortByDate } from '@/lib/utils'
import MessageCard from './MessageCard'
import { useHomeSearch } from './HomeSearchContext'

const PAGE_SIZE = 12

interface MessageLibraryProps {
  messages: Message[]
}

export default function MessageLibrary({ messages }: MessageLibraryProps) {
  const { filters } = useHomeSearch()
  const { search, year, month, pastor, service } = filters
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [month, pastor, search, service, year])

  const latestMessage = useMemo(() => sortByDate(messages)[0] || null, [messages])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const result = messages.filter((msg) => {
      const date = parseDate(msg.date)
      const matchesSearch =
        !q ||
        [msg.title, msg.pastor, msg.description, msg.scripture, msg.series]
          .join(' ')
          .toLowerCase()
          .includes(q)
      const matchesYear = !year || String(date.getFullYear()) === year
      const matchesMonth = !month || String(date.getMonth() + 1) === month
      const matchesPastor = !pastor || msg.pastor === pastor
      const matchesService = !service || normalizeService(msg.series) === service
      return matchesSearch && matchesYear && matchesMonth && matchesPastor && matchesService
    })
    return sortByDate(result)
  }, [messages, month, pastor, search, service, year])

  const visible = filtered.slice(0, visibleCount)

  const latestHref = latestMessage ? `/messages/${encodeURIComponent(latestMessage.id)}` : '/messages'

  return (
    <section className="gen-section-padding-2">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-7">
            <h4 className="gen-heading-title mb-2">Audio Message Library</h4>
            <p id="resultCount" className="lfc-count mb-0">
              Showing {visible.length} of {filtered.length} messages
            </p>
          </div>
          <div className="col-md-5 text-md-right mt-3 mt-md-0">
            <Link href={latestHref} className="gen-button gen-button-flat">
              <span className="text">Quick Play Latest Message</span>
            </Link>
          </div>
        </div>

        {visible.length === 0 && (
          <div className="lfc-empty mb-4">
            <h5 className="text-white mb-2">No message found</h5>
            <p className="mb-0">Try changing the filters in search and apply again.</p>
          </div>
        )}

        <div id="messageGrid" className="row">
          {visible.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <div className="lfc-view-more">
            <button
              className="gen-button"
              type="button"
              onClick={() => setVisibleCount((c) => Math.min(filtered.length, c + PAGE_SIZE))}
            >
              <span className="text">View More</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
