import { useMemo, useState } from 'react'
import { Download, Filter } from 'lucide-react'
import { PageHeader, StatusPill, Pill, TableShell, Tr, Td, ToolbarInput, ChipFilter, gbp } from './ui'
import { ADMIN_TRANSACTIONS, ADMIN_MERCHANTS, type AdminTransaction } from '../../lib/admin-mock'

type StatusFilter = 'all' | AdminTransaction['status']

export default function AdminTransactionsPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [merchant, setMerchant] = useState<string>('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ADMIN_TRANSACTIONS.filter((t) => {
      if (status !== 'all' && t.status !== status) return false
      if (merchant !== 'all' && t.merchantId !== merchant) return false
      if (!needle) return true
      return (
        t.id.toLowerCase().includes(needle) ||
        t.merchantName.toLowerCase().includes(needle) ||
        t.scheme.toLowerCase().includes(needle) ||
        t.terminal.toLowerCase().includes(needle)
      )
    })
  }, [q, status, merchant])

  const totals = useMemo(() => {
    const settled = filtered.filter((t) => t.status === 'settled' || t.status === 'pending')
    return {
      count: filtered.length,
      gross: settled.reduce((s, t) => s + t.amount, 0),
      fees: settled.reduce((s, t) => s + t.fee, 0),
      net: settled.reduce((s, t) => s + t.net, 0),
    }
  }, [filtered])

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Transactions"
        subtitle="Every authorisation across the estate. Filter, search, export."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-4">
        <Tile label="Transactions" value={`${totals.count}`} />
        <Tile label="Gross" value={gbp(totals.gross)} />
        <Tile label="Fees earned" value={gbp(totals.fees)} accent />
        <Tile label="Net to merchants" value={gbp(totals.net)} />
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToolbarInput placeholder="Search ID, merchant, scheme, terminal…" value={q} onChange={setQ} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
            <Filter className="h-3.5 w-3.5" /> Status
          </span>
          <ChipFilter<StatusFilter>
            value={status}
            onChange={setStatus}
            options={[
              { value: 'all', label: 'All' },
              { value: 'settled', label: 'Settled' },
              { value: 'pending', label: 'Pending' },
              { value: 'refunded', label: 'Refunded' },
              { value: 'disputed', label: 'Disputed' },
            ]}
          />
        </div>
      </div>

      <div className="mb-5">
        <select
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="rounded-xl border border-ink/10 bg-paper px-3.5 py-2 text-sm text-ink focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
        >
          <option value="all">All merchants</option>
          {ADMIN_MERCHANTS.map((m) => (
            <option key={m.id} value={m.id}>{m.businessName}</option>
          ))}
        </select>
      </div>

      <TableShell columns={['Transaction', 'Merchant', 'Terminal', 'Scheme', 'Status', 'Gross', 'Fee', 'Net']}>
        {filtered.slice(0, 80).map((t) => (
          <Tr key={t.id}>
            <Td>
              <p className="font-mono text-[13px] font-semibold text-ink">{t.id}</p>
              <p className="text-xs text-ink-fade">{t.date} · {t.time}</p>
            </Td>
            <Td className="text-ink">{t.merchantName}</Td>
            <Td className="text-ink-muted">{t.terminal}</Td>
            <Td><Pill tone="ink">{t.scheme}</Pill></Td>
            <Td><StatusPill status={t.status} /></Td>
            <Td mono className="font-semibold text-ink">{gbp(t.amount)}</Td>
            <Td mono className="text-ink-muted">{gbp(t.fee)}</Td>
            <Td mono className="text-ink">{gbp(t.net)}</Td>
          </Tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={8} className="px-6 py-12 text-center text-sm text-ink-fade">
              No transactions match your filters.
            </td>
          </tr>
        )}
      </TableShell>
      {filtered.length > 80 && (
        <p className="mt-4 text-xs text-ink-fade">Showing first 80 of {filtered.length}. Use filters or export to drill further.</p>
      )}
    </div>
  )
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? 'border-mint/30 bg-gradient-to-br from-mint/10 to-paper' : 'border-ink/5 bg-paper'}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-ink-fade">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{value}</p>
    </div>
  )
}
