import { renderToString } from 'react-dom/server'
import { routeFor, allPaths, headFor } from './routes.jsx'
import grados from './grados-data.json'

export const render = (path) => renderToString(routeFor(path, grados))
export const paths = () => allPaths(grados)
export const head = (path) => headFor(path, grados)
export { grados }
export { FAQ } from './site.js'
