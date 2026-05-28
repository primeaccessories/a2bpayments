import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, PackageOpen, Smartphone, Filter } from 'lucide-react'
import { PageHeader, StatusPill, TableShell, Tr, Td, ToolbarInput, ChipFilter, gbp, StatTile } from './ui'
import { ADMIN_TERMINALS, terminalSummary, type AdminTerminal } from '../../lib/admin-mock'
import { CheckCircle2, AlertCircle, Wrench, Truck } from 'lucide-react'

type Filter = 'all' | AdminTerminal['status']

export default function AdminTerminalsPage() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const s = terminalSummary()

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ADMIN_TERMINALS.filter((t) => {
      if (filter !== 'all' && t.status !== filter) return false
      if (!needle) return true
      return (
        t.serial.toLowerCase().includes(needle) ||
        t.model.toLowerCase().includes(needle) ||
        t.merchantName.toLowerCase().includes(needle) ||
        t.location.toLowerCase().includes(needle)
      )
    })
  }, [q, filter])

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Terminal fleet"
        subtitle="Every device — deployed, in stock, in transit or in for repair."
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
              <PackageOpen className="h-4 w-4" /> Bulk import
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink-soft">
              <Plus className="h-4 w-4" /> Register terminal
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatTile label="Online" value={`${s.online}`} sub="Last seen < 5 min" Icon={CheckCircle2} accent />
        <StatTile label="Offline" value={`${s.offline}`} sub="Needs attention" Icon={AlertCircle} warn={s.offline > 0} />
        <StatTile label="Maintenance" value={`${s.maintenance}`} sub="At repair centre" Icon={Wrench} />
        <StatTile label="In stock" value={`${s.inStock}`} sub="Warehouse ready" Icon={Smartphone} />
        <StatTile label="In transit" value={`${s.shipping}`} sub="Out for delivery" Icon={Truck} />
      </div>

      <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToolbarInput placeholder="Search serial, model, merchant, location…" value={q} onChange={setQ} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
            <Filter className="h-3.5 w-3.5" /> Status
          </span>
          <ChipFilter<Filter>
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: `All · ${ADMIN_TERMINALS.length}` },
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
              { value: 'maintenance', label: 'Maintenance' },
              { value: 'in-stock', label: 'In stock' },
              { value: 'shipping', label: 'In transit' },
            ]}
          />
        </div>
      </div>

      <TableShell columns={['Serial', 'Model', 'Assigned to', 'Location', 'Status', 'Firmware', 'Last seen', 'Monthly volume']}>
        {filtered.map((t) => (
          <Tr key={t.id}>
            <Td mono className="text-ink-muted">{t.serial}</Td>
            <Td className="font-semibold text-ink">{t.model}</Td>
            <Td>
              {t.merchantId ? (
                <Link to={`/admin/merchants/${t.merchantId}`} className="text-ink hover:text-mint-deep">
                  {t.merchantName}
                </Link>
              ) : (
                <span className="text-ink-fade">—</span>
              )}
            </Td>
            <Td className="text-ink-muted">{t.location}</Td>
            <Td><StatusPill status={t.status} /></Td>
            <Td mono className="text-ink-muted">{t.firmware}</Td>
            <Td className="text-ink-fade">{t.lastSeen}</Td>
            <Td mono>{t.monthlyVolume ? gbp(t.monthlyVolume, { maximumFractionDigits: 0 }) : <span className="text-ink-fade">—</span>}</Td>
          </Tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={8} className="px-6 py-12 text-center text-sm text-ink-fade">
              No terminals match your filters.
            </td>
          </tr>
        )}
      </TableShell>
    </div>
  )
}
