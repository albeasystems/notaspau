import './index.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/figtree'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { routeFor } from './routes.jsx'

const base = import.meta.env.BASE_URL
const path = location.pathname.slice(base.length - 1).replace(/index\.html$/, '')
const el = document.getElementById('root')
const node = routeFor(path)
// Páginas de titulación y 404 son HTML estático: sin hidratar (null).
if (node) { if (el.hasChildNodes()) hydrateRoot(el, node); else createRoot(el).render(node) }

// Revelado al entrar en pantalla (solo opacidad/transform; respeta reduced-motion vía CSS).
const els = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  els.forEach((e) => io.observe(e))
} else els.forEach((e) => e.classList.add('in'))
