// STARTING POINT: this is the first JavaScript file that runs.
// index.html has an empty <div id="root">. This file fills it with our app.

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css' // the Tailwind styles
import App from './App'

// BrowserRouter lets the app read and change the web address (/plans, /about, ...)
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
