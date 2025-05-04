import { fetchLogs } from '@/api/logs'
import { LogViewer } from '@/components/logs/logViewer'

export default async function Home() {
  const { logs, isMockData } = await fetchLogs()

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Log Viewer</h1>
      <LogViewer initialLogs={logs} isMockData={isMockData} />
    </main>
  )
}
