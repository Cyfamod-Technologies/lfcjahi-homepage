'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import type { District } from '@/lib/types'

interface DistrictsTableProps {
  districts: District[]
}

export default function DistrictsTable({ districts }: DistrictsTableProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return districts
    return districts.filter((d) =>
      [d.name, d.coverageAreas, d.outreachPastor, d.outreachMinister, d.outreachLocation]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [districts, search])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        setSearch('')
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <>
      <div className="lfc-search-box mb-4">
        <input
          ref={inputRef}
          type="text"
          id="districtSearch"
          className="form-control"
          placeholder="Search by district name, pastor, location, or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <small className="text-muted d-block mt-2">Start typing to filter results</small>
      </div>

      <div className="table-responsive lfc-districts-table">
        <table className="table">
          <thead>
            <tr>
              <th>SN</th>
              <th>District Name</th>
              <th>Location(s)</th>
              <th>District Pastor</th>
              <th>District Minister</th>
              <th>Outreach Location</th>
            </tr>
          </thead>
          <tbody id="districtTableBody">
            {filtered.map((district) => (
              <tr key={district.sortOrder}>
                <td>{district.sortOrder}</td>
                <td><strong>{district.name}</strong></td>
                <td>{district.coverageAreas}</td>
                <td>{district.outreachPastor || '—'}</td>
                <td>{district.outreachMinister || '—'}</td>
                <td>{district.outreachLocation || '—'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">No districts found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
