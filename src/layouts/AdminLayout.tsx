import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Receipt,
  Smartphone,
  Banknote,
  FileText,
  LifeBuoy,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Shield,
  Bell,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import { ADMIN_USER } from '../lib/admin-mock'
import { isAdmin, signOut } from '../lib/auth'

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/merchants', label: 'Merchants', icon: Building2 },
  { to: '/admin/transactions', label: 'Transactions', icon: Receipt },
  { to: '/admin/terminals', label: 'Terminals', icon: Smartphone },
  { to: '/admin/finance', label: 'Finance & advances', icon: Banknote },
  { to: '/admin/applications', label: 'Applications', icon: FileText },
  { to: '/admin/support', label: 'Support', icon: LifeBuoy },
  { to: '/admin/team', label: 'Team & roles', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  if (!isAdmin()) {
    return <Navigate to="/admin/sign-in" replace />
  }

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    signOut()
    navigate('/admin/sign-in', { replace: true })
  }

  return (
    <div className="flex min-h-[100dvh] bg-paper-soft">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-ink/5 bg-ink text-paper transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
            <div className="flex items-center gap-2">
              <BrandLogo hardNav variant="dark" />
              <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mint">
                Admin
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-paper/60 hover:bg-white/5 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/20 font-display text-sm font-semibold text-mint">
                {ADMIN_USER.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-paper">{ADMIN_USER.name}</p>
                <p className="flex items-center gap-1 text-xs text-paper/55">
                  <Shield className="h-3 w-3" /> {ADMIN_USER.role}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-mint/15 text-mint'
                      : 'text-paper/65 hover:bg-white/5 hover:text-paper'
                  }`
                }
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/5 p-3">
            <a
              href="/admin/sign-in"
              onClick={handleSignOut}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-paper/65 transition hover:bg-white/5 hover:text-paper"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Sign out
            </a>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink/5 bg-paper/80 px-5 py-3 backdrop-blur-md sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink hover:bg-ink/5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-fade" />
            <input
              type="search"
              placeholder="Search merchants, MIDs, terminals, tickets…"
              className="h-9 w-full rounded-full border border-ink/10 bg-paper-soft pl-9 pr-4 text-sm text-ink placeholder:text-ink-fade focus:border-mint focus:bg-paper focus:outline-none focus:ring-4 focus:ring-mint/15"
            />
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Demo mode · no live data
          </span>

          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink-muted hover:bg-ink/5"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-mint" />
          </button>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
