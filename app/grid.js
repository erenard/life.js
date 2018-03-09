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
   */
  constructor (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.length = sizeX * sizeY
    this.birth = [false, false, false, false, false, false, false, false, false]
    this.survival = [false, false, false, false, false, false, false, false, false]
    /* game board initialisation */
    this.cells = new Array(this.length)
    let i = this.length
    while (i--) {
      this.cells[i] = new Cell()
    }
  }

  getCellAt (index) {
    return this.cells[(index + this.length) % this.length]
  }

  /**
   * Game of life algorithm,
   * update the game board.
   */
  update () {
    /* Phase 1, plant new cells and mark cells for death where appropriate */
    let i = this.length
    let count
    while (i--) {
      count = this.getCellAt(i - this.sizeX - 1).state +
        this.getCellAt(i - this.sizeX).state +
        this.getCellAt(i - this.sizeX + 1).state +
        this.getCellAt(i - 1).state +
        this.getCellAt(i + 1).state +
        this.getCellAt(i + this.sizeX - 1).state +
        this.getCellAt(i + this.sizeX).state +
        this.getCellAt(i + this.sizeX + 1).state
      let isAlive = this.cells[i].state === 1
      this.cells[i].flip |= (isAlive && !this.survival[count]) || (!isAlive && this.birth[count])
    }
    /* Phase 2, filp the cells state */
    i = this.length
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
        cell.flip |= cell.state !== 1
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
      cell.state = 1
      cell.flip = true
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

  /**
   * Expose the rules.
   */
  get Rules () {
    return {
      b: this.birth,
      s: this.survival
    }
  }
}
