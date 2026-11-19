import { useEffect, useRef, useState } from 'react'

/**
 * A simplified, synthetic simulation of a 4-way differential engine in a
 * record-and-replay harness. It compares four states for every tracked value:
 * recorded runtime, recorded UI, replayed runtime and replayed UI, and uses the
 * pattern of disagreement to say what kind of regression it is.
 * No Oracle code or data is used.
 */

type Value = string | number | boolean
type Key = { id: string; rec: Value; fmt: (v: Value) => string; action: string }

const money = (v: Value) => `$${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

const KEYS: Key[] = [
  { id: 'invoice.status', rec: 'Approved', fmt: String, action: 'click Approve' },
  { id: 'invoice.total', rec: 1284.5, fmt: money, action: 'apply discount' },
  { id: 'grid.rowCount', rec: 12, fmt: (v) => `${v} rows`, action: 'load line items' },
  { id: 'btnSubmit.IsEnabled', rec: true, fmt: (v) => (v ? 'Enabled' : 'Disabled'), action: 'validate form' },
  { id: 'queue.pending', rec: 3, fmt: (v) => `${v} pending`, action: 'refresh queue' },
  { id: 'user.role', rec: 'Reviewer', fmt: String, action: 'switch role' },
]

type Scenario = 'clean' | 'logic' | 'ui' | 'drift'
const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'clean', label: 'Clean build' },
  { id: 'logic', label: 'Logic bug' },
  { id: 'ui', label: 'UI bug' },
  { id: 'drift', label: 'Broken binding' },
]

type Snap = { rt: Value; ui: string }
type Verdict = { kind: 'match' | 'logic' | 'ui' | 'drift' | 'race'; label: string; why: string }

function replay(scenario: Scenario, mutex: boolean) {
  const snaps: Record<string, Snap> = {}
  for (const k of KEYS) snaps[k.id] = { rt: k.rec, ui: k.fmt(k.rec) }
  if (scenario === 'logic') snaps['invoice.total'] = { rt: 1248.5, ui: money(1248.5) }
  if (scenario === 'ui') snaps['btnSubmit.IsEnabled'] = { rt: true, ui: 'Disabled' }
  if (scenario === 'drift') snaps['queue.pending'] = { rt: 2, ui: '3 pending' }
  // without the mutex the UI thread can be read halfway through an update
  let raced: string | null = null
  if (!mutex) {
    raced = Math.random() < 0.5 ? 'grid.rowCount' : 'invoice.status'
    snaps[raced] = raced === 'grid.rowCount' ? { rt: 12, ui: '11 rows' } : { rt: 'Approved', ui: 'Pending' }
  }
  return { snaps, raced }
}

function classify(k: Key, p: Snap, mutex: boolean): Verdict {
  const recUi = k.fmt(k.rec)
  const rtChanged = p.rt !== k.rec
  const uiChanged = p.ui !== recUi
  if (!rtChanged && !uiChanged) return { kind: 'match', label: 'Match', why: 'All four states agree.' }
  if (rtChanged && uiChanged && k.fmt(p.rt) === p.ui)
    return { kind: 'logic', label: 'Logic regression', why: 'Runtime and UI both changed together, so the bug is in the logic, not the view.' }
  if (rtChanged && !uiChanged)
    return { kind: 'drift', label: 'Broken binding', why: 'Runtime state changed but the UI never updated, so the data binding is broken.' }
  if (!mutex)
    return { kind: 'race', label: 'Race condition', why: 'Runtime matches, but the UI was read mid-update by another thread. Turn the mutex back on.' }
  return { kind: 'ui', label: 'UI regression', why: 'Runtime state is correct but the UI shows something else, so the bug is in rendering.' }
}

type Phase = 'idle' | 'running' | 'diffing' | 'done'

export default function DiffLab() {
  const [scenario, setScenario] = useState<Scenario>('logic')
  const [mutex, setMutex] = useState(true)
  const [phase, setPhase] = useState<Phase>('idle')
  const [revealed, setRevealed] = useState(0)
  const [result, setResult] = useState<ReturnType<typeof replay> | null>(null)
  const [log, setLog] = useState<string[]>([])
  const timers = useRef<number[]>([])
  const logBox = useRef<HTMLDivElement>(null)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clear, [])
  useEffect(() => {
    logBox.current?.scrollTo({ top: logBox.current.scrollHeight })
  }, [log])

  // changing the inputs invalidates the last run
  const reset = () => {
    clear()
    setPhase('idle')
    setRevealed(0)
    setResult(null)
    setLog([])
  }

  const run = () => {
    clear()
    const r = replay(scenario, mutex)
    setResult(r)
    setRevealed(0)
    setPhase('running')
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines: string[][] = KEYS.map((k, i) => {
      const s = r.snaps[k.id]
      const out = [`[T1] replay step ${i + 1}: ${k.action}`]
      if (mutex) out.push('[T2] WaitOne(Global\\RecNPlay.Capture)')
      out.push(`[T2] runtime  ${k.id} = ${String(s.rt)}`)
      out.push(
        !mutex && r.raced === k.id
          ? `[T3] ui       ${k.id} = "${s.ui}"  ! read while T1 writing`
          : `[T3] ui       ${k.id} = "${s.ui}"`,
      )
      if (mutex) out.push('[T2] ReleaseMutex()')
      return out
    })

    if (instant) {
      setRevealed(KEYS.length)
      setLog([...lines.flat(), '[T0] 4-way diff complete'])
      setPhase('done')
      return
    }
    setLog(['[T0] replaying recorded session…'])
    KEYS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setRevealed(i + 1)
          setLog((l) => [...l, ...lines[i]])
        }, 260 * (i + 1)),
      )
    })
    const end = 260 * (KEYS.length + 1)
    timers.current.push(
      window.setTimeout(() => {
        setPhase('diffing')
        setLog((l) => [...l, '[T0] diffing 4 states × 6 keys…'])
      }, end),
    )
    timers.current.push(
      window.setTimeout(() => {
        setPhase('done')
        setLog((l) => [...l, '[T0] 4-way diff complete'])
      }, end + 500),
    )
  }

  const verdicts = result && phase === 'done' ? KEYS.map((k) => classify(k, result.snaps[k.id], mutex)) : null
  const issues = verdicts ? KEYS.map((k, i) => ({ k, v: verdicts[i] })).filter((x) => x.v.kind !== 'match') : []

  const summary =
    phase === 'idle'
      ? 'Pick a build, then run the replay against the recorded session.'
      : phase !== 'done'
        ? 'Replaying and capturing runtime and UI state…'
        : issues.length === 0
          ? `No regressions: all four states agree on ${KEYS.length} keys.`
          : issues.map(({ k, v }) => `${v.label} in ${k.id}. ${v.why}`).join(' ')

  return (
    <div className="card overflow-hidden">
      {/* controls */}
      <div className="flex flex-col gap-4 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Build to replay" className="flex flex-wrap gap-1 rounded-2xl border border-line p-1 sm:rounded-full">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scenario === s.id}
              onClick={() => {
                setScenario(s.id)
                reset()
              }}
              className={`min-h-10 flex-1 rounded-full px-3 text-sm whitespace-nowrap transition-[color,background-color,transform] duration-150 active:scale-[0.97] sm:flex-none sm:px-4 ${
                scenario === s.id ? 'bg-accent text-bg' : 'text-muted hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <button
            type="button"
            role="switch"
            aria-checked={mutex}
            onClick={() => {
              setMutex((m) => !m)
              reset()
            }}
            className="group flex min-h-11 items-center gap-3 text-sm text-muted hover:text-ink"
          >
            <span className={`relative block h-6 w-10 shrink-0 rounded-full border transition-colors ${mutex ? 'border-accent bg-accent/20' : 'border-line-strong bg-surface-2'}`}>
              <span
                className={`absolute left-0 top-[2px] size-[18px] rounded-full transition-transform duration-200 ${mutex ? 'translate-x-[18px] bg-accent' : 'translate-x-[2px] bg-muted'}`}
              />
            </span>
            OS mutex {mutex ? 'on' : 'off'}
          </button>
          <button type="button" onClick={run} disabled={phase === 'running' || phase === 'diffing'} className="btn btn-primary disabled:opacity-60">
            {phase === 'running' || phase === 'diffing' ? 'Replaying…' : 'Run replay'}
          </button>
        </div>
      </div>

      {/* state grid */}
      <div className="p-4 sm:p-5">
        <div className="hidden grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1.1fr] gap-3 px-3 pb-3 md:grid">
          {['Key', 'Recorded runtime', 'Recorded UI', 'Replay runtime', 'Replay UI', 'Verdict'].map((h) => (
            <span key={h} className="label">
              {h}
            </span>
          ))}
        </div>
        <ul className="space-y-2">
          {KEYS.map((k, i) => {
            const shown = result && i < revealed ? result.snaps[k.id] : null
            const v = verdicts?.[i]
            const bad = v && v.kind !== 'match'
            const rtBad = bad && shown && shown.rt !== k.rec
            const uiBad = bad && shown && shown.ui !== k.fmt(k.rec)
            const cell = (label: string, value: string, flag?: boolean | null, pending?: boolean) => (
              <div className="min-w-0">
                <span className="label !text-[0.625rem] md:hidden">{label}</span>
                <p
                  className={`num break-words rounded-md px-2 py-1 font-mono text-[0.8125rem] transition-colors duration-300 ${
                    flag ? 'bg-accent/15 text-accent' : pending ? 'text-muted/50' : 'text-ink/90'
                  }`}
                >
                  {value}
                </p>
              </div>
            )
            return (
              <li
                key={k.id}
                className={`grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl border p-3 transition-colors duration-300 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1.1fr] md:items-center ${
                  bad ? 'border-accent/50 bg-accent/[0.04]' : 'border-line'
                }`}
              >
                <p className="col-span-2 truncate font-mono text-sm text-ink md:col-span-1">{k.id}</p>
                {cell('Recorded runtime', String(k.rec))}
                {cell('Recorded UI', `"${k.fmt(k.rec)}"`)}
                {cell('Replay runtime', shown ? String(shown.rt) : '…', rtBad, !shown)}
                {cell('Replay UI', shown ? `"${shown.ui}"` : '…', uiBad, !shown)}
                <p className={`col-span-2 text-sm md:col-span-1 ${bad ? 'font-medium text-accent' : 'text-muted'}`}>
                  {v ? (bad ? v.label : '✓ Match') : phase === 'diffing' && shown ? 'Diffing…' : '—'}
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      {/* thread log + verdict */}
      <div className="grid border-t border-line lg:grid-cols-[1.2fr_1fr]">
        <div
          ref={logBox}
          aria-hidden
          className="h-44 overflow-y-auto border-b border-line bg-bg/60 p-4 font-mono text-xs leading-relaxed text-muted lg:border-r lg:border-b-0"
        >
          {log.length === 0 ? <p>Thread log appears here.</p> : log.map((l, i) => <p key={i} className={l.includes('!') ? 'text-accent' : undefined}>{l}</p>)}
        </div>
        <div className="p-4 sm:p-5">
          <p className="label">Verdict</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/90" aria-live="polite">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}
