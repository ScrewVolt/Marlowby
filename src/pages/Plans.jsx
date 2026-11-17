// PLANS PAGE (address: /plans)
// Three plan cards, a comparison table, and a list of questions.
// Reads data from: data/plans.js
// Each "Choose" button goes to /signup?plan=gold (or silver, platinum),
// and the SignUp page reads that ?plan=... part to preselect the plan.

import { Link } from 'react-router-dom'
import { plans } from '../data/plans'

// The rows of the comparison table (the price row is written out by hand below)
const rows = [
  { label: 'Items per box', key: 'items' },
  { label: 'City guide', key: 'guide' },
  { label: 'Shipping', key: 'shipping' },
  { label: 'Next city announced', key: 'preview' },
  { label: 'Vote on a future city', key: 'vote' },
]

const faqs = [
  { question: 'What comes in a box?', answer: 'Products from independent businesses in one featured city, plus cultural experiences such as a guide, a map or a class voucher. Each item names its maker.' },
  { question: 'Can I change or cancel my plan?', answer: 'Yes. You can switch plans or cancel from your account before the next box is packed.' },
  { question: 'When does my box ship?', answer: 'Boxes ship in the first week of each month, one featured city at a time.' },
]

export default function Plans() {
  return (
    <div className="page-wrap py-12">
      <title>Plans | Marlowby</title>
      <meta name="description" content="Marlowby plans: Silver $15 for 5 items, Gold $30 for 10 items, Platinum $60 for 20 items, each month from a different U.S. city." />

      <h1 className="text-4xl">Choose your box</h1>
      <p className="mt-2 text-muted">The same monthly city box in three sizes. Pick how much you want to explore.</p>

      {/* THE THREE PLAN CARDS */}
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.id} className="card flex flex-col p-6">
            <h2 className="text-2xl">{plan.name}</h2>
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
            <p className="mt-1 font-display text-4xl font-bold">
              ${plan.price}
              <span className="font-sans text-sm font-normal text-muted"> / month</span>
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
              <li>A new U.S. city every month</li>
            </ul>
            <Link to={`/signup?plan=${plan.id}`} className="btn btn-primary mt-6">
              Choose {plan.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* COMPARISON TABLE: th with scope tells screen readers which cells are headings */}
      <section className="mt-12" aria-labelledby="compare">
        <h2 id="compare" className="text-3xl">Compare plans</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="py-3 pr-4">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id} scope="col" className="py-3 pr-4">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <th scope="row" className="py-3 pr-4 font-medium">Monthly price</th>
                {plans.map((plan) => <td key={plan.id} className="py-3 pr-4">${plan.price}</td>)}
              </tr>
              {/* One row for each feature. "key" is the name of the value inside each plan in data/plans.js */}
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium">{row.label}</th>
                  {plans.map((plan) => <td key={plan.id} className="py-3 pr-4">{plan[row.key]}</td>)}
                </tr>
              ))}
              <tr className="border-b border-line">
                <th scope="row" className="py-3 pr-4 font-medium">New city every month</th>
                {plans.map((plan) => <td key={plan.id} className="py-3 pr-4">Included</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* QUESTIONS: <details> opens and closes by itself, no JavaScript needed */}
      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl">Questions</h2>
        <div className="mt-4 max-w-2xl">
          {faqs.map((faq) => (
            <details key={faq.question} className="border-b border-line py-4">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-2 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-line bg-white p-8 text-center">
        <h2 className="text-2xl">Pick a plan and create your account.</h2>
        <Link to="/signup" className="btn btn-primary mt-4">Create your account</Link>
      </section>
    </div>
  )
}
