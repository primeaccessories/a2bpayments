import { ArrowDown, ArrowUpRight, Check, HeartHandshake, Phone, ShieldCheck, Star, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LinkButton } from '../../components/Button'
import GlassCard from '../../components/GlassCard'
import GlassIcon from '../../components/GlassIcon'
import TestimonialGrid from '../../components/TestimonialGrid'
import { PRODUCTS } from '../../lib/products'

const MASK_DURATION_MS = 4500
const HERO_TEXT_DELAY_MS = 4400

const SUBLINES = [
  'Lower rates, faster settlements, and support you can actually reach.',
  'Honest pricing, quick settlements, and human support when you need it.',
  'Card processing built for UK businesses tired of opaque fees.',
  'Switch in days, save from week one — no long contracts.',
]
const SUBLINE_ROTATE_MS = 3000

const PORTAL_FEATURES = [
  'Live transaction feed',
  'Terminal health & status',
  'Loan & cash advance balances',
  'Statements & documents',
  'Raise & track support tickets',
  'Manage your team users',
]

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

  const [textIn, setTextIn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setTextIn(true), HERO_TEXT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const [sublineIdx, setSublineIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSublineIdx((i) => (i + 1) % SUBLINES.length), SUBLINE_ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [src4kReady, setSrc4kReady] = useState(false)
  useEffect(() => {
    fetch('/a2b-intro-2160.mp4', { method: 'HEAD' })
      .then((r) => { if (r.ok) setSrc4kReady(true) })
      .catch(() => undefined)
  }, [])
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    const tryPlay = () => v.play().catch(() => undefined)
    tryPlay()
    const onVisible = () => { if (document.visibilityState === 'visible') tryPlay() }
    document.addEventListener('visibilitychange', onVisible)
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true })
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [src4kReady])

  return (
    <>
      {/* A2B LOADING MASK — full-viewport overlay, sits under the sticky header */}
      <AnimatePresence>
        {!maskGone && (
          <motion.img
            key="hero-a2b-mask"
            src="/a2b-mask.svg"
            alt=""
            aria-hidden="true"
            initial={{ scale: 1.0, opacity: 1 }}
            animate={{
              scale: 5.5,
              opacity: 0,
              transition: {
                scale: { duration: 2.4, delay: 2.0, ease: [0.42, 0, 0.6, 1] },
                opacity: { duration: 2.4, delay: 2.0, ease: [0.5, 0, 0.9, 1] },
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="pointer-events-none fixed inset-0 z-30 h-full w-full select-none object-cover will-change-transform"
            draggable={false}
          />
        )}
      </AnimatePresence>

      {/* HERO + MARQUEE — one viewport-tall landing block */}
      <div className="flex min-h-[100dvh] flex-col bg-ink">
      {/* HERO */}
      <section className="relative isolate flex flex-1 flex-col overflow-hidden bg-ink text-paper">
        <video
          key={src4kReady ? '4k' : 'hd'}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/a2b-intro.webp"
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          controls={false}
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-overlay-play-button]:!hidden [&::-webkit-media-controls-start-playback-button]:!hidden [&::-webkit-media-controls-panel]:!hidden"
        >
          {src4kReady && (
            <>
              <source src="/a2b-intro-2160.webm" type="video/webm" media="(min-width: 1024px), (min-resolution: 2dppx)" />
              <source src="/a2b-intro-2160.mp4" type="video/mp4" media="(min-width: 1024px), (min-resolution: 2dppx)" />
            </>
          )}
          <source src="/a2b-intro.webm" type="video/webm" />
          <source src="/a2b-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={textIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-36 pb-8 sm:px-8 sm:pt-44 sm:pb-10 lg:pt-52"
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
              <LinkButton
                to="/contact"
                variant="primary"
                size="lg"
                className="w-full !shadow-none sm:w-auto"
              >
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

      {/* TRUST MARQUEE — anchored to the bottom of the landing block */}
      <section className="shrink-0 border-y border-white/5 bg-ink py-6 text-paper sm:py-10">
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
      </div>

      {/* PORTAL TEASE — cinematic dashboard cluster */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper via-paper to-paper-soft text-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,30,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,30,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-15%] h-[40rem] w-[40rem] rounded-full bg-mint/35 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-[-15%] h-[40rem] w-[40rem] rounded-full bg-mint-deep/15 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:py-40">
          {/* MOBILE / TABLET — clean stack */}
          <div className="flex flex-col items-center lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[480px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-tr from-mint/45 via-mint/20 to-transparent blur-2xl sm:-inset-10"
              />
              <div className="absolute -top-3 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-paper shadow-xl ring-1 ring-mint/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Live
              </div>
              <PortalPreview />
            </motion.div>

            <div
              aria-hidden="true"
              className="my-8 h-10 w-px bg-gradient-to-b from-mint/0 via-mint-deep/50 to-mint/0"
            />

            <div className="max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-mint-deep">Customer portal</p>
              <h2 className="mt-3 font-display text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Your account, your numbers, <span className="text-mint-deep">in one place.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-ink-muted sm:text-lg">
                Sign in to see live settlements, manage terminals, check loan balances and raise support tickets — on any device.
              </p>
              <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-sm text-ink sm:grid-cols-2">
                {PORTAL_FEATURES.map((line) => (
                  <li key={line} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <LinkButton to="/sign-in" variant="primary" size="md">
                  Sign in to your portal
                </LinkButton>
                <LinkButton to="/sign-up" variant="secondary" size="md">
                  Create an account
                  <ArrowUpRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>

          {/* DESKTOP — cinematic split */}
          <div className="hidden lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 xl:gap-24">
            {/* LEFT — floating dashboard cluster */}
            <div className="relative h-[620px] xl:h-[680px]">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateY: -22 }}
                whileInView={{ opacity: 1, y: 0, rotateY: -8 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 2000, rotateX: 4, transformOrigin: 'left center' }}
                className="absolute left-0 top-1/2 z-10 w-[480px] -translate-y-1/2 xl:w-[520px]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-mint/35 via-mint/15 to-transparent blur-3xl"
                />
                <div className="absolute -top-3 left-6 z-30 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-paper shadow-2xl ring-1 ring-mint/40">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                  Portal · Live
                </div>
                <PortalPreview />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12, x: 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-6 z-20"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-64 rounded-2xl bg-paper p-4 text-ink shadow-[0_24px_60px_-20px_rgba(15,23,30,0.35),0_8px_20px_-8px_rgba(89,209,195,0.3)] ring-1 ring-ink/10 backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-mint-deep">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                      </span>
                      New txn
                    </span>
                    <span className="text-[10px] text-ink-fade">14:32</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-display text-2xl font-semibold">+£42.50</span>
                    <span className="text-xs text-ink-muted">Visa ••4521</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12, x: 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-2 bottom-10 z-20"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="w-60 rounded-2xl bg-paper p-4 text-ink shadow-[0_24px_60px_-20px_rgba(15,23,30,0.35),0_8px_20px_-8px_rgba(89,209,195,0.3)] ring-1 ring-ink/10 backdrop-blur"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-fade">Settled today</p>
                  <p className="mt-1 font-display text-2xl font-semibold">£1,422.30</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs">
                    <ArrowUpRight className="h-3 w-3 text-mint-deep" />
                    <span className="font-semibold text-mint-deep">+12%</span>
                    <span className="text-ink-fade">vs yesterday</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12, x: 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-20 top-1/2 z-20 -translate-y-1/2"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                  className="rounded-2xl bg-paper px-4 py-3 text-ink shadow-[0_24px_60px_-20px_rgba(15,23,30,0.35),0_8px_20px_-8px_rgba(89,209,195,0.3)] ring-1 ring-ink/10 backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_rgba(89,209,195,0.8)]" />
                    <span className="text-xs font-semibold">4 terminals online</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT — copy */}
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mint-deep">
                <span className="h-px w-8 bg-mint-deep" />
                Customer portal
              </p>
              <h2 className="mt-5 font-display text-balance text-[clamp(2.5rem,4.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-ink">
                Your account,<br />your numbers,<br />
                <span className="text-mint-deep">in one place.</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg text-ink-muted">
                Sign in to see live settlements, manage terminals, check loan balances and raise support tickets — on any device.
              </p>
              <ul className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm text-ink">
                {PORTAL_FEATURES.map((line) => (
                  <li key={line} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton to="/sign-in" variant="primary" size="lg">
                  Sign in to your portal
                </LinkButton>
                <LinkButton to="/sign-up" variant="secondary" size="lg">
                  Create an account
                  <ArrowUpRight className="h-4 w-4" />
                </LinkButton>
              </div>
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
        <TestimonialGrid limit={3} />
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
    <div className="relative w-full rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_80px_-20px_rgba(15,23,30,0.35),0_10px_30px_-10px_rgba(89,209,195,0.25)]">
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
