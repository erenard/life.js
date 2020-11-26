import Animation from '../render/animation'
import Grid from './grid'
import Renderer from '../render/cell-renderer'
import Rules from './rules'
import Board from './board'

/**
 * Public interface for the game.
 *
 * @param {Board} board - Game board.
 * @param {Rules} rules - Game rules.
 * @class Game (name)
 * @returns {object}  The public methods for the game.
 */
function Game (board = new Board(), rules = new Rules()) {
  const _animation = new Animation()
  const _board = board
  const _rules = rules
  let _viewport
  let _width
  let _height
  let _grid
  let _renderer

  function createGrid () {
    _width = _board.gridWidth * _board.cellRadius
    _height = _board.gridHeight * _board.cellRadius
    _grid = new Grid(Math.floor(_width / _board.cellRadius), Math.floor(_height / _board.cellRadius), rules)
    _grid.random(_board.seedRatio)
  }

  createGrid()

  function createRenderer () {
    _renderer = new Renderer(_width, _height, _viewport, _grid, _board.cellRadius)
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
        gridWidth: _board.gridWidth,
        gridHeight: _board.gridHeight,
        cellRadius: _board.cellRadius,
        seedRatio: _board.seedRatio
      }
    },
    set size (board) {
      _board.gridWidth = board.gridWidth
      _board.gridHeight = board.gridHeight
      _board.cellRadius = board.cellRadius
      _board.seedRatio = board.seedRatio
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
