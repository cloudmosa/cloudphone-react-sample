import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import './utils/i18n.js'
import './index.css'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'

// HashRouter is needed for GitHub pages
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename='' hashType='noslash'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='settings' element={<Settings />} />
        <Route path='about' element={<About />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
