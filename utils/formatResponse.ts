import { LogEntry, LogLevel } from "@/types/log";

export const formatResponse = (response: string[]): LogEntry[] => {
    return response.map((row) => {
        const [timestamp, message, level, trace, authorId] = row.split('|=|')
        return {
            timestamp,
            message,
            level: level.toUpperCase() as LogLevel,
            trace,
            authorId
        }
    })
}
