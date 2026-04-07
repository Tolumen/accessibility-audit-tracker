import { useState } from 'react'
import Dashboard from './Dashboard'
import AuditTable from './AuditTable'
import MobileView from './MobileView'
import { exportProjectCSV } from '../utils/csvExport'
import { createPage } from '../utils/factories'

const FILTERS = [
  { id: 'all', label: 'All pages' },
  { id: 'failures', label: 'Has failures' },
  { id: 'clear', label: 'All clear' },
]

export default function AuditView({
  project,
  onBack,
  onAddPage,
  onDeletePage,
  onUpdateCheck,
  onUpdateNotes,
  onRenamePage,
}) {
  const [filter, setFilter] = useState('all')
  const [showAddPage, setShowAddPage] = useState(false)
  const [newPageName, setNewPageName] = useState('')
  const [newPageUrl, setNewPageUrl] = useState('')

  function handleAddPage(e) {
    e.preventDefault()
    const name = newPageName.trim()
    if (!name) return
    onAddPage(name, newPageUrl.trim())
    setNewPageName('')
    setNewPageUrl('')
    setShowAddPage(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center gap-1 shrink-0"
        >
          <span className="hidden sm:inline">←</span> Projects
        </button>
        <span className="text-gray-300 hidden sm:inline">/</span>
        <h1 className="font-semibold text-gray-900 truncate flex-1 text-sm sm:text-base">
          {project.name}
        </h1>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => exportProjectCSV(project)}
            className="text-xs text-gray-600 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            title="Export to CSV"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowAddPage(!showAddPage)}
            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Add page
          </button>
        </div>
      </header>

      {/* Add page form */}
      {showAddPage && (
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 shrink-0">
          <form onSubmit={handleAddPage} className="flex flex-wrap gap-2 max-w-2xl">
            <input
              autoFocus
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="Page name, e.g. Home, About, Contact…"
              className="flex-1 min-w-[160px] border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={newPageUrl}
              onChange={(e) => setNewPageUrl(e.target.value)}
              placeholder="URL (optional)"
              type="url"
              className="flex-1 min-w-[160px] border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!newPageName.trim()}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setShowAddPage(false); setNewPageName(''); setNewPageUrl('') }}
              className="text-sm text-gray-500 px-2 hover:text-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Dashboard stats */}
      <Dashboard project={project} />

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-1 shrink-0">
        <span className="text-xs text-gray-400 mr-2 hidden sm:inline">Filter:</span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === f.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 hidden sm:inline">
          {project.pages.length} page{project.pages.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Desktop table view */}
      <div className="hidden md:flex flex-col flex-1 overflow-hidden">
        <AuditTable
          project={project}
          filter={filter}
          onUpdateCheck={onUpdateCheck}
          onUpdateNotes={onUpdateNotes}
          onDeletePage={onDeletePage}
          onRenamePage={onRenamePage}
        />
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col flex-1 overflow-hidden">
        <MobileView
          project={project}
          filter={filter}
          onUpdateCheck={onUpdateCheck}
          onUpdateNotes={onUpdateNotes}
          onDeletePage={onDeletePage}
        />
      </div>
    </div>
  )
}
