import { Quote, Star, ArrowUpRight } from 'lucide-react'
import { LinkButton } from '../../components/Button'
import GlassCard from '../../components/GlassCard'
import { TESTIMONIALS } from '../../lib/testimonials'

export default function TestimonialsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint-deep">Testimonials</p>
        <h1 className="mt-4 font-display text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          What our customers say.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-ink-muted">
          We're proudest of the businesses we serve — the cafés, restaurants, retailers and trade suppliers across the
          UK who trust us to handle their money.
        </p>
      </section>

      {/* FEATURED INTERVIEW */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint/15 via-paper to-paper-soft p-6 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-mint/25 blur-3xl sm:h-[28rem] sm:w-[28rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-[-10%] h-72 w-72 rounded-full bg-mint/15 blur-3xl sm:h-[24rem] sm:w-[24rem]"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-[340px] lg:mx-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-tr from-mint/40 via-mint/20 to-transparent blur-2xl"
              />
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_-20px_rgba(15,23,30,0.4),0_10px_30px_-10px_rgba(89,209,195,0.25)] ring-1 ring-ink/10">
                <iframe
                  src="https://www.youtube.com/embed/cA8CLhAoKIQ?modestbranding=1&rel=0"
                  title="A2B Payments customer interview"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mint-deep">
                <span className="h-px w-8 bg-mint-deep" />
                Customer story
              </p>
              <h2 className="mt-5 font-display text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Hear it straight <span className="text-mint-deep">from a customer.</span>
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-ink-muted sm:text-lg">
                A real conversation with one of our customers — why they switched, what's changed for their business, and what they'd tell you if you're sitting on the fence.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-fade">
                ▶ Tap to play · 60-second interview
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <GlassCard key={i} surface="light" className="p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-mint/30 via-mint/15 to-mint/5 text-mint-deep ring-1 ring-mint/20">
                  <Quote className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-mint text-mint" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-6 text-pretty text-ink">"{t.quote}"</blockquote>
              <figcaption className="mt-6 border-t border-ink/5 pt-4 text-sm">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-ink-fade">{t.business}</p>
              </figcaption>
            </GlassCard>
          ))}
        </div>

        <GlassCard surface="dark" className="mt-16 p-10 sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Be our next happy customer.
              </h2>
              <p className="mt-3 max-w-xl text-paper/70">
                We'll match or beat your current rate, and back it up with the kind of service the banks gave up on years
                ago.
              </p>
            </div>
            <LinkButton to="/contact" variant="primary" size="lg">
              Get your quote
              <ArrowUpRight className="h-5 w-5" />
            </LinkButton>
          </div>
        </GlassCard>
      </section>
    </>
  )
}
