'use client'

import { useState, useMemo, useCallback } from 'react'
import type { HomeCell, HomeCellZoneCell } from '@/lib/types'

const PAGE_SIZE = 3

interface HomeCellsListProps {
  cells: HomeCell[]
}

function PhoneLink({ phone }: { phone: string }) {
  const sanitized = phone.replace(/[^\d+]/g, '')
  if (!sanitized || sanitized === '—') return <>{phone || '—'}</>
  return <a href={`tel:${sanitized}`} style={{ color: 'var(--lfc-accent)' }}>{phone}</a>
}

function AddressLink({ address }: { address: string }) {
  const [pending, setPending] = useState(false)

  if (!address || address === '—') return <>{address || '—'}</>

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pending) return
    setPending(true)
    const confirmed = window.confirm('Locate this address in Google Maps?')
    setPending(false)
    if (confirmed) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
        '_blank',
        'noopener',
      )
    }
  }

  return (
    <a href="#" onClick={handleClick} style={{ color: 'var(--lfc-accent)' }}>
      {address}
    </a>
  )
}

function CellRow({ cell }: { cell: HomeCellZoneCell }) {
  return (
    <tr>
      <td><strong>{cell.name}</strong></td>
      <td><AddressLink address={cell.address} /></td>
      <td>{cell.minister}</td>
      <td><PhoneLink phone={cell.phone} /></td>
    </tr>
  )
}

function DistrictCard({ district }: { district: HomeCell }) {
  return (
    <div className="lfc-cell-card" data-district={district.name}>
      <h4>{district.num}. {district.name}</h4>
      <div className="lfc-info-group">
        <span className="lfc-info-label">Covering Areas:</span>
        <span className="lfc-info-value">{district.location}</span>
      </div>
      <div className="lfc-info-group">
        <span className="lfc-info-label">District Pastors:</span>
        <span className="lfc-info-value">
          {district.pastors.length ? district.pastors.join(', ') : '—'}
        </span>
      </div>
      <div className="lfc-info-group">
        <span className="lfc-info-label">District Minister:</span>
        <span className="lfc-info-value">{district.minister || '—'}</span>
      </div>
      {district.zones.map((zone, zi) => (
        <div key={zi} className="lfc-zone-section">
          <h5>Zone: {zone.name}</h5>
          {zone.zoneMinister && (
            <div className="lfc-info-group">
              <span className="lfc-info-label">Zone Minister:</span>
              <span className="lfc-info-value">{zone.zoneMinister}</span>
            </div>
          )}
          <div className="lfc-cells-table table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Cell Name</th>
                  <th>Address</th>
                  <th>Cell Minister</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {zone.cells.map((cell, ci) => (
                  <CellRow key={ci} cell={cell} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomeCellsList({ cells }: HomeCellsListProps) {
  const [search, setSearch] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showModal, setShowModal] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return cells.filter((district) => {
      const matchesDistrict = !districtFilter || district.name === districtFilter
      if (!matchesDistrict) return false
      if (!q) return true
      return (
        district.name.toLowerCase().includes(q) ||
        district.location.toLowerCase().includes(q) ||
        district.pastors.some((p) => p.toLowerCase().includes(q)) ||
        district.minister.toLowerCase().includes(q) ||
        district.zones.some(
          (zone) =>
            zone.name.toLowerCase().includes(q) ||
            zone.zoneMinister.toLowerCase().includes(q) ||
            zone.cells.some(
              (cell) =>
                cell.name.toLowerCase().includes(q) ||
                cell.address.toLowerCase().includes(q) ||
                cell.minister.toLowerCase().includes(q) ||
                cell.phone.includes(q),
            ),
        )
      )
    })
  }, [cells, search, districtFilter])

  const visible = filtered.slice(0, visibleCount)

  const handleSearch = useCallback(() => setVisibleCount(PAGE_SIZE), [])

  return (
    <>
      <div className="lfc-host-cta">
        <button className="gen-button" type="button" onClick={() => setShowModal(true)}>
          <span className="text">Become a Host</span>
        </button>
      </div>

      <h2 className="gen-heading-title">📍 Find Your Home Cell</h2>

      <div className="lfc-search-box mb-4">
        <input
          type="text"
          id="cellSearch"
          className="form-control"
          placeholder="Search by cell name, address, pastor, or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); handleSearch() }}
        />
        <div className="lfc-search-hint">💡 Start typing to filter home cells</div>
      </div>

      <div className="lfc-district-filter mb-4">
        <label htmlFor="districtFilters">Filter by district</label>
        <select
          id="districtFilters"
          className="custom-select"
          value={districtFilter}
          onChange={(e) => { setDistrictFilter(e.target.value); setVisibleCount(PAGE_SIZE) }}
        >
          <option value="">All Districts</option>
          {cells.map((d) => (
            <option key={d.name} value={d.name}>{d.name} {d.num}</option>
          ))}
        </select>
      </div>

      <div id="cellsContainer">
        {filtered.length === 0 ? (
          <div className="lfc-no-results">
            <h5>No Home Cells Found</h5>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          visible.map((district) => (
            <DistrictCard key={district.num} district={district} />
          ))
        )}
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

      {showModal && (
        <div className="modal show lfc-host-modal" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="becomeHostModalLabel">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="becomeHostModalLabel">Become a Host</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Do you want to make your house available for homecell service?
              </div>
              <div className="modal-footer">
                <div className="lfc-host-actions">
                  <button type="button" className="gen-button gen-button-flat" onClick={() => setShowModal(false)}>
                    <span className="text">No</span>
                  </button>
                  <a href="http://lfcjahi.com" className="gen-button">
                    <span className="text">Yes</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setShowModal(false)} style={{ opacity: 0.5 }} />
        </div>
      )}
    </>
  )
}
