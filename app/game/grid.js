import Cell from './cell'
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
    this.worker.onmessage = function (e) {
      var cellCounts = e.data
      let i = this.length
      while (i--) {
        this.cells[i].count = cellCounts[i]
        this.cells[i].update()
      }
    }.bind(this)
    /* game board initialisation */
    this.cells = new Array(this.length)
    let i = this.length
    while (i--) {
      this.cells[i] = new Cell()
    }
  }

  update () {
    let cellStates = this.cells.map(cell => cell.state)
    this.worker.postMessage({ cellStates: cellStates, sizeX: this.sizeX })
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
    return {
      x: i % this.Size.x,
      y: Math.floor(i / this.Size.x)
    }
  }

  xyToIndex (x, y) {
    return this.Size.x * y + x
  }
}
