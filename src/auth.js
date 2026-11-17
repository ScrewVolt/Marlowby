// LOGIN LOGIC: sign up, log in, log out, and "who is logged in?"
//
// Two modes:
//  1. Firebase mode: used when the keys in the .env file are filled in.
//     Firebase (Google's service) stores the accounts for real.
//  2. Demo mode: no keys needed. Accounts are saved in this browser only
//     (localStorage). Good for practice and for presenting without internet.
//
// In both modes we also save the logged-in person in localStorage under
// "marlowby.user". Any page can ask "who is logged in?" with getUser().

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

// Is there a Firebase key in the .env file? If yes, use Firebase mode.
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
export const useFirebase = Boolean(apiKey)

// Only connect to Firebase if we are in Firebase mode.
const auth = useFirebase
  ? getAuth(
      initializeApp({
        apiKey: apiKey,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      })
    )
  : null

// A practice account that always exists in demo mode.
export const DEMO_ACCOUNT = {
  name: 'Demo Member',
  email: 'demo@marlowby.test',
  password: 'Marlowby2026!',
  plan: 'gold',
}

const USER_KEY = 'marlowby.user' // the person who is logged in right now
const ACCOUNTS_KEY = 'marlowby.accounts' // all demo-mode accounts

// Who is logged in? Returns {name, email, plan}, or null if nobody.
export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Demo mode: read every saved account, and make sure the demo account is in it.
function getAccounts() {
  const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}
  accounts[DEMO_ACCOUNT.email] = DEMO_ACCOUNT
  return accounts
}

// Turn Firebase's error codes into messages a person can read.
function firebaseMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
    'auth/invalid-credential': 'That email and password do not match.',
    'auth/weak-password': 'Choose a password with at least 8 characters.',
  }
  return messages[error.code] || 'Something went wrong. Please try again.'
}

// Create a new account, then log that person in.
export async function signUp({ name, email, password, plan }) {
  email = email.toLowerCase()

  if (useFirebase) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      // Firebase Auth does not store the plan, so we remember it in this browser.
      localStorage.setItem('marlowby.plan.' + email, plan)
    } catch (error) {
      throw new Error(firebaseMessage(error))
    }
  } else {
    const accounts = getAccounts()
    if (accounts[email]) {
      throw new Error('An account with this email already exists. Try logging in.')
    }
    accounts[email] = { name, email, password, plan }
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  }

  saveUser({ name, email, plan })
}

// Log in an existing account.
export async function logIn({ email, password }) {
  email = email.toLowerCase()

  if (useFirebase) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      saveUser({
        name: result.user.displayName || 'Member',
        email,
        plan: localStorage.getItem('marlowby.plan.' + email) || 'silver',
      })
    } catch (error) {
      throw new Error(firebaseMessage(error))
    }
  } else {
    const account = getAccounts()[email]
    if (!account || account.password !== password) {
      throw new Error('That email and password do not match.')
    }
    saveUser({ name: account.name, email, plan: account.plan })
  }
}

// Log out: forget the logged-in person.
export async function logOut() {
  if (useFirebase) await auth.signOut()
  localStorage.removeItem(USER_KEY)
}
