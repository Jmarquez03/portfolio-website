import { profile } from '../data'

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap flex flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} <span translate="no">{profile.name}</span> · {profile.location}
        </p>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group inline-flex min-h-11 items-center transition-colors hover:text-ink"
              >
                <span className="link-draw">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
