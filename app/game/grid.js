import { default as Cell, Rules } from './cell'
import GridWorker from './grid.worker'

/**
 * Implements the game algorithm
 */
export default class {
  /**
   * Initialize the grid.
   *
   * @param {number} sizeX - Game board's width.
   * @param {number} sizeY - Game board's height.
   */
  constructor (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.length = sizeX * sizeY
    this.worker = new GridWorker()
    this.ready = true
    this.worker.onmessage = function (e) {
      const cellStates = e.data
      let i = this.length
      while (i--) {
        this.cells[i].update(cellStates[i])
      }
      this.ready = true
    }.bind(this)
    /* game board initialisation */
    this.cells = new Array(this.length)
    let i = this.length
    while (i--) {
      this.cells[i] = new Cell()
    }
    this.worker.postMessage({
      type: 'initialize',
      length: this.length,
      sizeX: this.sizeX
    })
  }

  postRules () {
    this.worker.postMessage({ type: 'setRules', birth: Rules.b, survival: Rules.s })
  }

  postCellStates () {
    const cellStates = new Uint8Array(this.cells.map(cell => cell.state))
    this.worker.postMessage({ type: 'setCellStates', cellStates: cellStates.buffer }, [cellStates.buffer])
  }

  postCellStatesArray () {
    this.worker.postMessage({ type: 'setCellStates', cellStates: this.cells.map(cell => cell.state) })
  }

  update () {
    if (this.ready) {
      this.ready = false
      this.worker.postMessage({ type: 'update' })
    }
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  updateLocal () {
    /* Phase 1, plant new cells and mark cells for death where appropriate */
    for (let i = 0; i < this.sizeX + 1; i++) {
      this.cells[i].count = this.countNeighboursSafe(this.length + i)
    }

    for (let i = this.sizeX + 1; i < this.length - (this.sizeX + 1); i++) {
      this.cells[i].count = this.countNeighboursUnsafe(i)
    }

    for (let i = this.length - (this.sizeX + 1); i < this.length; i++) {
      this.cells[i].count = this.countNeighboursSafe(i)
    }
    /* Phase 2, filp the cells state */
    let i = this.length
    while (i--) {
      this.cells[i].update()
    }
  }

  /**
   * Fill the game board with cells.
   *
   * @param {number} ratio - Filling ratio from 0.0 to 1.0.
   */
  random (ratio) {
    let i = this.length
    let cell
    while (i--) {
      if (Math.random() + ratio >= 1) {
        cell = this.cells[i]
        cell.state = 1
      }
    }
    this.postCellStates()
  }

  /**
   * Clear the game board.
   */
  clear () {
    let i = this.length
    var cell
    while (i--) {
      cell = this.cells[i]
      cell.state = 0
    }
    this.postCellStates()
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
