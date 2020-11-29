/**
 * 60fps timer, using the browser capability if available.
 * Source: http://paulirish.com/2011/requestanimationframe-for-smart-animating/.
 */
const requestAnimationFrame = (function () {
// shim layer with setTimeout fallback
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame
  } else if (window.webkitRequestAnimationFrame) {
    return window.webkitRequestAnimationFrame
  } else if (window.mozRequestAnimationFrame) {
    return window.mozRequestAnimationFrame
  } else if (window.oRequestAnimationFrame) {
    return window.oRequestAnimationFrame
  } else if (window.msRequestAnimationFrame) {
    return window.msRequestAnimationFrame
  } else {
    return function (animateCallback) {
      window.setTimeout(animateCallback, 1000 / 60)
    }
  }
}())

export default requestAnimationFrame
