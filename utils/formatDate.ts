import { format } from 'date-fns'

export const formatDate = (isoDate: string): string => {
    try {
        return format(new Date(isoDate), 'yyyy-MM-dd HH:mm:ss')
    } catch {
        return isoDate
    }
}