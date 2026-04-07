import { useState, useRef } from 'react'
import { CATEGORIES, STATUS_CONFIG } from '../data/checks'
import { categoryPageStats, pageStats } from '../utils/stats'
import StatusDot from './StatusDot'

const ALL_CATEGORY_IDS = CATEGORIES.map((c) => c.id)

export default function AuditTable({
  project,
  filter,
  onUpdateCheck,
  onUpdateNotes,
  onDeletePage,
  onRenamePage,
}) {
  const [expanded, setExpanded] = useState(new Set(ALL_CATEGORY_IDS))
  const [editingNotes, setEditingNotes] = useState(null)
  const [editingPageId, setEditingPageId] = useState(null)
  const [editingPageName, setEditingPageName] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const notesRef = useRef(null)

  const pages = project.pages.filter((page) => {
    if (filter === 'failures') return pageStats(page).fail > 0
    if (filter === 'clear') {
      const s = pageStats(page)
      return s.fail === 0 && s.inProgress === 0
    }
    return true
  })

  function toggleCategory(id) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setExpanded((prev) =>
      prev.size === CATEGORIES.length ? new Set() : new Set(ALL_CATEGORY_IDS),
    )
  }

  function startRename(page) {
    setEditingPageId(page.id)
    setEditingPageName(page.name)
  }

  function commitRename() {
    if (editingPageName.trim()) onRenamePage(editingPageId, editingPageName.trim())
    setEditingPageId(null)
  }

  if (pages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm">
            {filter !== 'all' ? 'No pages match this filter.' : 'No pages yet — add one above.'}
          </p>
        </div>
      </div>
    )
  }

  // Build column layout
  const columns = CATEGORIES.flatMap((cat) => {
    const isOpen = expanded.has(cat.id)
    if (isOpen) return cat.checks.map((check) => ({ type: 'check', cat, check }))
    return [{ type: 'summary', cat }]
  })

  const allExpanded = expanded.size === CATEGORIES.length

  return (
    <>
      {/* Notes modal */}
      {editingNotes !== null && (() => {
        const page = project.pages.find((p) => p.id === editingNotes)
        return (
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingNotes(null)}
          >
            <div
              className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Notes — {page?.name}</h3>
              <p className="text-xs text-gray-400 mb-3">Internal notes, issues to revisit, links, etc.</p>
              <textarea
                ref={notesRef}
                autoFocus
                defaultValue={page?.notes || ''}
                rows={6}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes here…"
                onChange={(e) => onUpdateNotes(editingNotes, e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditingNotes(null)}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50">
        <button
          onClick={toggleAll}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </button>
        <span className="text-gray-300 text-xs">·</span>
        <span className="text-xs text-gray-400">
          Click a status dot to cycle: Not started → Pass → Fail → In progress → N/A
        </span>
        <div className="ml-auto flex items-center gap-3 text-xs text-gray-400">
          {Object.entries(STATUS_CONFIG).map(([key, { label, dot }]) => (
            <span key={key} className="flex items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full inline-block ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-auto flex-1">
        <table className="border-collapse text-xs w-max min-w-full">
          <thead>
            {/* Category row */}
            <tr className="sticky top-0 z-20">
              <th
                className="sticky left-0 z-30 bg-white border-b border-r border-gray-200 min-w-[200px] max-w-[220px] text-left px-3 py-2 font-medium text-gray-600"
              >
                Page
              </th>
              {CATEGORIES.map((cat) => {
                const isOpen = expanded.has(cat.id)
                const colSpan = isOpen ? cat.checks.length : 1
                return (
                  <th
                    key={cat.id}
                    colSpan={colSpan}
                    className={`border-b border-r border-gray-200 px-2 py-1.5 font-semibold text-center ${cat.colorClass}`}
                  >
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-1 mx-auto hover:opacity-70 transition-opacity whitespace-nowrap font-semibold"
                      title={isOpen ? 'Collapse' : 'Expand'}
                    >
                      <span>{cat.name}</span>
                      <span className="opacity-60 text-xs">({cat.checks.length})</span>
                      <span className="ml-0.5 text-xs">{isOpen ? '▾' : '▸'}</span>
                    </button>
                  </th>
                )
              })}
              <th className="sticky right-0 z-30 bg-white border-b border-l border-gray-200 px-2 py-1.5 font-medium text-gray-600 text-center min-w-[60px]">
                Score
              </th>
              <th className="sticky right-0 z-30 bg-white border-b border-l border-gray-200 px-2 py-1.5 font-medium text-gray-600 text-center min-w-[70px]">
                Actions
              </th>
            </tr>

            {/* Check name row */}
            <tr className="sticky top-[33px] z-20">
              <th className="sticky left-0 z-30 bg-white border-b border-r border-gray-200 px-3 py-1 text-left text-gray-400 font-normal" />
              {columns.map((col, i) => {
                if (col.type === 'summary') {
                  return (
                    <th
                      key={`summary-${col.cat.id}`}
                      className={`border-b border-r border-gray-200 px-2 py-1 text-center ${col.cat.headerBg} text-gray-500 font-normal`}
                    >
                      <button
                        onClick={() => toggleCategory(col.cat.id)}
                        className="text-xs hover:text-gray-700 transition-colors"
                        title="Expand to see all checks"
                      >
                        ▸ expand
                      </button>
                    </th>
                  )
                }
                return (
                  <th
                    key={`check-${col.check.id}`}
                    className={`border-b border-r border-gray-200 px-1 py-1 ${col.cat.headerBg}`}
                    title={col.check.description}
                  >
                    <div className="writing-vertical text-gray-600 font-normal py-1 max-h-[80px] overflow-hidden">
                      {col.check.name}
                    </div>
                  </th>
                )
              })}
              <th className="sticky right-0 z-30 bg-white border-b border-l border-gray-200 px-2 py-1" />
              <th className="sticky right-0 z-30 bg-white border-b border-l border-gray-200 px-2 py-1" />
            </tr>
          </thead>

          <tbody>
            {pages.map((page, rowIdx) => {
              const pStats = pageStats(page)
              const rowBg = rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
              return (
                <tr key={page.id} className={`${rowBg} hover:bg-blue-50/30 group`}>
                  {/* Page name */}
                  <td className={`sticky left-0 z-10 ${rowBg} group-hover:bg-blue-50/30 border-b border-r border-gray-100 px-3 py-1.5 min-w-[200px] max-w-[220px]`}>
                    {editingPageId === page.id ? (
                      <form
                        onSubmit={(e) => { e.preventDefault(); commitRename() }}
                        className="flex gap-1"
                      >
                        <input
                          autoFocus
                          value={editingPageName}
                          onChange={(e) => setEditingPageName(e.target.value)}
                          onBlur={commitRename}
                          className="flex-1 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
                        />
                      </form>
                    ) : (
                      <div className="flex items-start gap-1">
                        <span
                          className="font-medium text-gray-800 text-xs truncate block leading-tight cursor-pointer hover:text-blue-600"
                          title={page.name + (page.url ? `\n${page.url}` : '')}
                          onClick={() => startRename(page)}
                        >
                          {page.name}
                        </span>
                        {page.url && (
                          <a
                            href={page.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500 shrink-0 mt-px"
                            title={page.url}
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    )}
                    {page.notes && (
                      <div
                        className="text-gray-400 text-xs truncate mt-0.5 cursor-pointer hover:text-gray-600"
                        onClick={() => setEditingNotes(page.id)}
                        title={page.notes}
                      >
                        📝 {page.notes}
                      </div>
                    )}
                  </td>

                  {/* Check cells */}
                  {columns.map((col) => {
                    if (col.type === 'summary') {
                      const cs = categoryPageStats(page, col.cat)
                      return (
                        <td
                          key={`summary-${col.cat.id}`}
                          className="border-b border-r border-gray-100 px-2 py-1.5 text-center align-middle"
                        >
                          <SummaryCell stats={cs} />
                        </td>
                      )
                    }
                    const status = page.checks[col.check.id] || 'not-started'
                    return (
                      <td
                        key={`check-${col.check.id}`}
                        className="border-b border-r border-gray-100 px-1 py-1.5 text-center align-middle"
                      >
                        <StatusDot
                          status={status}
                          onChange={(s) => onUpdateCheck(page.id, col.check.id, s)}
                        />
                      </td>
                    )
                  })}

                  {/* Score */}
                  <td className={`sticky right-[70px] z-10 ${rowBg} group-hover:bg-blue-50/30 border-b border-l border-gray-100 px-2 py-1.5 text-center font-semibold min-w-[60px]`}>
                    <ScoreChip score={pStats.score} active={pStats.active} />
                  </td>

                  {/* Actions */}
                  <td className={`sticky right-0 z-10 ${rowBg} group-hover:bg-blue-50/30 border-b border-l border-gray-100 px-2 py-1.5 text-center min-w-[70px]`}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setEditingNotes(page.id)}
                        className={`p-1 rounded hover:bg-gray-200 transition-colors ${page.notes ? 'text-blue-500' : 'text-gray-300 hover:text-gray-500'}`}
                        title="Notes"
                      >
                        📝
                      </button>
                      {confirmDelete === page.id ? (
                        <>
                          <button
                            onClick={() => { onDeletePage(page.id); setConfirmDelete(null) }}
                            className="text-red-600 text-xs font-medium px-1 hover:underline"
                          >
                            Del
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-gray-400 text-xs px-0.5 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(page.id)}
                          className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                          title="Remove page"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

function SummaryCell({ stats }) {
  const { pass, fail, inProgress, na, total } = stats
  const active = total - na
  const score = active > 0 ? Math.round((pass / active) * 100) : 100

  let color = 'text-gray-400'
  if (fail > 0) color = 'text-red-600'
  else if (inProgress > 0) color = 'text-amber-600'
  else if (score === 100 && active > 0) color = 'text-green-600'

  return (
    <div className={`text-xs font-medium ${color} leading-tight`}>
      <div>{pass}/{active > 0 ? active : total}</div>
      {fail > 0 && <div className="text-red-500">{fail}✗</div>}
    </div>
  )
}

function ScoreChip({ score, active }) {
  if (active === 0) return <span className="text-gray-300 text-xs">—</span>
  const color =
    score === 100 ? 'text-green-600' : score >= 80 ? 'text-amber-600' : 'text-red-600'
  return <span className={`text-xs font-bold ${color}`}>{score}%</span>
}
