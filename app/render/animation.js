import requestAnimationFrame from './request-animation-frame'
import stats from '../gui/stats'

/**
 * Canvas animator, or 'the main loop',
 * call the mainLoop method at 60fps.
 */
export default class Animation {
  constructor () {
    this.grid = null
    this.renderer = null
    this.running = false
    this.benchmarking = false
  }

  init (grid, renderer) {
    stats.init()
    this.grid = grid
    this.renderer = renderer
  }

  mainLoop () {
    // This function will wrap the whole process of updating the game and drawing it
    if (this.grid && this.renderer) {
      this.grid.update()
      this.renderer.render()
    }
  }

  /**
   * The loop itself, running if used to stop
   * or continue the animation.
   */
  animate () {
    if (this.running) {
      stats.begin()
      this.mainLoop()
      stats.end()
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  benchmark () {
    if (this.running) {
      let frames = 100
      while (frames--) {
        stats.begin()
        this.grid.update()
        stats.end()
      }
      requestAnimationFrame(this.benchmark.bind(this))
    }
  }

  /**
   * Initialize and start the animator.
   */
  start () {
    this.running = true
    if (this.benchmarking) this.benchmark()
    else this.animate()
  }

  /**
   * Stop the animator and return the average
   * fps of the last execution.
   */
  stop () {
    this.running = false
  }
}
