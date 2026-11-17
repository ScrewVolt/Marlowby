// ABOUT PAGE (address: /about)
// The story, the values, and a form for local businesses who want to be partners.
// The form saves requests in this browser's localStorage. A real site would
// send them to a database (for example Firebase Firestore).

import { useState } from 'react'
import { Link } from 'react-router-dom'

const values = [
  { title: 'Celebrate local', text: 'Every box starts with one city and its own makers.' },
  { title: 'Back small business', text: 'Partners are independent shops and studios, not national chains.' },
  { title: 'Share culture', text: 'Boxes include experiences such as maps, guides and classes, not just products.' },
]

export default function About() {
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [offer, setOffer] = useState('')
  const [status, setStatus] = useState('') // '', 'sent' or 'error'

  // Runs when the "Send" button is pressed
  function handleSubmit(event) {
    event.preventDefault()

    // All three fields must be filled in, and the email must contain @ and a dot
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (business.trim() === '' || offer.trim() === '' || !emailOk) {
      setStatus('error')
      return
    }

    // Add this request to the list saved in the browser
    const saved = JSON.parse(localStorage.getItem('marlowby.partnerRequests')) || []
    saved.push({ business, email, offer })
    localStorage.setItem('marlowby.partnerRequests', JSON.stringify(saved))

    // Empty the form and show the thank-you message
    setBusiness('')
    setEmail('')
    setOffer('')
    setStatus('sent')
  }

  return (
    <>
      <title>About | Marlowby</title>
      <meta name="description" content="How Marlowby works with independent local businesses to build a monthly box from one U.S. city." />

      {/* HERO BAND */}
      <section className="bg-teal py-12 text-white">
        <div className="page-wrap">
          <h1 className="max-w-2xl text-4xl">How Marlowby works with small businesses.</h1>
          <p className="mt-3 max-w-2xl text-lg">
            Each month we choose one U.S. city, find independent makers there and build a box around what they do best.
          </p>
        </div>
      </section>

      {/* STORY AND VALUES */}
      <section className="page-wrap grid gap-8 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl">Our story</h2>
          <p className="mt-3">
            Marlowby started with a simple idea: a city is best understood through the people who make things there. A box that gathers those makers in one place gives subscribers a reason to look closer at a city they may never have visited.
          </p>
          <p className="mt-3">
            We feature one city at a time. Every item in the box names who made it, where they work and how to find them.
          </p>
        </div>
        <div>
          <h2 className="text-3xl">What we stand for</h2>
          <ul className="mt-3 space-y-3">
            {values.map((value) => (
              <li key={value.title} className="card p-4">
                <p className="font-semibold">{value.title}</p>
                <p className="text-sm text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTNER FORM. id="partner" lets the footer link jump straight here. */}
      <section id="partner" className="border-y border-line bg-white py-12">
        <div className="page-wrap grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">Own a local business?</h2>
            <p className="mt-3">Tell us what you make and where you are. We are building each city's box now.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate aria-label="Partner contact form">
            <div className="mb-4">
              <label htmlFor="pt-name" className="field-label">Business name</label>
              <input id="pt-name" className="field-input" value={business} onChange={(event) => setBusiness(event.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="pt-email" className="field-label">Email</label>
              <input id="pt-email" type="email" className="field-input" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="pt-what" className="field-label">What do you make or offer?</label>
              <input id="pt-what" className="field-input" value={offer} onChange={(event) => setOffer(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-full">Send</button>
            {/* role="status" makes screen readers read this message out when it changes */}
            <p role="status" className="mt-3 text-sm">
              {status === 'sent' && 'Thanks. We received your details.'}
              {status === 'error' && <span className="field-error">Fill in all three fields with a valid email.</span>}
            </p>
          </form>
        </div>
      </section>

      <section className="page-wrap py-12 text-center">
        <h2 className="text-3xl">Choose a plan to get your first box.</h2>
        <Link to="/plans" className="btn btn-primary mt-5">See plans</Link>
      </section>
    </>
  )
}
