import AbstractGrid from './abstract-grid.js'
import update from '../grid-updater.js'

/**
 * Implements the game algorithm.
 */
export default class extends AbstractGrid {
  /**
   * Initialize the grid.
   *
   * @param {Board} board - Game board's.
   * @param {Rules} rules - Birth and survival rules.
   */
  constructor (board, rules) {
    super(board, rules)
    /* game board initialisation */
    this.cells = new Uint8Array(this.length)
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  update () {
    update(this.cells, this.length, this.sizeX, this.rules)
  }
}
