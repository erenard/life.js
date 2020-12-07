import { setState } from './binary-cell.js'

import Worker from './grid-one-worker.worker.js'

/**
 * Implements the game algorithm.
 */
export default class {
  /**
   * Initialize the grid.
   *
   * @param {Board} board - Game board's.
   * @param {Rules} rules - Birth and sruvival rules.
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
    let i = this.length
    while (i--) {
      this.cells[i] = setState(this.cells[i], Math.random() + ratio >= 1)
    }
  }

  /**
   * Clear the game board.
   */
  clear () {
    let i = this.length
    while (i--) {
      this.cells[i] = setState(this.cells[i], 0)
    }
  }

  /**
   * Expose the game board.
   */
  get Cells () {
    return this.cells
  }

  /**
   * Expose the board's size.
   */
  get Size () {
    return {
      x: this.sizeX,
      y: this.sizeY,
      length: this.length
    }
  }

  indexToXy (i) {
    i = i % this.length
    return {
      x: i % this.sizeX,
      y: Math.floor(i / this.sizeX)
    }
  }

  xyToIndex (x, y) {
    return (this.sizeX * y + x) % this.length
  }
}
