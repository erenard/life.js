import Animation from './animation'
import Grid from './grid'
import Renderer from './renderer'

class Game {
  constructor () {
    this.animation = new Animation()
  }

  init (viewport) {
    const radius = 4
    const width = window.innerWidth || 1280
    const height = window.innerHeight || 1024
    this.grid = new Grid(Math.floor(width / radius), Math.floor(height / radius))
    this.renderer = new Renderer(width, height, viewport, this.grid, radius)
    this.animation.init(this.grid, this.renderer)
  }
}

const instance = new Game()

export default instance
