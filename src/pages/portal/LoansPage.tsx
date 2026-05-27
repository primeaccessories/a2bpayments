import { ArrowUpRight, Banknote, Calendar, TrendingUp } from 'lucide-react'
import { MOCK_LOAN } from '../../lib/portal-mock'

export default function LoansPage() {
  const pct = (MOCK_LOAN.repaid / MOCK_LOAN.totalRepayable) * 100

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Finance &amp; loans</h1>
        <p className="mt-2 text-ink-muted">Your live balance, repayments and funding options.</p>
      </header>

      <section className="rounded-3xl bg-ink p-8 text-paper sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">{MOCK_LOAN.product}</p>
            <p className="mt-2 font-mono text-xs text-paper/50">{MOCK_LOAN.id}</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-ink hover:bg-mint-bright">
            Request top-up
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs text-paper/50">Advanced</p>
            <p className="mt-1 font-display text-3xl font-semibold">£{MOCK_LOAN.advanced.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-paper/50">Total repayable</p>
            <p className="mt-1 font-display text-3xl font-semibold">£{MOCK_LOAN.totalRepayable.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-paper/50">Remaining</p>
            <p className="mt-1 font-display text-3xl font-semibold text-mint">£{MOCK_LOAN.remaining.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-paper/60">
            <span>{pct.toFixed(0)}% repaid</span>
            <span>£{MOCK_LOAN.repaid.toLocaleString()} of £{MOCK_LOAN.totalRepayable.toLocaleString()}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-mint transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
          <Meta Icon={Calendar} label="Started" value={MOCK_LOAN.startedAt} />
          <Meta Icon={TrendingUp} label="Repaying" value={`${MOCK_LOAN.percentOfCard}% of card sales`} />
          <Meta Icon={Banknote} label="Estimated end" value={MOCK_LOAN.estimatedEnd} />
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-ink/5 bg-paper p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Recent repayments</h2>
          <p className="text-sm text-ink-fade">Automatically deducted from your card takings.</p>
          <div className="mt-5 divide-y divide-ink/5">
            {MOCK_LOAN.recentRepayments.map((r) => (
              <div key={r.date} className="flex items-center justify-between py-3">
                <span className="text-sm text-ink-muted">{r.date}</span>
                <span className="font-mono text-sm font-semibold text-ink">£{r.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-mint/20 bg-mint/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-mint-deep">You qualify for</p>
          <p className="mt-3 font-display text-2xl font-semibold text-ink">A top-up advance</p>
          <p className="mt-2 text-sm text-ink-muted">
            You've repaid {pct.toFixed(0)}% of your current advance — once you hit 60% you're eligible to top up. Decision in 24 hours.
          </p>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-3 text-sm font-semibold text-paper hover:bg-ink-soft">
            Apply for top-up
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs text-ink-fade">
            Or speak to <span className="font-semibold text-ink">Georgia Hope</span>, your account manager, on 0333 443 2645.
          </p>
        </div>
      </section>
    </div>
  )
}

function Meta({ Icon, label, value }: { Icon: typeof Banknote; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-mint/15 text-mint">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-paper/50">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
