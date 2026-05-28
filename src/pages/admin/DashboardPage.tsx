import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Building2,
  Banknote,
  Smartphone,
  AlertTriangle,
  ArrowUpRight,
  FileText,
  LifeBuoy,
  CircleDollarSign,
} from 'lucide-react'
import { Card, PageHeader, StatTile, Pill, gbp } from './ui'
import {
  ADMIN_USER,
  merchantSummary,
  terminalSummary,
  advanceSummary,
  ADMIN_TRANSACTIONS,
  ADMIN_APPLICATIONS,
  ADMIN_TICKETS,
  ADMIN_AUDIT,
  ADMIN_MERCHANTS,
} from '../../lib/admin-mock'

export default function AdminDashboardPage() {
  const m = merchantSummary()
  const t = terminalSummary()
  const a = advanceSummary()
  const todayTx = ADMIN_TRANSACTIONS.filter((x) => x.date === ADMIN_TRANSACTIONS[0].date && x.status !== 'refunded')
  const todayGross = todayTx.reduce((s, x) => s + x.amount, 0)
  const todayFees = todayTx.reduce((s, x) => s + x.fee, 0)

  const newApps = ADMIN_APPLICATIONS.filter((x) => x.stage === 'new' || x.stage === 'docs-requested').length
  const urgentTickets = ADMIN_TICKETS.filter((x) => x.priority === 'urgent' && x.status !== 'resolved').length
  const openTickets = ADMIN_TICKETS.filter((x) => x.status !== 'resolved').length

  // 7-day volume series for the mini chart
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
  const series = days.map((d) => ({
    date: d,
    gross: ADMIN_TRANSACTIONS.filter((x) => x.date === d && x.status !== 'refunded').reduce((s, x) => s + x.amount, 0),
  }))
  const seriesMax = Math.max(...series.map((s) => s.gross), 1)

  const topMerchants = [...ADMIN_MERCHANTS]
    .filter((x) => x.status === 'live')
    .sort((a, b) => b.monthlyVolume - a.monthlyVolume)
    .slice(0, 5)
  const topMax = Math.max(...topMerchants.map((x) => x.monthlyVolume), 1)

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title={`Good morning, ${ADMIN_USER.name.split(' ')[0]}.`}
        subtitle="Operational overview across the entire merchant estate."
        actions={
          <Link
            to="/admin/applications"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink-soft"
          >
            <FileText className="h-4 w-4" />
            Review applications · {newApps}
          </Link>
        }
      />

      {/* alert banner */}
      {urgentTickets > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="font-semibold text-rose-900">{urgentTickets} urgent ticket needs action</p>
            <p className="text-rose-700">Routed to your account managers. SLA window — 4 hours.</p>
          </div>
          <Link to="/admin/support" className="font-semibold text-rose-900 hover:underline">
            Open queue →
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Today's processing" value={gbp(todayGross)} sub={`${todayTx.length} transactions across estate`} Icon={CircleDollarSign} accent />
        <StatTile label="Today's fees earned" value={gbp(todayFees)} sub="Net of scheme & interchange" Icon={TrendingUp} />
        <StatTile label="Live merchants" value={`${m.liveCount}`} sub={`${m.pendingKyc} pending KYC · ${m.total} total`} Icon={Building2} />
        <StatTile label="Advance book" value={gbp(a.outstanding, { maximumFractionDigits: 0 })} sub={`${a.activeCount} active · ${gbp(a.profitFloor, { maximumFractionDigits: 0 })} margin floor`} Icon={Banknote} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* 7-day chart */}
        <Card>
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Processing volume · 7 days</h2>
              <p className="text-sm text-ink-fade">All merchants, all schemes. Refunds excluded.</p>
            </div>
            <Link to="/admin/transactions" className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-mint-deep">
              Transactions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 flex items-end gap-2 sm:gap-3">
            {series.map((s) => (
              <div key={s.date} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-mint to-mint-bright"
                  style={{ height: `${(s.gross / seriesMax) * 140 + 6}px` }}
                  title={gbp(s.gross)}
                />
                <span className="font-mono text-[10px] text-ink-fade">
                  {new Date(s.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/5 pt-4 text-xs">
            <div>
              <p className="text-ink-fade">7-day gross</p>
              <p className="font-display text-base font-semibold text-ink">
                {gbp(series.reduce((s, d) => s + d.gross, 0))}
              </p>
            </div>
            <div>
              <p className="text-ink-fade">Avg per day</p>
              <p className="font-display text-base font-semibold text-ink">
                {gbp(series.reduce((s, d) => s + d.gross, 0) / 7)}
              </p>
            </div>
            <div>
              <p className="text-ink-fade">vs prev 7 days</p>
              <p className="font-display text-base font-semibold text-mint-deep">+8.4%</p>
            </div>
          </div>
        </Card>

        {/* Terminals + tickets summary */}
        <Card>
          <h2 className="font-display text-lg font-semibold text-ink">Fleet & tickets</h2>
          <div className="mt-4 space-y-3">
            <SummaryRow label="Terminals online" value={`${t.online} / ${t.total}`} Icon={Smartphone} tone="mint" />
            <SummaryRow label="Offline" value={`${t.offline}`} Icon={Smartphone} tone={t.offline ? 'rose' : 'ink'} />
            <SummaryRow label="In maintenance" value={`${t.maintenance}`} Icon={Smartphone} tone="amber" />
            <SummaryRow label="In stock" value={`${t.inStock}`} Icon={Smartphone} tone="ink" />
            <SummaryRow label="In transit" value={`${t.shipping}`} Icon={Smartphone} tone="blue" />
          </div>
          <hr className="my-5 border-ink/5" />
          <div className="space-y-3">
            <SummaryRow label="Open support tickets" value={`${openTickets}`} Icon={LifeBuoy} tone={openTickets ? 'amber' : 'mint'} />
            <SummaryRow label="Urgent" value={`${urgentTickets}`} Icon={LifeBuoy} tone={urgentTickets ? 'rose' : 'ink'} />
          </div>
          <Link
            to="/admin/terminals"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-mint-deep"
          >
            Manage fleet <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Top merchants */}
        <Card>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Top merchants by monthly volume</h2>
            <Link to="/admin/merchants" className="text-sm font-semibold text-ink hover:text-mint-deep">
              All merchants →
            </Link>
          </div>
          <div className="mt-5 space-y-3.5">
            {topMerchants.map((m) => (
              <Link
                key={m.id}
                to={`/admin/merchants/${m.id}`}
                className="block rounded-xl px-2 py-1 hover:bg-paper-soft"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{m.businessName}</p>
                    <p className="text-xs text-ink-fade">{m.industry} · {m.city}</p>
                  </div>
                  <p className="font-mono text-sm font-semibold text-ink">{gbp(m.monthlyVolume, { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-mint to-mint-deep"
                    style={{ width: `${(m.monthlyVolume / topMax) * 100}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Audit feed */}
        <Card>
          <h2 className="font-display text-lg font-semibold text-ink">Recent activity</h2>
          <p className="text-sm text-ink-fade">Audit trail from staff actions.</p>
          <div className="mt-5 space-y-4">
            {ADMIN_AUDIT.slice(0, 6).map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-mint" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="text-ink">
                    <span className="font-semibold">{a.actor}</span>{' '}
                    <span className="text-ink-muted">{a.action.toLowerCase()}</span>
                  </p>
                  <p className="truncate text-xs text-ink-fade">{a.target}</p>
                </div>
                <Pill tone="ink">{a.at}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  Icon,
  tone,
}: {
  label: string
  value: string
  Icon: typeof Smartphone
  tone: 'mint' | 'amber' | 'rose' | 'ink' | 'blue'
}) {
  const dot = {
    mint: 'bg-mint',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    ink: 'bg-ink-fade',
    blue: 'bg-blue-500',
  }[tone]
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-2 text-ink-muted">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <Icon className="h-4 w-4 text-ink-fade" />
        {label}
      </span>
      <span className="font-mono font-semibold text-ink">{value}</span>
    </div>
  )
}
