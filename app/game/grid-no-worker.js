import BinaryCell from './binary-cell.js'

const binaryCell = BinaryCell()

const getEvenState = binaryCell.getEvenState
const getOddState = binaryCell.getOddState
const setEvenState = binaryCell.setEvenState
const setOddState = binaryCell.setOddState
const updateEven = binaryCell.updateEven
const updateOdd = binaryCell.updateOdd

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
    this.rules = rules.binary
    /* game board initialisation */
    this.cells = new Uint8Array(this.length)
  }

  countNeighboursSafe (i, isEvenFrame) {
    const getState = isEvenFrame ? getEvenState : getOddState
    return getState(this.getCellAt(i - this.sizeX - 1)) +
    getState(this.getCellAt(i - this.sizeX)) +
    getState(this.getCellAt(i - this.sizeX + 1)) +
    getState(this.getCellAt(i - 1)) +
    getState(this.getCellAt(i + 1)) +
    getState(this.getCellAt(i + this.sizeX - 1)) +
    getState(this.getCellAt(i + this.sizeX)) +
    getState(this.getCellAt(i + this.sizeX + 1))
  }

  countNeighboursUnsafe (i, isEvenFrame) {
    const getState = isEvenFrame ? getEvenState : getOddState
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
   *
   * @param {boolean} isEvenFrame - When true: read the even frame, write the odd one.
   */
  update (isEvenFrame) {
    const updateCell = isEvenFrame ? updateOdd : updateEven
    let i
    for (i = 0; i < this.sizeX + 1; i++) {
      this.cells[i] = updateCell(this.cells[i], this.countNeighboursSafe(this.length + i, isEvenFrame), this.rules)
    }

    for (i = this.sizeX + 1; i < this.length - (this.sizeX + 1); i++) {
      this.cells[i] = updateCell(this.cells[i], this.countNeighboursUnsafe(i, isEvenFrame), this.rules)
    }

    for (i = this.length - (this.sizeX + 1); i < this.length; i++) {
      this.cells[i] = updateCell(this.cells[i], this.countNeighboursSafe(i, isEvenFrame), this.rules)
    }
  }

  /**
   * Fill the game board with cells.
   *
   * @param {number} ratio - Filling ratio from 0.0 to 1.0.
   * @param {boolean} isEvenFrame - When true: write the even frame.
   */
  random (ratio, isEvenFrame) {
    const setState = isEvenFrame ? setEvenState : setOddState
    let i = this.length
    while (i--) {
      this.cells[i] = setState(this.cells[i], Math.random() + ratio >= 1)
    }
  }

  /**
   * Clear the game board.
   *
   * @param {boolean} isEvenFrame - When true: write the even frame.
   */
  clear (isEvenFrame) {
    const setState = isEvenFrame ? setEvenState : setOddState
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

  log (fn, title) {
    const lines = []
    for (let y = 0; y < this.sizeY; y++) {
      lines[y] = []
      for (let x = 0; x < this.sizeX; x++) {
        lines[y][x] = fn(this.cells[this.xyToIndex(x, y)])
      }
    }
    console.log(title)
    console.table(lines)
  }
}
