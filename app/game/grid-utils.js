import {
  setState
} from './binary-cell.js'

/**
 * Fill the game board with cells.
 *
 * @param {UInt8Array} cells - Cells array.
 * @param {number} length - Cells array size.
 * @param {number} ratio - Filling ratio from 0.0 to 1.0.
 */
export function random (cells, length, ratio) {
  let i = length
  while (i--) {
    cells[i] = setState(cells[i], Math.random() + ratio >= 1)
  }
}

/**
 * Clear the game board.
 *
 * @param {UInt8Array} cells - Cells array.
 * @param {number} length - Cells array size.
 */
export function clear (cells, length) {
  let i = length
  while (i--) {
    cells[i] = setState(cells[i], 0)
  }
}

export function indexToXy (length, sizeX, i) {
  i = i % length
  return {
    x: i % sizeX,
    y: Math.floor(i / sizeX)
  }
}

export function xyToIndex (length, sizeX, x, y) {
  return (sizeX * y + x) % length
}
