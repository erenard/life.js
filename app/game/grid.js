import Cell from './cell'

/**
 * Implements the game algorithm
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
    /* game board initialisation */
    this.cells = new Array(this.length)
    let i = this.length
    while (i--) {
      this.cells[i] = new Cell(rules)
    }
  }

  countNeighboursSafe (i) {
    return this.getCellAt(i - this.sizeX - 1).state +
    this.getCellAt(i - this.sizeX).state +
    this.getCellAt(i - this.sizeX + 1).state +
    this.getCellAt(i - 1).state +
    this.getCellAt(i + 1).state +
    this.getCellAt(i + this.sizeX - 1).state +
    this.getCellAt(i + this.sizeX).state +
    this.getCellAt(i + this.sizeX + 1).state
  }

  countNeighboursUnsafe (i) {
    return this.cells[i - this.sizeX - 1].state +
    this.cells[i - this.sizeX].state +
    this.cells[i - this.sizeX + 1].state +
    this.cells[i - 1].state +
    this.cells[i + 1].state +
    this.cells[i + this.sizeX - 1].state +
    this.cells[i + this.sizeX].state +
    this.cells[i + this.sizeX + 1].state
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  update () {
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
        cell.isLiving = true
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
      cell.isLiving = false
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
