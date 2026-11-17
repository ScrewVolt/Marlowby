// CITIES PAGE (address: /cities)
// Shows every city as a card. The region buttons filter the list.
// Reads data from: data/cities.js

import { useState } from 'react'
import { Link } from 'react-router-dom'
import CityPhoto from '../components/CityPhoto'
import { cities, regions } from '../data/cities'

export default function Cities() {
  // "state" is memory for a component. When setRegion runs, the page redraws.
  const [region, setRegion] = useState('All')

  // If "All" is picked, show every city. Otherwise keep only cities in that region.
  const shownCities = region === 'All' ? cities : cities.filter((city) => city.region === region)

  // The buttons: "All" first, then the four regions from the data file.
  const buttons = ['All', ...regions]

  return (
    <div className="page-wrap py-12">
      <title>Cities | Marlowby</title>
      <meta name="description" content="Browse the U.S. cities featured in Marlowby boxes and see the local businesses inside each one." />

      <h1 className="text-4xl">Explore the cities</h1>
      <p className="mt-2 text-muted">A new U.S. city every month. Pick one to see what is inside its box.</p>

      {/* REGION BUTTONS: the picked one is dark. aria-pressed tells screen readers which is picked. */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by region">
        {buttons.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={region === name}
            onClick={() => setRegion(name)}
            className={`h-10 rounded-md border px-4 text-sm font-medium ${
              region === name ? 'border-ink bg-ink text-white' : 'border-[#8a8068] bg-white text-ink hover:bg-sand'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* aria-live makes screen readers announce the count when it changes */}
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {shownCities.length} {shownCities.length === 1 ? 'city' : 'cities'}
      </p>

      {/* THE CARDS */}
      {shownCities.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shownCities.map((city) => (
            <li key={city.slug} className="card overflow-hidden">
              <CityPhoto city={city} className="aspect-[2/1] w-full" />
              <div className="p-4">
                <h2 className="text-xl">{city.name}, {city.state}</h2>
                <p className="text-sm text-muted">{city.region} · {city.month} box</p>
                <p className="mt-2 text-sm">{city.blurb}</p>
                <Link to={`/cities/${city.slug}`} className="mt-3 inline-block text-sm font-semibold">
                  See the box<span className="sr-only"> for {city.name}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">No cities in this region yet.</p>
      )}
    </div>
  )
}
