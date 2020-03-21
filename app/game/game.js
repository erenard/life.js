import Animation from '../render/animation'
import Grid from './grid'
import Renderer from '../render/cell-renderer'
import Rules from './rules'

/**
 * Public interface for the game.
 *
 * @class Game (name)
 * @returns {object}  The public methods for the game.
 */
function Game ({ gridWidth = 100, gridHeight = 100, radius = 2, seedRatio = 0.3 } = {}) {
  let _gridWidth = gridWidth
  let _gridHeight = gridHeight
  let _radius = radius
  let _seedRatio = seedRatio
  const _rules = new Rules()
  const _animation = new Animation()
  let _viewport
  let _width
  let _height
  let _grid
  let _renderer

  function createGrid () {
    _width = _gridWidth ? _gridWidth * _radius : window.innerWidth
    _height = _gridHeight ? _gridHeight * _radius : window.innerHeight
    _grid = new Grid(Math.floor(_width / _radius), Math.floor(_height / _radius), _rules)
    _grid.random(_seedRatio)
  }

  createGrid()

  function createRenderer () {
    _renderer = new Renderer(_width, _height, _viewport, _grid, _radius)
    _animation.init(_grid, _renderer)
  }

  return {
    // eslint-disable-next-line accessor-pairs
    set viewport (viewport) {
      _viewport = viewport
      createRenderer()
    },
    get size () {
      return {
        gridWidth: _gridWidth,
        gridHeight: _gridHeight,
        radius: _radius,
        seedRatio: _seedRatio
      }
    },
    set size ({ gridWidth = _gridWidth, gridHeight = _gridHeight, radius = _radius, seedRatio = _seedRatio } = {}) {
      _gridWidth = gridWidth
      _gridHeight = gridHeight
      _radius = radius
      _seedRatio = seedRatio
      if (_renderer) {
        _renderer.destroy()
        _renderer = undefined
      }
      createGrid()
      createRenderer()
    },
    random (ratio) {
      _grid.random(ratio)
      if (_renderer) _renderer.render()
    },
    clear () {
      _grid.clear()
      if (_renderer) _renderer.render()
    },
    set rules (preset) {
      _rules.preset = preset
    },
    get rules () {
      return _rules.preset
    },
    get animation () {
      return _animation
    },
    get running () {
      return _animation.running
    },
    set running (value) {
      if (value) {
        _animation.start()
      } else {
        _animation.stop()
      }
    }
  }
}

export default Game
