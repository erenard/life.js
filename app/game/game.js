import Animation from '../render/animation'
import Grid from './grid'
import Renderer from '../render/renderer'
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
export default class Game {
  constructor () {
    this._animation = new Animation()
    this._board = new Board()
    this._rules = new Rules()
    this._viewport = null
    this._grid = null
    this._renderer = null
    this.createGrid()
  }

  createGrid () {
    const GridImplementation = Grid.get()
    this._grid = new GridImplementation(this._board, this._rules)
    this._grid.random(this._board.seedRatio)
  }

  createRenderer () {
    this._renderer = new Renderer(this._viewport, this._grid, this._board)
    this._animation.init(this._grid, this._renderer)
  }

  step () {
    this._animation.mainLoop()
  }

  /**
   * Add a cell to the grid.
   *
   * @param {number} x - Mouse x coordinate in pixels, relative to the viewport element.
   * @param {number} y - Mouse y coordinate in pixels, relative to the viewport element.
   */
  addCellAtPixel (x, y) {
    this._grid.resurectCell(...this._board.pixelToCellCoordinates(x, y))
    this._renderer.render()
  }

  /**
   * Set the viewport.
   *
   * @param {Element} viewport - Viewport DOM element.
   */
  // eslint-disable-next-line accessor-pairs
  set viewport (viewport) {
    this._viewport = viewport
    this.createRenderer()
  }

  get board () {
    return {
      gridWidth: this._board.gridWidth,
      gridHeight: this._board.gridHeight,
      cellRadius: this._board.cellRadius,
      seedRatio: this._board.seedRatio
    }
  }

  set board (board) {
    this._board.gridWidth = board.gridWidth
    this._board.gridHeight = board.gridHeight
    this._board.cellRadius = board.cellRadius
    this._board.seedRatio = board.seedRatio
    if (this._renderer) {
      this._renderer.destroy()
      this._renderer = undefined
    }
    this.createGrid()
    this.createRenderer()
  }

  set rules (preset) {
    this._rules.preset = preset
  }

  get rules () {
    return this._rules.preset
  }

  get running () {
    return this._animation.running
  }

  set running (value) {
    if (value) {
      this._animation.start()
    } else {
      this._animation.stop()
    }
  }

  // eslint-disable-next-line accessor-pairs
  set benchmarking (value) {
    this._animation.benchmarking = value
  }
}
