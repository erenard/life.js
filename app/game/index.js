import Animation from './animation'
import Grid from './grid'
import Renderer from './renderer'
import { Rules } from './cell'

/**
 * Public interface for the game.
 *
 * @class      Game (name)
 * @returns    {object}  The public methods for the game.
 */
function Game () {
  const radius = 4
  const width = window.innerWidth || 1280
  const height = window.innerHeight || 1024
  const grid = new Grid(Math.floor(width / radius), Math.floor(height / radius))
  const animation = new Animation()

  return {
    init (viewport) {
      const renderer = new Renderer(width, height, viewport, grid, radius)
      animation.init(grid, renderer)
    },
    start () {
      animation.start()
    },
    stop () {
      animation.stop()
    },
    step () {
      animation.step()
    },
    random (ratio) {
      grid.random(ratio)
    },
    clear () {
      grid.clear()
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
        Rules.b[index] = bValue
        Rules.s[index] = sValue
      }
    },
    get rules () {
      let birthPart = 'b'
      let survivalPart = 's'
      for (let index = 0; index < 9; index++) {
        birthPart += Rules.b[index] ? index : ''
        survivalPart += Rules.s[index] ? index : ''
      }
      return birthPart + survivalPart
    }
  }
}

export default Game
