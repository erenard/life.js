var sizeX = 1
var length = 1
var cellStates = []

function getCellAt (index) {
  return cellStates[index % length]
}

function countNeighboursSafe (i) {
  return getCellAt(i - sizeX - 1) +
  getCellAt(i - sizeX) +
  getCellAt(i - sizeX + 1) +
  getCellAt(i - 1) +
  getCellAt(i + 1) +
  getCellAt(i + sizeX - 1) +
  getCellAt(i + sizeX) +
  getCellAt(i + sizeX + 1)
}

function countNeighboursUnsafe (i) {
  return cellStates[i - sizeX - 1] +
  cellStates[i - sizeX] +
  cellStates[i - sizeX + 1] +
  cellStates[i - 1] +
  cellStates[i + 1] +
  cellStates[i + sizeX - 1] +
  cellStates[i + sizeX] +
  cellStates[i + sizeX + 1]
}

onmessage = function (e) {
  cellStates = e.data.cellStates
  sizeX = e.data.sizeX
  length = cellStates.length
  let cellCounts = new Array(length)

  /* Phase 1, plant new cells and mark cells for death where appropriate */
  for (let i = 0; i < sizeX + 1; i++) {
    cellCounts[i] = countNeighboursSafe(length + i)
  }

  for (let i = sizeX + 1; i < length - (sizeX + 1); i++) {
    cellCounts[i] = countNeighboursUnsafe(i)
  }

  for (let i = length - (sizeX + 1); i < length; i++) {
    cellCounts[i] = countNeighboursSafe(i)
  }

  postMessage(cellCounts)
}
