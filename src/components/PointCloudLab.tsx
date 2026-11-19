import { Component, lazy, Suspense, useMemo, useState, type ReactNode } from 'react'
import type { Stage } from './PointCloud'

const PointCloud = lazy(() => import('./PointCloud'))

class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <p className="absolute inset-0 grid place-items-center p-6 text-center text-muted">
        This demo needs WebGL, which your browser has turned off.
      </p>
    ) : (
      this.props.children
    )
  }
}

const STAGES: { id: Stage; label: string; note: string }[] = [
  { id: 0, label: 'Raw scan', note: 'Objects buried in sensor noise.' },
  { id: 1, label: 'Noise removed', note: 'Isolated points with too few neighbours are dropped.' },
  { id: 2, label: 'Clustered', note: 'Density-based clustering separates each object.' },
]

/** Interactive version of the hero scan for the Apple case study */
export default function PointCloudLab() {
  const [stage, setStage] = useState<Stage>(0)
  // matches buildScan(): 5,300 object points + 3,200 noise points at full scale
  const counts = useMemo(() => {
    const s = window.innerWidth < 768 ? 0.55 : 1
    const filtered = [1400, 1200, 1100, 1600].reduce((a, n) => a + Math.round(n * s), 0)
    return { raw: filtered + Math.round(3200 * s), filtered }
  }, [])
  const visible = stage === 0 ? counts.raw : counts.filtered

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[4/3] cursor-grab bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,107,26,0.08),transparent_70%)] active:cursor-grabbing sm:aspect-[16/9]">
        <GLBoundary>
          <Suspense fallback={null}>
            <PointCloud mode="lab" stage={stage} />
          </Suspense>
        </GLBoundary>
        <div className="material pointer-events-none absolute left-4 top-4 rounded-md border border-line bg-bg/70 px-3 py-2 font-mono text-xs backdrop-blur">
          <span className="text-muted">points </span>
          <span className="num text-ink">{visible.toLocaleString()}</span>
          {stage > 0 && <span className="text-accent"> −{Math.round((1 - counts.filtered / counts.raw) * 100)}%</span>}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div role="group" aria-label="Processing stage" className="flex rounded-full border border-line p-1">
          {STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={stage === s.id}
              onClick={() => setStage(s.id)}
              className={`min-h-10 flex-1 rounded-full px-3 text-sm transition-[color,background-color,transform] duration-150 active:scale-[0.97] sm:flex-none sm:px-4 ${
                stage === s.id ? 'bg-accent text-bg' : 'text-muted hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {STAGES[stage].note} Drag to orbit.
        </p>
      </div>
    </div>
  )
}
