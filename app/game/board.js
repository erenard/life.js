export default class Board {
  constructor ({ gridWidth = 400, gridHeight = 400, cellRadius = 2, seedRatio = 0.3 } = {}) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.seedRatio = seedRatio
    this.cellRadius = cellRadius
  }

  get pixelWidth () {
    return this.gridWidth * this.cellRadius
  }

  get pixelHeight () {
    return this.gridHeight * this.cellRadius
  }

  /**
   * Convert pixel coordinates to cell coordinates.
   *
   * @param {number} x - Mouse x coordinate in pixels, relative to the board.
   * @param {number} y - Mouse y coordinate in pixels, relative to the board.
   * @returns {[number, number]} - Cell coordinates.
   */
  pixelToCellCoordinates (x, y) {
    return [
      Math.floor(x / this.cellRadius),
      Math.floor(y / this.cellRadius)
    ]
  }
}
