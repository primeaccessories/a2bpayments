import { Plus, Shield } from 'lucide-react'
import { Card, PageHeader, StatusPill, Pill, TableShell, Tr, Td } from './ui'
import { ADMIN_STAFF } from '../../lib/admin-mock'

const ROLE_PERMISSIONS = [
  {
    role: 'Owner',
    scope: 'Full access',
    abilities: ['Everything — billing, pricing, deletion, role assignment.'],
    tone: 'rose' as const,
  },
  {
    role: 'Admin',
    scope: 'Operational',
    abilities: ['Merchant edits, pricing changes, ticket assignment, fleet ops.'],
    tone: 'violet' as const,
  },
  {
    role: 'Account Manager',
    scope: 'Their book',
    abilities: ['Manage assigned merchants, raise tickets, originate cash advances.'],
    tone: 'mint' as const,
  },
  {
    role: 'Underwriter',
    scope: 'Risk & advances',
    abilities: ['Approve / decline applications and cash advances. Cannot edit pricing.'],
    tone: 'amber' as const,
  },
  {
    role: 'Support',
    scope: 'Tickets only',
    abilities: ['Handle inbound tickets, view merchant context. No pricing or financial change.'],
    tone: 'blue' as const,
  },
  {
    role: 'Read-only',
    scope: 'View',
    abilities: ['Read every dashboard. Cannot mutate. Useful for accountants & directors.'],
    tone: 'ink' as const,
  },
]

export default function AdminTeamPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Team & roles"
        subtitle="Internal users and the permissions they hold."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink-soft">
            <Plus className="h-4 w-4" /> Invite team member
          </button>
        }
      />

      <TableShell columns={['Name', 'Role', 'Assigned merchants', 'Status', 'Last active']}>
        {ADMIN_STAFF.map((s) => (
          <Tr key={s.id}>
            <Td>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/15 font-display text-sm font-semibold text-mint-deep">
                  {s.initials}
                </div>
                <div>
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-fade">{s.email}</p>
                </div>
              </div>
            </Td>
            <Td>
              <Pill tone={s.role === 'Owner' ? 'rose' : s.role === 'Admin' ? 'violet' : s.role === 'Account Manager' ? 'mint' : s.role === 'Underwriter' ? 'amber' : s.role === 'Support' ? 'blue' : 'ink'}>
                <Shield className="mr-1 inline h-3 w-3" /> {s.role}
              </Pill>
            </Td>
            <Td mono className="text-ink-muted">{s.assignedMerchants || '—'}</Td>
            <Td><StatusPill status={s.status} /></Td>
            <Td className="text-ink-fade">{s.lastActive}</Td>
          </Tr>
        ))}
      </TableShell>

      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink">Role permissions</h2>
        <p className="text-sm text-ink-fade">Tap a role to fine-tune scopes (granular permissions panel will appear here).</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLE_PERMISSIONS.map((r) => (
          <Card key={r.role}>
            <div className="flex items-center justify-between">
              <Pill tone={r.tone}>
                <Shield className="mr-1 inline h-3 w-3" /> {r.role}
              </Pill>
              <span className="text-xs text-ink-fade">{r.scope}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {r.abilities.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
                  {a}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
