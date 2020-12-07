import { random, clear, indexToXy, xyToIndex } from '../grid-utils.js'

import Worker from '../workers/grid-one-worker.worker.js'

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
    /* game board initialisation */
    this.buffer = new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT * this.length)
    this.worker = new Worker()
    this.worker.postMessage({ type: 'init', buffer: this.buffer, board, rules })
    this.cells = new Uint8Array(this.buffer)
    this.worker.addEventListener('message', this.receiveMessage.bind(this))
    this.messageSub = null
  }

  receiveMessage (event) {
    if (this.messageSub) this.messageSub(event)
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  async update () {
    this.worker.postMessage({ type: 'update' })
    await new Promise(resolve => {
      this.messageSub = resolve
    })
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
