
export default class Sprite {
	constructor (size) {
		this.size = size;
		this.youngCell = this.createCellSprite('rgba(0, 127, 0, 1)');
		this.oldCell = this.createCellSprite('rgba(127, 255, 127, 1)');
		this.deadCell = this.createCellSprite('rgba(0, 0, 0, 1)');
	}

    /**
     * prepare a cell's sprite and store it for a later use
     * @param {String} color : fill style
     */
	createCellSprite (color) {
		var sprite = window.document.createElement('canvas'),
			context;
		sprite.setAttribute('width', (this.size - 1) + 'px');
		sprite.setAttribute('height', (this.size - 1) + 'px');
		context = sprite.getContext('2d');
		context.fillStyle = color;
		context.rect(0, 0, this.size, this.size);
		context.fill();
		return sprite;
	}

	get YoungCell () {
		return this.youngCell;
	}

	get OldCell () {
		return this.oldCell;
	}

	get DeadCell () {
		return this.deadCell;
	}
}
