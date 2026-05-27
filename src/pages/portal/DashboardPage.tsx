import { Link } from 'react-router-dom'
import { ArrowUpRight, CreditCard, Banknote, Smartphone, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react'
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_LOAN, MOCK_TERMINALS, MOCK_TICKETS } from '../../lib/portal-mock'

export default function DashboardPage() {
  const today = MOCK_TRANSACTIONS.filter((t) => t.date === MOCK_TRANSACTIONS[0].date && t.status !== 'refunded')
  const todayGross = today.reduce((s, t) => s + t.amount, 0)
  const todayCount = today.length
  const onlineTerminals = MOCK_TERMINALS.filter((t) => t.status === 'online').length
  const openTickets = MOCK_TICKETS.filter((t) => t.status !== 'resolved').length

  const loanPct = Math.round((MOCK_LOAN.repaid / MOCK_LOAN.totalRepayable) * 100)

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-10">
        <p className="text-sm text-ink-fade">Welcome back, {MOCK_USER.contactName.split(' ')[0]}.</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {MOCK_USER.businessName}
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's takings"
          value={`£${todayGross.toFixed(2)}`}
          sub={`${todayCount} transaction${todayCount === 1 ? '' : 's'}`}
          Icon={CreditCard}
          trend="+12% vs yesterday"
          accent
        />
        <StatCard
          label="Cash advance balance"
          value={`£${MOCK_LOAN.remaining.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`}
          sub={`${loanPct}% repaid`}
          Icon={Banknote}
        />
        <StatCard
          label="Terminals online"
          value={`${onlineTerminals} / ${MOCK_TERMINALS.length}`}
          sub="All systems normal"
          Icon={Smartphone}
        />
        <StatCard
          label="Open tickets"
          value={`${openTickets}`}
          sub={openTickets ? 'Awaiting your input' : 'Nothing to action'}
          Icon={MessageSquare}
          warn={openTickets > 0}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-ink/5 bg-paper p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Recent transactions</h2>
              <p className="text-sm text-ink-fade">Last 5 across all terminals.</p>
            </div>
            <Link to="/portal/transactions" className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-mint-deep">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-ink/5">
            {MOCK_TRANSACTIONS.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{t.card}</p>
                  <p className="text-xs text-ink-fade">{t.terminal} · {t.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={t.status} />
                  <span className="font-mono text-sm font-semibold text-ink">£{t.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink/5 bg-ink p-6 text-paper">
          <p className="text-xs font-semibold uppercase tracking-wider text-mint">Your account manager</p>
          <p className="mt-3 font-display text-lg font-semibold">{MOCK_USER.accountManager}</p>
          <p className="text-sm text-paper/60">Client Partnership Lead</p>
          <a href={`mailto:${MOCK_USER.accountManagerEmail}`} className="mt-4 inline-block text-sm text-mint hover:text-mint-bright">
            {MOCK_USER.accountManagerEmail}
          </a>
          <a href="tel:03334432645" className="block text-sm text-paper/70 hover:text-mint">
            0333 443 2645
          </a>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">Quick actions</p>
            <div className="mt-3 grid gap-2">
              <Link to="/portal/support" className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10">
                Raise a support ticket <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/portal/terminals" className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10">
                Order a new terminal <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/portal/loans" className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10">
                Request top-up funding <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, Icon, trend, accent, warn }: {
  label: string
  value: string
  sub: string
  Icon: typeof CreditCard
  trend?: string
  accent?: boolean
  warn?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? 'border-mint/30 bg-gradient-to-br from-mint/10 to-paper' : 'border-ink/5 bg-paper'}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-fade">{label}</p>
        <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${warn ? 'bg-orange-500/15 text-orange-600' : 'bg-ink/5 text-ink-muted'}`}>
          {warn ? <AlertCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">{value}</p>
      <div className="mt-1.5 flex items-center gap-1.5 text-xs">
        {trend && <span className="inline-flex items-center gap-0.5 text-mint-deep"><TrendingUp className="h-3 w-3" /> {trend}</span>}
        {!trend && <span className="text-ink-fade">{sub}</span>}
      </div>
    </div>
  )
}

export function StatusPill({ status }: { status: 'settled' | 'pending' | 'refunded' }) {
  const map = {
    settled: { label: 'Settled', cls: 'bg-mint/15 text-mint-deep' },
    pending: { label: 'Pending', cls: 'bg-amber-500/15 text-amber-700' },
    refunded: { label: 'Refunded', cls: 'bg-ink/10 text-ink-muted' },
  }
  const m = map[status]
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${m.cls}`}>{m.label}</span>
}
