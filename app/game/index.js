import Animation from '../render/animation'
import Grid from './grid'
import Renderer from '../render/cell-renderer'
import Rules from './rules'

/**
 * Public interface for the game.
 *
 * @class      Game (name)
 * @returns    {object}  The public methods for the game.
 */
function Game ({ radius = 2, gridWidth, gridHeight } = {}) {
  const _rules = new Rules()
  const width = gridWidth ? gridWidth * radius : window.innerWidth
  const height = gridHeight ? gridHeight * radius : window.innerHeight
  const grid = new Grid(Math.floor(width / radius), Math.floor(height / radius), _rules)
  const animation = new Animation()
  let renderer

  const game = {
    init (viewport) {
      renderer = new Renderer(width, height, viewport, grid, radius)
      animation.init(grid, renderer)
    },
    start () {
      animation.start()
    },
    stop () {
      animation.stop()
    },
    step () {
      animation.mainLoop()
    },
    random (ratio) {
      grid.random(ratio)
      renderer.render()
    },
    clear () {
      grid.clear()
      renderer.render()
    },
    set rules (preset) {
      const birthRegExp = new RegExp('b([0-9]*)', 'g')
      const birthMatch = birthRegExp.exec(preset)
      const birthPart = birthMatch ? birthMatch[1] : ''

      const survivalRegExp = new RegExp('s([0-9]*)', 'g')
      const survivalMatch = survivalRegExp.exec(preset)
      const survivalPart = survivalMatch ? survivalMatch[1] : ''

      for (let index = 0; index < 9; index++) {
        const bValue = birthPart.indexOf(index) >= 0
        const sValue = survivalPart.indexOf(index) >= 0
        _rules.b[index] = bValue
        _rules.s[index] = sValue
      }
    },
    get rules () {
      let birthPart = 'b'
      let survivalPart = 's'
      for (let index = 0; index < 9; index++) {
        birthPart += _rules.b[index] ? index : ''
        survivalPart += _rules.s[index] ? index : ''
      }
      return birthPart + survivalPart
    }
  }
  game.rules = 'b3s23'
  return game
}

export default Game
