import { useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { PRODUCTS } from '../lib/products'

interface Props {
  darkMode: boolean
}

const CLOSE_DELAY_MS = 140

const PAYMENTS = PRODUCTS.filter((p) => p.category === 'payments')
const FINANCE = PRODUCTS.filter((p) => p.category === 'finance')

export default function ProductsNavDropdown({ darkMode }: Props) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()
  const onProductsRoute = location.pathname.startsWith('/products')

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
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
          </motion.div>
        )}
      </AnimatePresence>
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
        {items.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.04 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={`/products/${p.slug}`}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-mint/10"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mint/15 text-mint-deep transition group-hover:bg-mint group-hover:text-ink">
                <p.Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{p.title}</span>
                <span className="block truncate text-xs text-ink-fade">{p.tagline}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
