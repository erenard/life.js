import Stats from 'stats.js'

let stats

export default {
  init: () => {
    stats = new Stats()
    document.body.appendChild(stats.dom)
  },
  begin: () => {
    if (stats) stats.begin()
  },
  end: () => {
    if (stats) stats.end()
  }
}
