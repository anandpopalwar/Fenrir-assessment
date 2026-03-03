import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-neutral rounded-lg"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeToggle
