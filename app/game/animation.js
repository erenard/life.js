import requestAnimationFrame from './request-animation-frame'
import stats from '../gui/stats'

/**
 * Canvas animator, or 'the main loop',
 * call the parameter method callback at 60fps.
 *
 * @param {Function} callback - The function to be called back.
 */
export default class Animation {
  constructor (callback) {
    this.callback = callback
    this.running = true
  }

  /**
   * The loop itself, running if used to stop
   * or continue the animation.
   */
  animate () {
    if (this.running) {
      stats.begin()
      this.callback()
      stats.end()
      requestAnimationFrame(this.animate.bind(this))
    }
  }

  /**
   * Initialize and start the animator.
   */
  start () {
    this.running = true
    this.animate()
  }

  /**
   * Stop the animator and return the average
   * fps of the last execution.
   */
  stop () {
    this.running = false
  }
}
