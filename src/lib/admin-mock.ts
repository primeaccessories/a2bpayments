// Mock data for the owner / staff admin portal.
// Frontend-only — no backend wiring, no plugins, illustrative numbers.

export const ADMIN_USER = {
  id: 'staff_001',
  name: 'Daniel Pearce',
  role: 'Owner' as const,
  email: 'owner@a2bpayments.co.uk',
  initials: 'DP',
}

export interface AdminMerchant {
  id: string
  mid: string
  businessName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  industry: string
  status: 'live' | 'paused' | 'pending-kyc' | 'churned'
  riskBand: 'low' | 'medium' | 'high'
  joinedAt: string
  monthlyVolume: number
  monthlyFees: number
  terminalsLive: number
  accountManager: string
  pricing: { rate: number; flat: number }
  city: string
}

export interface AdminTransaction {
  id: string
  date: string
  time: string
  merchantId: string
  merchantName: string
  terminal: string
  amount: number
  fee: number
  net: number
  scheme: 'Visa' | 'Mastercard' | 'Amex' | 'Apple Pay' | 'Google Pay'
  status: 'settled' | 'pending' | 'refunded' | 'disputed'
}

export interface AdminTerminal {
  id: string
  serial: string
  model: string
  merchantId: string
  merchantName: string
  location: string
  status: 'online' | 'offline' | 'maintenance' | 'in-stock' | 'shipping'
  lastSeen: string
  firmware: string
  monthlyVolume: number
}

export interface AdminAdvance {
  id: string
  merchantId: string
  merchantName: string
  advanced: number
  totalRepayable: number
  repaid: number
  remaining: number
  percentOfCard: number
  status: 'active' | 'paid-off' | 'underwriting' | 'declined'
  startedAt: string
  estimatedEnd: string
}

export interface AdminApplication {
  id: string
  businessName: string
  contactName: string
  contactEmail: string
  industry: string
  estimatedMonthlyVolume: number
  submittedAt: string
  stage: 'new' | 'docs-requested' | 'underwriting' | 'approved' | 'rejected'
  assignedTo: string
}

export interface AdminTicket {
  id: string
  merchantId: string
  merchantName: string
  subject: string
  status: 'open' | 'awaiting-customer' | 'resolved'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assignedTo: string
  createdAt: string
  lastActivity: string
  messages: number
}

export interface AdminStaff {
  id: string
  name: string
  email: string
  role: 'Owner' | 'Admin' | 'Account Manager' | 'Underwriter' | 'Support' | 'Read-only'
  status: 'active' | 'invited' | 'suspended'
  lastActive: string
  assignedMerchants: number
  initials: string
}

export interface AuditEntry {
  id: string
  actor: string
  action: string
  target: string
  at: string
}

