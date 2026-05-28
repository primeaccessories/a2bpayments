import { ArrowDown, ArrowUpRight, Check, HeartHandshake, Phone, ShieldCheck, Star, Quote, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LinkButton } from '../../components/Button'
import GlassCard from '../../components/GlassCard'
import GlassIcon from '../../components/GlassIcon'
import { PRODUCTS } from '../../lib/products'
import { TESTIMONIALS } from '../../lib/testimonials'

const MASK_DURATION_MS = 2600

const SUBLINES = [
  'Lower rates, faster settlements, and support you can actually reach.',
  'Honest pricing, quick settlements, and human support when you need it.',
  'Card processing built for UK businesses tired of opaque fees.',
  'Switch in days, save from week one — no long contracts.',
]
const SUBLINE_ROTATE_MS = 3000

const TRUST_ROWS: { label: string; duration: number; reverse?: boolean; items: string[] }[] = [
  {
    label: 'Cards & wallets',
    duration: 52,
    items: [
      'VISA',
      'Mastercard',
      'American Express',
      'Maestro',
      'Discover',
      'JCB',
      'UnionPay',
      'Diners Club',
      'Apple Pay',
      'Google Pay',
      'Samsung Pay',
      'Klarna',
      'PayPal',
      'Open Banking',
    ],
  },
  {
    label: 'Standards & infra',
    duration: 58,
    reverse: true,
    items: [
      'PCI-DSS Level 1',
      '3D Secure 2',
      'EMV Chip & PIN',
      'Contactless NFC',
      'Tap to Pay',
      'P2PE',
      'Tokenisation',
      'AES-256',
      'ISO 8583',
      'ISO 20022',
      'PSD2 / SCA',
      'Visa Direct',
      'Mastercard Send',
      'Faster Payments',
    ],
  },
]

export default function HomePage() {
  const [maskGone, setMaskGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMaskGone(true), MASK_DURATION_MS)
    return () => clearTimeout(t)
  }, [])

  const [sublineIdx, setSublineIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSublineIdx((i) => (i + 1) % SUBLINES.length), SUBLINE_ROTATE_MS)
    return () => clearInterval(id)
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
              initial={{ scale: 1.0, opacity: 1 }}
              animate={{
                scale: [1.0, 1.0, 3.5],
                opacity: [1, 1, 0],
                transition: {
                  duration: 2.6,
                  ease: [0.72, 0, 0.28, 1],
                  times: [0, 0.78, 1],
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-cover will-change-transform"
              draggable={false}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={maskGone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto flex min-h-[72svh] max-w-7xl flex-col px-5 pt-20 pb-10 sm:px-8 sm:pt-32 sm:pb-12 lg:pt-36"
        >
          <div className="max-w-4xl">
            <TrustpilotBadge />

            <h1 className="mt-6 font-display text-balance text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight text-paper">
              Business
              <br />
              Payment
              <br />
              Solutions
            </h1>

            <div className="mt-10">
              <LinkButton to="/contact" variant="primary" size="lg">
                Let's get started
              </LinkButton>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-start pt-12 sm:justify-end sm:pt-16">
            <div className="flex w-full max-w-md items-end gap-4 sm:gap-6">
              <div className="relative min-h-[5rem] flex-1 sm:min-h-[4rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={sublineIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-pretty text-sm text-paper/70 sm:text-lg"
                  >
                    {SUBLINES[sublineIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center text-paper/60"
              >
                <ArrowDown className="h-6 w-6" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUST MARQUEE — 3 rows, alternating direction */}
      <section className="border-y border-white/5 bg-ink py-12 text-paper sm:py-16">
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-paper/40 sm:mb-10 sm:text-xs">
          Cards, wallets &amp; the rails behind them
        </p>
        <div className="flex flex-col gap-5 sm:gap-7">
          {TRUST_ROWS.map((row, i) => (
            <div key={row.label} className="flex items-center gap-4">
              <span className="hidden shrink-0 pl-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-mint/80 sm:block sm:w-40 sm:pl-8">
                {row.label}
              </span>
              <div className="relative flex-1 overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-24"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-24"
                  aria-hidden="true"
                />
                <div
                  className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap sm:gap-14"
                  style={{
                    animationDuration: `${row.duration}s`,
                    animationDirection: row.reverse ? 'reverse' : 'normal',
                  }}
                >
                  {Array.from({ length: 3 }).flatMap((_, dup) =>
                    row.items.map((brand) => (
                      <span
                        key={`${i}-${dup}-${brand}`}
                        className="font-display text-base font-semibold uppercase tracking-[0.25em] text-paper/40 sm:text-lg"
                      >
                        {brand}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTAL TEASE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-32">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint/15 via-paper to-paper p-6 sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
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

            <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <PortalPreview />
            </div>
          </div>
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-mint/10 blur-3xl sm:-left-16"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20 lg:py-48">
          <h2 className="font-display text-balance text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight">
            Payments
            <br />
            without the
            <br />
            <span className="text-mint">runaround.</span>
          </h2>
          <div>
            <p className="max-w-md text-pretty text-base text-paper/60 sm:text-lg">
              Talk to a real person. Get a real quote. Move at the pace of your business — not your acquirer's.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/products" variant="primary" size="lg">
                See what we do
                <ArrowDown className="h-5 w-5" />
              </LinkButton>
              <LinkButton to="/contact" variant="inverse" size="lg">
                Talk to us
                <ArrowUpRight className="h-5 w-5" />
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS — gloss tiles on ink */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/4 -translate-y-1/4 rounded-full bg-mint/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint/80">
              Why operators move to A2B
            </p>
            <h2 className="mt-4 font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for businesses that don't have time to chase their acquirer.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {[
              {
                Icon: HeartHandshake,
                title: 'Best-in-class care',
                desc: 'A named account manager, a phone that gets answered, and a team who actually understands your industry.',
              },
              {
                Icon: Zap,
                title: 'Fast where it matters',
                desc: 'Next-day terminals. 24-hour funding decisions. 48-hour onboarding. We move at the pace of trade.',
              },
              {
                Icon: ShieldCheck,
                title: 'Honest pricing',
                desc: 'No hidden fees, no auto-roll contracts, no surprises on the statement. Every line item explained up-front.',
              },
            ].map(({ Icon, title, desc }) => (
              <GlassCard key={title} surface="dark" interactive className="p-8 sm:p-9">
                <GlassIcon Icon={Icon} tone="mint" size="lg" />
                <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-pretty text-paper/65">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-ink-soft text-paper">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint/80">What we do</p>
              <h2 className="mt-4 font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Everything your business needs to take and grow money.
              </h2>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-mint hover:text-mint-bright">
              View all products
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="contents">
                <GlassCard surface="dark" interactive className="p-7 sm:p-8">
                  <GlassIcon Icon={p.Icon} tone="mint" size="md" />
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-paper sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper/60">{p.tagline}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </GlassCard>
              </Link>
            ))}
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

function TrustpilotBadge() {
  return (
    <a
      href="https://uk.trustpilot.com/review/a2bpayments.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 text-paper"
    >
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight">
        <Star className="h-4 w-4 fill-mint text-mint" />
        Trustpilot
      </span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex h-6 w-6 items-center justify-center bg-mint"
          >
            <Star className="h-4 w-4 fill-paper text-paper" strokeWidth={0} />
          </span>
        ))}
      </span>
    </a>
  )
}

function PortalPreview() {
  return (
    <div className="relative w-full rounded-2xl border border-ink/10 bg-paper shadow-2xl">
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
