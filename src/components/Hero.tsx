import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { profile } from '../data'
import Rover from './Rover'
import Drone from './Drone'

const PointCloud = lazy(() => import('./PointCloud'))

const DESKTOP = '(min-width: 1024px)'

/** Only desktop loads the three.js scan; smaller screens get the rover */
function useDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

/** If WebGL is unavailable the hero keeps its still glow instead of breaking */
class GLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const desktop = useDesktop()

  return (
    <section ref={section} className="relative isolate flex min-h-[calc(100svh-16px)] flex-col overflow-hidden lg:min-h-svh" aria-labelledby="hero-title">
      {/* still fallback / backdrop glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            desktop
              ? 'radial-gradient(60% 55% at 72% 45%, rgba(255,107,26,0.12), transparent 70%), radial-gradient(40% 40% at 20% 90%, rgba(255,107,26,0.05), transparent 70%)'
              : 'radial-gradient(90% 45% at 80% 0%, rgba(255,107,26,0.10), transparent 70%), radial-gradient(70% 30% at 50% 100%, rgba(255,107,26,0.10), transparent 70%)',
        }}
      />
      {!desktop && <Drone />}
      {desktop && (
        <div className="absolute inset-0 -z-10">
          <GLBoundary>
            <Suspense fallback={null}>
              <PointCloud mode="hero" eventSource={section} />
            </Suspense>
          </GLBoundary>
        </div>
      )}

      <div className="wrap pointer-events-none flex flex-1 flex-col justify-center pb-10 pt-28 lg:pb-20">
        <div className="max-w-[40rem]">
          <p className="label enter enter-1 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to software engineering roles · {profile.location}
          </p>
          <h1 id="hero-title" className="enter enter-2 mt-5 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            Software engineer for distributed systems and real-time data.
          </h1>
          <p className="enter enter-3 mt-6 max-w-[34rem] text-lg leading-relaxed text-muted text-pretty">
            I'm Jorge Marquez. I've built event pipelines at Oracle, point-cloud tooling at Apple and SSO at InvoiceCloud, and I lead
            robotics software on the side. BS in Computer Science, UTRGV, 2026.
          </p>
          <div className="enter enter-4 pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="btn btn-primary">
              See my work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Download resume
            </a>
          </div>
        </div>
      </div>

      {!desktop && (
        <div className="wrap">
          <Rover />
        </div>
      )}

      <div className="wrap pointer-events-none hidden pb-8 lg:block">
        <p className="label text-right">Point-cloud scan: raw → filtered → clustered. Move your cursor through it.</p>
      </div>
    </section>
  )
}
