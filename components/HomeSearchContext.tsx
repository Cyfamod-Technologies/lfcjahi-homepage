'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export interface MessageLibraryFilters {
  search: string
  year: string
  month: string
  pastor: string
  service: string
}

const EMPTY_FILTERS: MessageLibraryFilters = {
  search: '',
  year: '',
  month: '',
  pastor: '',
  service: '',
}

interface HomeSearchContextValue {
  filters: MessageLibraryFilters
  setFilters: (filters: MessageLibraryFilters) => void
  clearFilters: () => void
}

const HomeSearchContext = createContext<HomeSearchContextValue | null>(null)

export function HomeSearchProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<MessageLibraryFilters>(EMPTY_FILTERS)

  const value = useMemo<HomeSearchContextValue>(
    () => ({
      filters,
      setFilters,
      clearFilters: () => setFilters(EMPTY_FILTERS),
    }),
    [filters],
  )

  return <HomeSearchContext.Provider value={value}>{children}</HomeSearchContext.Provider>
}

export function useHomeSearch() {
  const context = useContext(HomeSearchContext)

  if (!context) {
    throw new Error('useHomeSearch must be used within HomeSearchProvider')
  }

  return context
}
