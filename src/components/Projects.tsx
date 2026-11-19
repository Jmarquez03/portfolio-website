import { profile, projects, type Project } from '../data'

function Card({ p, feature }: { p: Project; feature?: boolean }) {
  const Tag = p.href ? 'a' : 'div'
  return (
    <Tag
      {...(p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {})}
      className="card group flex h-full flex-col overflow-hidden"
    >
      {feature && p.image && (
        <div className="photo-frame relative aspect-[16/10] bg-surface-2">
          <img src={p.image} alt={p.name} width={1400} height={875} loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
            style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-6 ${feature ? 'md:p-8' : ''}`}>
        <p className="label num">
          {p.kind}
          {p.dates ? ` · ${p.dates}` : ''}
        </p>
        <h3 className={`mt-3 font-semibold tracking-tight ${feature ? 'text-2xl' : 'text-xl'}`}>{p.name}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{p.blurb}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {p.href && (
            <span className="ml-auto pl-2 text-sm whitespace-nowrap text-ink transition-colors group-hover:text-accent">
              View code <span aria-hidden>↗</span>
            </span>
          )}
        </div>
      </div>
    </Tag>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.image)
  const rest = projects.filter((p) => !p.image)
  return (
    <section id="projects" className="border-t border-line py-24 md:py-32" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Projects</p>
            <h2 id="projects-title" className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
              Robots, apps and tools I've built
            </h2>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-draw self-start text-muted hover:text-ink md:self-auto">
            All repositories on GitHub ↗
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <Card key={p.name} p={p} feature />
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            // an odd card out spans the full row instead of leaving a gap
            <div key={p.name} className={i === rest.length - 1 && rest.length % 2 ? 'md:col-span-2' : undefined}>
              <Card p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
