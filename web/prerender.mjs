// Prerender estático: HTML completo por ruta + sitemap, robots, llms.txt. Salida en ../docs (GitHub Pages).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const out = path.resolve(root, '../docs')
const dist = path.join(root, '.dist')
const SITE = process.env.VITE_SITE_URL || 'https://albeasystems.github.io/notaspau'

const { render, paths: getPaths, head, grados, FAQ } = await import(pathToFileURL(path.join(root, '.ssr/entry-server.js')).href)
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/seo-data.json'), 'utf8'))

fs.rmSync(out, { recursive: true, force: true })
fs.cpSync(dist, out, { recursive: true })

const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const paths = getPaths()
for (const p of paths) {
  const html = tpl.replace('<!--head-->', head(p)).replace('<!--app-->', render('/' + p))
  const file = path.join(out, p, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}
fs.writeFileSync(path.join(out, '404.html'), tpl.replace('<!--head-->', head('')).replace('<!--app-->', render('/')))
fs.writeFileSync(path.join(out, '.nojekyll'), '')

// Páginas legales (HTML estático heredado): canonical, robots y Open Graph coherentes con el resto.
for (const [f, t, d] of [
  ['privacy.html', 'Política de privacidad | Notas PAU', 'Política de privacidad de la app Notas PAU de Albea Systems.'],
  ['support.html', 'Soporte | Notas PAU', 'Ayuda y contacto de la app Notas PAU: preguntas frecuentes y soporte por correo.'],
  ['terms.html', 'Términos de uso | Notas PAU', 'Términos de uso de la app Notas PAU de Albea Systems.'],
]) {
  const file = path.join(out, f)
  let h = fs.readFileSync(file, 'utf8')
  const url = `${SITE}/${f}`
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
  h = h.replace(/<meta name="description"[^>]*>/, '')
  h = h.replace('</head>', `  <meta name="description" content="${d}" />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Notas PAU" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/images/og.png" />
  <link rel="icon" type="image/png" href="favicon.png" />
</head>`)
  fs.writeFileSync(file, h)
}

const lastmod = data.actualizado
const urls = [...paths.map((p) => `${SITE}/${p}`), `${SITE}/support.html`, `${SITE}/privacy.html`, `${SITE}/terms.html`]
fs.writeFileSync(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u, i) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod><priority>${i === 0 ? '1.0' : i < 2 ? '0.8' : u.includes('/titulacion/') ? '0.5' : '0.6'}</priority></url>`).join('\n') +
    `\n</urlset>\n`,
)

// Robots: abierto a buscadores y a rastreadores de IA (entrenamiento, búsqueda y asistentes).
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Bytespider', 'cohere-ai', 'Meta-ExternalAgent', 'DuckAssistBot', 'MistralAI-User']
fs.writeFileSync(
  path.join(out, 'robots.txt'),
  `User-agent: *\nAllow: /\n\n` + bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') + `\nSitemap: ${SITE}/sitemap.xml\n`,
)

const c3 = (n) => n.toFixed(3).replace('.', ',')
const top = (x) => x.top.slice(0, 5).map((t) => `  - ${t.carrera} (${t.universidad}): ${c3(t.nota)}`).join('\n')
const link = (x, prefix) => `- [${prefix} ${x.name}](${SITE}/notas-de-corte/${x.slug}/)`

fs.writeFileSync(
  path.join(out, 'llms.txt'),
  `# Notas PAU

> App gratuita para iPhone (iOS 17+) con las notas de corte universitarias de España de 2025 y 2026: buscador, simulador de nota de acceso, favoritos y comparativa interanual. Editada por Albea Systems. Datos actualizados el ${data.actualizado}.

Cifras: ${data.totalEntradas} notas de corte, ${data.titulaciones} titulaciones, ${data.universidades} universidades y centros (públicos y privados). Sin registro. Gratis con anuncios; pago único de 2,99 EUR para quitarlos.

## Descarga
- [Notas PAU en App Store](https://apps.apple.com/es/app/notaspau-acceso-universidad/id6761384675): descarga oficial.

## Páginas
- [Inicio](${SITE}/): qué hace la app, precio y preguntas frecuentes.
- [Notas de corte por comunidad y rama](${SITE}/notas-de-corte/): resumen con nota máxima y mediana de ${data.year}.
- [Notas de corte por titulación](${SITE}/notas-de-corte/titulaciones/): ${grados.length} titulaciones comparadas entre universidades.
${data.comunidadesList.map((c) => link(c, `Notas de corte ${data.year} en`)).join('\n')}
${data.ramas.map((c) => link(c, `Notas de corte ${data.year}:`)).join('\n')}

## Soporte y legal
- [Soporte](${SITE}/support.html)
- [Privacidad](${SITE}/privacy.html)
- [Términos](${SITE}/terms.html)

## Optional
- [Contenido completo en Markdown](${SITE}/llms-full.txt)
`,
)

const gline = (g) => `- ${g.name}: ${g.unis.length} universidades; máxima ${c3(g.unis[0].n)} (${g.unis[0].u}); mediana ${c3(g.mediana)}. ${SITE}/notas-de-corte/titulacion/${g.slug}/`
const section = (x) =>
  `### ${x.name}\n- ${x.titulaciones} titulaciones, ${x.universidades} universidades y centros. Nota máxima ${c3(x.max)}; mediana ${c3(x.mediana)}.\n- Notas más altas:\n${top(x)}\n- ${SITE}/notas-de-corte/${x.slug}/\n`
fs.writeFileSync(
  path.join(out, 'llms-full.txt'),
  `# Notas PAU: contenido completo\n\nApp gratuita para iPhone con notas de corte universitarias de España (2025 y 2026). Editor: Albea Systems (albeasystems@gmail.com). Descarga: https://apps.apple.com/es/app/notaspau-acceso-universidad/id6761384675. Datos actualizados el ${data.actualizado}. Fuente: recopilación de fuentes públicas; no afiliada a universidades ni al Ministerio.\n\n## Preguntas frecuentes\n\n` +
    FAQ.map((f) => `### ${f.q}\n${f.a}\n`).join('\n') +
    `\n## Notas de corte ${data.year} por comunidad\n\n${data.comunidadesList.map(section).join('\n')}\n## Notas de corte ${data.year} por rama\n\n${data.ramas.map(section).join('\n')}\n## Notas de corte ${data.year} por titulación (${grados.length})\n\n${grados.map(gline).join('\n')}\n`,
)
console.log('prerendered', paths.length, 'pages ->', out)
