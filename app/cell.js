/**
 * Cell
 */
export default class Cell {
	/**
	 * Initialize a Cell.
	 */
	constructor () {
		// 0 or 1, the cell value used to count cells
		this.state = 0;
		this.flip = false;
		this.age = -1;
		this.sprite = null;
	}

	/**
	 * Update the cell state.
	 */
	update () {
		if (this.flip) {
			this.flip = false;
			if (this.state === 0) {
				this.sprite.alpha = 0.5;
				this.age = 0;
				this.state = 1;
			} else {
				this.sprite.alpha = 0;
				this.age = -1;
				this.state = 0;
			}
		} else {
			this.age += this.state;
			if (this.age === 5) {
				this.sprite.alpha = 1;
			}
		}
	}
}
