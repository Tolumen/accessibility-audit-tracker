import { projectStats, pageStats } from '../utils/stats'
import { StatusBadge } from './StatusDot'

export default function Dashboard({ project }) {
  const stats = projectStats(project)

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-wrap gap-3">
        <StatCard label="Pages" value={stats.pageCount} />
        <StatCard
          label="Passed"
          value={`${stats.pctPassed}%`}
          sub={`${stats.totalPass} of ${stats.totalActive} active checks`}
          color={stats.pctPassed >= 90 ? 'green' : stats.pctPassed >= 60 ? 'amber' : 'red'}
        />
        <StatCard
          label="Failures"
          value={stats.totalFail}
          color={stats.totalFail === 0 ? 'green' : 'red'}
        />
        <StatCard
          label="In progress"
          value={stats.totalInProgress}
          color={stats.totalInProgress > 0 ? 'amber' : 'default'}
        />
        <StatCard
          label="Pages clear"
          value={`${stats.pagesClear} / ${stats.pageCount}`}
          color={stats.pagesClear === stats.pageCount && stats.pageCount > 0 ? 'green' : 'default'}
        />
        <StatCard label="N/A checks" value={stats.totalNA} />
      </div>

      {stats.pageCount > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500">Overall progress</span>
            <span className="text-xs font-medium text-gray-700">{stats.pctPassed}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full max-w-lg">
            <div
              className={`h-full rounded-full transition-all ${
                stats.pctPassed >= 90 ? 'bg-green-500' : stats.pctPassed >= 60 ? 'bg-amber-400' : 'bg-red-400'
              }`}
              style={{ width: `${stats.pctPassed}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const colorMap = {
  green: 'text-green-700 bg-green-50',
  red: 'text-red-700 bg-red-50',
  amber: 'text-amber-700 bg-amber-50',
  default: 'text-gray-700 bg-gray-50',
}

function StatCard({ label, value, sub, color = 'default' }) {
  return (
    <div className={`flex flex-col px-4 py-2.5 rounded-lg ${colorMap[color]} min-w-[90px]`}>
      <span className="text-xs opacity-70 font-medium">{label}</span>
      <span className="text-xl font-bold leading-tight">{value}</span>
      {sub && <span className="text-xs opacity-60 mt-0.5">{sub}</span>}
    </div>
  )
}
