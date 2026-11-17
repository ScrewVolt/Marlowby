// NOT FOUND PAGE: shown for any address that does not exist (for example /zzz),
// and by CityDetail when a city slug does not match.

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-wrap py-16">
      <title>Page not found | Marlowby</title>
      <meta name="robots" content="noindex" />
      <h1 className="text-4xl">That page is not in this box.</h1>
      <p className="mt-3 text-muted">The link may be old, or the city may have been renamed.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn btn-primary">Go home</Link>
        <Link to="/cities" className="btn btn-secondary">Browse cities</Link>
      </div>
    </div>
  )
}
