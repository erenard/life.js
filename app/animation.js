import Stats from 'stats.js';
/**
 * Canvas animator, or 'the main loop',
 * call the parameter method callback at 60fps.
 * @param {Function} callback
 */
export default function (callback) {
	var running = true,
		stats = new Stats(),
        /**
         * 60fps timer, using the browser capability if available
         * Source: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
         */
		requestAnimationFrame = (function () {
            // shim layer with setTimeout fallback
			if (!window.requestAnimationFrame) {
				if (window.webkitRequestAnimationFrame) {
					return window.webkitRequestAnimationFrame;
				} else if (window.mozRequestAnimationFrame) {
					return window.mozRequestAnimationFrame;
				} else if (window.oRequestAnimationFrame) {
					return window.oRequestAnimationFrame;
				} else if (window.msRequestAnimationFrame) {
					return window.msRequestAnimationFrame;
				} else {
					return function (animateCallback) {
						window.setTimeout(animateCallback, 1000 / 60);
					};
				}
			} else {
				return window.requestAnimationFrame;
			}
		}()),
        /**
         * The loop itself, running if used to stop
         * or continue the animation
         */
		animate = function () {
			if (running) {
				stats.begin();
				callback();
				stats.end();
				requestAnimationFrame(animate);
			}
		},
		that = {
            /**
             * Initialize and start the animator
             */
			start: function () {
				running = true;
				animate();
			},
            /**
             * stop the animator and return the average
             * fps of the last execution
             * @return {String} last execution's fps
             */
			stop: function () {
				running = false;
			}
		};
	document.body.appendChild(stats.dom);
	return that;
}
