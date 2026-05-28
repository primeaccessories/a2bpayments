import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import TurboITPill from '../components/TurboITPill'
import { LinkButton } from '../components/Button'
import ProductsNavDropdown from '../components/ProductsNavDropdown'

const NAV = [
  { to: '/team', label: 'Our team' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function MarketingLayout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'
  const darkMode = isHome
  const headerBg = isHome
    ? scrolled
      ? 'bg-ink/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
      : 'bg-transparent'
    : scrolled
      ? 'bg-paper/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
      : 'bg-paper'

  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper">
      <header className={`sticky top-0 z-40 transition-colors duration-300 ${headerBg}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandLogo variant={darkMode ? 'dark' : 'light'} />

          <nav className="hidden items-center gap-1 lg:flex">
            <ProductsNavDropdown darkMode={darkMode} />
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? darkMode
                        ? 'bg-paper text-ink'
                        : 'bg-ink text-paper'
                      : darkMode
                        ? 'text-paper/80 hover:bg-white/10 hover:text-paper'
                        : 'text-ink-fade hover:bg-ink/5 hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LinkButton
              to="/sign-in"
              variant="ghost"
              size="sm"
              className={darkMode ? 'text-paper hover:bg-white/10' : ''}
            >
              Sign in
            </LinkButton>
            <LinkButton to="/contact" variant="primary" size="sm">
              Let's get started
              <ArrowUpRight className="h-4 w-4" />
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              darkMode
                ? 'border-white/20 bg-white/5 text-paper backdrop-blur'
                : 'border-ink/10 bg-paper text-ink'
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-ink/5 bg-paper lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/5'
                  }`
                }
              >
                Products
              </NavLink>
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-ink/10 pt-4">
                <LinkButton to="/sign-in" variant="secondary" size="md">
                  Sign in to portal
                </LinkButton>
                <LinkButton to="/contact" variant="primary" size="md">
                  Let's get started
                  <ArrowUpRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className={`flex-1 ${isHome ? '-mt-[72px] sm:-mt-[80px]' : ''}`}>
        <Outlet />
      </main>

      <footer className="mt-32 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <BrandLogo variant="dark" />
              <p className="mt-6 max-w-sm text-pretty text-paper/70">
                Best-in-class card payments and business finance for UK businesses. Based in Blackpool, trusted across the country.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-paper/70">
                <a href="tel:03334432645" className="inline-flex items-center gap-3 hover:text-mint">
                  <Phone className="h-4 w-4" /> 0333 443 2645
                </a>
                <a href="mailto:info@a2bpayments.co.uk" className="inline-flex items-center gap-3 hover:text-mint">
                  <Mail className="h-4 w-4" /> info@a2bpayments.co.uk
                </a>
                <span className="inline-flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    Unit 11 Croft Court, Plumpton Close,<br />
                    Blackpool, Lancashire, FY4 5PR
                  </span>
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/50">
                Payments
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {['payment-terminals', 'virtual-terminal', 'epos-systems', 'ecommerce'].map((s) => (
                  <li key={s}>
                    <Link to={`/products/${s}`} className="text-paper/80 hover:text-mint">
                      {s === 'payment-terminals' && 'Payment terminals'}
                      {s === 'virtual-terminal' && 'Virtual terminal'}
                      {s === 'epos-systems' && 'E-POS systems'}
                      {s === 'ecommerce' && 'E-commerce'}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/50">
                Finance
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link to="/products/cash-advance" className="text-paper/80 hover:text-mint">Cash advance</Link></li>
                <li><Link to="/products/term-loans" className="text-paper/80 hover:text-mint">Term loans</Link></li>
                <li><Link to="/products/revenue-based-loans" className="text-paper/80 hover:text-mint">Revenue-based loans</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/50">
                Company
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link to="/team" className="text-paper/80 hover:text-mint">Our team</Link></li>
                <li><Link to="/testimonials" className="text-paper/80 hover:text-mint">Testimonials</Link></li>
                <li><Link to="/contact" className="text-paper/80 hover:text-mint">Contact</Link></li>
                <li><Link to="/sign-in" className="text-paper/80 hover:text-mint">Customer portal</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-paper/50">
              © {new Date().getFullYear()} A2B Payment Solutions Ltd. Registered in England &amp; Wales. Authorised payment institution.
            </p>
            <TurboITPill />
          </div>
        </div>
      </footer>
    </div>
  )
}
