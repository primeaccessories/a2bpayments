import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star, X } from 'lucide-react'
import { TESTIMONIALS, type Testimonial } from '../lib/testimonials'

interface Props {
  limit?: number
}

export default function TestimonialGrid({ limit }: Props) {
  const items = typeof limit === 'number' ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS
  const [active, setActive] = useState<Testimonial | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map((t) => (
          <TestimonialCard key={t.slug} t={t} onOpen={() => setActive(t)} />
        ))}
      </div>

      <AnimatePresence>
        {active && <TestimonialModal t={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}

function TestimonialCard({ t, onOpen }: { t: Testimonial; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-3xl border border-ink/5 bg-paper p-6 text-left transition hover:-translate-y-0.5 hover:border-mint/40 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)] sm:p-7"
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-paper-soft ring-1 ring-ink/5">
          <img
            src={t.logo}
            alt={`${t.business} logo`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-semibold tracking-tight text-ink">{t.business}</p>
          <p className="truncate text-xs text-ink-fade">{t.name}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-0.5 text-mint-deep">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
        ))}
      </div>

      <p className="mt-3 line-clamp-4 flex-1 text-sm text-ink-muted">
        “{t.shortQuote}”
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep transition group-hover:text-ink">
        Read full story
        <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
      </span>
    </button>
  )
}

function TestimonialModal({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/60 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-paper shadow-[0_40px_100px_-30px_rgba(15,23,42,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition hover:bg-ink hover:text-paper"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-5 border-b border-ink/5 bg-paper-soft px-7 py-6 sm:px-9">
          <span className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10">
            <img src={t.logo} alt={`${t.business} logo`} className="h-full w-full object-cover" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {t.business}
            </p>
            <p className="text-sm text-ink-muted">
              {t.name} <span className="text-ink-fade">— {t.role}</span>
            </p>
            <div className="mt-2 flex items-center gap-0.5 text-mint-deep">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-7 py-7 sm:px-9 sm:py-9">
          <Quote className="h-7 w-7 text-mint-deep" />
          <p className="mt-4 whitespace-pre-line text-pretty text-base leading-relaxed text-ink sm:text-lg">
            {t.quote}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
