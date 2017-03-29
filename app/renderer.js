import Sprite from 'sprite';

/**
 * Do the drawings on the canvas
 */
export default class Renderer {
    /**
     * Constructor
     * @param {Element} canvas
     * @param {Number} size
     * @param {Grid} grid
     */
	constructor(canvas, size, grid) {
		this.ctx = canvas.getContext('2d');
        /// disable image smoothing for sake of speed
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.oImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;  ///future...

		this.size = size;
		this.sizeX = grid.Size.x;
		this.sizeY = grid.Size.y;
		this.cells = grid.Cells;
		this.sprite = new Sprite(size);
	}

    /** draws the game board with each cells */
	render () {
		var x, y, collumn, cell;
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
		x = this.sizeX;
		while (x--) {
			collumn = this.cells[x];
			y = this.sizeY;
			while (y--) {
				cell = collumn[y];
				if (cell.flip) {
					cell.flip = false;
					if (cell.state === 0) {
						this.ctx.drawImage(this.sprite.YoungCell, x * this.size, y * this.size);
						cell.age = 0;
						cell.state = 1;
					} else {
						this.ctx.drawImage(this.sprite.DeadCell, x * this.size, y * this.size);
						cell.age = -1;
						cell.state = 0;
					}
				} else {
					cell.age += cell.state;
					if (cell.age === 5) {
						this.ctx.drawImage(this.sprite.OldCell, x * this.size, y * this.size);
					}
				}
			}
		}
	}
}
