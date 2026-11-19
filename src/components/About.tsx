import { activities, skills } from '../data'

export default function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32" aria-labelledby="about-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <img
              src="/images/apple.jpg"
              alt="Jorge Marquez standing beside an Apple campus sign in Sunnyvale"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="label">About</p>
          <h2 id="about-title" className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            From robotics club to production systems
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I got into engineering through robots: sensors, control loops and three runs at the IEEE Region 5 robotics
              competition. Following a problem all the way down to the hardware stuck with me, from sensor pipelines at Apple to
              C++ snapshot validation at Oracle.
            </p>
            <p>
              At UTRGV I served as IEEE student branch president from 2022 to 2026, teaching workshops on full-stack development,
              Git and algorithms. Active membership grew <span className="font-medium text-ink">500%</span> over that time.
            </p>
          </div>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="label">{group}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
            <div>
              <dt className="label">Competitions</dt>
              <dd className="mt-3">
                <ul className="space-y-1.5 text-sm text-ink/85">
                  {activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
