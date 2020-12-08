import update from '../../grid-updater.js'

export class GridWebWorker {
  constructor () {
    this.cells = null
    this.sizeX = null
    this.length = null
    this.rules = null
  }

  onInit (data) {
    this.cells = new Uint8Array(data.buffer)
    this.sizeX = data.board.gridWidth
    this.length = data.board.gridWidth * data.board.gridHeight
    this.rules = data.rules
  }

  onUpdate (data) {
    update(this.cells, this.length, this.sizeX, this.rules)
    postMessage({ type: 'render' })
  }

  onRules (data) {
    this.rules = data.rules
  }

  onMessage (event) {
    const type = event.data.type
    const data = event.data
    switch (type) {
      case 'init':
        this.onInit(data)
        break
      case 'update':
        this.onUpdate(data)
        break
      case 'rules':
        this.onRules(data)
        break
    }
  }
}

const worker = new GridWebWorker()

addEventListener('message', worker.onMessage.bind(worker))
