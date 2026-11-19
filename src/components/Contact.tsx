import { profile } from '../data'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: 'jorge-marquez-jm2025', href: profile.linkedin },
  { label: 'GitHub', value: 'Jmarquez03', href: profile.github },
  { label: 'Resume', value: 'PDF, 1 page', href: profile.resume },
]

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-24 md:py-32" aria-labelledby="contact-title">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(255,107,26,0.10), transparent 70%)' }}
      />
      <div className="wrap">
        <p className="label">Contact</p>
        <h2 id="contact-title" className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-balance md:text-7xl">
          Hiring for backend, systems or robotics? Let's talk.
        </h2>
        <a href={`mailto:${profile.email}`} className="btn btn-primary mt-10">
          Email me
        </a>

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          {channels.map((c) => (
            <li key={c.label} className="border-b border-line sm:odd:border-r lg:border-r lg:last:border-r-0">
              <a
                href={c.href}
                {...(c.href.startsWith('http') || c.href.endsWith('.pdf') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex min-h-24 flex-col justify-center gap-1 py-6 sm:px-6 lg:first:pl-0"
              >
                <span className="label">{c.label}</span>
                <span className="truncate text-ink transition-colors group-hover:text-accent">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
