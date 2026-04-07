import { CATEGORIES, STATUS_CONFIG } from '../data/checks'

function esc(val) {
  return `"${String(val ?? '').replace(/"/g, '""')}"`
}

export function exportProjectCSV(project) {
  const headers = ['Page', 'URL', 'Category', 'Check', 'Description', 'Status', 'Notes']
  const rows = [headers.map(esc).join(',')]

  for (const page of project.pages) {
    for (const cat of CATEGORIES) {
      for (const check of cat.checks) {
        const status = page.checks[check.id] || 'not-started'
        rows.push(
          [page.name, page.url, cat.name, check.name, check.description,
           STATUS_CONFIG[status].label, page.notes]
            .map(esc)
            .join(','),
        )
      }
    }
  }

  const csv = rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${project.name.replace(/[^a-z0-9]/gi, '_')}_a11y_audit.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
