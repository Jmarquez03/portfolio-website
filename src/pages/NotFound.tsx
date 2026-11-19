import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="label">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-[-0.035em]">This page isn't here.</h1>
      <Link to="/" className="btn btn-primary mt-8">
        Back to the homepage
      </Link>
    </section>
  )
}
