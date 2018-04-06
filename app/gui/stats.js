import Stats from 'stats'

const stats = new Stats()
document.body.appendChild(stats.dom)

export default {
  begin: stats.begin,
  end: stats.end
}
