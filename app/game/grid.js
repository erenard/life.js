import {
  getState,
  setState,
  updateCell,
  setCount
} from './binary-cell.js'

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
    this.cells = new Uint8Array(this.length)
  }

  countNeighboursSafe (i) {
    return getState(this.getCellAt(i - this.sizeX - 1)) +
    getState(this.getCellAt(i - this.sizeX)) +
    getState(this.getCellAt(i - this.sizeX + 1)) +
    getState(this.getCellAt(i - 1)) +
    getState(this.getCellAt(i + 1)) +
    getState(this.getCellAt(i + this.sizeX - 1)) +
    getState(this.getCellAt(i + this.sizeX)) +
    getState(this.getCellAt(i + this.sizeX + 1))
  }

  countNeighboursUnsafe (i) {
    return getState(this.cells[i - this.sizeX - 1]) +
    getState(this.cells[i - this.sizeX]) +
    getState(this.cells[i - this.sizeX + 1]) +
    getState(this.cells[i - 1]) +
    getState(this.cells[i + 1]) +
    getState(this.cells[i + this.sizeX - 1]) +
    getState(this.cells[i + this.sizeX]) +
    getState(this.cells[i + this.sizeX + 1])
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  update () {
    let i
    /* Phase 1, plant new cells and mark cells for death where appropriate */
    for (i = 0; i < this.sizeX + 1; i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursSafe(this.length + i))
    }

    for (i = this.sizeX + 1; i < this.length - (this.sizeX + 1); i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursUnsafe(i))
    }

    for (i = this.length - (this.sizeX + 1); i < this.length; i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursSafe(i))
    }
    /* Phase 2, flip the cell' states */
    i = this.length
    while (i--) {
      this.cells[i] = updateCell(this.cells[i], this.rules)
    }
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

  getCellAt (index) {
    return this.cells[index % this.length]
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
