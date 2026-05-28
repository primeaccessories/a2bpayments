import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Filter, MessageSquare } from 'lucide-react'
import { PageHeader, StatusPill, Pill, TableShell, Tr, Td, ToolbarInput, ChipFilter } from './ui'
import { ADMIN_TICKETS, type AdminTicket } from '../../lib/admin-mock'

type StatusFilter = 'all' | AdminTicket['status']
type PriorityFilter = 'all' | AdminTicket['priority']

export default function AdminSupportPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [priority, setPriority] = useState<PriorityFilter>('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ADMIN_TICKETS.filter((t) => {
      if (status !== 'all' && t.status !== status) return false
      if (priority !== 'all' && t.priority !== priority) return false
      if (!needle) return true
      return (
        t.id.toLowerCase().includes(needle) ||
        t.subject.toLowerCase().includes(needle) ||
        t.merchantName.toLowerCase().includes(needle) ||
        t.assignedTo.toLowerCase().includes(needle)
      )
    })
  }, [q, status, priority])

  const open = ADMIN_TICKETS.filter((t) => t.status === 'open').length
  const urgent = ADMIN_TICKETS.filter((t) => t.priority === 'urgent' && t.status !== 'resolved').length
  const unassigned = ADMIN_TICKETS.filter((t) => t.assignedTo === 'Unassigned' && t.status !== 'resolved').length

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Support queue"
        subtitle="All merchant tickets across the estate."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink-soft">
            <Plus className="h-4 w-4" /> Raise on behalf
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Tile label="Open" value={`${open}`} tone="violet" Icon={MessageSquare} />
        <Tile label="Unassigned" value={`${unassigned}`} tone={unassigned ? 'amber' : 'ink'} Icon={MessageSquare} />
        <Tile label="Urgent" value={`${urgent}`} tone={urgent ? 'rose' : 'ink'} Icon={MessageSquare} />
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <ToolbarInput placeholder="Search ticket, subject, merchant, agent…" value={q} onChange={setQ} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
              <Filter className="h-3.5 w-3.5" /> Status
            </span>
            <ChipFilter<StatusFilter>
              value={status}
              onChange={setStatus}
              options={[
                { value: 'all', label: 'All' },
                { value: 'open', label: 'Open' },
                { value: 'awaiting-customer', label: 'Awaiting customer' },
                { value: 'resolved', label: 'Resolved' },
              ]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
              Priority
            </span>
            <ChipFilter<PriorityFilter>
              value={priority}
              onChange={setPriority}
              options={[
                { value: 'all', label: 'All' },
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'normal', label: 'Normal' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>
        </div>
      </div>

      <TableShell columns={['Ticket', 'Subject', 'Merchant', 'Priority', 'Status', 'Assigned to', 'Last activity']}>
        {filtered.map((t) => (
          <Tr key={t.id}>
            <Td mono className="font-semibold text-ink">{t.id}</Td>
            <Td>
              <p className="text-ink">{t.subject}</p>
              <p className="text-xs text-ink-fade">{t.messages} message{t.messages === 1 ? '' : 's'}</p>
            </Td>
            <Td>
              <Link to={`/admin/merchants/${t.merchantId}`} className="text-ink hover:text-mint-deep">
                {t.merchantName}
              </Link>
            </Td>
            <Td>
              <Pill tone={t.priority === 'urgent' ? 'rose' : t.priority === 'high' ? 'amber' : t.priority === 'normal' ? 'ink' : 'ink'}>
                {t.priority}
              </Pill>
            </Td>
            <Td><StatusPill status={t.status} /></Td>
            <Td className={t.assignedTo === 'Unassigned' ? 'text-amber-700' : 'text-ink-muted'}>{t.assignedTo}</Td>
            <Td className="text-ink-fade">{t.lastActivity}</Td>
          </Tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={7} className="px-6 py-12 text-center text-sm text-ink-fade">
              No tickets match your filters.
            </td>
          </tr>
        )}
      </TableShell>
    </div>
  )
}

function Tile({ label, value, tone, Icon }: { label: string; value: string; tone: 'mint' | 'amber' | 'rose' | 'ink' | 'violet'; Icon: typeof MessageSquare }) {
  const map = {
    mint: 'border-mint/30 bg-mint/10 text-mint-deep',
    amber: 'border-amber-300 bg-amber-50 text-amber-800',
    rose: 'border-rose-200 bg-rose-50 text-rose-700',
    violet: 'border-violet-200 bg-violet-50 text-violet-700',
    ink: 'border-ink/5 bg-paper text-ink-muted',
  }[tone]
  return (
    <div className={`rounded-2xl border p-5 ${map}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider opacity-80">{label}</p>
        <Icon className="h-4 w-4 opacity-70" />
      </div>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
