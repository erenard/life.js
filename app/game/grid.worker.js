import { update as stateUpdate, Rules } from './cell'

var sizeX = 1
var length = 1
var cellStates = []
var cellCounts = []

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
  switch (e.data.type) {
    case 'initialize':
      initialize(e)
      break
    case 'update':
      update()
      break
    case 'setCellStates':
      setCellStates(e)
      break
  }
}

const initialize = e => {
  length = e.data.length
  cellStates = new Uint8Array(length)
  cellCounts = new Array(length)
  sizeX = e.data.sizeX
  Rules = e.data.rules
  console.log(Rules)
}

const setCellStates = e => {
  const uint8Array = new Uint8Array(e.data.cellStates)
  cellStates.set(uint8Array)
}

const update = () => {
  console.log(cellStates)
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

  console.log(cellCounts)
  /* Phase 2, flip the cells state */
  let i = length
  while (i--) {
    cellStates[i] = stateUpdate(cellStates[i], cellCounts[i])
  }

  console.log(cellStates)
  postMessage(cellStates)
}
