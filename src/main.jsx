import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import './i18n'
import './index.css'
import App from './App.jsx'
import Settings from './Settings.jsx'
import About from './About.jsx'

// HashRouter is needed for GitHub pages
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename='' hashType='noslash'>
      <Routes>
        <Route index element={<App />} />
        <Route path='settings' element={<Settings />} />
        <Route path='about' element={<About />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
