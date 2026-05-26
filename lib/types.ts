export interface Message {
  id: string
  title: string
  pastor: string
  date: string
  duration: string
  image: string
  speakerImage: string
  audioUrl: string
  downloadUrl: string
  shareUrl: string
  downloadFilename: string
  scripture: string
  series: string
  description: string
  downloadCount: number
}

export interface ApiMediaItem {
  id?: string
  title?: string
  speaker?: string
  mediaDate?: string
  createdAt?: string
  thumbnailUrl?: string
  speakerImageUrl?: string
  category?: string
  subcategory?: string
  mediaUrl?: string
  downloadUrl?: string
  shareUrl?: string
  scripture?: string
  description?: string
  downloadCount?: number
}

export interface ApiDistrictItem {
  sortOrder?: number
  num?: number
  name?: string
  coverageAreas?: string
  location?: string
  outreachPastor?: string
  outreachMinister?: string
  outreachLocation?: string
  homeCellPastors?: string[]
  pastors?: string[]
  homeCellMinister?: string
  minister?: string
  zones?: ApiZone[]
}

export interface ApiZone {
  name?: string
  zoneMinister?: string
  sortOrder?: number
  cells?: ApiCell[]
}

export interface ApiCell {
  sortOrder?: number
  name?: string
  address?: string
  minister?: string
  phone?: string
}

export interface District {
  sortOrder: number
  name: string
  coverageAreas: string
  outreachPastor: string
  outreachMinister: string
  outreachLocation: string
}

export interface HomeCell {
  num: number
  name: string
  location: string
  pastors: string[]
  minister: string
  zones: HomeCellZone[]
}

export interface HomeCellZone {
  name: string
  zoneMinister: string
  sortOrder: number
  cells: HomeCellZoneCell[]
}

export interface HomeCellZoneCell {
  sortOrder: number
  name: string
  address: string
  minister: string
  phone: string
}
