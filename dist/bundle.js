/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Canvas animator, or 'the main loop',
 * call the parameter method callback at 60fps.
 * @param {Function} callback
 * @param {life.userInterface} userInterface : the page's gui
 */
 /* harmony default export */ exports["a"] = function (callback, userInterface) {
    var running = true,
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
                callback();
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
    userInterface.registerAnimation(that);
    return that;
};;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(4);


/**
 * grid: implements the game algorithm
 * @param {Number} sizeX : game board's width
 * @param {Number} sizeY : game board's height
 * @param {life.userInterface} userInterface : the page's gui
 */
/* harmony default export */ exports["a"] = function (sizeX, sizeY, userInterface) {
    var cells = [],
        birth = userInterface.rules.b,
        survival = userInterface.rules.s,
        /** Game of life algorithm */
        compute = function () {
            var xm1 = cells[sizeX - 2], //column x minus 1
                xs0 = cells[sizeX - 1], //column x
                xp1 = cells[0], //column x plus 1
                ym1, //index y minus 1
                yp1, //index y plus 1
                cell, //current cell
                isAlive, //current cell state
                count, //neighboring cells count
                x, //index x
                y; //index y
            /* Phase 1, plant new cells and mark cells for death where appropriate */
            x = sizeX;
            while (x--) {
                y = sizeY;
                while (y--) {
                    ym1 = y > 0 ? y - 1 : sizeY - 1;
                    yp1 = y < (sizeY - 1) ? y + 1 : 0;
                    count = xm1[ym1].state + xs0[ym1].state + xp1[ym1].state + xm1[y].state + xp1[y].state + xm1[yp1].state + xs0[yp1].state + xp1[yp1].state;
                    cell = xs0[y];
                    isAlive = cell.state === 1;
                    cell.flip |= (isAlive && !survival[count]) || (!isAlive && birth[count]);
                }
                xp1 = xs0;
                xs0 = xm1;
                xm1 = cells[x - 1 > 0 ? x - 2 : sizeX - 1];
            }
        },
        x,
        y,
        that = {
            /**
             * Update the game board
             */
            update: compute,
            /**
             * Fill the game board with cells
             * @param {Number} ratio : filling ratio from 0.0 to 1.0
             */
            random: function (ratio) {
                var x,
                    y,
                    cell;
                for (x = 0; x < sizeX; x = x + 1) {
                    for (y = 0; y < sizeY; y = y + 1) {
                        if (Math.random() + ratio > 1) {
                            cell = cells[x][y];
                            cell.flip |= cell.state !== 1;
                        }
                    }
                }
            },
            /**
             * Clear the game board
             */
            clear: function () {
                var x,
                    y,
                    cell;
                for (x = 0; x < sizeX; x = x + 1) {
                    for (y = 0; y < sizeY; y = y + 1) {
                        cell = cells[x][y];
                        cell.state = 1;
                        cell.flip = true;
                    }
                }
            },
            /**
             * Expose the game board
             */
            getCells: function () {
                return cells;
            },
            /**
             * Read-only access to the game board's bounds
             */
            size: {
                x: sizeX,
                y: sizeY
            }
        };
    /* game board initialisation */
    for (x = 0; x < sizeX; x = x + 1) {
        cells[x] = [];
        for (y = 0; y < sizeY; y = y + 1) {
            cells[x][y] = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]();
        }
    }
    userInterface.registerGrid(that);
    return that;
};;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Do the drawings on the canvas
 * @param {Element} canvas
 * @param {Number} size
 * @param {life.grid} grid
 * @param {Number} period : time in millisecond between two updates
 */
