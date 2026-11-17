// THE FRAME AROUND EVERY PAGE: skip link + Header + the current page + Footer.
// <Outlet /> is the spot where React Router puts the page that matches the address.

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Every time the page changes, scroll to the top.
  // If the address has a #section (like /about#partner), scroll to that section instead.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      {/* Hidden until a keyboard user presses Tab. Lets them jump past the menu. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex="-1" className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
