import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-fade">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ink/5 bg-paper p-6 ${className}`}>{children}</div>
  )
}

export function StatTile({
  label,
  value,
  sub,
  Icon,
  accent,
  warn,
}: {
  label: string
  value: string
  sub?: string
  Icon: LucideIcon
  accent?: boolean
  warn?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? 'border-mint/30 bg-gradient-to-br from-mint/10 to-paper' : 'border-ink/5 bg-paper'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-fade">{label}</p>
        <div
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
            warn ? 'bg-orange-500/15 text-orange-600' : 'bg-ink/5 text-ink-muted'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {sub && <p className="mt-1.5 text-xs text-ink-fade">{sub}</p>}
    </div>
  )
}

export type PillTone = 'mint' | 'amber' | 'rose' | 'ink' | 'blue' | 'violet'
export function Pill({ tone = 'ink', children }: { tone?: PillTone; children: ReactNode }) {
  const map: Record<PillTone, string> = {
    mint: 'bg-mint/15 text-mint-deep',
    amber: 'bg-amber-500/15 text-amber-700',
    rose: 'bg-rose-500/15 text-rose-700',
    ink: 'bg-ink/10 text-ink-muted',
    blue: 'bg-blue-500/15 text-blue-700',
    violet: 'bg-violet-500/15 text-violet-700',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>
  )
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, PillTone> = {
    live: 'mint',
    online: 'mint',
    settled: 'mint',
    active: 'mint',
    approved: 'mint',
    'paid-off': 'mint',
    resolved: 'mint',
    pending: 'amber',
    'pending-kyc': 'amber',
    underwriting: 'amber',
    'docs-requested': 'amber',
    'awaiting-customer': 'amber',
    maintenance: 'amber',
    shipping: 'blue',
    new: 'blue',
    'in-stock': 'ink',
    paused: 'ink',
    open: 'violet',
    refunded: 'ink',
    offline: 'rose',
    churned: 'rose',
    rejected: 'rose',
    declined: 'rose',
    disputed: 'rose',
    suspended: 'rose',
    invited: 'amber',
  }
  const tone = map[status] ?? 'ink'
  return <Pill tone={tone}>{labelize(status)}</Pill>
}

export function labelize(s: string): string {
  return s.replace(/-/g, ' ').replace(/(^|\s)\w/g, (c) => c.toUpperCase())
}

export function gbp(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2, ...opts })
}

export function TableShell({ children, columns }: { children: ReactNode; columns: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/5 bg-paper">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/5 bg-paper-soft text-left text-xs font-semibold uppercase tracking-wider text-ink-fade">
              {columns.map((c) => (
                <th key={c} className="px-5 py-3 first:pl-6 last:pr-6">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">{children}</tbody>
        </table>
      </div>
    </div>
  )
}

export function Tr({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={`text-ink ${onClick ? 'cursor-pointer transition hover:bg-paper-soft' : ''}`}
    >
      {children}
    </tr>
  )
}

export function Td({ children, className = '', mono }: { children: ReactNode; className?: string; mono?: boolean }) {
  return (
    <td className={`px-5 py-3.5 first:pl-6 last:pr-6 ${mono ? 'font-mono text-[13px]' : ''} ${className}`}>
      {children}
    </td>
  )
}

export function ToolbarInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border border-ink/10 bg-paper px-3.5 text-sm text-ink placeholder:text-ink-fade focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15 sm:w-72"
    />
  )
}

export function ChipFilter<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`inline-flex min-h-[40px] items-center justify-center rounded-full px-4 text-xs font-semibold transition sm:min-h-[34px] sm:py-1.5 ${
              active ? 'bg-ink text-paper' : 'bg-paper-soft text-ink-muted hover:bg-ink/10'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/10 bg-paper p-10 text-center text-sm text-ink-fade">
      {message}
    </div>
  )
}
