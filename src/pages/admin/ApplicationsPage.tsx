import { useMemo, useState } from 'react'
import { FileText, Filter, Mail, ChevronRight } from 'lucide-react'
import { PageHeader, StatusPill, Pill, ChipFilter, ToolbarInput, Card, gbp } from './ui'
import { ADMIN_APPLICATIONS, type AdminApplication } from '../../lib/admin-mock'

type StageFilter = 'all' | AdminApplication['stage']

const STAGE_ORDER: AdminApplication['stage'][] = ['new', 'docs-requested', 'underwriting', 'approved', 'rejected']

export default function AdminApplicationsPage() {
  const [q, setQ] = useState('')
  const [stage, setStage] = useState<StageFilter>('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ADMIN_APPLICATIONS.filter((a) => {
      if (stage !== 'all' && a.stage !== stage) return false
      if (!needle) return true
      return (
        a.businessName.toLowerCase().includes(needle) ||
        a.contactName.toLowerCase().includes(needle) ||
        a.contactEmail.toLowerCase().includes(needle) ||
        a.industry.toLowerCase().includes(needle) ||
        a.id.toLowerCase().includes(needle)
      )
    })
  }, [q, stage])

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: ADMIN_APPLICATIONS.length }
    for (const s of STAGE_ORDER) m[s] = ADMIN_APPLICATIONS.filter((a) => a.stage === s).length
    return m
  }, [])

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Applications & onboarding"
        subtitle="New merchant signups moving through KYC and underwriting."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink-soft">
            <FileText className="h-4 w-4" /> New application
          </button>
        }
      />

      {/* Pipeline summary */}
      <div className="mb-6 grid gap-3 sm:grid-cols-5">
        {STAGE_ORDER.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s as StageFilter)}
            className="rounded-2xl border border-ink/5 bg-paper p-4 text-left hover:border-mint/40"
          >
            <StatusPill status={s} />
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{counts[s] ?? 0}</p>
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToolbarInput placeholder="Search business, contact, application ID…" value={q} onChange={setQ} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink-fade">
            <Filter className="h-3.5 w-3.5" /> Stage
          </span>
          <ChipFilter<StageFilter>
            value={stage}
            onChange={setStage}
            options={[
              { value: 'all', label: `All · ${counts.all}` },
              ...STAGE_ORDER.map((s) => ({ value: s as StageFilter, label: s.replace(/-/g, ' ') })),
            ]}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <Card key={a.id} className="hover:border-mint/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{a.businessName}</h3>
                  <StatusPill status={a.stage} />
                  <Pill tone="ink">{a.industry}</Pill>
                </div>
                <p className="mt-1 text-sm text-ink-muted">
                  {a.contactName} ·{' '}
                  <a href={`mailto:${a.contactEmail}`} className="hover:text-ink">
                    {a.contactEmail}
                  </a>
                </p>
                <p className="mt-1 text-xs text-ink-fade">
                  {a.id} · submitted {a.submittedAt} · assigned to {a.assignedTo}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-4">
                <div className="sm:text-right">
                  <p className="text-[11px] uppercase tracking-wider text-ink-fade">Est. monthly volume</p>
                  <p className="font-mono font-semibold text-ink">{gbp(a.estimatedMonthlyVolume, { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3.5 py-2 text-xs font-semibold text-ink hover:bg-ink/5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-paper hover:bg-ink-soft">
                    Review <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <p className="text-center text-sm text-ink-fade">No applications match your filters.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
