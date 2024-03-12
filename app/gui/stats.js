import Stats from 'stats.js'

let stats

export default {
  init: () => {
    stats = new Stats()
    const container = document.getElementById('statsContainer') || document.body
    container.appendChild(stats.dom)
    stats.dom.style.position = 'unset'
  },
  begin: () => {
    if (stats) stats.begin()
  },
  end: () => {
    if (stats) stats.end()
  }
}
