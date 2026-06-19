import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NilProvider } from './store'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NilProvider>
      <App />
    </NilProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* ignore */ })
  })
}
