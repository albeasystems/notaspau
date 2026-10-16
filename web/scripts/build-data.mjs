// Genera src/seo-data.json a partir del dataset real de la app (grades.json).
import fs from 'node:fs'

const src = new URL('../../NotasPAU/Resources/grades.json', import.meta.url)
const d = JSON.parse(fs.readFileSync(src, 'utf8'))
const g = d.grades

const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const latest = Math.max(...g.map((x) => x.año))
const cur = g.filter((x) => x.año === latest && x.nota > 0)

const summarize = (rows) => {
  const notas = rows.map((r) => r.nota).sort((a, b) => a - b)
  const top = [...rows].sort((a, b) => b.nota - a.nota)
  const seen = new Set()
  const topUnique = []
  for (const r of top) {
    const k = r.carrera + '|' + r.universidad
    if (seen.has(k)) continue
    seen.add(k)
    topUnique.push({ carrera: r.carrera, universidad: r.universidad, nota: r.nota, rama: r.rama })
    if (topUnique.length === 12) break
  }
  return {
    titulaciones: new Set(rows.map((r) => r.carrera)).size,
    universidades: new Set(rows.map((r) => r.universidad)).size,
    mediana: notas.length ? +notas[Math.floor(notas.length / 2)].toFixed(2) : 0,
    max: notas.length ? notas[notas.length - 1] : 0,
    top: topUnique,
  }
}

const group = (key) => {
  const m = new Map()
  for (const r of cur) m.set(r[key], [...(m.get(r[key]) || []), r])
  return [...m.entries()]
    .filter(([k]) => k)
    .map(([name, rows]) => ({ name, slug: slug(name), ...summarize(rows) }))
    .sort((a, b) => b.titulaciones - a.titulaciones)
}

const out = {
  version: d.version,
  actualizado: d.ultimaActualizacion,
  year: latest,
  totalEntradas: d.totalEntradas,
  titulaciones: new Set(g.map((x) => x.carrera)).size,
  universidades: new Set(g.map((x) => x.universidad)).size,
  comunidades: new Set(g.map((x) => x.comunidadAutonoma)).size,
  años: [...new Set(g.map((x) => x.año))].sort(),
  ramas: group('rama'),
  comunidadesList: group('comunidadAutonoma'),
}
fs.writeFileSync(new URL('../src/seo-data.json', import.meta.url), JSON.stringify(out, null, 1))

// Titulaciones con 2 o más universidades en el último año: tienen comparativa real.
const prev = g.filter((x) => x.año === latest - 1 && x.nota > 0)
const prevKey = new Map(prev.map((x) => [x.carrera + '|' + x.universidad, x.nota]))
const byCarrera = new Map()
for (const r of cur) byCarrera.set(r.carrera, [...(byCarrera.get(r.carrera) || []), r])
const used = new Set()
const grados = []
for (const [name, rows] of byCarrera) {
  const unis = new Map()
  for (const r of rows) if (!unis.has(r.universidad) || unis.get(r.universidad).nota < r.nota) unis.set(r.universidad, r)
  if (unis.size < 2) continue
  let sl = slug(name).slice(0, 80).replace(/-$/, '')
  for (let i = 2; used.has(sl); i++) sl = slug(name).slice(0, 76) + '-' + i
  used.add(sl)
  const list = [...unis.values()]
    .map((r) => {
      const p = prevKey.get(r.carrera + '|' + r.universidad)
      return { u: r.universidad, c: r.comunidadAutonoma, n: r.nota, d: p ? +(r.nota - p).toFixed(3) : null }
    })
    .sort((a, b) => b.n - a.n)
  const notas = list.map((x) => x.n).sort((a, b) => a - b)
  const ds = list.filter((x) => x.d !== null).map((x) => x.d)
  grados.push({
    name, slug: sl, rama: rows[0].rama, unis: list,
    mediana: +notas[Math.floor(notas.length / 2)].toFixed(3),
    delta: ds.length ? +(ds.reduce((a, b) => a + b, 0) / ds.length).toFixed(3) : null,
    conPrev: ds.length,
  })
}
grados.sort((a, b) => b.unis.length - a.unis.length || a.name.localeCompare(b.name, 'es'))
fs.writeFileSync(new URL('../src/grados-data.json', import.meta.url), JSON.stringify(grados))
console.log('grados', grados.length)
console.log(out.totalEntradas, out.titulaciones, out.universidades, out.comunidades, out.comunidadesList.length, out.ramas.length)
