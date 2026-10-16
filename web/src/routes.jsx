import { AppleLogo, MagnifyingGlass, ArrowRight, Plus } from '@phosphor-icons/react/dist/ssr'
import { SITE, BASE, STORE, EMAIL, OG, D, FAQ, fmt, nota, fechaLarga, stats } from './site.js'

const img = (n) => `${BASE}images/${n}`
const href = (p) => `${BASE}${p}`
const CTA = 'Descargar gratis'

/* ---------- piezas ---------- */

function Phone({ children, className = '' }) {
  return <div className={`phone ${className}`}>{children}</div>
}

function StoreButton({ className = '' }) {
  return (
    <a href={STORE} className={`btn btn-primary ${className}`} rel="noopener">
      <AppleLogo size={22} weight="fill" aria-hidden="true" />
      {CTA}
    </a>
  )
}

function Header() {
  const links = [
    ['Funciones', '#funciones'],
    ['Simulador', '#simulador'],
    ['Precio', '#precio'],
    ['Preguntas', '#preguntas'],
    ['Notas de corte', href('notas-de-corte/')],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={href('')} className="flex items-center gap-3 font-display text-lg font-bold tracking-tight">
          <img src={img('app-icon.png')} alt="" width="32" height="32" className="rounded-[9px]" />
          Notas PAU
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-medium text-muted lg:flex">
          {links.map(([t, h]) => (
            <a key={t} href={h} className="hover:text-ink">{t}</a>
          ))}
        </nav>
        <a href={STORE} className="btn btn-primary !min-h-10 !px-5 text-[15px]" rel="noopener">{CTA}</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.15fr_.85fr] lg:gap-8 lg:py-8">
      <div>
        <h1 className="rise text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.1rem]" style={{ '--i': 0 }}>
          Sabe a qué carrera llegas con tu nota.
        </h1>
        <p className="rise mt-6 max-w-[34rem] text-lg text-muted sm:text-xl" style={{ '--i': 1 }}>
          Consulta las notas de corte de 2026, simula tu nota y guarda tus favoritas. Gratis y sin registro.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ '--i': 2 }}>
          <StoreButton />
          <a href="#funciones" className="btn btn-ghost">Ver cómo funciona <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="rise mx-auto w-[min(70vw,290px)] lg:mx-0 lg:ml-auto" style={{ '--i': 3 }}>
        <Phone>
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={img('journey-poster.jpg')} />
            <img
              src={img('journey.gif')}
              width="402"
              height="874"
              alt="Recorrido en la app Notas PAU: buscar Medicina, abrir la ficha con la comparativa 2025-2026, guardarla en favoritos y probar el simulador de nota."
              fetchPriority="high"
            />
          </picture>
        </Phone>
      </div>
    </section>
  )
}

