var sizeX = 1
var length = 1
var cellStates = []
var cellCounts = []
var rules = {
  b: [false, false, false, false, false, false, false, false, false],
  s: [false, false, false, false, false, false, false, false, false]
}

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
  const type = e.data.type
  switch (type) {
    case 'initialize':
      initialize(e)
      break
    case 'update':
      update()
      break
    case 'setCellStates':
      setCellStates(e)
      break
    case 'setRules':
      setRules(e)
      break
    default:
      const error = new Error('unknown message type ' + type)
      console.log(error)
      throw error
  }
}

const initialize = e => {
  length = e.data.length
  cellStates = new Uint8Array(length)
  cellCounts = new Array(length)
  sizeX = e.data.sizeX
}

const setRules = e => {
  rules.b = e.data.birth
  rules.s = e.data.survival
}

const setCellStates = e => {
  const uint8Array = new Uint8Array(e.data.cellStates)
  cellStates.set(uint8Array)
}

const stateUpdate = (state, count) => {
  if (state === 1 && !rules.s[count]) {
    // Death
    return 0
  } else if (state === 0 && rules.b[count]) {
    // Newborn
    return 1
  }
  return state
}

const update = () => {
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

  /* Phase 2, flip the cells state */
  let i = length
  while (i--) {
    cellStates[i] = stateUpdate(cellStates[i], cellCounts[i])
  }
  postMessage(cellStates)
}
