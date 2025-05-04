import { FilterState } from '@/types/log'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const levels = ['TRACE','DEBUG','INFO','WARN','ERROR'] as const

export const LogFilters = ({ filters, onChange }: Props) => {
  const handleChange = (key: keyof FilterState, value: string | Date | null) => {
    const filterValue = value === "ALL" ? "" : value
    onChange({ ...filters, [key]: filterValue })
  }

  return (
    <div className="flex gap-4 justify-between my-8">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-neutral-500">Level</span>
        <Select value={filters.level || "ALL"} onValueChange={(val) => handleChange('level', val)}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Log Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            {levels.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search message, trace, or author ID"
          className="w-[400px]"
          value={filters.searchTerm}
          onChange={(e) => handleChange('searchTerm', e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 items-center">
        <span className="text-sm text-neutral-500">From</span>
      <DatePopover
        label="Date"
        date={filters.dateFrom}
        onSelect={(date) => handleChange('dateFrom', date)}
      />
      <span className="text-sm text-neutral-500">To</span>
      <DatePopover
        label="Date"
        date={filters.dateTo}
        onSelect={(date) => handleChange('dateTo', date)}
      />
      </div>
    </div>
  )
}

const DatePopover = ({ date, onSelect, label }: { date: Date | null, onSelect: (d: Date | null) => void, label: string }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">
        <CalendarIcon className="w-4 h-4 mr-1 text-neutral-500" />
        {date ? format(date, 'PPP') : label}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        disabled={(date) => date > new Date()}
        selected={date || undefined}
        onSelect={(d) => onSelect(d || null)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
)
