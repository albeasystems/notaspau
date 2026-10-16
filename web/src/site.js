import data from './seo-data.json'

export const SITE = import.meta.env.VITE_SITE_URL || 'https://albeasystems.github.io/notaspau'
export const BASE = import.meta.env.BASE_URL
export const STORE = 'https://apps.apple.com/es/app/notaspau-acceso-universidad/id6761384675'
export const EMAIL = 'albeasystems@gmail.com'
export const OG = `${SITE}/images/og.png`

export const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' })
export const fmt = (n) => nf.format(n)
export const nota = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })

export const D = data
export const fechaLarga = new Date(data.actualizado + 'T12:00:00').toLocaleDateString('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric',
})

// Cifras reales del dataset de la app (grades.json).
export const stats = {
  entradas: data.totalEntradas,
  titulaciones: data.titulaciones,
  universidades: data.universidades,
  y2026: 4023,
  y2025: 4582,
}

export const FAQ = [
  {
    q: '¿Qué es la nota de corte?',
    a: 'La nota de corte es la nota de admisión del último estudiante admitido en una titulación. Cambia cada año según las plazas y la demanda. Notas PAU recopila la de 2025 y la de 2026 para que veas si una carrera sube o baja.',
  },
  {
    q: '¿Cómo se calcula la nota de admisión?',
    a: 'La nota de admisión suma el 60 % de la nota media de Bachillerato o FP, el 40 % de la calificación de la fase de acceso y hasta 4 puntos de las materias de la fase voluntaria, ponderadas según la titulación. El máximo es 14 puntos.',
  },
  {
    q: '¿Qué datos incluye Notas PAU?',
    a: `Incluye ${fmt(stats.entradas)} notas de corte de 2025 y 2026, ${fmt(stats.titulaciones)} titulaciones distintas y ${stats.universidades} universidades y centros, públicos y privados, de toda España. La última actualización es del ${fechaLarga}.`,
  },
  {
    q: '¿Cómo funciona el simulador de nota?',
    a: 'Introduces tu nota de acceso entre 5 y 14 y la app clasifica las titulaciones en cuatro grupos: accedes, accedes justo, muy cerca y fuera. Puedes filtrar por universidad pública o privada, comunidad y rama.',
  },
  {
    q: '¿Notas PAU es gratis?',
    a: 'Sí. Todas las funciones son gratuitas, con anuncios. Si prefieres quitarlos, hay un pago único de 2,99 € sin suscripción ni renovación automática.',
  },
  {
    q: '¿Necesito registrarme?',
    a: 'No. No hay cuenta ni registro. Abres la app y buscas.',
  },
  {
    q: '¿De dónde salen los datos?',
    a: 'Se recopilan de fuentes públicas de universidades y portales de acceso. Notas PAU no está afiliada a ninguna universidad ni al Ministerio. Cada ficha enlaza a la página oficial para que confirmes la información antes de decidir.',
  },
  {
    q: '¿Hay versión para Android?',
    a: 'Por ahora solo para iPhone, con iOS 17 o superior.',
  },
  {
    q: 'He pagado para quitar los anuncios y siguen apareciendo. ¿Qué hago?',
    a: 'Abre Ajustes en la app y pulsa Restaurar compra. Usa el mismo Apple ID con el que compraste. Si sigue igual, escríbenos a ' + EMAIL + '.',
  },
]

export const slugOf = (arr, s) => arr.find((x) => x.slug === s)