/* harmony default export */ exports["a"] = function (canvas, size, grid, period) {
    var ctx = canvas.getContext('2d'),
        lastRender = new Date(),
        fpsElement = document.getElementById('fps'),
        sizeX = grid.size.x,
        sizeY = grid.size.y,
        cells = grid.getCells(),
        /**
         * prepare a cell's sprite and store it for a later use
         * @param {String} color : fill style
         */
        sprite = function (color) {
            var sprite = window.document.createElement('canvas'),
                context;
            sprite.setAttribute('width', (size - 1) + 'px');
            sprite.setAttribute('height', (size - 1) + 'px');
            context = sprite.getContext('2d');
            context.fillStyle = color;
            context.rect(0, 0, size, size);
            context.fill();
            return sprite;
        },
        yngCellSprite = sprite("rgba(0, 127, 0, 1)"),
        oldCellSprite = sprite("rgba(127, 255, 127, 1)"),
        dedCellSprite = sprite("rgba(0, 0, 0, 1)"),
        /** draws the game board with each cells */
        render = function () {
            var x, y, collumn, cell;
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            x = sizeX;
            while (x--) {
                collumn = cells[x];
                y = sizeY;
                while (y--) {
                    cell = collumn[y];
                    if (cell.flip) {
                        cell.flip = false;
                        if (cell.state === 0) {
                            ctx.drawImage(yngCellSprite, x * size, y * size);
                            cell.age = 0;
                            cell.state = 1;
                        } else {
                            ctx.drawImage(dedCellSprite, x * size, y * size);
                            cell.age = -1;
                            cell.state = 0;
                        }
                    } else {
                        cell.age += cell.state;
                        if (cell.age === 5) {
                            ctx.drawImage(oldCellSprite, x * size, y * size);
                        }
                    }
                }
            }
        },
        times = new Array(),
        totalTime = 0;
        /// disable image smoothing for sake of speed
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;  ///future...
    /* This function will wrap the whole process of updating the game and drawing it */
    return function () {
        var now = new Date(),
            time = now - lastRender;
        if (time > period) {
            grid.update();
            render();
            if (fpsElement !== null) {
                totalTime += time;
                times.push(time);
                if (times.length > 60) {
                    time = times.shift();
                    totalTime -= time;
                }
                fpsElement.innerHTML = (times.length * 1000 / totalTime) | 0;
            }
            lastRender = now;
        }
    };
};;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_css__);


/* harmony default export */ exports["a"] = function (controls) {
    var birthElements = [
            document.getElementById("b0"),
            document.getElementById("b1"),
            document.getElementById("b2"),
            document.getElementById("b3"),
            document.getElementById("b4"),
            document.getElementById("b5"),
            document.getElementById("b6"),
            document.getElementById("b7"),
            document.getElementById("b8")
        ],
        survivalElements = [
            document.getElementById("s0"),
            document.getElementById("s1"),
            document.getElementById("s2"),
            document.getElementById("s3"),
            document.getElementById("s4"),
            document.getElementById("s5"),
            document.getElementById("s6"),
            document.getElementById("s7"),
            document.getElementById("s8")
        ],
        presetsElement = document.getElementById('presets'),
        stopButtonElement = document.getElementById('stop'),
        startButtonElement = document.getElementById('start'),
        randomButtonElement = document.getElementById('random'),
        clearButtonElement = document.getElementById('clear'),
        ratioElement = document.getElementById('ratio'),
        rules = {
            b: [false, false, false, false, false, false, false, false, false],
            s: [false, false, false, false, false, false, false, false, false]
        },
        index = 0,
        gridComponent = null,
        animationComponent = null,
        updateRules = function () {
            var index;
            for (index = 0; index < 9; index += 1) {
                rules.b[index] = birthElements[index].checked;
                rules.s[index] = survivalElements[index].checked;
            }
            presetsElement.value = 'custom';
        },
        loadPreset = function () {
            var preset = presetsElement.value,
                start = preset.indexOf('b'),
                stop = preset.indexOf('s'),
                length = preset.length,
                index;
            if (length !== 0 && preset !== 'custom' && start !== -1 && stop !== -1 && start < stop) {
                for (index = 0; index < 9; index += 1) {
                    rules.b[index] = false;
                    rules.s[index] = false;
                    birthElements[index].checked = false;
                    survivalElements[index].checked = false;
                }
                for (index = start + 1; index < stop; index += 1) {
                    birthElements[preset.charAt(index)].checked = true;
                    rules.b[preset.charAt(index)] = true;
                }
                for (index = stop + 1; index < length; index += 1) {
                    survivalElements[preset.charAt(index)].checked = true;
                    rules.s[preset.charAt(index)] = true;
                }
            }
        };
    presetsElement.addEventListener('change', loadPreset);
    stopButtonElement.addEventListener('click', function () {
        if (animationComponent !== null) {
            animationComponent.stop();
            stopButtonElement.style.display = 'none';
            if (startButtonElement !== null) {
                startButtonElement.style.display = '';
            }
        }
    });
    startButtonElement.addEventListener('click', function () {
        if (animationComponent !== null) {
            animationComponent.start();
            startButtonElement.style.display = 'none';
            if (stopButtonElement !== null) {
                stopButtonElement.style.display = '';
            }
        }
    });
    randomButtonElement.addEventListener('click', function () {
        var ratioValue;
        if (gridComponent !== null && ratioElement !== null) {
            ratioValue = ratioElement.value;
            if (isNaN(ratioValue) || ratioValue < 0 || ratioValue > 100) {
                ratioValue = 30;
                ratioElement.value = ratioValue;
            }
            gridComponent.random(ratioValue / 100);
        }
    });
    clearButtonElement.addEventListener('click', function () {
        if (gridComponent !== null) {
            gridComponent.clear();
        }
    });
    presetsElement.addEventListener('change', loadPreset);
    for (index = 0; index < 9; index += 1) {
        birthElements[index].addEventListener('change', updateRules);
        survivalElements[index].addEventListener('change', updateRules);
    }
    loadPreset();
    return {
        rules : rules,
        registerGrid : function (grid) {
            gridComponent = grid;
        },
        registerAnimation : function (animation) {
            animationComponent = animation;
        }
    };
};;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Cell
 */
