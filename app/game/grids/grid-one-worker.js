import AbstractGrid from './abstract-grid.js'
import Worker from './workers/grid-one-worker.worker.js'

export default class extends AbstractGrid {
  constructor (board, rules) {
    super(board, rules)
    /* game board initialisation */
    this.buffer = new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT * this.length)
    this.worker = new Worker()
    this.worker.postMessage({ type: 'init', buffer: this.buffer, board, rules })
    this.cells = new Uint8Array(this.buffer)
    this.worker.addEventListener('message', this.onMessage.bind(this))
    this.onRender = null
  }

  /**
   * Called on web worker message.
   *
   * @param {Event} event - The message.
   */
  onMessage (event) {
    const type = event.data.type
    const data = event.data
    switch (type) {
      case 'render':
        if (this.onRender) this.onRender(data)
        break
    }
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  async update () {
    this.worker.postMessage({ type: 'update' })
    await new Promise(resolve => {
      this.onRender = resolve
    })
  }
}
