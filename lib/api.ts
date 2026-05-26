import type {
  Message,
  District,
  HomeCell,
  ApiMediaItem,
  ApiDistrictItem,
} from './types'
import { slugify, buildDownloadBaseName, getFileExtension } from './utils'

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://api.lfcjahi.com').replace(/\/+$/, '')

function normalizeMessage(item: ApiMediaItem, index: number): Message {
  const title = item.title || 'Untitled Message'
  const pastor = item.speaker || 'LFC Jahi'
  const date = item.mediaDate || (item.createdAt ? String(item.createdAt).slice(0, 10) : new Date().toISOString().slice(0, 10))
  const thumbnail = item.thumbnailUrl || '/images/background/asset-14.jpeg'
  const speakerImage = item.speakerImageUrl || thumbnail
  const service = item.subcategory || ''
  const mediaUrl = item.mediaUrl || ''
  const safeId = item.id || slugify(`${title}-${date}-${index}`)
  const downloadUrl = item.downloadUrl || (item.id ? `${API_BASE}/api/media/${item.id}/download` : mediaUrl)
  const shareUrl = item.shareUrl || (item.id ? `${API_BASE}/messages/${item.id}` : `/messages/${encodeURIComponent(safeId)}`)
  const downloadFilename = buildDownloadBaseName(title, pastor, date) + '.' + getFileExtension(mediaUrl || downloadUrl)

  return {
    id: safeId,
    title,
    pastor,
    date,
    duration: service || 'Available for download',
    image: thumbnail,
    speakerImage,
    audioUrl: mediaUrl,
    downloadUrl,
    shareUrl,
    downloadFilename,
    scripture: item.scripture || 'Matthew 6:33, Romans 10:17',
    series: service || item.category || 'Audio',
    description: item.description || '',
    downloadCount: item.downloadCount ?? 0,
  }
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    const res = await fetch(`${API_BASE}/api/media`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch media')
    const payload = await res.json()
    const items: ApiMediaItem[] = Array.isArray(payload?.data) ? payload.data : []
    const audio = items.filter(
      (item) => String(item.category || '').toLowerCase() === 'audio' && item.mediaUrl,
    )
    const source = audio.length ? audio : items.filter((item) => !!item.mediaUrl)
    return source.map(normalizeMessage).filter((m) => !!m.audioUrl)
  } catch {
    return []
  }
}

export async function fetchMessageById(id: string): Promise<Message | null> {
  const messages = await fetchMessages()
  const sorted = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return sorted.find((m) => m.id === id) || sorted[0] || null
}

function normalizeDistrict(item: ApiDistrictItem, index: number): District {
  return {
    sortOrder: Number(item.sortOrder || item.num || index + 1),
    name: item.name || '',
    coverageAreas: item.coverageAreas || item.location || '',
    outreachPastor: item.outreachPastor || (Array.isArray(item.homeCellPastors) ? item.homeCellPastors[0] : '') || '',
    outreachMinister: item.outreachMinister || item.homeCellMinister || item.minister || '',
    outreachLocation: item.outreachLocation || '',
  }
}

function normalizeHomeCell(item: ApiDistrictItem, index: number): HomeCell {
  return {
    num: Number(item.sortOrder || item.num || index + 1),
    name: item.name || '',
    location: item.coverageAreas || item.location || '',
    pastors: Array.isArray(item.homeCellPastors)
      ? item.homeCellPastors
      : Array.isArray(item.pastors)
        ? item.pastors
        : [],
    minister: item.homeCellMinister || item.minister || '',
    zones: Array.isArray(item.zones)
      ? item.zones.map((zone, zi) => ({
          name: zone.name || '',
          zoneMinister: zone.zoneMinister || '',
          sortOrder: Number(zone.sortOrder || zi + 1),
          cells: Array.isArray(zone.cells)
            ? zone.cells.map((cell, ci) => ({
                sortOrder: Number(cell.sortOrder || ci + 1),
                name: cell.name || '',
                address: cell.address || '',
                minister: cell.minister || '',
                phone: cell.phone || '',
              }))
            : [],
        }))
      : [],
  }
}

async function fetchDirectoryRaw(): Promise<ApiDistrictItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/districts`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('Failed to fetch districts')
    const payload = await res.json()
    return Array.isArray(payload?.data) ? payload.data : []
  } catch {
    return []
  }
}

export async function fetchDistricts(): Promise<District[]> {
  const items = await fetchDirectoryRaw()
  return items.map(normalizeDistrict).sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function fetchHomeCells(): Promise<HomeCell[]> {
  const items = await fetchDirectoryRaw()
  return items.map(normalizeHomeCell).sort((a, b) => a.num - b.num)
}
