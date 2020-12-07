import {
  getState,
  updateCell,
  setCount
} from './binary-cell.js'

let cells, buffer, sizeX, sizeY, length, rules

addEventListener('message', event => {
  const type = event.data.type
  const data = event.data

  switch (type) {
    case 'init':
      buffer = data.buffer
      cells = new Uint8Array(buffer)
      sizeX = data.board.gridWidth
      sizeY = data.board.gridHeight
      length = sizeX * sizeY
      rules = data.rules
      break
    case 'update':
      update()
      postMessage('render')
      break
    case 'rules':
      rules = data.rules
  }
})

function getCellAt (index) {
  return cells[index % length]
}

function countNeighboursSafe (i) {
  return getState(getCellAt(i - sizeX - 1)) +
    getState(getCellAt(i - sizeX)) +
    getState(getCellAt(i - sizeX + 1)) +
    getState(getCellAt(i - 1)) +
    getState(getCellAt(i + 1)) +
    getState(getCellAt(i + sizeX - 1)) +
    getState(getCellAt(i + sizeX)) +
    getState(getCellAt(i + sizeX + 1))
}

function countNeighboursUnsafe (i) {
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
 */
function update () {
  let i
  /* Phase 1, plant new cells and mark cells for death where appropriate */
  for (i = 0; i < sizeX + 1; i++) {
    cells[i] = setCount(cells[i], countNeighboursSafe(length + i))
  }

  for (i = sizeX + 1; i < length - (sizeX + 1); i++) {
    cells[i] = setCount(cells[i], countNeighboursUnsafe(i))
  }

  for (i = length - (sizeX + 1); i < length; i++) {
    cells[i] = setCount(cells[i], countNeighboursSafe(i))
  }
  /* Phase 2, flip the cell' states */
  i = length
  while (i--) {
    cells[i] = updateCell(cells[i], rules)
  }
}
