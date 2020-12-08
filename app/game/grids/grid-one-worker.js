import AbstractGrid from './abstract-grid.js'
import Worker from './workers/grid-one-worker.worker.js'

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
}
