// THE SEARCH BOX in the header.
// As you type, it shows matching cities and items in a dropdown.
// It uses Fuse.js, a small library that finds "close enough" matches (typos are OK).

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import { cities, typeLabels } from '../data/cities'

// STEP 1: build one flat list of everything a visitor could search for.
// This runs once, when the file loads: one entry per city, plus one per item.
const searchList = []
for (const city of cities) {
  searchList.push({
    title: `${city.name}, ${city.state}`,
    kind: 'City',
    detail: `${city.month} box`,
    link: `/cities/${city.slug}`,
    text: `${city.name} ${city.state} ${city.region} ${city.month} ${city.blurb}`,
  })
  for (const item of city.items) {
    searchList.push({
      title: item.name,
      kind: typeLabels[item.type],
      detail: `${city.name}, ${city.state}`,
      link: `/cities/${city.slug}`,
      text: `${item.name} ${item.description}`,
    })
  }
}

// STEP 2: give the list to Fuse and tell it which fields to search.
// A title match counts double (weight 2).
const fuse = new Fuse(searchList, {
  keys: [{ name: 'title', weight: 2 }, 'text'],
  threshold: 0.32, // lower = stricter matching
  ignoreLocation: true,
})

export default function SearchBox({ className = '' }) {
  const [query, setQuery] = useState('') // what the visitor has typed

  // Only search once they have typed at least 2 letters. Show at most 6 results.
  const searching = query.trim().length >= 2
  const results = searching ? fuse.search(query.trim()).slice(0, 6).map((r) => r.item) : []

  return (
    <div
      className={`relative ${className}`}
      role="search"
      onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
    >
      <label htmlFor="search-input" className="sr-only">
        Search cities, boxes and partners
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search cities, boxes, partners"
        autoComplete="off"
        className="h-10 w-full rounded-md border border-[#8a8068] bg-paper px-3 text-sm"
      />

      {/* The dropdown only appears while searching */}
      {searching && (
        <div className="absolute left-0 right-0 top-11 z-20 rounded-md border border-line bg-white p-1 shadow-sm">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.title + result.detail}>
                  <Link
                    to={result.link}
                    onClick={() => setQuery('')}
                    className="block rounded px-3 py-2 text-sm text-ink no-underline hover:bg-teal-tint"
                  >
                    <span className="block font-semibold">{result.title}</span>
                    <span className="block text-xs text-muted">
                      {result.kind} · {result.detail}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-sm text-muted">No matches for "{query.trim()}".</p>
          )}
        </div>
      )}

      {/* Screen readers announce how many results there are */}
      <p className="sr-only" aria-live="polite">
        {searching ? `${results.length} results` : ''}
      </p>
    </div>
  )
}
