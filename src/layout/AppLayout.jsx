import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from '../ui/ThemeToggle'

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
    return undefined
  }, [isSidebarOpen])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)]">
      <div className="flex min-h-screen">
        <Sidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />
        <Backdrop open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Open sidebar"
                  onClick={() => setIsSidebarOpen((v) => !v)}
                  className="btn-neutral p-2 md:hidden"
                >
                  <span className="flex flex-col gap-1">
                    <span className="block h-0.5 w-4 bg-current" />
                    <span className="block h-0.5 w-4 bg-current" />
                    <span className="block h-0.5 w-4 bg-current" />
                  </span>
                  <span className="sr-only">Toggle menu</span>
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Workspace</p>
                  <h2 className="text-lg font-semibold">Security Console</h2>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="mx-auto w-full max-w-screen-2xl min-w-0 flex-1 px-4 py-6 md:py-8 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
