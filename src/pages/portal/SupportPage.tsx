import { Plus, MessageSquare, ArrowUpRight } from 'lucide-react'
import { MOCK_TICKETS } from '../../lib/portal-mock'

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Support</h1>
          <p className="mt-2 text-ink-muted">Raise a new ticket or pick up where you left off.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink-soft">
          <Plus className="h-4 w-4" />
          New ticket
        </button>
      </header>

      <div className="grid gap-3">
        {MOCK_TICKETS.map((t) => (
          <article
            key={t.id}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/5 bg-paper p-5 transition hover:border-ink/15"
          >
            <div className="flex items-center gap-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-paper-soft text-ink-muted">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-base font-semibold text-ink">{t.subject}</h2>
                  <StatusBadge status={t.status} />
                </div>
                <p className="mt-1 text-xs text-ink-fade">
                  <span className="font-mono">{t.id}</span> · opened {t.createdAt} · {t.messages} {t.messages === 1 ? 'message' : 'messages'} · last {t.lastActivity}
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-mint-deep">
              Open <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-ink p-6 text-paper sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-mint">Urgent?</p>
            <h2 className="mt-3 font-display text-xl font-semibold">Call your account manager directly.</h2>
            <p className="mt-2 text-sm text-paper/70">
              Out-of-hours emergencies (terminal down on a busy night, can't take payments) — call us, don't email.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-paper/60">Georgia Hope</span>
            <a href="tel:03334432645" className="font-mono text-mint hover:text-mint-bright">0333 443 2645</a>
            <a href="mailto:georgia@a2bpayments.co.uk" className="text-paper/70 hover:text-mint">georgia@a2bpayments.co.uk</a>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatusBadge({ status }: { status: 'open' | 'awaiting-you' | 'resolved' }) {
  const map = {
    open: { label: 'In progress', cls: 'bg-mint/15 text-mint-deep' },
    'awaiting-you': { label: 'Awaiting you', cls: 'bg-amber-500/15 text-amber-700' },
    resolved: { label: 'Resolved', cls: 'bg-ink/10 text-ink-muted' },
  }
  const m = map[status]
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${m.cls}`}>{m.label}</span>
}
