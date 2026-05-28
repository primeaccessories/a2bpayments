const STORAGE_KEY = 'a2b.session'

const DEMO_EMAIL = 'test1@test.co.uk'
const DEMO_PASSWORD = 'test123'

const ADMIN_EMAIL = 'owner@a2bpayments.co.uk'
const ADMIN_PASSWORD = 'admin123'

type Role = 'customer' | 'admin'

interface Session {
  email: string
  role: Role
  signedInAt: string
}

export function signIn(email: string, password: string): { ok: true; role: Role } | { ok: false; reason: string } {
  const e = email.trim().toLowerCase()
  if (e === DEMO_EMAIL && password === DEMO_PASSWORD) {
    persist({ email: e, role: 'customer', signedInAt: new Date().toISOString() })
    return { ok: true, role: 'customer' }
  }
  if (e === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    persist({ email: e, role: 'admin', signedInAt: new Date().toISOString() })
    return { ok: true, role: 'admin' }
  }
  return { ok: false, reason: 'Email or password is incorrect.' }
}

function persist(s: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function isAuthed(): boolean {
  return getSession() !== null
}

export function isAdmin(): boolean {
  return getSession()?.role === 'admin'
}

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD }
export const ADMIN_DEMO_CREDENTIALS = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
