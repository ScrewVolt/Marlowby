// CITY DETAIL PAGE (address: /cities/santa-fe, /cities/savannah, ...)
// One page layout that works for every city. It looks up the city using
// the last part of the address (the "slug") and shows that city's box.
// Reads data from: data/cities.js

import { Link, useParams } from 'react-router-dom'
import CityPhoto from '../components/CityPhoto'
import NotFound from './NotFound'
import { cities, getCity, typeLabels } from '../data/cities'

// The three groups on the page: a heading for each type of item
const groups = [
  { type: 'business', heading: 'Local businesses' },
  { type: 'product', heading: 'Local products' },
  { type: 'culture', heading: 'Cultural experiences' },
]

export default function CityDetail() {
  // useParams reads the :slug blank from the address
  const { slug } = useParams()
  const city = getCity(slug)

  // If the slug does not match any city, show the not-found page
  if (!city) return <NotFound />

  // Work out the previous and next city so the buttons at the bottom can link to them.
  // At the start of the list "previous" wraps to the last city, and vice versa.
  const index = cities.indexOf(city)
  const previousCity = index === 0 ? cities[cities.length - 1] : cities[index - 1]
  const nextCity = index === cities.length - 1 ? cities[0] : cities[index + 1]

  return (
    <div className="page-wrap py-10">
      <title>{`${city.name}, ${city.state} box | Marlowby`}</title>
      <meta name="description" content={`${city.month} box from ${city.name}, ${city.state}. ${city.blurb}`} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link to="/cities">Cities</Link> / {city.name}, {city.state}
      </nav>

      {/* SUMMARY: picture on the left, text and button on the right */}
      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        <CityPhoto city={city} className="aspect-[2/1] w-full rounded-lg border border-line" />
        <div>
          <h1 className="text-4xl">{city.name} box</h1>
          <p className="mt-1 text-sm text-muted">{city.month} · {city.region}</p>
          <p className="mt-3">{city.blurb}</p>
          <p className="mt-3 text-sm">
            <strong>From $15 / month</strong> with Silver. Larger plans add more items from the same city.
          </p>
          <Link to="/plans" className="btn btn-primary mt-4">Subscribe to this box</Link>
        </div>
      </div>

      {/* INSIDE THE BOX: for each group, show only the items of that type */}
      <section className="mt-12" aria-labelledby="inside">
        <h2 id="inside" className="text-3xl">Inside the box</h2>
        {groups.map((group) => (
          <div key={group.type} className="mt-6">
            <h3 className="text-xl">{group.heading}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {city.items
                .filter((item) => item.type === group.type)
                .map((item) => (
                  <li key={item.name} className="card p-4">
                    <span className="tag">{typeLabels[item.type]}</span>
                    <p className="mt-2 font-semibold">{item.name}</p>
                    <p className="text-sm text-muted">{item.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {/* MEET THE MAKER */}
      <section className="mt-12 rounded-lg border border-line bg-white p-6" aria-labelledby="maker">
        <h2 id="maker" className="text-2xl">Meet the maker: {city.maker.name}</h2>
        <p className="mt-2 max-w-2xl">{city.maker.story}</p>
      </section>

      {/* PREVIOUS / NEXT / ALL */}
      <nav aria-label="More cities" className="mt-10 flex flex-wrap gap-3">
        <Link to={`/cities/${previousCity.slug}`} className="btn btn-secondary">Previous: {previousCity.name}</Link>
        <Link to={`/cities/${nextCity.slug}`} className="btn btn-secondary">Next: {nextCity.name}</Link>
        <Link to="/cities" className="btn btn-secondary">All cities</Link>
      </nav>
    </div>
  )
}
