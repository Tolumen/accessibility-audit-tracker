import { useState } from 'react'
import { projectStats } from '../utils/stats'
import ThemeToggle from './ThemeToggle'

export default function ProjectList({ projects, isDark, onToggleDark, onSelect, onAdd, onDelete, onRename }) {
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  function handleAdd(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    onAdd(name)
    setNewName('')
  }

  function handleRename(e) {
    e.preventDefault()
    if (editing?.name.trim()) onRename(editing.id, editing.name.trim())
    setEditing(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-none">
              A11y Audit Tracker
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Web accessibility audit management
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={onToggleDark} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            New project
          </h2>
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Project name, e.g. 1014 site, Client B…"
              className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Create project
            </button>
          </form>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <div className="text-5xl mb-4">♿</div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No projects yet</p>
            <p className="text-sm mt-1">Create your first audit project above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
            {projects.map((project) => {
              const stats = projectStats(project)
              return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all shadow-sm"
                >
                  {editing?.id === project.id ? (
                    <form onSubmit={handleRename} className="p-4 flex gap-2">
                      <input
                        autoFocus
                        value={editing.name}
                        onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button type="submit" className="text-sm text-blue-500 font-medium px-2">Save</button>
                      <button type="button" onClick={() => setEditing(null)} className="text-sm text-gray-400 px-2 hover:text-gray-300">Cancel</button>
                    </form>
                  ) : (
                    <div className="p-4 flex items-center gap-4">
                      <button onClick={() => onSelect(project.id)} className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{project.name}</div>
                        <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                          <Stat label="Pages" value={stats.pageCount} />
                          <Stat label="Passed" value={`${stats.pctPassed}%`} colored={stats.pctPassed === 100 && stats.pageCount > 0} />
                          <Stat label="Failures" value={stats.totalFail} warn={stats.totalFail > 0} />
                          <Stat label="Clear" value={`${stats.pagesClear}/${stats.pageCount}`} />
                        </div>
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditing({ id: project.id, name: project.name })}
                          className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title="Rename"
                        >
                          ✏️
                        </button>
                        {confirmDelete === project.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { onDelete(project.id); setConfirmDelete(null) }}
                              className="text-xs text-red-400 font-medium px-2 py-1 bg-red-900/20 rounded hover:bg-red-900/40"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs text-gray-400 px-2 py-1 hover:text-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(project.id)}
                            className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"
                            title="Delete project"
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

function Stat({ label, value, colored, warn }) {
  const cls = colored
    ? 'text-green-400 font-semibold'
    : warn
    ? 'text-red-400 font-semibold'
    : 'text-gray-300 dark:text-gray-300'
  return (
    <span className="text-xs text-gray-400 dark:text-gray-500">
      {label}: <span className={cls}>{value}</span>
    </span>
  )
}
