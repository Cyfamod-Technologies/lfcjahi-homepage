'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Message } from '@/lib/types'
import { normalizeService, parseDate } from '@/lib/utils'
import { useHomeSearch } from './HomeSearchContext'
import type { MessageLibraryFilters } from './HomeSearchContext'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface HomeSearchLauncherProps {
  messages: Message[]
}

export default function HomeSearchLauncher({ messages }: HomeSearchLauncherProps) {
  const { filters, setFilters } = useHomeSearch()
  const [isOpen, setIsOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(filters)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters)
    }
  }, [filters, isOpen])

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

  const availableMonths = useMemo(() => {
    const q = draftFilters.search.trim().toLowerCase()
    const monthSet = new Set(
      messages
        .filter((msg) => {
          const date = parseDate(msg.date)
          const matchesSearch =
            !q || [msg.title, msg.pastor, msg.description, msg.scripture, msg.series].join(' ').toLowerCase().includes(q)
          const matchesYear = !draftFilters.year || String(date.getFullYear()) === draftFilters.year
          const matchesPastor = !draftFilters.pastor || msg.pastor === draftFilters.pastor
          const matchesService = !draftFilters.service || normalizeService(msg.series) === draftFilters.service
          return matchesSearch && matchesYear && matchesPastor && matchesService
        })
        .map((msg) => String(parseDate(msg.date).getMonth() + 1)),
    )
    return [...monthSet].sort((a, b) => Number(a) - Number(b))
  }, [draftFilters.pastor, draftFilters.search, draftFilters.service, draftFilters.year, messages])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => searchInputRef.current?.focus(), 120)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, isOpen])

  const updateDraft = useCallback((key: keyof MessageLibraryFilters, value: string) => {
    setDraftFilters((current) => {
      const next = { ...current, [key]: value }
      if (key !== 'month' && current.month) {
        const monthStillValid = messages.some((msg) => {
          const date = parseDate(msg.date)
          const q = next.search.trim().toLowerCase()
          const matchesSearch =
            !q || [msg.title, msg.pastor, msg.description, msg.scripture, msg.series].join(' ').toLowerCase().includes(q)
          const matchesYear = !next.year || String(date.getFullYear()) === next.year
          const matchesPastor = !next.pastor || msg.pastor === next.pastor
          const matchesService = !next.service || normalizeService(msg.series) === next.service
          return matchesSearch && matchesYear && matchesPastor && matchesService && String(date.getMonth() + 1) === current.month
        })
        if (!monthStillValid) {
          next.month = ''
        }
      }
      return next
    })
  }, [messages])

  const clearDraftFilters = useCallback(() => {
    setDraftFilters({
      search: '',
      year: '',
      month: '',
      pastor: '',
      service: '',
    })
  }, [])

  const applyFilters = useCallback(() => {
    setFilters(draftFilters)
    setIsOpen(false)
  }, [draftFilters, setFilters])

  return (
    <>
      <div className="gen-btn-container mr-3 d-inline-block">
        <button type="button" className="gen-button" onClick={() => setIsOpen(true)}>
          <i className="fa fa-search"></i>
          <span className="text">Search</span>
        </button>
      </div>

      {isOpen && (
        <div className="lfc-search-modal" role="dialog" aria-modal="true" aria-labelledby="message-search-title">
          <button type="button" className="lfc-search-modal__backdrop" aria-label="Close search" onClick={closeModal} />
          <div className="lfc-search-modal__dialog lfc-search-modal__dialog--filters">
            <div className="lfc-search-modal__header">
              <div>
                <p className="lfc-search-modal__eyebrow">LFC-JAHI MEDIA</p>
                <h3 id="message-search-title" className="text-white mb-1">Search Messages</h3>
                <p className="lfc-count mb-0">Choose your filters, then apply them to the library below.</p>
              </div>
              <button type="button" className="lfc-search-modal__close" aria-label="Close search" onClick={closeModal}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>

            <div className="lfc-search-modal__body">
              <section className="lfc-filter-panel lfc-filter-panel--modal">
                <div className="lfc-filter-card lfc-filter-card--modal">
                  <div className="row align-items-end">
                    <div className="col-lg-6 mb-3">
                      <label className="text-white mb-2" htmlFor="modalSearchInput">Keyword</label>
                      <input
                        ref={searchInputRef}
                        id="modalSearchInput"
                        type="text"
                        className="form-control"
                        placeholder="Search by title, pastor, scripture, or series"
                        value={draftFilters.search}
                        onChange={(e) => updateDraft('search', e.target.value)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                      <label className="text-white mb-2" htmlFor="modalYearFilter">Year</label>
                      <select id="modalYearFilter" className="custom-select" value={draftFilters.year} onChange={(e) => updateDraft('year', e.target.value)}>
                        <option value="">All Years</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                      <label className="text-white mb-2" htmlFor="modalMonthFilter">Month</label>
                      <select id="modalMonthFilter" className="custom-select" value={draftFilters.month} onChange={(e) => updateDraft('month', e.target.value)}>
                        <option value="">All Months</option>
                        {availableMonths.map((m) => (
                          <option key={m} value={m}>{MONTH_NAMES[Number(m) - 1]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <label className="text-white mb-2" htmlFor="modalPastorFilter">Pastor</label>
                      <select id="modalPastorFilter" className="custom-select" value={draftFilters.pastor} onChange={(e) => updateDraft('pastor', e.target.value)}>
                        <option value="">All Pastors</option>
                        {pastors.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <label className="text-white mb-2" htmlFor="modalServiceFilter">Service</label>
                      <select id="modalServiceFilter" className="custom-select" value={draftFilters.service} onChange={(e) => updateDraft('service', e.target.value)}>
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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <button className="gen-button" type="button" onClick={applyFilters}>
                          <span className="text">Apply Search</span>
                        </button>
                        <button className="gen-button gen-button-flat mt-3 mt-sm-0" type="button" onClick={clearDraftFilters}>
                          <span className="text">Clear Filters</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
