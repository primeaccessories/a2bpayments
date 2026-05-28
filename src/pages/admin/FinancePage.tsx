import { Link } from 'react-router-dom'
import { Banknote, TrendingUp, Wallet, ShieldCheck, Plus } from 'lucide-react'
import { Card, PageHeader, StatusPill, StatTile, gbp } from './ui'
import { ADMIN_ADVANCES, advanceSummary } from '../../lib/admin-mock'

export default function AdminFinancePage() {
  const s = advanceSummary()

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Finance & cash advances"
        subtitle="The advance book — deployed capital, repayment progress and underwriting queue."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink-soft">
            <Plus className="h-4 w-4" /> Originate advance
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active advances" value={`${s.activeCount}`} sub="On repayment schedule" Icon={Banknote} accent />
        <StatTile label="Capital deployed" value={gbp(s.deployed, { maximumFractionDigits: 0 })} sub="Lifetime principal" Icon={Wallet} />
        <StatTile label="Outstanding" value={gbp(s.outstanding, { maximumFractionDigits: 0 })} sub="To be collected" Icon={TrendingUp} />
        <StatTile label="Margin floor" value={gbp(s.profitFloor, { maximumFractionDigits: 0 })} sub="Booked profit at completion" Icon={ShieldCheck} />
      </div>

      <div className="mt-8 space-y-4">
        {ADMIN_ADVANCES.map((a) => {
          const pct = a.totalRepayable ? Math.round((a.repaid / a.totalRepayable) * 100) : 0
          return (
            <Card key={a.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink">{a.id}</h3>
                    <StatusPill status={a.status} />
                  </div>
                  <Link
                    to={`/admin/merchants/${a.merchantId}`}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {a.merchantName}
                  </Link>
                  <p className="mt-1 text-xs text-ink-fade">
                    {a.percentOfCard}% of card receipts · Started {a.startedAt} · Est. complete {a.estimatedEnd}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-left sm:text-right">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink-fade sm:text-[11px]">Advanced</p>
                    <p className="font-mono text-sm font-semibold text-ink sm:text-base">{gbp(a.advanced, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink-fade sm:text-[11px]">Repaid</p>
                    <p className="font-mono text-sm font-semibold text-mint-deep sm:text-base">{gbp(a.repaid, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink-fade sm:text-[11px]">Remaining</p>
                    <p className="font-mono text-sm font-semibold text-ink sm:text-base">{gbp(a.remaining, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/5">
                <div className="h-full rounded-full bg-gradient-to-r from-mint to-mint-deep" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-fade">{pct}% repaid · Repayable total {gbp(a.totalRepayable, { maximumFractionDigits: 0 })}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
