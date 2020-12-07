import update from './grid-updater.js'

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
      update(cells, length, sizeX, rules)
      postMessage('render')
      break
    case 'rules':
      rules = data.rules
  }
})
