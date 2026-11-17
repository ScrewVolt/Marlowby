// HOME PAGE (address: /)
// Sections from top to bottom: hero, how it works, featured cities,
// plans preview, mission band, final call to action.
// Reads data from: data/cities.js and data/plans.js

import { Link } from 'react-router-dom'
import CityPhoto from '../components/CityPhoto'
import { cities } from '../data/cities'
import { plans } from '../data/plans'

// The three "How it works" steps. We loop over this list below with .map()
const steps = [
  { title: 'Pick a plan', text: 'Silver, Gold or Platinum, depending on how many items you want each month.' },
  { title: 'We feature one city', text: 'Each month the box comes from a different U.S. city and its independent businesses.' },
  { title: 'Open and explore', text: 'Every item names the person who made it and where to find them.' },
]

export default function Home() {
  const firstCity = cities[0] // the city shown in the hero picture

  return (
    <>
      {/* React puts these in the page <head>, so each page gets its own title and description for search engines */}
      <title>Marlowby | A monthly box from one U.S. city's local businesses</title>
      <meta
        name="description"
        content="Marlowby is a subscription box. Each month you receive products and cultural experiences from the small businesses of a different U.S. city. Plans start at $15 a month."
      />

      {/* HERO */}
      <section className="page-wrap grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-clay">
            Explore your city, one box at a time
          </p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
            A monthly box made by the local businesses of one U.S. city.
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Boxes start at $15 a month. A different city ships every month.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/plans" className="btn btn-primary">See plans</Link>
            {/* #how scrolls down to the section with id="how" */}
            <a href="#how" className="btn btn-secondary">How it works</a>
          </div>
        </div>
        <figure>
          <CityPhoto city={firstCity} className="aspect-[2/1] w-full rounded-lg border border-line" />
          <figcaption className="mt-2 text-sm text-muted">
            {firstCity.month} box: {firstCity.name}, {firstCity.state}
          </figcaption>
        </figure>
      </section>

      {/* HOW IT WORKS: one card for each item in the steps list */}
      <section id="how" className="border-y border-line bg-white py-12">
        <div className="page-wrap">
          <h2 className="text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line bg-paper p-5">
                <p className="text-sm font-semibold text-teal-dark">Step {index + 1}</p>
                <h3 className="mt-1 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURED CITIES: the first 3 cities from the data file */}
      <section className="page-wrap py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">Featured cities</h2>
          <Link to="/cities" className="text-sm font-semibold">All cities</Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {cities.slice(0, 3).map((city) => (
            <li key={city.slug} className="card overflow-hidden">
              <CityPhoto city={city} className="aspect-[2/1] w-full" />
              <div className="p-4">
                <h3 className="text-xl">{city.name}, {city.state}</h3>
                <p className="text-sm text-muted">{city.month} box</p>
                <Link to={`/cities/${city.slug}`} className="mt-2 inline-block text-sm font-semibold">
                  See what is inside<span className="sr-only"> the {city.name} box</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* PLANS PREVIEW */}
      <section className="border-y border-line bg-white py-12">
        <div className="page-wrap">
          <h2 className="text-3xl">Plans for every explorer</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id} className="rounded-lg border border-line bg-paper p-5">
                <h3 className="text-xl">{plan.name}</h3>
                <p className="mt-1 font-display text-3xl font-bold">
                  ${plan.price}
                  <span className="font-sans text-sm font-normal text-muted"> / month</span>
                </p>
                <p className="mt-1 text-sm text-muted">{plan.items} items per box</p>
              </li>
            ))}
          </ul>
          <Link to="/plans" className="mt-4 inline-block text-sm font-semibold">Compare plans</Link>
        </div>
      </section>

      {/* MISSION BAND */}
      <section className="bg-teal py-12 text-white">
        <div className="page-wrap">
          <h2 className="max-w-xl text-3xl">Each box is built with small businesses in one city.</h2>
          <p className="mt-3 max-w-xl">
            Partners are independent local businesses and makers. Every box names who made each item and where to find them.
          </p>
          <Link to="/about" className="btn btn-light mt-5">Read our mission</Link>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="page-wrap py-14 text-center">
        <h2 className="text-3xl">Start with Silver at $15 a month.</h2>
        <Link to="/signup?plan=silver" className="btn btn-primary mt-5">Create your account</Link>
      </section>
    </>
  )
}
