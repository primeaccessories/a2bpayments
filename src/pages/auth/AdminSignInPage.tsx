import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '../../components/Button'
import BrandLogo from '../../components/BrandLogo'
import { signIn, ADMIN_DEMO_CREDENTIALS } from '../../lib/auth'

export default function AdminSignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = signIn(email, password)
    if (result.ok && result.role === 'admin') {
      navigate('/admin')
    } else if (result.ok) {
      setError('That account isn\'t an admin. Use the customer portal sign-in.')
    } else {
      setError(result.reason)
    }
  }

  const fillDemo = () => {
    setEmail(ADMIN_DEMO_CREDENTIALS.email)
    setPassword(ADMIN_DEMO_CREDENTIALS.password)
    setError(null)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <BrandLogo />
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-fade hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint-deep">
            <Shield className="h-3 w-3" /> Staff portal
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">Staff sign in</h1>
          <p className="mt-2 text-sm text-ink-muted">Internal A2B Payments admin console.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Work email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                className="input"
                placeholder="you@a2bpayments.co.uk"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Password</span>
                <Link to="/forgot-password" className="text-sm text-mint-deep hover:text-ink">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(null)
                }}
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign in
            </Button>

            <div className="rounded-xl border border-ink/10 bg-paper-soft p-4 text-xs text-ink-muted">
              <p className="font-semibold text-ink">Demo access</p>
              <p className="mt-1">
                Email <span className="font-mono text-ink">{ADMIN_DEMO_CREDENTIALS.email}</span> · password{' '}
                <span className="font-mono text-ink">{ADMIN_DEMO_CREDENTIALS.password}</span>
              </p>
              <button
                type="button"
                onClick={fillDemo}
                className="mt-2 font-semibold text-mint-deep hover:text-ink"
              >
                Fill in for me →
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-ink-muted">
            Not a staff member?{' '}
            <Link to="/sign-in" className="font-semibold text-ink underline-offset-4 hover:underline">
              Customer sign in
            </Link>
          </p>
        </div>
      </main>

      <footer className="px-5 py-6 text-xs text-ink-fade sm:px-8">
        © {new Date().getFullYear()} A2B Payment Solutions Ltd
      </footer>
    </div>
  )
}
