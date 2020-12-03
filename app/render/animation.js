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
    this.isEvenFrame = false
  }

  init (grid, renderer) {
    stats.init()
    this.grid = grid
    this.renderer = renderer
    this.isEvenFrame = false
  }

  /**
   * Wrap the process of updating the game and drawing it.
   */
  mainLoop () {
    if (this.grid && this.renderer) {
      this.grid.update(this.isEvenFrame)
      this.isEvenFrame = !this.isEvenFrame
      this.renderer.render(this.isEvenFrame)
    }
  }

  /**
   * RequestAnimationFrame callback for animation.
   */
  animate () {
    if (this.running) {
      stats.begin()
      this.mainLoop()
      stats.end()
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  /**
   * RequestAnimationFrame callback for benchmarking.
   */
  benchmark () {
    if (this.running) {
      let frames = 100
      while (frames--) {
        stats.begin()
        this.grid.update(this.isEvenFrame)
        stats.end()
        this.isEvenFrame = !this.isEvenFrame
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
