import { Badge } from "../ui/badge"

const getLogLevelStyle = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'warn':
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'info':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'debug':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      default:
        return ''
    }
  }

export const LevelBadge = ({ level }: { level: string }) => {
  return <Badge variant="outline" className={getLogLevelStyle(level)}>{level}</Badge>
}