import requestAnimationFrame from './request-animation-frame'
import Stats from 'stats.js'

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
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  /**
   * The loop itself, running if used to stop
   * or continue the animation.
   */
  animate () {
    if (this.running) {
      this.stats.begin()
      this.callback()
      this.stats.end()
      requestAnimationFrame(this.animate)
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
