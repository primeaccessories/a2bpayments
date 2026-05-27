import { ArrowUpRight, Check, Phone, ShieldCheck, Zap, HeartHandshake, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LinkButton } from '../../components/Button'
import { PRODUCTS } from '../../lib/products'
import { TESTIMONIALS } from '../../lib/testimonials'

const MASK_DURATION_MS = 1800

export default function HomePage() {
  const [maskGone, setMaskGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMaskGone(true), MASK_DURATION_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <video
          src="/a2b-intro.webm"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />

        <AnimatePresence>
          {!maskGone && (
            <motion.img
              key="hero-a2b-mask"
              src="/a2b-mask.svg"
              alt=""
              aria-hidden="true"
              initial={{ scale: 2.1, opacity: 0.6 }}
              animate={{ scale: 1.88, opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-cover"
              draggable={false}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={maskGone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto max-w-7xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40"
        >
          <div className="max-w-3xl">
            <h1 className="font-display text-balance text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tight text-paper">
              Business payment solutions.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg text-paper/70 sm:text-xl">
              Card payments, online checkout, e-POS and finance for UK businesses. Supported by people who pick up the phone.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" variant="primary" size="lg">
                Let's get started
                <ArrowUpRight className="h-5 w-5" />
              </LinkButton>
              <a
                href="tel:03334432645"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-ink/40 px-8 text-base font-semibold text-paper backdrop-blur transition hover:border-mint hover:text-mint"
              >
                <Phone className="h-5 w-5" />
                0333 443 2645
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* VALUE PILLARS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { Icon: HeartHandshake, title: 'Best-in-class care', desc: 'Beyond transactional. We genuinely care about the businesses we serve — and it shows on every call.' },
            { Icon: Zap, title: 'Fast where it matters', desc: 'Next-day terminals. 24-hour funding decisions. 48-hour onboarding. We move at the pace of trade.' },
            { Icon: ShieldCheck, title: 'Honest pricing', desc: 'No hidden fees, no auto-roll contracts, no surprises on the statement. Every line item explained up-front.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-ink/5 bg-paper p-7 transition hover:border-ink/10 hover:shadow-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint/15 text-mint-deep">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-pretty text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-ink-soft text-paper">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mint">What we do</p>
              <h2 className="mt-3 font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Everything your business needs to take and grow money.
              </h2>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-mint hover:text-mint-bright">
              View all products
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-mint/40 hover:bg-white/[0.06]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint/15 text-mint">
                  <p.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-paper">{p.title}</h3>
                <p className="mt-1.5 text-sm text-paper/60">{p.tagline}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-mint">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL TEASE */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint/15 via-paper to-paper p-8 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mint-deep">Customer portal</p>
              <h2 className="mt-3 font-display text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Your account, your numbers, in one place.
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-ink-muted sm:text-lg">
                Existing A2B customers can sign in to see live settlements, manage terminals, check loan balances and raise support tickets — all on any device.
              </p>
              <ul className="mt-8 grid gap-3 text-sm text-ink sm:grid-cols-2">
                {['Live transaction feed', 'Terminal health & status', 'Loan & cash advance balances', 'Statements & documents', 'Raise & track support tickets', 'Manage your team users'].map((line) => (
                  <li key={line} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mint text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/sign-in" variant="secondary" size="md">
                  Sign in to your portal
                </LinkButton>
                <LinkButton to="/sign-up" variant="ghost" size="md">
                  Create an account
                  <ArrowUpRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <PortalPreview />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Talk to anyone we've worked with.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <figure key={t.name} className="rounded-3xl border border-ink/5 bg-paper p-7">
              <Quote className="h-6 w-6 text-mint-deep" />
              <blockquote className="mt-4 text-pretty text-ink">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-ink-fade">{t.business}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/testimonials" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
            Read more stories →
          </Link>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="overflow-hidden rounded-3xl bg-ink p-10 text-paper sm:p-14 lg:p-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Ready to switch?
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-paper/70 sm:text-lg">
                Send us your last statement and we'll come back with a like-for-like quote in 24 hours. No commitment, no awkward sales calls.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" variant="primary" size="lg">
                Get a quote
                <ArrowUpRight className="h-5 w-5" />
              </LinkButton>
              <a
                href="tel:03334432645"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 px-8 text-base font-semibold text-paper transition hover:border-mint hover:text-mint"
              >
                <Phone className="h-5 w-5" />
                0333 443 2645
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function PortalPreview() {
  return (
    <div className="relative w-[440px] rounded-2xl border border-ink/10 bg-paper shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-ink/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 text-xs text-ink-fade">portal.a2bpayments.co.uk</span>
      </div>
      <div className="p-5">
        <p className="text-xs text-ink-fade">Today's takings</p>
        <p className="mt-1 font-display text-3xl font-semibold text-ink">£1,847.50</p>
        <p className="text-xs text-mint-deep">+12% vs yesterday</p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Settled', value: '£1,422' },
            { label: 'Pending', value: '£425' },
            { label: 'Fees', value: '£16.45' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-paper-soft p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-fade">{s.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          {[
            { t: '14:32', a: '+£42.50', card: 'Visa ••4521' },
            { t: '14:18', a: '+£68.00', card: 'Amex ••1003' },
            { t: '13:54', a: '+£215.75', card: 'MC ••8842' },
          ].map((r) => (
            <div key={r.t} className="flex items-center justify-between rounded-xl bg-paper-soft px-3 py-2 text-xs">
              <span className="text-ink-fade">{r.t}</span>
              <span className="text-ink-muted">{r.card}</span>
              <span className="font-semibold text-ink">{r.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
