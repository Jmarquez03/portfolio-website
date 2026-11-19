import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { profile, roles } from '../data'
import PointCloudLab from '../components/PointCloudLab'
import DiffLab from '../components/DiffLab'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const index = roles.findIndex((r) => r.slug === slug)
  const role = roles[index]

  useEffect(() => {
    if (role) document.title = `${role.company}, ${role.title} | ${profile.name}`
    return () => {
      document.title = `${profile.name} | Software Engineer`
    }
  }, [role])

  if (!role) return <NotFound />
  const next = roles[(index + 1) % roles.length]

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <div className="wrap">
        <Link to="/#work" className="link-draw label inline-flex min-h-11 items-center hover:text-ink">
          ← All experience
        </Link>

        <header className="mt-8 grid gap-10 border-b border-line pb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label num enter enter-1">
              {role.dates} · {role.place}
            </p>
            <h1 className="enter enter-2 mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-7xl">{role.company}</h1>
            <p className="enter enter-3 mt-3 text-xl text-muted">{role.title}</p>
            <p className="enter enter-4 mt-8 max-w-2xl text-lg leading-relaxed text-ink/85">{role.summary}</p>
          </div>
          <div className="enter enter-4 lg:col-span-4 lg:self-end lg:text-right">
            <p className="num text-6xl font-semibold tracking-[-0.04em] text-accent md:text-7xl">{role.metric.value}</p>
            <p className="mt-2 text-muted">{role.metric.label}</p>
          </div>
        </header>

        {role.lab === 'diff' && (
          <section className="border-b border-line py-14" aria-labelledby="lab-title">
            <h2 id="lab-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Try it: let a 4-way diff isolate a regression
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              A simplified simulation of the idea behind the engine. A recorded session is replayed on a new build, and runtime
              and UI state are captured from both runs. Where the four states disagree tells you what kind of bug it is. Turn
              the mutex off to see the race it prevents. No Oracle code or data is used here.
            </p>
            <div className="mt-8">
              <DiffLab />
            </div>
          </section>
        )}

        {role.lab === 'pointcloud' && (
          <section className="border-b border-line py-14" aria-labelledby="lab-title">
            <h2 id="lab-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Try it: filter and cluster a scan
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              A simplified, synthetic version of the kind of processing I built: remove the noise, then let clustering find the
              objects. No Apple data is used here.
            </p>
            <div className="mt-8">
              <PointCloudLab />
            </div>
          </section>
        )}

        <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-12" aria-labelledby="impact-title">
          <div className="lg:col-span-4">
            <h2 id="impact-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              What I delivered
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {role.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <ul className="space-y-5 lg:col-span-8">
            {role.bullets.map((b) => (
              <li key={b} className="flex gap-4 text-lg leading-relaxed text-ink/85">
                <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {role.story?.map((s) => (
          <section key={s.heading} className="grid gap-10 border-b border-line py-14 lg:grid-cols-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:col-span-4">{s.heading}</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-8">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {role.image && (
          <div className="mt-14 overflow-hidden rounded-2xl border border-line">
            <img src={role.image} alt={`Jorge Marquez at ${role.company}`} width={1600} height={900} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
          </div>
        )}

        <Link to={`/work/${next.slug}`} className="card group mt-14 flex items-center justify-between gap-6 p-6 md:p-8">
          <div>
            <p className="label">Next role</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {next.company} <span className="text-muted">· {next.title}</span>
            </p>
          </div>
          <span className="text-3xl text-accent transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  )
}
