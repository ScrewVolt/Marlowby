// THE MAP OF THE SITE: which web address shows which page.
// Every page is wrapped in Layout, so the header and footer appear on all of them.

import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cities from './pages/Cities'
import CityDetail from './pages/CityDetail'
import Plans from './pages/Plans'
import SignUp from './pages/SignUp'
import Welcome from './pages/Welcome'
import About from './pages/About'
import Accessibility from './pages/Accessibility'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cities" element={<Cities />} />
        {/* :slug is a blank that changes, like santa-fe or savannah */}
        <Route path="cities/:slug" element={<CityDetail />} />
        <Route path="plans" element={<Plans />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="accessibility" element={<Accessibility />} />
        {/* * matches any other address, so we show the "not found" page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
