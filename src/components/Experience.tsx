import { Link } from 'react-router-dom'
import { roles } from '../data'

export default function Experience() {
  return (
    <section id="work" className="border-t border-line py-24 md:py-32" aria-labelledby="work-title">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Experience</p>
            <h2 id="work-title" className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
              Where I've shipped
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Four roles across backend infrastructure, sensor data and enterprise identity. Open any role for the full story.
          </p>
        </div>

        <ol className="mt-14 border-t border-line">
          {roles.map((r) => (
            <li key={r.slug} className="border-b border-line">
              <Link
                to={`/work/${r.slug}`}
                className="group grid gap-x-8 gap-y-4 py-8 transition-colors md:grid-cols-12 md:items-center md:py-10"
              >
                <div className="md:col-span-4">
                  <p className="font-mono text-xs text-muted">{r.dates}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    {r.company}
                    <span className="ml-2 inline-block text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden>
                      →
                    </span>
                  </h3>
                  <p className="mt-1 text-muted">{r.title}</p>
                </div>
                <p className="leading-relaxed text-ink/85 md:col-span-5">{r.summary}</p>
                <div className="md:col-span-3 md:text-right">
                  <p className="text-4xl font-semibold tracking-[-0.03em] text-accent">{r.metric.value}</p>
                  <p className="mt-1 text-sm text-muted">{r.metric.label}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
