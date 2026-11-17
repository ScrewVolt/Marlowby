// WELCOME PAGE (address: /welcome)
// Shown after sign up or log in. It greets the member, confirms the plan,
// previews the first box, explains what happens next, and collects a shipping address.
// If nobody is logged in, it sends the visitor to the sign-up page.

import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CityPhoto from '../components/CityPhoto'
import { cities, typeLabels } from '../data/cities'
import { getPlan } from '../data/plans'
import { getUser, logOut } from '../auth'

export default function Welcome() {
  const navigate = useNavigate()
  const user = getUser() // {name, email, plan} or null

  // Shipping address form. It starts with whatever was saved last time (or empty).
  const saveKey = user ? `marlowby.shipping.${user.email}` : ''
  const saved = (user && JSON.parse(localStorage.getItem(saveKey))) || {}
  const [street, setStreet] = useState(saved.street || '')
  const [town, setTown] = useState(saved.town || '')
  const [state, setState] = useState(saved.state || '')
  const [zip, setZip] = useState(saved.zip || '')
  const [status, setStatus] = useState(saved.street ? 'saved' : '') // '', 'saved' or 'error'

  if (!user) return <Navigate to="/signup" replace />

  const plan = getPlan(user.plan)
  const firstName = user.name.split(' ')[0]
  const nextCity = cities[0] // for the MVP, the first box is the first city in the list

  // The three steps shown under "What happens next"
  const steps = [
    { title: 'We announce your city', text: `Your plan shows the next city ${plan.preview.toLowerCase()}. Your first box features ${nextCity.name}.` },
    { title: 'We pack and ship', text: `Boxes ship in the first week of the month. Your ${nextCity.month} box heads out then.` },
    { title: 'You meet the makers', text: 'Every item names the person who made it, so you can look them up.' },
  ]

  // Runs when the "Save address" button is pressed
  function handleSave(event) {
    event.preventDefault()
    const zipOk = /^\d{5}$/.test(zip.trim())
    if (street.trim() === '' || town.trim() === '' || state.trim().length !== 2 || !zipOk) {
      setStatus('error')
      return
    }
    localStorage.setItem(saveKey, JSON.stringify({ street, town, state, zip }))
    setStatus('saved')
  }

  async function handleLogOut() {
    await logOut()
    navigate('/')
  }

  return (
    <div className="page-wrap py-12">
      <title>Welcome | Marlowby</title>
      {/* noindex tells search engines not to list this private page */}
      <meta name="robots" content="noindex" />

      <h1 className="text-4xl">Welcome to Marlowby, {firstName}.</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Your account is ready. Here is what comes with your plan and what to expect for your first box.
      </p>

      {/* PLAN SUMMARY */}
      <section className="card mt-8 p-6" aria-labelledby="your-plan">
        <h2 id="your-plan" className="text-2xl">Your {plan.name} plan</h2>
        <p className="mt-1 text-muted">${plan.price} a month. {plan.tagline}</p>
        <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
          {plan.perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </section>

      {/* FIRST BOX PREVIEW: photo, blurb and the first three items */}
      <section className="card mt-6 grid overflow-hidden md:grid-cols-2" aria-labelledby="next-box">
        <CityPhoto city={nextCity} className="aspect-[2/1] w-full md:h-full md:aspect-auto" />
        <div className="p-6">
          <h2 id="next-box" className="text-2xl">Your first box</h2>
          <p className="mt-1 text-lg">{nextCity.name}, {nextCity.state} · {nextCity.month}</p>
          <p className="mt-2 text-sm text-muted">{nextCity.blurb}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nextCity.items.slice(0, 3).map((item) => (
              <li key={item.name}>
                <span className="font-semibold">{item.name}</span>
                <span className="text-muted"> ({typeLabels[item.type]})</span>
              </li>
            ))}
          </ul>
          <Link to={`/cities/${nextCity.slug}`} className="btn btn-primary mt-4">See everything inside</Link>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="mt-10" aria-labelledby="next-steps">
        <h2 id="next-steps" className="text-3xl">What happens next</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="card p-5">
              <p className="text-sm font-semibold text-clay">Step {index + 1}</p>
              <h3 className="mt-1 text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SHIPPING ADDRESS: saved in this browser, like the partner form on the About page */}
      <section className="mt-10 grid gap-8 md:grid-cols-2" aria-labelledby="ship-to">
        <div>
          <h2 id="ship-to" className="text-3xl">Where should we send it?</h2>
          <p className="mt-2 text-muted">Add your address now so your first box is ready to ship. You can change it any time.</p>
        </div>
        <form onSubmit={handleSave} noValidate aria-label="Shipping address">
          <div className="mb-4">
            <label htmlFor="sh-street" className="field-label">Street address</label>
            <input id="sh-street" autoComplete="street-address" className="field-input" value={street} onChange={(event) => setStreet(event.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="sh-town" className="field-label">City</label>
            <input id="sh-town" autoComplete="address-level2" className="field-input" value={town} onChange={(event) => setTown(event.target.value)} />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sh-state" className="field-label">State (2 letters)</label>
              <input id="sh-state" maxLength="2" autoComplete="address-level1" className="field-input" value={state} onChange={(event) => setState(event.target.value.toUpperCase())} />
            </div>
            <div>
              <label htmlFor="sh-zip" className="field-label">ZIP code</label>
              <input id="sh-zip" inputMode="numeric" maxLength="5" autoComplete="postal-code" className="field-input" value={zip} onChange={(event) => setZip(event.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">Save address</button>
          {/* role="status" makes screen readers read this message out when it changes */}
          <p role="status" className="mt-3 text-sm">
            {status === 'saved' && 'Address saved. You are all set for your first box.'}
            {status === 'error' && <span className="field-error">Fill in every field. Use a 2 letter state and a 5 digit ZIP code.</span>}
          </p>
        </form>
      </section>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
        <Link to="/cities" className="btn btn-secondary">Browse all cities</Link>
        <button type="button" className="btn btn-secondary" onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  )
}
