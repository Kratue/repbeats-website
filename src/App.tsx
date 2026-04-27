import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Licenses from './pages/Licenses'

export default function App() {
  return (
    <BrowserRouter>
      <div className="noise" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/licenses" element={<Licenses />} />
      </Routes>
    </BrowserRouter>
  )
}
