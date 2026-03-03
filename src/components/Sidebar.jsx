import { NavLink } from 'react-router-dom'

function Sidebar({ open, onClose, onLogout }) {
  const navClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--primary)] text-neutral-950'
        : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
    }`

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-[var(--border)] bg-[var(--surface)] p-4 transition-transform duration-300 md:relative md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Fenrir</span>
        </div>
        <h2 className="text-lg font-semibold">Control Center</h2>
      </div>

      <nav className="space-y-1.5">
        <NavLink to="/dashboard" className={navClass} onClick={onClose}>
          Dashboard
        </NavLink>
        <NavLink to="/scan/123" className={navClass} onClick={onClose}>
          Scan
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="btn-neutral mt-8 w-full"
      >
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
