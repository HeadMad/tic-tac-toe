/** @type {'dark' | 'light'} */
let theme = $state(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('neon-tac-theme') || 'dark'
    : 'dark'
)

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', theme)
}

export function getTheme() {
  return theme
}

export function setTheme(value) {
  theme = value
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
  try {
    localStorage.setItem('neon-tac-theme', value)
  } catch (_) {}
}

export function toggleTheme() {
  setTheme(theme === 'dark' ? 'light' : 'dark')
}
