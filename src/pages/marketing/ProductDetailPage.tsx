import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Phone } from 'lucide-react'
import { productBySlug, PRODUCTS, type ProductSection } from '../../lib/products'
import { LinkButton } from '../../components/Button'
import GlassCard from '../../components/GlassCard'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  if (!product) return <Navigate to="/products" replace />

  const isFinance = product.category === 'finance'
  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3)

  return (
    <>
      {/* HERO — editorial split: copy left, product image panel right */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #59d1c3, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-paper/60 transition hover:text-mint">
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint/80">
                {isFinance ? 'Business finance' : 'Card payments'}
              </p>
              <h1 className="mt-4 font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                {product.title}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-xl text-paper/70">{product.tagline}</p>
              <p className="mt-5 max-w-xl text-pretty text-paper/55">{product.description}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/contact" variant="primary" size="lg">
                  Enquire about {product.shortTitle.toLowerCase()}
                  <ArrowUpRight className="h-5 w-5" />
                </LinkButton>
                <a
                  href="tel:03334432645"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-paper backdrop-blur transition hover:border-mint hover:text-mint"
                >
                  <Phone className="h-5 w-5" /> 0333 443 2645
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#eef1f2] ring-1 ring-white/10 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.65)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-mint/25 blur-3xl"
                />
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-contain p-10 sm:p-14"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPEC STRIP — features as a divided row */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-ink/5 lg:grid-cols-4">
            {product.features.map((f) => (
              <div key={f} className="bg-paper px-5 py-7 sm:px-7 sm:py-8">
                <Check className="h-5 w-5 text-mint-deep" strokeWidth={2.5} />
                <p className="mt-3 text-sm font-medium text-ink">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RICH SECTIONS — full content cross-referenced to a2bpayments.co.uk */}
      {product.sections.map((section, i) => (
        <SectionBlock key={i} section={section} alt={i % 2 === 1} />
      ))}

      {/* CTA BAND */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-paper/65">
                Send us your last statement and we'll come back with a like-for-like quote within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" variant="primary" size="lg">
                Get a quote
                <ArrowUpRight className="h-5 w-5" />
              </LinkButton>
              <a
                href="tel:03334432645"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-paper backdrop-blur transition hover:border-mint hover:text-mint"
              >
                <Phone className="h-5 w-5" /> 0333 443 2645
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-paper-soft">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {isFinance ? 'More ways to get funded' : 'More ways to take payments'}
            </h2>
            <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group contents">
                  <GlassCard surface="light" interactive className="flex flex-col overflow-hidden p-0">
                    <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-b from-white to-[#f4f6f7]">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted">{p.tagline}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
                        Learn more
                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function SectionHeader({ eyebrow, heading }: { eyebrow?: string; heading: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint-deep">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{heading}</h2>
    </div>
  )
}

function SectionBlock({ section, alt }: { section: ProductSection; alt: boolean }) {
  const bg = alt ? 'bg-paper-soft' : 'bg-paper'

  if (section.kind === 'prose') {
    return (
      <section className={bg}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
          <p className="mt-6 max-w-3xl text-pretty text-lg text-ink-muted">{section.body}</p>
        </div>
      </section>
    )
  }

  if (section.kind === 'cards') {
    return (
      <section className={bg}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-paper p-7 ring-1 ring-ink/8 shadow-[0_18px_40px_-30px_rgba(15,23,30,0.4)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-mint/15 text-mint-deep">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (section.kind === 'list') {
    return (
      <section className={bg}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
          <ul className="mt-8 grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-center gap-4 border-t border-ink/10 py-4">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (section.kind === 'stats') {
    return (
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          {section.eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mint/80">{section.eyebrow}</p>
          )}
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{section.heading}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {section.items.map((item) => (
              <div key={item.value} className="border-t border-white/15 pt-6">
                <p className="font-display text-5xl font-semibold tracking-tight text-mint">{item.value}</p>
                <p className="mt-3 text-pretty text-paper/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // faq
  return (
    <section className={bg}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
        <div className="mt-8 max-w-3xl divide-y divide-ink/10 border-t border-ink/10">
          {section.items.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{item.q}</h3>
              <p className="mt-2 text-pretty text-ink-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
