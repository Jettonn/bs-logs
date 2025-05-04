'use client'

import { useState, useEffect } from 'react'
import { LogEntry, FilterState } from '@/types/log'
import { LogFilters } from '@/components/filters/logFilter'
import { LogTable } from '@/components/tables/logTable'
import { toast } from 'sonner'

interface Props {
  initialLogs: LogEntry[]
  isMockData: boolean
}

export const LogViewer = ({ initialLogs, isMockData }: Props) => {
  const [filtered, setFiltered] = useState<LogEntry[]>(initialLogs)
  const [filters, setFilters] = useState<FilterState>({ level: '', searchTerm: '', dateFrom: null, dateTo: null })
  const [sort, setSort] = useState<{ key: keyof LogEntry, direction: 'asc' | 'desc' }>({ key: 'timestamp', direction: 'desc' })
  const [page, setPage] = useState(0)
  const pageSize = 10

  useEffect(() => {
    if (isMockData) {
      setTimeout(() => {
        toast.warning('API request failed. Using mock data instead.')
      }, 500)
    }
  }, [isMockData])

  useEffect(() => {
    const searchTerm = filters.searchTerm.toLowerCase()
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom).getTime() : null
    const dateTo = filters.dateTo ? new Date(filters.dateTo).getTime() : null

    const data = initialLogs.filter(log => {
      if (filters.level && log.level !== filters.level) return false
      
      if (searchTerm) {
        const searchableText = `${log.message} ${log.trace} ${log.authorId}`.toLowerCase()
        if (!searchableText.includes(searchTerm)) return false
      }

      const timestamp = new Date(log.timestamp).getTime()
      if (dateFrom && timestamp < dateFrom) return false
      if (dateTo && timestamp > dateTo) return false

      return true
    })

    setFiltered(data)
    setPage(0)
  }, [initialLogs, filters])

  const handleSort = (key: keyof LogEntry) => {
    setSort((s) => ({
      key,
      direction: s.key === key ? (s.direction === 'asc' ? 'desc' : 'asc') : 'asc'
    }))
  }

  return (
    <>
      <LogFilters filters={filters} onChange={setFilters} />
      <LogTable
        logs={filtered}
        sort={sort}
        onSort={handleSort}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </>
  )
} 