import { renderToString } from 'react-dom/server'
import { routeFor, allPaths, headFor } from './routes.jsx'

export const render = (path) => renderToString(routeFor(path))
export { allPaths, headFor }
export { FAQ } from './site.js'
