import {
  getState,
  updateCell,
  setCount
} from './binary-cell.js'

function getCellAt (cells, length, index) {
  return cells[index % length]
}

function countNeighboursSafe (cells, length, sizeX, i) {
  return getState(getCellAt(cells, length, i - sizeX - 1)) +
    getState(getCellAt(cells, length, i - sizeX)) +
    getState(getCellAt(cells, length, i - sizeX + 1)) +
    getState(getCellAt(cells, length, i - 1)) +
    getState(getCellAt(cells, length, i + 1)) +
    getState(getCellAt(cells, length, i + sizeX - 1)) +
    getState(getCellAt(cells, length, i + sizeX)) +
    getState(getCellAt(cells, length, i + sizeX + 1))
}

function countNeighboursFast (cells, sizeX, i) {
  return getState(cells[i - sizeX - 1]) +
    getState(cells[i - sizeX]) +
    getState(cells[i - sizeX + 1]) +
    getState(cells[i - 1]) +
    getState(cells[i + 1]) +
    getState(cells[i + sizeX - 1]) +
    getState(cells[i + sizeX]) +
    getState(cells[i + sizeX + 1])
}

/**
 * Game of life algorithm,
 * update the game board.
 *
 * @param {Uint8Array} cells - Cells board.
 * @param {number} length - Cells board's length.
 * @param {number} sizeX - Cells board width.
 * @param {Rules} rules - Rules object.
 */
export default function update (cells, length, sizeX, rules) {
  let i
  /* Phase 1, plant new cells and mark cells for death where appropriate */
  for (i = 0; i < sizeX + 1; i++) {
    cells[i] = setCount(cells[i], countNeighboursSafe(cells, length, sizeX, length + i))
  }

  for (i = sizeX + 1; i < length - (sizeX + 1); i++) {
    cells[i] = setCount(cells[i], countNeighboursFast(cells, sizeX, i))
  }

  for (i = length - (sizeX + 1); i < length; i++) {
    cells[i] = setCount(cells[i], countNeighboursSafe(cells, length, sizeX, i))
  }
  /* Phase 2, flip the cell' states */
  i = length
  while (i--) {
    cells[i] = updateCell(cells[i], rules)
  }
}
