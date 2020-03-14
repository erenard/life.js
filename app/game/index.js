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
    random (ratio) {
      grid.random(ratio)
      renderer.render()
    },
    clear () {
      grid.clear()
      renderer.render()
    },
    set rules (preset) {
      _rules.preset = preset
    },
    get rules () {
      return _rules.preset
    },
    get animation () {
      return animation
    },
    get running () {
      return animation.running
    },
    set running (value) {
      if (value) {
        animation.start()
      } else {
        animation.stop()
      }
    }
  }
  game.rules = 'b3s23'
  return game
}

export default Game
