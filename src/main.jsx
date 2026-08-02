import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

const rootEl = document.getElementById('root')

const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

// Hydrate only when the server markup was rendered for THIS route. The SPA
// fallback serves the prerendered "/" HTML for every unknown path (e.g. /admin),
// and hydrating homepage markup into the admin page throws React #418/#423 and
// forces a full client re-render. Comparing the stamped path avoids that.
// '/index.html' and '/about/' should compare equal to '/' and '/about'.
const normalize = (p) => p.replace(/\/index\.html$/, '/').replace(/(.)\/$/, '$1')

const prerenderedPath = rootEl.dataset.prerenderedPath

if (
  prerenderedPath &&
  normalize(prerenderedPath) === normalize(window.location.pathname)
) {
  hydrateRoot(rootEl, app)
} else {
  // Not our markup (or none at all) — discard and client-render cleanly.
  rootEl.innerHTML = ''
  createRoot(rootEl).render(app)
}
