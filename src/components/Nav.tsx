import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="flex min-h-11 items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-accent font-mono text-xs font-medium text-bg">JM</span>
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost !min-h-9 !px-4 text-sm">
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-ink transition-transform ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition-transform ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] bg-bg md:hidden">
          <ul className="wrap flex flex-col gap-1 pt-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="flex min-h-14 items-center border-b border-line text-2xl font-medium">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                Download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
