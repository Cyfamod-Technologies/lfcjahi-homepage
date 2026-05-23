export function parseDate(value: string): Date {
  return new Date(value + 'T00:00:00')
}

export function formatDate(value: string, style: 'short' | 'long' = 'short'): string {
  return parseDate(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  })
}

export function slugify(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'message'
}

export function buildDownloadBaseName(title: string, pastor: string, date: string): string {
  return slugify([title || 'message', pastor || 'lfc-jahi', date || new Date().toISOString().slice(0, 10)].join(' '))
}

export function getFileExtension(url: string): string {
  const cleanUrl = String(url || '').split('?')[0].split('#')[0]
  const match = cleanUrl.match(/\.([a-z0-9]+)$/i)
  return match ? match[1].toLowerCase() : 'mp3'
}

export function normalizeService(value: string): string {
  const normalized = String(value || '').trim().toLowerCase()
  if (!normalized) return ''
  if (normalized === 'sfs' || normalized.includes('sunday first')) return 'Sunday First Service'
  if (normalized === 'sss' || normalized.includes('sunday second')) return 'Sunday Second Service'
  if (normalized === 'sts' || normalized.includes('sunday third')) return 'Sunday Third Service'
  if (normalized === 'wose' || normalized.includes('week of spiritual emphasis')) return 'Week of Spiritual Emphasis'
  if (normalized === 'mws' || normalized.includes('midweek')) return 'Midweek Service'
  if (normalized === 'sp' || normalized.includes('special program')) return 'Special Program'
  return 'Other'
}

export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
}
