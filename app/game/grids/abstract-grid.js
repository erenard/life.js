import update from '../grid-updater.js'
import { random, clear, indexToXy, xyToIndex } from '../grid-utils.js'

/**
 * Implements the game algorithm.
 */
export default class {
  /**
   * Initialize the grid.
   *
   * @param {Board} board - Game board's.
   * @param {Rules} rules - Birth and survival rules.
   */
  constructor (board, rules) {
    this.sizeX = board.gridWidth
    this.sizeY = board.gridHeight
    this.length = this.sizeX * this.sizeY
    this.rules = rules
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  update () {
    update(this.cells, this.length, this.sizeX, this.rules)
  }

  /**
   * Fill the game board with cells.
   *
   * @param {number} ratio - Filling ratio from 0.0 to 1.0.
   */
  random (ratio) {
    random(this.cells, this.length, ratio)
  }

  /**
   * Clear the game board.
   */
  clear () {
    clear(this.cells, this.length)
  }

  indexToXy (i) {
    return indexToXy(this.length, this.sizeX, i)
  }

  xyToIndex (x, y) {
    return xyToIndex(this.length, this.sizeX, x, y)
  }
}
