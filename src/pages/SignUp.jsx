// SIGN UP / LOG IN PAGE (address: /signup)
// Two forms side by side: create an account, or log in.
// The real work (saving accounts, checking passwords) is in src/auth.js.
// This file only handles the forms: typing, checking, showing errors.

import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { plans, getPlan } from '../data/plans'
import { DEMO_ACCOUNT, useFirebase, getUser, logIn, signUp } from '../auth'

// A reusable label + input + error message, so we do not repeat this 5 times.
function Field({ id, label, type = 'text', value, onChange, error, hint, autoComplete }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="field-label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? id + '-error' : hint ? id + '-hint' : undefined}
        className="field-input"
      />
      {hint && <p id={id + '-hint'} className="mt-1 text-sm text-muted">{hint}</p>}
      {error && <p id={id + '-error'} className="field-error">{error}</p>}
    </div>
  )
}

// Checks that an email looks like text@text.text
function looksLikeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignUp() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Memory for the page. Each useState holds one thing the page needs to remember.
  const [planId, setPlanId] = useState(getPlan(searchParams.get('plan')).id) // from ?plan=gold
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({}) // problems with each sign-up field
  const [formError, setFormError] = useState('') // problem from auth.js, like "email already used"
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [busy, setBusy] = useState(false) // true while waiting, so buttons cannot be clicked twice

  // Already logged in? Send them to their account page instead.
  if (getUser()) return <Navigate to="/welcome" replace />

  const plan = getPlan(planId)

  // Runs when the "Create account" button is pressed
  async function handleSignUp(event) {
    event.preventDefault() // stop the browser from reloading the page

    // 1. Check each field and collect problems
    const problems = {}
    if (name.trim() === '') problems.name = 'Enter your name.'
    if (!looksLikeEmail(email)) problems.email = 'Enter an email like name@example.com.'
    if (password.length < 8) problems.password = 'Use at least 8 characters.'
    setErrors(problems)
    setFormError('')
    if (Object.keys(problems).length > 0) return // stop if anything is wrong

    // 2. Everything is valid, so try to create the account
    setBusy(true)
    try {
      await signUp({ name: name.trim(), email: email.trim(), password, plan: planId })
      navigate('/welcome')
    } catch (error) {
      setFormError(error.message)
    }
    setBusy(false)
  }

  // Runs when the "Log in" button is pressed
  async function handleLogin(event) {
    event.preventDefault()
    setLoginError('')
    if (!looksLikeEmail(loginEmail) || loginPassword === '') {
      setLoginError('Enter your email and password.')
      return
    }
    setBusy(true)
    try {
      await logIn({ email: loginEmail.trim(), password: loginPassword })
      navigate('/welcome')
    } catch (error) {
      setLoginError(error.message)
    }
    setBusy(false)
  }

  return (
    <div className="page-wrap py-12">
      <title>Sign up or log in | Marlowby</title>
      <meta name="description" content="Create a Marlowby account and choose a plan, or log in to see your next box." />

      <h1 className="text-4xl">Join Marlowby</h1>
      <p className="mt-3 inline-block rounded-md bg-teal-tint px-4 py-2 text-sm">
        <strong>Selected plan: {plan.name}</strong> · ${plan.price} / month · {plan.items} items{' '}
        <Link to="/plans">Change</Link>
      </p>

      {/* Only shown in demo mode (no Firebase keys) */}
      {!useFirebase && (
        <p className="mt-3 max-w-2xl rounded-md border border-line bg-white px-4 py-3 text-sm">
          Demo mode: accounts stay in this browser. To look around, log in with{' '}
          <strong>{DEMO_ACCOUNT.email}</strong> and password <strong>{DEMO_ACCOUNT.password}</strong>.
        </p>
      )}

      <div className="mt-8 grid items-start gap-6 md:grid-cols-[3fr_2fr]">
        {/* SIGN UP FORM */}
        <form onSubmit={handleSignUp} noValidate className="card p-6" aria-labelledby="signup-title">
          <h2 id="signup-title" className="mb-4 text-2xl">Create your account</h2>
          <Field id="su-name" label="Full name" value={name} onChange={setName} error={errors.name} autoComplete="name" />
          <Field id="su-email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
          <Field id="su-pass" label="Password" type="password" value={password} onChange={setPassword} error={errors.password} hint="At least 8 characters." autoComplete="new-password" />
          <div className="mb-5">
            <label htmlFor="su-plan" className="field-label">Plan</label>
            <select id="su-plan" value={planId} onChange={(event) => setPlanId(event.target.value)} className="field-input">
              {plans.map((p) => (
                <option key={p.id} value={p.id}>{p.name} · ${p.price} / month</option>
              ))}
            </select>
          </div>
          {formError && <p role="alert" className="field-error mb-3">{formError}</p>}
          <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
            {busy ? 'Please wait' : 'Create account'}
          </button>
        </form>

        {/* LOG IN FORM */}
        <form onSubmit={handleLogin} noValidate className="card p-6" aria-labelledby="login-title">
          <h2 id="login-title" className="mb-4 text-2xl">Already a member?</h2>
          <Field id="li-email" label="Email" type="email" value={loginEmail} onChange={setLoginEmail} autoComplete="email" />
          <Field id="li-pass" label="Password" type="password" value={loginPassword} onChange={setLoginPassword} autoComplete="current-password" />
          {loginError && <p role="alert" className="field-error mb-3">{loginError}</p>}
          <button type="submit" disabled={busy} className="btn btn-secondary w-full disabled:opacity-60">
            {busy ? 'Please wait' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
