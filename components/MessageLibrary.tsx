'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Message } from '@/lib/types'
import { parseDate, formatDate, normalizeService, sortByDate } from '@/lib/utils'
import MessageCard from './MessageCard'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const PAGE_SIZE = 12

interface MessageLibraryProps {
  messages: Message[]
}

export default function MessageLibrary({ messages }: MessageLibraryProps) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams?.get('search') || ''
  const initialYear = searchParams?.get('year') || ''
  const initialMonth = searchParams?.get('month') || ''
  const initialPastor = searchParams?.get('pastor') || ''
  const initialService = searchParams?.get('service') || ''

  const [search, setSearch] = useState(initialSearch)
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [pastor, setPastor] = useState(initialPastor)
  const [service, setService] = useState(initialService)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const latestMessage = useMemo(() => sortByDate(messages)[0] || null, [messages])

  const years = useMemo(
    () =>
      [...new Set(messages.map((m) => String(parseDate(m.date).getFullYear())))]
        .sort((a, b) => Number(b) - Number(a)),
    [messages],
  )

  const pastors = useMemo(
    () => [...new Set(messages.map((m) => m.pastor))].sort(),
    [messages],
  )

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
  }, [messages, search, year, month, pastor, service])

  const availableMonths = useMemo(() => {
    const q = search.trim().toLowerCase()
    const monthSet = new Set(
      messages
        .filter((msg) => {
          const date = parseDate(msg.date)
          const matchesSearch = !q || [msg.title, msg.pastor, msg.description, msg.scripture, msg.series].join(' ').toLowerCase().includes(q)
          const matchesYear = !year || String(date.getFullYear()) === year
          const matchesPastor = !pastor || msg.pastor === pastor
          const matchesService = !service || normalizeService(msg.series) === service
          return matchesSearch && matchesYear && matchesPastor && matchesService
        })
        .map((msg) => String(parseDate(msg.date).getMonth() + 1)),
    )
    return [...monthSet].sort((a, b) => Number(a) - Number(b))
  }, [messages, search, year, pastor, service])

  useEffect(() => {
    if (month && !availableMonths.includes(month)) {
      setMonth('')
    }
  }, [availableMonths, month])

  const visible = filtered.slice(0, visibleCount)

  const clearFilters = useCallback(() => {
    setSearch('')
    setYear('')
    setMonth('')
    setPastor('')
    setService('')
    setVisibleCount(PAGE_SIZE)
  }, [])

  const handleSearch = useCallback(() => {
    setVisibleCount(PAGE_SIZE)
    setTimeout(() => {
      document.querySelector('.gen-section-padding-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const latestHref = latestMessage ? `/messages/${encodeURIComponent(latestMessage.id)}` : '/messages'

  return (
    <>
      <section id="message-library" className="lfc-filter-panel">
        <div className="container">
          <div className="lfc-filter-card">
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-5 mb-3 align-self-end">
                <input
                  id="searchInput"
                  type="text"
                  className="form-control"
                  placeholder="Search by title, pastor, scripture, or series"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-lg-2 col-md-6 mb-3">
                <label className="text-white mb-2" htmlFor="yearFilter">Year</label>
                <select id="yearFilter" className="custom-select" value={year} onChange={(e) => { setYear(e.target.value); setVisibleCount(PAGE_SIZE) }}>
                  <option value="">All Years</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-6 mb-3">
                <label className="text-white mb-2" htmlFor="monthFilter">Month</label>
                <select id="monthFilter" className="custom-select" value={month} onChange={(e) => { setMonth(e.target.value); setVisibleCount(PAGE_SIZE) }}>
                  <option value="">All Months</option>
                  {availableMonths.map((m) => (
                    <option key={m} value={m}>{MONTH_NAMES[Number(m) - 1]}</option>
                  ))}
                </select>
              </div>
              <div className="col-lg-2 col-md-6 mb-3">
                <label className="text-white mb-2" htmlFor="pastorFilter">Pastor</label>
                <select id="pastorFilter" className="custom-select" value={pastor} onChange={(e) => { setPastor(e.target.value); setVisibleCount(PAGE_SIZE) }}>
                  <option value="">All Pastors</option>
                  {pastors.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-6 mb-3">
                <label className="text-white mb-2" htmlFor="serviceFilter">Service</label>
                <select id="serviceFilter" className="custom-select" value={service} onChange={(e) => { setService(e.target.value); setVisibleCount(PAGE_SIZE) }}>
                  <option value="">All Services</option>
                  <option value="Sunday First Service">Sunday First Service</option>
                  <option value="Sunday Second Service">Sunday Second Service</option>
                  <option value="Sunday Third Service">Sunday Third Service</option>
                  <option value="Week of Spiritual Emphasis">Week of Spiritual Emphasis</option>
                  <option value="Midweek Service">Midweek Service</option>
                  <option value="Special Program">Special Program</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center">
                  <button className="gen-button" onClick={handleSearch}>
                    <span className="text">Search</span>
                  </button>
                  <button className="gen-button gen-button-flat" onClick={clearFilters}>
                    <span className="text">Clear Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <p className="mb-0">Try removing one or more filters, or search with a different keyword.</p>
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
    </>
  )
}
