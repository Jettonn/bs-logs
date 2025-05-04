import { LogEntry } from '@/types/log'
import { formatDate } from '@/utils/formatDate'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DetailsDialog } from '@/components/dialogs/detailsDialog'
import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { LevelBadge } from '../logs/levelBadge'

interface Props {
  logs: LogEntry[]
  sort: { key: keyof LogEntry, direction: 'asc' | 'desc' }
  onSort: (key: keyof LogEntry) => void
  page: number
  pageSize: number
  onPageChange: (p: number) => void
}

const columns = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'level', label: 'Level' },
  { key: 'message', label: 'Message' },
  { key: 'trace', label: 'Trace' },
  { key: 'authorId', label: 'Author ID' },
] as const

export const LogTable = ({ logs, sort, onSort, page, pageSize, onPageChange }: Props) => {
  const [selected, setSelected] = useState<LogEntry | null>(null)

  const sorted = [...logs].sort((a, b) => {
    const valA = a[sort.key]
    const valB = b[sort.key]
    if (valA < valB) return sort.direction === 'asc' ? -1 : 1
    if (valA > valB) return sort.direction === 'asc' ? 1 : -1
    return 0
  })

  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <>
      <Table className='rounded-md'>
        <TableHeader className="bg-muted">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} onClick={() => onSort(col.key)} className="cursor-pointer text-xs">
                <div className="flex items-center gap-2">
                  {col.label}
                  {sort.key === col.key ? (
                    sort.direction === 'asc' ? (
                      <ChevronUp className="size-3 font-bold" />
                    ) : (
                      <ChevronDown className="size-3 font-bold" />
                    )
                  ) : (
                    <ChevronsUpDown className="size-3 opacity-50" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((log, i) => (
            <TableRow key={i} onClick={() => setSelected(log)} className="cursor-pointer hover:bg-accent">
              <TableCell>{formatDate(log.timestamp)}</TableCell>
              <TableCell>
                <LevelBadge level={log.level} />
              </TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.trace}</TableCell>
              <TableCell>{log.authorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-2 border-t border-neutral-200 bg-muted">
        <div className='text-sm text-neutral-500 font-medium'>
          {paginated.length > 0 ? (
            <span>
              {page * pageSize + 1} to {Math.min((page + 1) * pageSize, logs.length)} of {logs.length} (page {page + 1}/{Math.ceil(logs.length / pageSize)})
            </span>
          ) : (
            <span>No results</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onPageChange(page - 1)} disabled={page === 0}>Previous</Button>
          <Button variant="outline" onClick={() => onPageChange(page + 1)} disabled={(page + 1) * pageSize >= logs.length}>Next</Button>
        </div>
      </div>

      {selected && <DetailsDialog log={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
