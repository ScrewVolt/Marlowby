// THE BOTTOM OF EVERY PAGE: name, tagline and links.

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="page-wrap flex flex-col gap-6 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold">Marlowby</p>
          <p className="mt-1 text-sm text-[#d9d2c3]">Explore your city, one box at a time.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link className="text-white" to="/cities">Cities</Link>
          <Link className="text-white" to="/plans">Plans</Link>
          <Link className="text-white" to="/about">About</Link>
          <Link className="text-white" to="/about#partner">Become a partner</Link>
          <Link className="text-white" to="/accessibility">Accessibility</Link>
        </nav>
      </div>
    </footer>
  )
}