const today = new Date()
const day = (n: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

export const ADMIN_MERCHANTS: AdminMerchant[] = [
  { id: 'cust_2X9k1Z', mid: 'MID-487-2261', businessName: 'Riverside Bistro Ltd', contactName: 'Daniel Pearce', contactEmail: 'test1@test.co.uk', contactPhone: '07712 345678', industry: 'Hospitality', status: 'live', riskBand: 'low', joinedAt: '2024-03-18', monthlyVolume: 48840, monthlyFees: 437.18, terminalsLive: 3, accountManager: 'Georgia Hope', pricing: { rate: 0.89, flat: 0.05 }, city: 'Manchester' },
  { id: 'cust_4P2m8H', mid: 'MID-512-9043', businessName: 'Northern Cuts Barbers', contactName: 'Marcus Bryant', contactEmail: 'marcus@northerncuts.co.uk', contactPhone: '07911 220034', industry: 'Personal services', status: 'live', riskBand: 'low', joinedAt: '2025-08-04', monthlyVolume: 11420, monthlyFees: 102.78, terminalsLive: 2, accountManager: 'Georgia Hope', pricing: { rate: 0.95, flat: 0.05 }, city: 'Leeds' },
  { id: 'cust_7J8s2K', mid: 'MID-661-4019', businessName: 'Holloway Auto Repairs', contactName: 'Imran Hussain', contactEmail: 'imran@hollowayauto.uk', contactPhone: '07880 191223', industry: 'Automotive', status: 'live', riskBand: 'medium', joinedAt: '2025-11-22', monthlyVolume: 67230, monthlyFees: 605.07, terminalsLive: 1, accountManager: 'Tom Reid', pricing: { rate: 0.99, flat: 0.05 }, city: 'Birmingham' },
  { id: 'cust_9C1w0V', mid: 'MID-704-3318', businessName: 'Bloom & Bough Florists', contactName: 'Sienna Cooper', contactEmail: 'hello@bloomandbough.co.uk', contactPhone: '07466 117741', industry: 'Retail', status: 'live', riskBand: 'low', joinedAt: '2026-01-12', monthlyVolume: 18200, monthlyFees: 162.98, terminalsLive: 2, accountManager: 'Georgia Hope', pricing: { rate: 0.89, flat: 0.05 }, city: 'Manchester' },
  { id: 'cust_1A3d5Y', mid: 'MID-718-9920', businessName: 'Steamlight Coffee Co', contactName: 'Eleanor Park', contactEmail: 'eleanor@steamlight.co', contactPhone: '07332 110456', industry: 'Hospitality', status: 'live', riskBand: 'low', joinedAt: '2026-02-09', monthlyVolume: 22900, monthlyFees: 205.21, terminalsLive: 4, accountManager: 'Tom Reid', pricing: { rate: 0.89, flat: 0.05 }, city: 'Manchester' },
  { id: 'cust_3F4g6X', mid: 'MID-732-1140', businessName: 'Pinpoint Locksmiths', contactName: 'Adam Whittle', contactEmail: 'adam@pinpoint-locks.uk', contactPhone: '07700 998877', industry: 'Trades', status: 'live', riskBand: 'medium', joinedAt: '2026-02-22', monthlyVolume: 9600, monthlyFees: 91.20, terminalsLive: 1, accountManager: 'Tom Reid', pricing: { rate: 0.95, flat: 0.05 }, city: 'Liverpool' },
  { id: 'cust_8H2k4Q', mid: 'MID-741-2208', businessName: 'Vellum Studio', contactName: 'Priya Shah', contactEmail: 'studio@vellum.design', contactPhone: '07321 776699', industry: 'Creative services', status: 'pending-kyc', riskBand: 'low', joinedAt: '2026-05-22', monthlyVolume: 0, monthlyFees: 0, terminalsLive: 0, accountManager: 'Georgia Hope', pricing: { rate: 0.89, flat: 0.05 }, city: 'London' },
  { id: 'cust_5R7n2P', mid: 'MID-689-0017', businessName: 'Crown Lane Convenience', contactName: 'Patel Naresh', contactEmail: 'crown@conv-mail.co.uk', contactPhone: '07955 442200', industry: 'Retail', status: 'paused', riskBand: 'medium', joinedAt: '2025-04-14', monthlyVolume: 0, monthlyFees: 0, terminalsLive: 0, accountManager: 'Tom Reid', pricing: { rate: 0.99, flat: 0.05 }, city: 'Stoke-on-Trent' },
  { id: 'cust_2B9j7W', mid: 'MID-621-7702', businessName: 'Ridgeway Gym', contactName: 'Carla Mendes', contactEmail: 'carla@ridgewaygym.uk', contactPhone: '07744 220115', industry: 'Fitness', status: 'live', riskBand: 'low', joinedAt: '2025-07-30', monthlyVolume: 31200, monthlyFees: 279.74, terminalsLive: 2, accountManager: 'Georgia Hope', pricing: { rate: 0.89, flat: 0.05 }, city: 'Manchester' },
  { id: 'cust_0K6t3M', mid: 'MID-540-8821', businessName: 'Atlas Mobile Phones', contactName: 'Hakim Aziz', contactEmail: 'hakim@atlasmobile.uk', contactPhone: '07911 003344', industry: 'Retail', status: 'churned', riskBand: 'high', joinedAt: '2024-09-02', monthlyVolume: 0, monthlyFees: 0, terminalsLive: 0, accountManager: 'Tom Reid', pricing: { rate: 1.20, flat: 0.05 }, city: 'Bradford' },
  { id: 'cust_4M5l8C', mid: 'MID-770-4419', businessName: 'Linley Park Vets', contactName: 'Dr Hannah Linley', contactEmail: 'h.linley@linleyparkvets.co.uk', contactPhone: '07466 220899', industry: 'Healthcare', status: 'live', riskBand: 'low', joinedAt: '2025-10-15', monthlyVolume: 42800, monthlyFees: 381.92, terminalsLive: 2, accountManager: 'Georgia Hope', pricing: { rate: 0.89, flat: 0.05 }, city: 'Cheshire' },
  { id: 'cust_6V8p1L', mid: 'MID-784-9012', businessName: 'Foundry Tap House', contactName: 'Liam O\'Reilly', contactEmail: 'liam@foundrytap.co.uk', contactPhone: '07881 442200', industry: 'Hospitality', status: 'live', riskBand: 'medium', joinedAt: '2026-03-04', monthlyVolume: 58400, monthlyFees: 525.60, terminalsLive: 5, accountManager: 'Tom Reid', pricing: { rate: 0.89, flat: 0.05 }, city: 'Sheffield' },
]

const SCHEMES: AdminTransaction['scheme'][] = ['Visa', 'Mastercard', 'Visa', 'Amex', 'Visa', 'Apple Pay', 'Google Pay', 'Mastercard']
const STATUSES: AdminTransaction['status'][] = ['settled', 'settled', 'settled', 'settled', 'pending', 'settled', 'refunded', 'settled', 'disputed', 'settled']

export const ADMIN_TRANSACTIONS: AdminTransaction[] = (() => {
  const out: AdminTransaction[] = []
  const liveMerchants = ADMIN_MERCHANTS.filter((m) => m.status === 'live')
  let seq = 9100
  for (let d = 0; d < 7; d++) {
    for (const m of liveMerchants) {
      const txns = 2 + ((seq * 13) % 4)
      for (let i = 0; i < txns; i++) {
        const amount = Math.round((20 + ((seq * 37) % 380) + Math.random() * 12) * 100) / 100
        const fee = Math.round(amount * (m.pricing.rate / 100) * 100) / 100 + m.pricing.flat
        const hour = String(8 + ((seq * 7) % 14)).padStart(2, '0')
        const min = String((seq * 11) % 60).padStart(2, '0')
        out.push({
          id: `TXN-${seq}`,
          date: day(d),
          time: `${hour}:${min}`,
          merchantId: m.id,
          merchantName: m.businessName,
          terminal: `POS-0${1 + ((seq) % m.terminalsLive || 1)}`,
          amount,
          fee: Math.round(fee * 100) / 100,
          net: Math.round((amount - fee) * 100) / 100,
          scheme: SCHEMES[seq % SCHEMES.length],
          status: STATUSES[seq % STATUSES.length],
        })
        seq++
      }
    }
  }
  return out.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
})()

export const ADMIN_TERMINALS: AdminTerminal[] = [
  { id: 't_001', serial: 'CSL-S1F4-7821', model: 'Castles S1F4', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', location: 'Front bar — counter', status: 'online', lastSeen: 'now', firmware: '2.14.3', monthlyVolume: 18420 },
  { id: 't_002', serial: 'PAX-A920-4412', model: 'PAX A920 Pro', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', location: 'Dining room — host stand', status: 'online', lastSeen: 'now', firmware: '3.02.1', monthlyVolume: 24180 },
  { id: 't_003', serial: 'PAX-A77-9087', model: 'PAX A77 4G', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', location: 'Outdoor seating', status: 'online', lastSeen: '3 min ago', firmware: '1.18.7', monthlyVolume: 6240 },
  { id: 't_004', serial: 'CSL-S1F4-9912', model: 'Castles S1F4', merchantId: 'cust_4P2m8H', merchantName: 'Northern Cuts Barbers', location: 'Front desk', status: 'online', lastSeen: 'now', firmware: '2.14.3', monthlyVolume: 7800 },
  { id: 't_005', serial: 'PAX-A77-2210', model: 'PAX A77 4G', merchantId: 'cust_4P2m8H', merchantName: 'Northern Cuts Barbers', location: 'Mobile', status: 'online', lastSeen: '12 min ago', firmware: '1.18.7', monthlyVolume: 3620 },
  { id: 't_006', serial: 'PAX-A920-7700', model: 'PAX A920 Pro', merchantId: 'cust_7J8s2K', merchantName: 'Holloway Auto Repairs', location: 'Reception', status: 'maintenance', lastSeen: '2 days ago', firmware: '3.01.4', monthlyVolume: 0 },
  { id: 't_007', serial: 'CSL-S1F4-3340', model: 'Castles S1F4', merchantId: 'cust_9C1w0V', merchantName: 'Bloom & Bough Florists', location: 'Shop floor', status: 'online', lastSeen: 'now', firmware: '2.14.3', monthlyVolume: 12100 },
  { id: 't_008', serial: 'PAX-A77-4198', model: 'PAX A77 4G', merchantId: 'cust_9C1w0V', merchantName: 'Bloom & Bough Florists', location: 'Delivery van', status: 'online', lastSeen: 'now', firmware: '1.18.7', monthlyVolume: 6100 },
  { id: 't_009', serial: 'PAX-A920-8821', model: 'PAX A920 Pro', merchantId: 'cust_1A3d5Y', merchantName: 'Steamlight Coffee Co', location: 'Espresso bar', status: 'online', lastSeen: 'now', firmware: '3.02.1', monthlyVolume: 8400 },
  { id: 't_010', serial: 'PAX-A920-8822', model: 'PAX A920 Pro', merchantId: 'cust_1A3d5Y', merchantName: 'Steamlight Coffee Co', location: 'Grab & go', status: 'offline', lastSeen: '6 hours ago', firmware: '3.02.1', monthlyVolume: 4200 },
  { id: 't_011', serial: 'PAX-A920-9913', model: 'PAX A920 Pro', merchantId: '', merchantName: '', location: 'Warehouse — bay A12', status: 'in-stock', lastSeen: '—', firmware: '3.02.1', monthlyVolume: 0 },
  { id: 't_012', serial: 'CSL-S1F4-1144', model: 'Castles S1F4', merchantId: '', merchantName: '', location: 'Warehouse — bay A14', status: 'in-stock', lastSeen: '—', firmware: '2.14.3', monthlyVolume: 0 },
  { id: 't_013', serial: 'PAX-A77-0091', model: 'PAX A77 4G', merchantId: 'cust_8H2k4Q', merchantName: 'Vellum Studio', location: 'In transit to Vellum Studio', status: 'shipping', lastSeen: '—', firmware: '1.18.7', monthlyVolume: 0 },
  { id: 't_014', serial: 'PAX-A920-5512', model: 'PAX A920 Pro', merchantId: 'cust_6V8p1L', merchantName: 'Foundry Tap House', location: 'Main bar', status: 'online', lastSeen: 'now', firmware: '3.02.1', monthlyVolume: 18900 },
  { id: 't_015', serial: 'PAX-A920-5513', model: 'PAX A920 Pro', merchantId: 'cust_6V8p1L', merchantName: 'Foundry Tap House', location: 'Garden bar', status: 'online', lastSeen: 'now', firmware: '3.02.1', monthlyVolume: 14200 },
]

export const ADMIN_ADVANCES: AdminAdvance[] = [
  { id: 'CA-2026-0418', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', advanced: 25000, totalRepayable: 28750, repaid: 17850, remaining: 10900, percentOfCard: 12, status: 'active', startedAt: '2026-01-14', estimatedEnd: '2026-08-22' },
  { id: 'CA-2026-0511', merchantId: 'cust_7J8s2K', merchantName: 'Holloway Auto Repairs', advanced: 40000, totalRepayable: 46800, repaid: 9200, remaining: 37600, percentOfCard: 14, status: 'active', startedAt: '2026-04-02', estimatedEnd: '2026-12-18' },
  { id: 'CA-2026-0388', merchantId: 'cust_2B9j7W', merchantName: 'Ridgeway Gym', advanced: 12000, totalRepayable: 13800, repaid: 6900, remaining: 6900, percentOfCard: 10, status: 'active', startedAt: '2025-12-10', estimatedEnd: '2026-07-04' },
  { id: 'CA-2026-0599', merchantId: 'cust_6V8p1L', merchantName: 'Foundry Tap House', advanced: 35000, totalRepayable: 40250, repaid: 2400, remaining: 37850, percentOfCard: 11, status: 'active', startedAt: '2026-05-06', estimatedEnd: '2027-01-30' },
  { id: 'CA-2025-0921', merchantId: 'cust_4M5l8C', merchantName: 'Linley Park Vets', advanced: 18000, totalRepayable: 20700, repaid: 20700, remaining: 0, percentOfCard: 10, status: 'paid-off', startedAt: '2025-11-04', estimatedEnd: '2026-04-29' },
  { id: 'CA-2026-PEND', merchantId: 'cust_1A3d5Y', merchantName: 'Steamlight Coffee Co', advanced: 15000, totalRepayable: 17250, repaid: 0, remaining: 17250, percentOfCard: 12, status: 'underwriting', startedAt: '—', estimatedEnd: '—' },
]

export const ADMIN_APPLICATIONS: AdminApplication[] = [
  { id: 'APP-2026-7741', businessName: 'Vellum Studio', contactName: 'Priya Shah', contactEmail: 'studio@vellum.design', industry: 'Creative services', estimatedMonthlyVolume: 14000, submittedAt: day(2), stage: 'underwriting', assignedTo: 'Georgia Hope' },
  { id: 'APP-2026-7755', businessName: 'Harbourside Fish & Chips', contactName: 'Eddie Marsh', contactEmail: 'eddie@harboursidef-c.co.uk', industry: 'Hospitality', estimatedMonthlyVolume: 32000, submittedAt: day(1), stage: 'docs-requested', assignedTo: 'Tom Reid' },
  { id: 'APP-2026-7763', businessName: 'Shore & Birch Joinery', contactName: 'Owen Daltrey', contactEmail: 'owen@shoreandbirch.co', industry: 'Trades', estimatedMonthlyVolume: 8500, submittedAt: day(0), stage: 'new', assignedTo: 'Unassigned' },
  { id: 'APP-2026-7768', businessName: 'Halberd Tactical Gear', contactName: 'Ben Caldwell', contactEmail: 'ben@halberd-tactical.uk', industry: 'Retail', estimatedMonthlyVolume: 22000, submittedAt: day(0), stage: 'new', assignedTo: 'Unassigned' },
  { id: 'APP-2026-7720', businessName: 'Spire Aesthetics Clinic', contactName: 'Dr Yara Khan', contactEmail: 'yara@spireaesthetics.co.uk', industry: 'Healthcare', estimatedMonthlyVolume: 48000, submittedAt: day(4), stage: 'approved', assignedTo: 'Georgia Hope' },
  { id: 'APP-2026-7682', businessName: 'Kit & Knot Children\'s Wear', contactName: 'Hannah Pierce', contactEmail: 'hannah@kitandknot.shop', industry: 'Retail', estimatedMonthlyVolume: 6500, submittedAt: day(8), stage: 'rejected', assignedTo: 'Tom Reid' },
]

export const ADMIN_TICKETS: AdminTicket[] = [
  { id: 'TIC-1042', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', subject: 'POS-02 receipt printer cutting off VAT line', status: 'awaiting-customer', priority: 'normal', assignedTo: 'Tom Reid', createdAt: day(1), lastActivity: '2h ago', messages: 4 },
  { id: 'TIC-1051', merchantId: 'cust_7J8s2K', merchantName: 'Holloway Auto Repairs', subject: 'Terminal offline — needs SIM swap', status: 'open', priority: 'high', assignedTo: 'Tom Reid', createdAt: day(0), lastActivity: '40 min ago', messages: 2 },
  { id: 'TIC-1049', merchantId: 'cust_6V8p1L', merchantName: 'Foundry Tap House', subject: 'Add 2 terminals before weekend rush', status: 'open', priority: 'urgent', assignedTo: 'Georgia Hope', createdAt: day(0), lastActivity: '15 min ago', messages: 3 },
  { id: 'TIC-1047', merchantId: 'cust_9C1w0V', merchantName: 'Bloom & Bough Florists', subject: 'Statement totals don\'t match settlement deposit', status: 'open', priority: 'normal', assignedTo: 'Unassigned', createdAt: day(0), lastActivity: '1h ago', messages: 1 },
  { id: 'TIC-1038', merchantId: 'cust_2X9k1Z', merchantName: 'Riverside Bistro Ltd', subject: 'Add second user to virtual terminal', status: 'open', priority: 'low', assignedTo: 'Tom Reid', createdAt: day(3), lastActivity: 'yesterday', messages: 2 },
  { id: 'TIC-1029', merchantId: 'cust_2B9j7W', merchantName: 'Ridgeway Gym', subject: 'Refund processed but not showing on statement', status: 'resolved', priority: 'normal', assignedTo: 'Georgia Hope', createdAt: day(9), lastActivity: '5 days ago', messages: 6 },
  { id: 'TIC-1015', merchantId: 'cust_4P2m8H', merchantName: 'Northern Cuts Barbers', subject: 'Request quote — mobile terminal for outdoor service', status: 'resolved', priority: 'low', assignedTo: 'Georgia Hope', createdAt: day(21), lastActivity: '14 days ago', messages: 3 },
]

export const ADMIN_STAFF: AdminStaff[] = [
  { id: 'staff_001', name: 'Daniel Pearce', email: 'owner@a2bpayments.co.uk', role: 'Owner', status: 'active', lastActive: 'now', assignedMerchants: 0, initials: 'DP' },
  { id: 'staff_002', name: 'Georgia Hope', email: 'georgia@a2bpayments.co.uk', role: 'Account Manager', status: 'active', lastActive: '12 min ago', assignedMerchants: 6, initials: 'GH' },
  { id: 'staff_003', name: 'Tom Reid', email: 'tom@a2bpayments.co.uk', role: 'Account Manager', status: 'active', lastActive: '4 min ago', assignedMerchants: 5, initials: 'TR' },
  { id: 'staff_004', name: 'Lena Park', email: 'lena@a2bpayments.co.uk', role: 'Underwriter', status: 'active', lastActive: '38 min ago', assignedMerchants: 0, initials: 'LP' },
  { id: 'staff_005', name: 'Marcus Vella', email: 'marcus@a2bpayments.co.uk', role: 'Support', status: 'active', lastActive: '2h ago', assignedMerchants: 0, initials: 'MV' },
  { id: 'staff_006', name: 'Asha Patel', email: 'asha@a2bpayments.co.uk', role: 'Support', status: 'invited', lastActive: '—', assignedMerchants: 0, initials: 'AP' },
  { id: 'staff_007', name: 'Roger Wynn', email: 'roger@a2bpayments.co.uk', role: 'Read-only', status: 'active', lastActive: 'yesterday', assignedMerchants: 0, initials: 'RW' },
]

export const ADMIN_AUDIT: AuditEntry[] = [
  { id: 'aud_201', actor: 'Daniel Pearce', action: 'Approved cash advance', target: 'CA-2026-0599 · Foundry Tap House', at: '2 min ago' },
  { id: 'aud_200', actor: 'Georgia Hope', action: 'Sent docs request', target: 'APP-2026-7755 · Harbourside Fish & Chips', at: '18 min ago' },
  { id: 'aud_199', actor: 'Tom Reid', action: 'Resolved ticket', target: 'TIC-1029 · Ridgeway Gym', at: '1h ago' },
  { id: 'aud_198', actor: 'Daniel Pearce', action: 'Updated pricing', target: 'Crown Lane Convenience · 1.20% → 0.99%', at: '3h ago' },
  { id: 'aud_197', actor: 'Lena Park', action: 'Flagged for review', target: 'cust_5R7n2P · 3 chargebacks in 7 days', at: 'yesterday' },
  { id: 'aud_196', actor: 'Tom Reid', action: 'Shipped terminal', target: 't_013 PAX A77 → Vellum Studio', at: 'yesterday' },
]

// ───────── helpers ─────────

export function merchantSummary() {
  const live = ADMIN_MERCHANTS.filter((m) => m.status === 'live')
  const monthlyVolume = live.reduce((s, m) => s + m.monthlyVolume, 0)
  const monthlyFees = live.reduce((s, m) => s + m.monthlyFees, 0)
  const pendingKyc = ADMIN_MERCHANTS.filter((m) => m.status === 'pending-kyc').length
  return { liveCount: live.length, total: ADMIN_MERCHANTS.length, monthlyVolume, monthlyFees, pendingKyc }
}

export function terminalSummary() {
  const total = ADMIN_TERMINALS.length
  const online = ADMIN_TERMINALS.filter((t) => t.status === 'online').length
  const offline = ADMIN_TERMINALS.filter((t) => t.status === 'offline').length
  const inStock = ADMIN_TERMINALS.filter((t) => t.status === 'in-stock').length
  const shipping = ADMIN_TERMINALS.filter((t) => t.status === 'shipping').length
  const maintenance = ADMIN_TERMINALS.filter((t) => t.status === 'maintenance').length
  return { total, online, offline, inStock, shipping, maintenance }
}

export function advanceSummary() {
  const active = ADMIN_ADVANCES.filter((a) => a.status === 'active')
  const outstanding = active.reduce((s, a) => s + a.remaining, 0)
  const deployed = active.reduce((s, a) => s + a.advanced, 0)
  const profitFloor = active.reduce((s, a) => s + (a.totalRepayable - a.advanced), 0)
  return { activeCount: active.length, outstanding, deployed, profitFloor }
}

export function findMerchant(id: string): AdminMerchant | undefined {
  return ADMIN_MERCHANTS.find((m) => m.id === id)
}

export function txForMerchant(id: string): AdminTransaction[] {
  return ADMIN_TRANSACTIONS.filter((t) => t.merchantId === id)
}

export function terminalsForMerchant(id: string): AdminTerminal[] {
  return ADMIN_TERMINALS.filter((t) => t.merchantId === id)
}

export function ticketsForMerchant(id: string): AdminTicket[] {
  return ADMIN_TICKETS.filter((t) => t.merchantId === id)
}

export function advancesForMerchant(id: string): AdminAdvance[] {
  return ADMIN_ADVANCES.filter((a) => a.merchantId === id)
}
