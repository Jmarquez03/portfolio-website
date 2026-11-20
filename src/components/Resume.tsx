import { createContext, useCallback, useContext, useRef, type ReactNode } from 'react'
import { resumes } from '../data'

const ResumeContext = createContext<() => void>(() => {})

/** Opens the "which resume?" dialog from anywhere on the site */
export const useResumeChooser = () => useContext(ResumeContext)

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2.5v8m0 0L4.75 7.25M8 10.5l3.25-3.25M3 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = useCallback(() => ref.current?.showModal(), [])
  const close = () => ref.current?.close()

  return (
    <ResumeContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="resume-title"
        className="resume-dialog material m-auto w-[min(32rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-surface p-0 text-ink"
        // a click on the backdrop lands on the dialog element itself
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label">Resume</p>
              <h2 id="resume-title" tabIndex={-1} autoFocus className="mt-2 text-2xl font-semibold tracking-tight text-balance outline-none">
                Which resume would you like?
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="mt-6 grid gap-3">
            {resumes.map((r) => (
              <li key={r.id}>
                <a
                  href={r.href}
                  download={r.filename}
                  onClick={close}
                  className="card group flex items-center gap-4 p-5 hover:border-accent/60 focus-visible:border-accent"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold tracking-tight">{r.title}</span>
                    <span className="mt-1 block text-sm text-muted">{r.blurb}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <DownloadIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </ResumeContext.Provider>
  )
}
