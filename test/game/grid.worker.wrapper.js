import Worker from 'tiny-worker'
const path = require('path')

class WrappedWorker extends Worker {
  constructor () {
    super(path.join(path.resolve('.'), 'app/game/grid.worker.js'))
  }
}

export default WrappedWorker
