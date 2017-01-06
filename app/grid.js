import Cell from './cell';

/**
 * grid: implements the game algorithm
 * @param {Number} sizeX : game board's width
 * @param {Number} sizeY : game board's height
 * @param {life.userInterface} userInterface : the page's gui
 */
export default function (sizeX, sizeY, userInterface) {
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
			cells[x][y] = new Cell();
		}
	}
	userInterface.registerGrid(that);
	return that;
}
