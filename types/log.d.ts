export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export interface LogEntry {
    timestamp: string
    message: string
    level: LogLevel
    trace: string
    authorId: string
}

export interface FilterState {
    level: string
    searchTerm: string
    dateFrom: Date | null
    dateTo: Date | null
}