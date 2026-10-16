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
console.log(out.totalEntradas, out.titulaciones, out.universidades, out.comunidades, out.comunidadesList.length, out.ramas.length)
