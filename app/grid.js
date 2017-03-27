import Cell from './cell';

/**
 * grid: implements the game algorithm
 * @param {Number} sizeX : game board's width
 * @param {Number} sizeY : game board's height
 */
export default class {
	constructor (sizeX, sizeY) {
		let x, y;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.birth = [false, false, false, false, false, false, false, false, false];
		this.survival = [false, false, false, false, false, false, false, false, false];

        /* game board initialisation */
		this.cells = [];
		for (x = 0; x < this.sizeX; x = x + 1) {
			this.cells[x] = [];
			for (y = 0; y < this.sizeY; y = y + 1) {
				this.cells[x][y] = new Cell();
			}
		}
	}

    /**
     * Game of life algorithm
     * Update the game board
     */
	update () {
		var xm1 = this.cells[this.sizeX - 2], //column x minus 1
			xs0 = this.cells[this.sizeX - 1], //column x
			xp1 = this.cells[0], //column x plus 1
			ym1, //index y minus 1
			yp1, //index y plus 1
			cell, //current cell
			isAlive, //current cell state
			count, //neighboring cells count
			x, //index x
			y; //index y
        /* Phase 1, plant new cells and mark cells for death where appropriate */
		x = this.sizeX;
		while (x--) {
			y = this.sizeY;
			while (y--) {
				ym1 = (y - 1 + this.sizeY) % this.sizeY;
				yp1 = (y + 1) % this.sizeY;
				count = xm1[ym1].state + xs0[ym1].state + xp1[ym1].state
                      + xm1[y].state                    + xp1[y].state
                      + xm1[yp1].state + xs0[yp1].state + xp1[yp1].state;
				cell = xs0[y];
				isAlive = cell.state === 1;
				cell.flip |= (isAlive && !this.survival[count]) || (!isAlive && this.birth[count]);
			}
			xp1 = xs0;
			xs0 = xm1;
			xm1 = this.cells[(x - 2 + this.sizeX) % this.sizeX];
		}
	}

    /**
     * Fill the game board with cells
     * @param {Number} ratio : filling ratio from 0.0 to 1.0
     */
	random (ratio) {
		var x,
			y,
			cell;
		for (x = 0; x < this.sizeX; x = x + 1) {
			for (y = 0; y < this.sizeY; y = y + 1) {
				if (Math.random() + ratio > 1) {
					cell = this.cells[x][y];
					cell.flip |= cell.state !== 1;
				}
			}
		}
	}

    /**
     * Clear the game board
     */
	clear () {
		var x,
			y,
			cell;
		for (x = 0; x < this.sizeX; x = x + 1) {
			for (y = 0; y < this.sizeY; y = y + 1) {
				cell = this.cells[x][y];
				cell.state = 1;
				cell.flip = true;
			}
		}
	}

    /**
     * Expose the game board
     */
	get Cells () {
		return this.cells;
	}

    /**
     * Read-only access to the game board's bounds
     */
	get Size () {
		return {
			x: this.sizeX,
			y: this.sizeY
		};
	}

	get Rules () {
		return {
			b: this.birth,
			s: this.survival
		};
	}
}
