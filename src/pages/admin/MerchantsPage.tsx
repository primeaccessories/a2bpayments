import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Download, Filter } from 'lucide-react'
import { PageHeader, StatusPill, Pill, TableShell, Tr, Td, ToolbarInput, ChipFilter, gbp } from './ui'
import { ADMIN_MERCHANTS, type AdminMerchant } from '../../lib/admin-mock'

type StatusFilter = 'all' | 'live' | 'pending-kyc' | 'paused' | 'churned'

export default function AdminMerchantsPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ADMIN_MERCHANTS.filter((m) => {
      if (status !== 'all' && m.status !== status) return false
      if (!needle) return true
      return (
        m.businessName.toLowerCase().includes(needle) ||
        m.contactName.toLowerCase().includes(needle) ||
        m.mid.toLowerCase().includes(needle) ||
        m.industry.toLowerCase().includes(needle) ||
        m.city.toLowerCase().includes(needle)
      )
    })
  }, [q, status])

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Merchants"
        subtitle="The full merchant book. Click a row to drill in."
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink-soft">
              <Plus className="h-4 w-4" /> Onboard merchant
            </button>
          </>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToolbarInput placeholder="Search business, MID, contact, city…" value={q} onChange={setQ} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
            <Filter className="h-3.5 w-3.5" /> Status
          </span>
          <ChipFilter<StatusFilter>
            value={status}
            onChange={setStatus}
            options={[
              { value: 'all', label: `All · ${ADMIN_MERCHANTS.length}` },
              { value: 'live', label: 'Live' },
              { value: 'pending-kyc', label: 'Pending KYC' },
              { value: 'paused', label: 'Paused' },
              { value: 'churned', label: 'Churned' },
            ]}
          />
        </div>
      </div>

      <TableShell columns={['Business', 'MID', 'Industry · City', 'Status', 'Risk', 'Monthly volume', 'Fees', 'Account manager']}>
        {filtered.map((m) => (
          <MerchantRow key={m.id} m={m} />
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={8} className="px-6 py-12 text-center text-sm text-ink-fade">
              No merchants match your filters.
            </td>
          </tr>
        )}
      </TableShell>

      <p className="mt-4 text-xs text-ink-fade">
        {filtered.length} of {ADMIN_MERCHANTS.length} merchants
      </p>
    </div>
  )
}

function MerchantRow({ m }: { m: AdminMerchant }) {
  return (
    <Tr>
      <Td>
        <Link to={`/admin/merchants/${m.id}`} className="font-semibold text-ink hover:text-mint-deep">
          {m.businessName}
        </Link>
        <p className="text-xs text-ink-fade">{m.contactName} · {m.contactEmail}</p>
      </Td>
      <Td mono className="text-ink-muted">{m.mid}</Td>
      <Td className="text-ink-muted">{m.industry} · <span className="text-ink-fade">{m.city}</span></Td>
      <Td><StatusPill status={m.status} /></Td>
      <Td>
        <Pill tone={m.riskBand === 'high' ? 'rose' : m.riskBand === 'medium' ? 'amber' : 'mint'}>
          {m.riskBand}
        </Pill>
      </Td>
      <Td mono className="font-semibold text-ink">{gbp(m.monthlyVolume, { maximumFractionDigits: 0 })}</Td>
      <Td mono className="text-ink-muted">{gbp(m.monthlyFees)}</Td>
      <Td className="text-ink-muted">{m.accountManager}</Td>
    </Tr>
  )
}
