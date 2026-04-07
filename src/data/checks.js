export const CATEGORIES = [
  {
    id: 'structure',
    name: 'Structure',
    colorClass: 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/25 dark:text-violet-300 dark:border-violet-700',
    headerBg: 'bg-violet-50 dark:bg-violet-900/10',
    checks: [
      { id: 'h1', name: 'H1', description: 'Single H1 per page' },
      { id: 'headings', name: 'Headings', description: 'Logical H2–H6 order, no skipped levels' },
      { id: 'skip_link', name: 'Skip link', description: 'Bypass block for main content' },
      { id: 'landmarks', name: 'Landmarks', description: 'main, nav, footer regions properly tagged' },
      { id: 'page_title', name: 'Page title', description: 'Unique, descriptive <title> tag' },
      { id: 'language', name: 'Language', description: 'lang attribute set on <html> element' },
    ],
  },
  {
    id: 'interactive',
    name: 'Interactive',
    colorClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-700',
    headerBg: 'bg-blue-50 dark:bg-blue-900/10',
    checks: [
      { id: 'keyboard_accessible', name: 'Keyboard', description: 'All interactions reachable by keyboard' },
      { id: 'focus_order', name: 'Focus order', description: 'Logical tab sequence' },
      { id: 'focus_visible', name: 'Focus visible', description: 'Focus ring visible at all times' },
      { id: 'no_keyboard_trap', name: 'No trap', description: 'User can always tab out of any component' },
      { id: 'button_roles', name: 'Btn roles', description: 'No divs/spans/anchors acting as buttons without role="button"' },
      { id: 'buttons_labels', name: 'Btn labels', description: 'Every button has visible or accessible text' },
      { id: 'link_labels', name: 'Link labels', description: 'Descriptive link text, no "click here" or "read more"' },
      { id: 'new_tab_links', name: 'New tab', description: 'Screen reader notified when link opens new window' },
    ],
  },
  {
    id: 'images_media',
    name: 'Images & media',
    colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/25 dark:text-emerald-300 dark:border-emerald-700',
    headerBg: 'bg-emerald-50 dark:bg-emerald-900/10',
    checks: [
      { id: 'alt_text', name: 'Alt text', description: 'Meaningful images have descriptions' },
      { id: 'decorative_images', name: 'Decorative', description: 'role="presentation" or empty alt on decorative images' },
      { id: 'svg_icons', name: 'SVG/icons', description: 'Font icons and inline SVGs have appropriate roles' },
      { id: 'functional_images', name: 'Functional', description: 'Image buttons and linked images have descriptive alt' },
      { id: 'embedded_media', name: 'Media', description: 'Videos have captions, audio has transcripts' },
    ],
  },
  {
    id: 'forms',
    name: 'Forms',
    colorClass: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/25 dark:text-orange-300 dark:border-orange-700',
    headerBg: 'bg-orange-50 dark:bg-orange-900/10',
    checks: [
      { id: 'input_labels', name: 'Input labels', description: 'Every field has an associated <label>' },
      { id: 'submit_button', name: 'Submit btn', description: 'Every form has a submission action' },
      { id: 'checkbox_labels', name: 'Checkbox', description: 'Every checkbox associated with a label' },
      { id: 'validation_errors', name: 'Validation', description: 'Errors announced to screen readers' },
      { id: 'error_identification', name: 'Error ID', description: 'Errors describe what went wrong specifically' },
    ],
  },
  {
    id: 'components',
    name: 'Components',
    colorClass: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/25 dark:text-pink-300 dark:border-pink-700',
    headerBg: 'bg-pink-50 dark:bg-pink-900/10',
    checks: [
      { id: 'carousels', name: 'Carousels', description: 'Next/prev buttons labelled, not tagged as live regions, pagination labelled' },
      { id: 'dropdowns', name: 'Dropdowns', description: 'aria-expanded state reflected in code' },
      { id: 'modals', name: 'Modals', description: 'Tagged for AT, focus trapped while open' },
      { id: 'accordions', name: 'Accordions', description: 'aria-expanded state, correct heading structure inside' },
      { id: 'tabs', name: 'Tabs', description: 'role="tablist", role="tab", aria-selected applied correctly' },
      { id: 'dragging', name: 'Dragging', description: 'All drag interactions operable with a single pointer' },
    ],
  },
  {
    id: 'colour_text',
    name: 'Colour & text',
    colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/25 dark:text-yellow-300 dark:border-yellow-700',
    headerBg: 'bg-yellow-50 dark:bg-yellow-900/10',
    checks: [
      { id: 'contrast', name: 'Contrast', description: 'Text meets 4.5:1 AA, large text meets 3:1' },
      { id: 'text_resize', name: 'Text resize', description: 'Content readable at 200% without horizontal scroll' },
      { id: 'colour_alone', name: 'Colour only', description: 'Colour never the only way information is conveyed' },
      { id: 'motion', name: 'Motion', description: 'Respects prefers-reduced-motion' },
    ],
  },
  {
    id: 'dynamic',
    name: 'Dynamic',
    colorClass: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/25 dark:text-cyan-300 dark:border-cyan-700',
    headerBg: 'bg-cyan-50 dark:bg-cyan-900/10',
    checks: [
      { id: 'hidden_tabindex', name: 'Hidden tab', description: 'Hidden interactive elements excluded from tab order' },
      { id: 'live_regions', name: 'Live regions', description: 'Updates announced correctly, not overused' },
      { id: 'loading_states', name: 'Loading', description: 'Async content changes announced to AT' },
      { id: 'page_reflow', name: 'Reflow', description: 'Content readable at 320px wide without horizontal scroll' },
    ],
  },
  {
    id: 'tables',
    name: 'Tables',
    colorClass: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/25 dark:text-teal-300 dark:border-teal-700',
    headerBg: 'bg-teal-50 dark:bg-teal-900/10',
    checks: [
      { id: 'table_headers', name: 'TH headers', description: '<th> used correctly with scope attribute' },
      { id: 'layout_tables', name: 'Layout tables', description: 'Have role="presentation" so AT ignores them' },
      { id: 'no_nested_tables', name: 'No nesting', description: 'No nested tables' },
    ],
  },
  {
    id: 'metadata',
    name: 'Metadata',
    colorClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-600',
    headerBg: 'bg-slate-50 dark:bg-slate-800/30',
    checks: [
      { id: 'viewport', name: 'Viewport', description: 'meta viewport does not block user scaling' },
      { id: 'meta_page_title', name: 'Page title', description: 'Present, unique, and descriptive' },
      { id: 'no_auto_refresh', name: 'No refresh', description: 'No meta refresh redirects' },
    ],
  },
]

export const ALL_CHECKS = CATEGORIES.flatMap(c => c.checks)

export const STATUS_CYCLE = ['not-started', 'pass', 'fail', 'in-progress', 'na']

export const STATUS_CONFIG = {
  'not-started': { label: 'Not started', dot: 'bg-gray-300 border border-gray-400 dark:bg-gray-600 dark:border-gray-500', text: 'text-gray-400 dark:text-gray-500' },
  'pass':        { label: 'Pass',        dot: 'bg-green-500',                                                               text: 'text-green-700 dark:text-green-400' },
  'fail':        { label: 'Fail',        dot: 'bg-red-500',                                                                 text: 'text-red-700 dark:text-red-400' },
  'in-progress': { label: 'In progress', dot: 'bg-amber-400',                                                               text: 'text-amber-700 dark:text-amber-400' },
  'na':          { label: 'N/A',         dot: 'bg-gray-400 dark:bg-gray-500',                                               text: 'text-gray-500 dark:text-gray-400' },
}
