import {CellTextures} from 'texture-loader';
import * as PIXI from 'pixi.js';

/**
 * Cell
 */
export default class Cell {
	constructor () {
		// 0 or 1, the cell value used to count cells
		this.state = 0;
		this.flip = false;
		this.age = -1;
		this.sprite = new PIXI.Sprite(CellTextures.youngCell);
	}

	update () {
		if (this.flip) {
			this.flip = false;
			if (this.state === 0) {
				this.sprite.texture = CellTextures.youngCell;
				this.age = 0;
				this.state = 1;
			} else {
				this.sprite.texture = CellTextures.deadCell;
				this.age = -1;
				this.state = 0;
			}
		} else {
			this.age += this.state;
			if (this.age === 5) {
				this.sprite.texture = CellTextures.oldCell;
			}
		}
	}

}
