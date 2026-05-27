import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CreditCard,
  Banknote,
  Smartphone,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import { MOCK_USER } from '../lib/portal-mock'
import { isAuthed, signOut } from '../lib/auth'

const NAV = [
  { to: '/portal', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/portal/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/portal/loans', label: 'Finance & loans', icon: Banknote },
  { to: '/portal/terminals', label: 'Terminals', icon: Smartphone },
  { to: '/portal/support', label: 'Support', icon: MessageSquare },
  { to: '/portal/profile', label: 'Profile & docs', icon: User },
]

export default function PortalLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  if (!isAuthed()) {
    return <Navigate to="/sign-in" replace />
  }

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    signOut()
    navigate('/sign-in', { replace: true })
  }

  return (
    <div className="flex min-h-[100dvh] bg-paper-soft">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-ink/5 bg-paper transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-ink/5 px-6">
            <BrandLogo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-fade hover:bg-ink/5 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-ink/5 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-fade">Signed in as</p>
            <p className="mt-1 font-display text-sm font-semibold text-ink">{MOCK_USER.businessName}</p>
            <p className="text-xs text-ink-muted">MID {MOCK_USER.merchantId}</p>
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
                      ? 'bg-ink text-paper'
                      : 'text-ink-muted hover:bg-ink/5 hover:text-ink'
                  }`
                }
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-ink/5 p-3">
            <a
              href="/sign-in"
              onClick={handleSignOut}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-ink/5 hover:text-ink"
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/5 bg-paper/80 px-5 backdrop-blur-md sm:px-8 lg:hidden">
          <BrandLogo />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
