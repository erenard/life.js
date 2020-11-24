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
   * @param {number} sizeX - Game board's width.
   * @param {number} sizeY - Game board's height.
   * @param {Rules} rules - Birth and sruvival rules.
   */
  constructor (sizeX, sizeY, rules) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.length = sizeX * sizeY
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
    /* Phase 1, plant new cells and mark cells for death where appropriate */
    for (let i = 0; i < this.sizeX + 1; i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursSafe(this.length + i))
    }

    for (let i = this.sizeX + 1; i < this.length - (this.sizeX + 1); i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursUnsafe(i))
    }

    for (let i = this.length - (this.sizeX + 1); i < this.length; i++) {
      this.cells[i] = setCount(this.cells[i], this.countNeighboursSafe(i))
    }
    /* Phase 2, flip the cell' states */
    let i = this.length
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
