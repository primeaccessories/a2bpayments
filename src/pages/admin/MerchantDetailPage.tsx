import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, CreditCard, Banknote, Smartphone, MessageSquare, Pencil } from 'lucide-react'
import { Card, PageHeader, StatusPill, Pill, TableShell, Tr, Td, gbp } from './ui'
import {
  findMerchant,
  txForMerchant,
  terminalsForMerchant,
  ticketsForMerchant,
  advancesForMerchant,
} from '../../lib/admin-mock'

export default function AdminMerchantDetailPage() {
  const { id = '' } = useParams()
  const m = findMerchant(id)

  if (!m) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link to="/admin/merchants" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Back to merchants
        </Link>
        <Card className="mt-6 text-center">
          <p className="text-ink">Merchant not found.</p>
        </Card>
      </div>
    )
  }

  const tx = txForMerchant(id)
  const terminals = terminalsForMerchant(id)
  const tickets = ticketsForMerchant(id)
  const advances = advancesForMerchant(id)

  return (
    <div className="mx-auto max-w-7xl">
      <Link to="/admin/merchants" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All merchants
      </Link>

      <PageHeader
        title={m.businessName}
        subtitle={`MID ${m.mid} · joined ${new Date(m.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-100">
              Suspend MID
            </button>
          </>
        }
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <StatusPill status={m.status} />
        <Pill tone={m.riskBand === 'high' ? 'rose' : m.riskBand === 'medium' ? 'amber' : 'mint'}>
          {m.riskBand} risk
        </Pill>
        <Pill tone="ink">{m.industry}</Pill>
        <Pill tone="ink">AM · {m.accountManager}</Pill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* main column */}
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Monthly volume" value={gbp(m.monthlyVolume, { maximumFractionDigits: 0 })} />
            <Stat label="Monthly fees" value={gbp(m.monthlyFees)} />
            <Stat label="Pricing" value={`${m.pricing.rate.toFixed(2)}% + ${gbp(m.pricing.flat)}`} sub="per transaction" />
          </div>

          <Card>
            <SectionTitle title="Recent transactions" Icon={CreditCard} link={{ to: '/admin/transactions', label: 'All transactions' }} />
            {tx.length === 0 ? (
              <p className="mt-4 text-sm text-ink-fade">No transactions for this merchant yet.</p>
            ) : (
              <div className="mt-4 divide-y divide-ink/5">
                {tx.slice(0, 6).map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{t.scheme} · {t.terminal}</p>
                      <p className="font-mono text-xs text-ink-fade">{t.date} {t.time} · {t.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusPill status={t.status} />
                      <span className="font-mono text-sm font-semibold text-ink">{gbp(t.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle title="Terminals" Icon={Smartphone} link={{ to: '/admin/terminals', label: 'Fleet' }} />
            {terminals.length === 0 ? (
              <p className="mt-4 text-sm text-ink-fade">No terminals assigned.</p>
            ) : (
              <TableShell columns={['Serial', 'Model', 'Location', 'Status', 'Last seen', 'Volume']}>
                {terminals.map((t) => (
                  <Tr key={t.id}>
                    <Td mono className="text-ink-muted">{t.serial}</Td>
                    <Td className="text-ink">{t.model}</Td>
                    <Td className="text-ink-muted">{t.location}</Td>
                    <Td><StatusPill status={t.status} /></Td>
                    <Td className="text-ink-fade">{t.lastSeen}</Td>
                    <Td mono>{gbp(t.monthlyVolume, { maximumFractionDigits: 0 })}</Td>
                  </Tr>
                ))}
              </TableShell>
            )}
          </Card>

          <Card>
            <SectionTitle title="Cash advances" Icon={Banknote} link={{ to: '/admin/finance', label: 'Advance book' }} />
            {advances.length === 0 ? (
              <p className="mt-4 text-sm text-ink-fade">No advances on file.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {advances.map((a) => {
                  const pct = a.totalRepayable ? Math.round((a.repaid / a.totalRepayable) * 100) : 0
                  return (
                    <div key={a.id} className="rounded-xl border border-ink/5 bg-paper-soft p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-semibold text-ink">{a.id} · {gbp(a.advanced, { maximumFractionDigits: 0 })}</p>
                          <p className="text-xs text-ink-fade">Repayable {gbp(a.totalRepayable, { maximumFractionDigits: 0 })} · {a.percentOfCard}% of card</p>
                        </div>
                        <StatusPill status={a.status} />
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-mint to-mint-deep" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-ink-fade">
                        {gbp(a.repaid, { maximumFractionDigits: 0 })} repaid · {gbp(a.remaining, { maximumFractionDigits: 0 })} remaining · {pct}%
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle title="Tickets" Icon={MessageSquare} link={{ to: '/admin/support', label: 'Support queue' }} />
            {tickets.length === 0 ? (
              <p className="mt-4 text-sm text-ink-fade">No tickets raised.</p>
            ) : (
              <div className="mt-4 divide-y divide-ink/5">
                {tickets.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{t.subject}</p>
                      <p className="text-xs text-ink-fade">{t.id} · {t.assignedTo} · {t.lastActivity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill tone={t.priority === 'urgent' ? 'rose' : t.priority === 'high' ? 'amber' : 'ink'}>{t.priority}</Pill>
                      <StatusPill status={t.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* side column */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-display text-lg font-semibold text-ink">Contact</h3>
            <div className="mt-4 space-y-3 text-sm">
              <p className="font-semibold text-ink">{m.contactName}</p>
              <a href={`mailto:${m.contactEmail}`} className="flex items-center gap-2 text-ink-muted hover:text-ink">
                <Mail className="h-4 w-4 text-ink-fade" /> {m.contactEmail}
              </a>
              <a href={`tel:${m.contactPhone}`} className="flex items-center gap-2 text-ink-muted hover:text-ink">
                <Phone className="h-4 w-4 text-ink-fade" /> {m.contactPhone}
              </a>
              <p className="flex items-center gap-2 text-ink-muted">
                <MapPin className="h-4 w-4 text-ink-fade" /> {m.city}
              </p>
            </div>
            <button className="mt-5 w-full rounded-xl border border-ink/10 bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
              Send message
            </button>
          </Card>

          <Card className="bg-ink text-paper">
            <h3 className="font-display text-lg font-semibold">Quick actions</h3>
            <div className="mt-4 grid gap-2 text-sm">
              {['Issue refund', 'Offer cash advance', 'Adjust pricing', 'Order new terminal', 'Generate statement'].map((q) => (
                <button key={q} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-left text-paper hover:bg-white/10">
                  {q}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-display text-lg font-semibold text-ink">Compliance</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Row label="KYC verified" tone="mint" value="✓ 18 Mar 2024" />
              <Row label="DBS / AML" tone="mint" value="✓ on file" />
              <Row label="Director ID" tone="mint" value="✓ on file" />
              <Row label="Last review" tone="ink" value="2026-02-04" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-ink/5 bg-paper p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-fade">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-fade">{sub}</p>}
    </div>
  )
}

function SectionTitle({
  title,
  Icon,
  link,
}: {
  title: string
  Icon: typeof CreditCard
  link?: { to: string; label: string }
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-ink">
        <Icon className="h-4 w-4 text-ink-muted" /> {title}
      </h3>
      {link && (
        <Link to={link.to} className="text-sm font-semibold text-ink hover:text-mint-deep">
          {link.label} →
        </Link>
      )}
    </div>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone: 'mint' | 'ink' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className={tone === 'mint' ? 'font-semibold text-mint-deep' : 'font-mono text-ink'}>{value}</span>
    </div>
  )
}
