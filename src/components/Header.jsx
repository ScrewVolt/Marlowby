// THE TOP BAR: logo, menu links, search box, and the Sign in / My account button.
// On phones the links hide behind a Menu button.

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBox from './SearchBox'
import { getUser } from '../auth'

// The style for a menu link. NavLink tells us isActive when it points to the current page.
function linkClass({ isActive }) {
  const base = 'border-b-2 pb-1 text-sm font-medium no-underline text-ink '
  return base + (isActive ? 'border-clay' : 'border-transparent hover:border-line')
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false) // is the phone menu open?
  const { pathname } = useLocation()
  const user = getUser() // null if nobody is logged in

  // Close the phone menu whenever the page changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-line bg-white">
      <div className="page-wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-3">
        <Link to="/" className="flex items-center gap-2 no-underline" aria-label="Marlowby home">
          <img src="/logo.png" alt="" width="32" height="32" className="rounded-md" />
          <span className="font-display text-2xl font-bold text-clay">Marlowby</span>
        </Link>

        {/* Menu button: only visible on small screens (md:hidden) */}
        <button
          type="button"
          className="btn btn-secondary ml-auto h-10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        {/* On small screens this is hidden unless menuOpen. On wide screens it always shows. */}
        <div
          id="site-menu"
          className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-4 md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:gap-8`}
        >
          <nav aria-label="Main" className="flex gap-6">
            <NavLink to="/cities" className={linkClass}>Cities</NavLink>
            <NavLink to="/plans" className={linkClass}>Plans</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
          </nav>
          <SearchBox className="md:ml-auto md:w-64" />
          <Link to={user ? '/welcome' : '/signup'} className="btn btn-primary h-10">
            {user ? 'My account' : 'Sign in'}
          </Link>
        </div>
      </div>
    </header>
  )
}