/* harmony default export */ exports["a"] = function () {
    this.state = 0;
    this.flip = false;
    this.age = -1;
};;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "@font-face {\r\n    font-family: subway-ticker;\r\n    src: url(" + __webpack_require__(8) + ");\r\n}\r\n@font-face {\r\n    font-family: pixel-8bit;\r\n    /* Font author: http://www.04.jp.org/ */\r\n    src: url(" + __webpack_require__(7) + ");\r\n}\r\n.box {\r\n    font-family: pixel-8bit;\r\n    font-size: 16px;\r\n    background-color: black;\r\n    display: inline-block;\r\n    color: rgb(0, 127, 0);\r\n    vertical-align: top;\r\n}\r\n.box h1 {\r\n    font-family: subway-ticker;\r\n    font-weight: normal;\r\n    color: rgb(127, 255, 127);\r\n    font-size: 32px;\r\n}\r\n.box div {\r\n    vertical-align: baseline;\r\n    margin-bottom: 10px;\r\n}\r\n.box a {\r\n    color: rgb(127, 255, 127);\r\n}\r\n.box button, .box select, .box input {\r\n    font-family: pixel-8bit;\r\n    font-size: 16px;\r\n    background-color: black;\r\n    color: rgb(127, 255, 127);\r\n}\r\n", ""]);

// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a369d5ae69d27702db1251ae041315be.ttf";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7dc316626726a6192011df8351950103.ttf";

/***/ },
/* 9 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(9)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_interface__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation__ = __webpack_require__(0);





/*global window, document*/
function main(setup) {
	window.addEventListener('load', function () {
		//Cell radius
		var radius = setup.lifeCellSize,
			canvas = document.getElementById('viewport'),
			userInterface = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__user_interface__["a" /* default */])(),
			grid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__grid__["a" /* default */])(Math.floor(canvas.width / radius), Math.floor(canvas.height / radius), userInterface),
			renderer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__renderer__["a" /* default */])(canvas, radius, grid, 1000 / 100),
			animation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__animation__["a" /* default */])(renderer, userInterface);
		grid.random(0.30);
		animation.start();
	}, false);
};

main({lifeCellSize: 4});


/***/ }
/******/ ]);