function Numbers() {
  const items = [
    [fmt(stats.entradas), 'notas de corte de 2025 y 2026'],
    [fmt(stats.titulaciones), 'titulaciones distintas'],
    [String(stats.universidades), 'universidades y centros'],
    ['0 €', 'por buscar, simular y guardar'],
  ]
  return (
    <section aria-label="La app en cifras" className="border-y border-line">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        {items.map(([n, l]) => (
          <div key={l} className="reveal">
            <dt className="font-display text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">{n}</dt>
            <dd className="mt-1 max-w-[12rem] text-[15px] text-muted">{l}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Peek({ src, alt, className = '' }) {
  return (
    <Phone className={`!rounded-b-none !pb-0 ${className}`}>
      <img src={img(src)} alt={alt} width="720" height="1565" loading="lazy" className="!rounded-b-none" />
    </Phone>
  )
}

function Features() {
  return (
    <section id="funciones" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <h2 className="reveal max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Toda la oferta, en el bolsillo de quien elige.
      </h2>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <article className="reveal panel grid grid-cols-1 items-end gap-4 overflow-hidden bg-tint px-7 pt-8 sm:grid-cols-[1fr_auto] sm:pl-10 sm:pr-0 md:col-span-4">
          <div className="pb-2 sm:pb-10 sm:pr-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Busca por carrera, universidad o facultad</h3>
            <p className="mt-3 max-w-sm text-muted">
              Escribe y afina por comunidad, rama, precio, idioma o tipo de centro. {fmt(stats.y2026)} notas de 2026 a un toque.
            </p>
          </div>
          <Peek src="app-search.jpg" alt="Resultados de buscar Medicina, con nota de corte y variación respecto al año anterior" className="mx-auto w-[210px] translate-y-6 sm:mx-0 sm:mr-10" />
        </article>

        <article className="reveal panel overflow-hidden bg-[var(--panel)] px-7 pt-8 text-[var(--panel-ink)] md:col-span-2">
          <h3 id="simulador" className="text-2xl font-bold sm:text-3xl">¿Dónde entro?</h3>
          <p className="mt-3 text-[var(--panel-muted)]">
            Pon tu nota y mira qué titulaciones tienes al alcance, al límite o fuera.
          </p>
          <Peek src="app-sim.jpg" alt="Simulador con la nota 9,227: 2.798 titulaciones a las que accedes, 183 muy cerca y 1.042 fuera" className="mx-auto mt-8 w-[210px] translate-y-6" />
        </article>

        <article className="reveal panel overflow-hidden border border-line bg-surface px-7 pt-8 md:col-span-2">
          <h3 className="text-2xl font-bold sm:text-3xl">Tus favoritas, juntas</h3>
          <p className="mt-3 text-muted">Guarda carreras y universidades y compara sus notas sin abrir diez pestañas.</p>
          <Peek src="app-favs.jpg" alt="Lista de favoritos con Grado en Medicina de la Universidad de Sevilla y su nota 13,320" className="mx-auto mt-8 w-[210px] translate-y-6" />
        </article>

        <article className="reveal panel grid grid-cols-1 items-end gap-4 overflow-hidden bg-accent px-7 pt-8 text-[var(--accent-ink)] sm:grid-cols-[1fr_auto] sm:pl-10 sm:pr-0 md:col-span-4">
          <div className="pb-2 sm:pb-10 sm:pr-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Cuánto ha subido o bajado</h3>
            <p className="mt-3 max-w-sm opacity-90">
              Cada ficha compara la nota de 2025 con la de 2026 para que veas la tendencia antes de decidir.
            </p>
          </div>
          <Peek src="app-fav.jpg" alt="Ficha de Grado en Medicina en la Universidad de Sevilla con la comparativa interanual 2025 a 2026" className="mx-auto w-[210px] translate-y-6 sm:mx-0 sm:mr-10" />
        </article>
      </div>
    </section>
  )
}

function Steps() {
  const rows = [
    ['Busca', 'Escribe una carrera o una universidad y filtra por comunidad, rama o precio.'],
    ['Simula', 'Introduce tu nota de acceso y ve al instante qué opciones tienes.'],
    ['Guarda', 'Marca tus favoritas y compara sus notas de 2025 y 2026 en una sola lista.'],
  ]
  return (
    <section className="bg-[var(--panel)] text-[var(--panel-ink)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <h2 className="reveal max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          De tu nota a tu lista de carreras.
        </h2>
        <ol className="mt-12 max-w-3xl">
          {rows.map(([t, d], i) => (
            <li key={t} className={`reveal grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 ${i ? 'border-t border-white/15' : ''}`}>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">{t}</h3>
              <p className="self-center text-lg text-[var(--panel-muted)]">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Explore() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <h2 className="reveal max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Notas de corte por rama y por comunidad.
      </h2>
      <p className="reveal mt-4 max-w-xl text-lg text-muted">
        Adelanto de lo que encontrarás en la app: las titulaciones más exigentes de {D.year} en cada territorio.
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="reveal">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Por rama</h3>
          <ul className="mt-4 grid gap-1">
            {D.ramas.map((r) => (
              <li key={r.slug}>
                <a href={href(`notas-de-corte/${r.slug}/`)} className="group flex items-baseline justify-between gap-4 rounded-xl px-3 py-3 hover:bg-tint">
                  <span className="font-display text-xl font-semibold group-hover:text-accent">{r.name}</span>
                  <span className="shrink-0 text-[15px] text-muted">{fmt(r.titulaciones)} titulaciones</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Por comunidad</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {D.comunidadesList.map((c) => (
              <li key={c.slug}>
                <a href={href(`notas-de-corte/${c.slug}/`)} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-[15px] font-medium hover:border-accent hover:text-accent">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const free = ['Búsqueda y filtros completos', 'Simulador sin límites', 'Favoritas ilimitadas', 'Comparativa 2025 y 2026']
  return (
    <section id="precio" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
      <h2 className="reveal max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Gratis. Y si te molestan los anuncios, 2,99 € una vez.
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
        <div className="reveal border-t-2 border-ink pt-6">
          <p className="font-display text-6xl font-extrabold tracking-tight">0 €</p>
          <p className="mt-1 text-lg font-semibold">Gratis</p>
          <ul className="mt-5 space-y-2 text-muted">
            {free.map((f) => <li key={f}>{f}</li>)}
            <li>Con anuncios</li>
          </ul>
        </div>
        <div className="reveal panel bg-tint p-7 sm:p-8">
          <p className="font-display text-6xl font-extrabold tracking-tight text-accent">2,99 €</p>
          <p className="mt-1 text-lg font-semibold">Sin anuncios, pago único</p>
          <ul className="mt-5 space-y-2 text-muted">
            <li>Todo lo gratuito</li>
            <li>Sin anuncios para siempre</li>
            <li>Sin suscripción ni renovación</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Faq({ items = FAQ, id = 'preguntas', title = 'Preguntas frecuentes' }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:pb-28">
      <h2 className="reveal text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
      <div className="mt-10">
        {items.map((f, i) => (
          <details key={f.q} className={`group py-5 ${i ? 'border-t border-line' : 'border-t-2 border-ink'}`}>
            <summary className="flex items-start justify-between gap-6">
              <h3 className="font-display text-xl font-semibold leading-snug">{f.q}</h3>
              <Plus size={22} className="chev mt-1 shrink-0 text-accent" aria-hidden="true" />
            </summary>
            <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="reveal panel grid items-center gap-8 bg-accent p-8 text-[var(--accent-ink)] sm:p-12 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">Elige con los datos delante.</h2>
          <p className="mt-3 max-w-md text-lg opacity-90">Para iPhone con iOS 17 o superior. Sin registro.</p>
        </div>
        <a href={STORE} className="btn !bg-[var(--accent-ink)] !text-[var(--accent)]" rel="noopener">
          <AppleLogo size={22} weight="fill" aria-hidden="true" />
          {CTA}
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-[15px] text-muted sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-bold text-ink">Notas PAU</p>
          <p className="mt-2 max-w-sm">
            App independiente de Albea Systems. No está afiliada a ninguna universidad ni al Ministerio. Datos actualizados el {fechaLarga}.
          </p>
        </div>
        <nav aria-label="Pie" className="grid content-start gap-2">
          <a href={href('notas-de-corte/')} className="hover:text-ink">Notas de corte por comunidad</a>
          <a href={href('support.html')} className="hover:text-ink">Soporte</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-ink">{EMAIL}</a>
        </nav>
        <nav aria-label="Legal" className="grid content-start gap-2">
          <a href={href('privacy.html')} className="hover:text-ink">Privacidad</a>
          <a href={href('terms.html')} className="hover:text-ink">Términos de uso</a>
          <a href={STORE} className="hover:text-ink" rel="noopener">App Store</a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-sm text-muted sm:px-6">© 2026 Albea Systems</p>
    </footer>
  )
}

function Shell({ children }) {
  return (
    <>
      <a href="#main" className="skip">Saltar al contenido</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

/* ---------- páginas ---------- */

function Home() {
  return (
    <Shell>
      <Hero />
      <Numbers />
      <Features />
      <Steps />
      <Explore />
      <Pricing />
      <Faq />
      <FinalCta />
    </Shell>
  )
}

function Crumbs({ items }) {
  return (
    <nav aria-label="Ruta" className="text-[15px] text-muted">
      {items.map(([t, h], i) => (
        <span key={t}>
          {h ? <a href={h} className="hover:text-ink">{t}</a> : <span aria-current="page">{t}</span>}
          {i < items.length - 1 && <span aria-hidden="true"> / </span>}
        </span>
      ))}
    </nav>
  )
}

function Hub() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
        <Crumbs items={[['Inicio', href('')], ['Notas de corte']]} />
        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">Notas de corte {D.year} por comunidad y rama</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Resumen de {fmt(D.totalEntradas)} notas de corte de 2025 y {D.year} en {D.universidades} universidades y centros de España. Datos actualizados el {fechaLarga}. La app incluye el detalle completo y el simulador.
        </p>
        <h2 className="mt-12 text-2xl font-bold">Por comunidad autónoma</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {D.comunidadesList.map((c) => (
            <li key={c.slug}>
              <a href={href(`notas-de-corte/${c.slug}/`)} className="flex items-baseline justify-between gap-4 py-2 hover:text-accent">
                <span className="font-medium">{c.name}</span>
                <span className="text-[15px] text-muted">{fmt(c.titulaciones)}</span>
              </a>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-bold">Por rama de conocimiento</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {D.ramas.map((c) => (
            <li key={c.slug}>
              <a href={href(`notas-de-corte/${c.slug}/`)} className="flex items-baseline justify-between gap-4 py-2 hover:text-accent">
                <span className="font-medium">{c.name}</span>
                <span className="text-[15px] text-muted">{fmt(c.titulaciones)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <FinalCta />
    </Shell>
  )
}

const kindOf = (slug) => (D.ramas.find((r) => r.slug === slug) ? 'rama' : 'comunidad')
export const dataItem = (slug) => D.ramas.find((r) => r.slug === slug) || D.comunidadesList.find((r) => r.slug === slug)

function pageFaq(x) {
  const kind = kindOf(x.slug)
  const where = kind === 'rama' ? `en ${x.name}` : `en ${x.name}`
  return [
    {
      q: `¿Cuál es la nota de corte más alta ${where} en ${D.year}?`,
      a: `${nota(x.max)} puntos, en ${x.top[0].carrera} (${x.top[0].universidad}).`,
    },
    {
      q: `¿Cuántas titulaciones con nota de corte hay ${where}?`,
      a: `La app recoge ${fmt(x.titulaciones)} titulaciones distintas en ${x.universidades} universidades y centros con nota de ${D.year}.`,
    },
    {
      q: `¿Cuál es la nota de corte mediana ${where}?`,
      a: `La mediana de las notas de corte de ${D.year} ${where} es ${nota(x.mediana)} sobre 14.`,
    },
  ]
}
export { pageFaq }

function DataPage({ slug }) {
  const x = dataItem(slug)
  const kind = kindOf(slug)
  const faq = pageFaq(x)
  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
        <Crumbs items={[['Inicio', href('')], ['Notas de corte', href('notas-de-corte/')], [x.name]]} />
        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">Notas de corte {D.year} en {x.name}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          {kind === 'rama'
            ? `La rama ${x.name} reúne ${fmt(x.titulaciones)} titulaciones con nota de corte en ${D.year}, repartidas en ${x.universidades} universidades y centros.`
            : `${x.name} tiene ${fmt(x.titulaciones)} titulaciones con nota de corte en ${D.year}, impartidas en ${x.universidades} universidades y centros.`}{' '}
          La nota más alta es {nota(x.max)} y la mediana, {nota(x.mediana)} (sobre 14).
        </p>
        <h2 className="mt-12 text-2xl font-bold">Las 12 notas de corte más altas</h2>
        <ol className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {x.top.map((t) => (
            <li key={t.carrera + t.universidad} className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold leading-snug">{t.carrera}</p>
                <p className="text-[15px] text-muted">{t.universidad}</p>
              </div>
              <p className="font-display text-xl font-bold tabular-nums text-accent">{nota(t.nota)}</p>
            </li>
          ))}
        </ol>
        <div className="panel mt-14 flex flex-wrap items-center justify-between gap-5 bg-tint p-7">
          <div>
            <p className="font-display text-2xl font-bold">¿Con tu nota, dónde entras?</p>
            <p className="mt-1 text-muted">Simula tu nota con las {fmt(D.totalEntradas)} notas de la app.</p>
          </div>
          <StoreButton />
        </div>
        <Faq items={faq} id="preguntas" title="Datos clave" />
        <p className="text-[15px] text-muted">
          Notas de corte de {D.year} recopiladas de fuentes públicas y actualizadas el {fechaLarga}. Confirma siempre la información en la web oficial de la universidad.
        </p>
      </div>
    </Shell>
  )
}

/* ---------- rutas, head, JSON-LD ---------- */

export const allPaths = () => [
  '',
  'notas-de-corte/',
  ...D.comunidadesList.map((c) => `notas-de-corte/${c.slug}/`),
  ...D.ramas.map((c) => `notas-de-corte/${c.slug}/`),
]

export function routeFor(path) {
  const p = path.replace(/^\//, '')
  if (p === '' || p === 'index.html') return <Home />
  if (p === 'notas-de-corte/' || p === 'notas-de-corte') return <Hub />
  const m = p.match(/^notas-de-corte\/([^/]+)\/?$/)
  if (m && dataItem(m[1])) return <DataPage slug={m[1]} />
  return <Home />
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`

const org = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'Albea Systems',
  url: `${SITE}/`,
  email: EMAIL,
  logo: `${SITE}/images/app-icon.png`,
}
const faqLd = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export function headFor(path) {
  const p = path.replace(/^\//, '')
  const url = `${SITE}/${p}`
  let title, desc, graph

  if (p === '') {
    title = 'Notas PAU: notas de corte 2026 y simulador de nota'
    desc = `App gratis para iPhone con ${fmt(stats.y2026)} notas de corte de 2026 y ${fmt(stats.y2025)} de 2025. Busca tu carrera, simula tu nota de acceso y compara con el año anterior.`
    graph = [
      org,
      { '@type': 'WebSite', '@id': `${SITE}/#web`, url: `${SITE}/`, name: 'Notas PAU', inLanguage: 'es-ES', publisher: { '@id': `${SITE}/#org` } },
      {
        '@type': 'MobileApplication',
        '@id': `${SITE}/#app`,
        name: 'Notas PAU',
        alternateName: 'Notas PAU: notas de corte y simulador',
        description: desc,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'iOS 17.0 o superior',
        inLanguage: 'es-ES',
        url: `${SITE}/`,
        downloadUrl: STORE,
        installUrl: STORE,
        image: `${SITE}/images/app-icon.png`,
        screenshot: ['app-search.jpg', 'app-detail.jpg', 'app-sim.jpg', 'app-favs.jpg'].map((f) => `${SITE}/images/${f}`),
        featureList: [
          'Buscador de notas de corte por carrera, universidad o facultad',
          'Simulador de nota de acceso a la universidad',
          'Comparativa interanual 2025 y 2026',
          'Favoritos de carreras y universidades',
        ],
        dateModified: D.actualizado,
        publisher: { '@id': `${SITE}/#org` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
      },
      faqLd(FAQ),
    ]
  } else if (p === 'notas-de-corte/') {
    title = `Notas de corte ${D.year} por comunidad y rama | Notas PAU`
    desc = `Resumen de las notas de corte de ${D.year} por comunidad autónoma y rama de conocimiento: titulaciones, nota máxima y mediana. Actualizado el ${fechaLarga}.`
    graph = [
      org,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Notas de corte', item: url },
        ],
      },
    ]
  } else {
    const x = dataItem(p.split('/')[1])
    title = `Notas de corte ${D.year} en ${x.name} | Notas PAU`
    desc = `${fmt(x.titulaciones)} titulaciones con nota de corte ${D.year} en ${x.name}. Nota más alta ${nota(x.max)} (${x.top[0].carrera}, ${x.top[0].universidad}); mediana ${nota(x.mediana)}.`
    graph = [
      org,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Notas de corte', item: `${SITE}/notas-de-corte/` },
          { '@type': 'ListItem', position: 3, name: x.name, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Notas de corte más altas ${D.year} en ${x.name}`,
        itemListElement: x.top.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: `${t.carrera} (${t.universidad}): ${nota(t.nota)}` })),
      },
      faqLd(pageFaq(x)),
    ]
  }

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="es" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta name="theme-color" content="#f4f6fa" media="(prefers-color-scheme: light)" />`,
    `<meta name="theme-color" content="#090e19" media="(prefers-color-scheme: dark)" />`,
    `<meta name="apple-itunes-app" content="app-id=6743827730" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:site_name" content="Notas PAU" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Notas PAU: notas de corte y simulador de nota en el iPhone" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${OG}" />`,
    `<link rel="icon" type="image/png" href="${BASE}favicon.png" />`,
    `<link rel="apple-touch-icon" href="${BASE}apple-touch-icon.png" />`,
    `<script>document.documentElement.classList.add('js')</script>`,
    ld({ '@context': 'https://schema.org', '@graph': graph }),
  ].join('\n  ')
}
