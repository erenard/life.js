import update from '../../grid-updater.js'

let cells, sizeX, length, rules

addEventListener('message', event => {
  const type = event.data.type
  const data = event.data
  switch (type) {
    case 'init':
      cells = new Uint8Array(data.buffer)
      sizeX = data.board.gridWidth
      length = sizeX * sizeX
      rules = data.rules
      break
    case 'update':
      update(cells, length, sizeX, rules)
      postMessage({ type: 'render' })
      break
    case 'rules':
      rules = data.rules
  }
})
