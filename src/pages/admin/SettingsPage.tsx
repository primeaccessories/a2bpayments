import {
  Banknote,
  Webhook,
  Building2,
  Bell,
  KeyRound,
  ShieldCheck,
  Paintbrush,
  FileText,
  Mail,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, PageHeader, Pill } from './ui'

interface SettingItem {
  Icon: LucideIcon
  title: string
  description: string
  status?: { tone: 'mint' | 'amber' | 'rose' | 'ink'; label: string }
}

const GROUPS: { heading: string; items: SettingItem[] }[] = [
  {
    heading: 'Pricing & finance',
    items: [
      { Icon: Banknote, title: 'Default fee schedule', description: '0.89% + 5p · Hospitality & Retail · Standard band.', status: { tone: 'mint', label: 'Live' } },
      { Icon: Banknote, title: 'Risk-tiered overrides', description: 'Custom rates for medium / high-risk MCCs.', status: { tone: 'mint', label: '3 active' } },
      { Icon: FileText, title: 'Cash advance terms', description: 'Underwriting limits, factor rates, withhold percentage caps.', status: { tone: 'ink', label: '12% holdback' } },
      { Icon: ShieldCheck, title: 'Chargeback policy', description: 'Auto-flag thresholds, dispute fee, reserve rules.' },
    ],
  },
  {
    heading: 'Brand & customer-facing',
    items: [
      { Icon: Paintbrush, title: 'Brand assets', description: 'Logo, palette, statement footer, terminal welcome screen.' },
      { Icon: Building2, title: 'Customer portal', description: 'Sections visible to merchants, support email, account manager card.' },
      { Icon: Mail, title: 'Email templates', description: 'Welcome, statement-ready, ticket-update, advance-approved.', status: { tone: 'amber', label: '2 unpublished' } },
    ],
  },
  {
    heading: 'Operations',
    items: [
      { Icon: Bell, title: 'Notification rules', description: 'Slack, Teams, SMS routing for offline terminals, chargebacks, KYC events.' },
      { Icon: Webhook, title: 'Webhooks & integrations', description: 'Outbound payloads to Xero, QuickBooks, Slack, your CRM.', status: { tone: 'mint', label: '4 connected' } },
      { Icon: KeyRound, title: 'API keys', description: 'Programmatic access for partners and internal tools. Scoped per role.', status: { tone: 'ink', label: '2 keys' } },
    ],
  },
  {
    heading: 'Compliance & legal',
    items: [
      { Icon: ShieldCheck, title: 'KYC / KYB providers', description: 'Document verification, sanctions screening, PEP / adverse media.', status: { tone: 'mint', label: 'Onfido + ComplyAdvantage' } },
      { Icon: FileText, title: 'Statement templates', description: 'Monthly statement, settlement breakdown, VAT-friendly tax invoice.' },
      { Icon: ShieldCheck, title: 'Audit log retention', description: 'How long staff-action records and signed-statement history are kept.', status: { tone: 'ink', label: '7 years' } },
    ],
  },
]

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Settings" subtitle="Everything you configure once and rarely touch again." />

      <div className="space-y-10">
        {GROUPS.map((g) => (
          <section key={g.heading}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-fade">{g.heading}</h2>
            <Card className="p-0">
              <div className="divide-y divide-ink/5">
                {g.items.map((it) => (
                  <button
                    key={it.title}
                    type="button"
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-paper-soft"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink/5 text-ink-muted">
                      <it.Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{it.title}</p>
                        {it.status && <Pill tone={it.status.tone}>{it.status.label}</Pill>}
                      </div>
                      <p className="text-sm text-ink-fade">{it.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-ink-fade" />
                  </button>
                ))}
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  )
}
