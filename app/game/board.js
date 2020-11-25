export default class Board {
  constructor ({ gridWidth = 400, gridHeight = 400, cellRadius = 2, seedRatio = 0.3 } = {}) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.seedRatio = seedRatio
    this.cellRadius = cellRadius
  }
}
