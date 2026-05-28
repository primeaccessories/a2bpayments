import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { PRODUCTS } from '../lib/products'

interface Props {
  darkMode: boolean
}

const CLOSE_DELAY_MS = 120

const PAYMENTS = PRODUCTS.filter((p) => p.category === 'payments')
const FINANCE = PRODUCTS.filter((p) => p.category === 'finance')

export default function ProductsNavDropdown({ darkMode }: Props) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const onProductsRoute = location.pathname.startsWith('/products')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  const handleEnter = () => {
    cancelClose()
    setOpen(true)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={scheduleClose}
      onFocus={handleEnter}
      onBlur={scheduleClose}
    >
      <NavLink
        to="/products"
        onClick={(e) => {
          // Navigate explicitly so a press always reaches /products — the hover
          // dropdown otherwise swallows the link's default activation.
          e.preventDefault()
          setOpen(false)
          navigate('/products')
        }}
        className={() =>
          `inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
            onProductsRoute
              ? darkMode
                ? 'bg-paper text-ink'
                : 'bg-ink text-paper'
              : darkMode
                ? 'text-paper/80 hover:bg-white/10 hover:text-paper'
                : 'text-ink-fade hover:bg-ink/5 hover:text-ink'
          }`
        }
      >
        Products
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.2}
        />
      </NavLink>

      <div
        aria-hidden={!open}
        className={`absolute left-0 top-full z-50 w-[640px] max-w-[calc(100vw-2rem)] pt-3 transition-[opacity,transform] duration-150 ease-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="overflow-hidden rounded-2xl border border-ink/5 bg-paper shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-ink/5">
          <div className="grid grid-cols-2 gap-1 p-3">
            <Column label="Payments" items={PAYMENTS} />
            <Column label="Finance" items={FINANCE} />
          </div>

          <Link
            to="/products"
            className="group flex items-center justify-between border-t border-ink/5 bg-paper-soft px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-ink/[0.04]"
          >
            See all products
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

interface ColumnProps {
  label: string
  items: typeof PRODUCTS
}

function Column({ label, items }: ColumnProps) {
  return (
    <div>
      <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-mint-deep">
        {label}
      </p>
      <ul className="space-y-0.5">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/products/${p.slug}`}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-mint/10"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/5 transition group-hover:ring-mint/40">
                <img src={p.image} alt="" loading="lazy" className="max-h-7 max-w-7 object-contain" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{p.title}</span>
                <span className="block truncate text-xs text-ink-fade">{p.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
