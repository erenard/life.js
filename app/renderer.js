import * as PIXI from 'pixi.js';

/**
 * Do the drawings on the canvas
 */
export default class Renderer {
  /**
   * Constructor
   * @param {Element} canvas
   */
	constructor(width, height, viewport) {
		this.renderer = new PIXI.autoDetectRenderer(width, height);
		viewport.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();
		//this.container = new PIXI.particles.ParticleContainer(19200);
		this.container = new PIXI.Container();
	}

	/**
	 * Constructor
	 * @param {Number} size
	 * @param {Grid} grid
	 */
	initStage(size, grid) {
		var x, y, collumn, cell;
		x = grid.Size.x;
		while (x--) {
			collumn = grid.cells[x];
			y = grid.Size.y;
			while (y--) {
				cell = collumn[y];
				cell.sprite.x = x * size;
				cell.sprite.y = y * size;
				this.container.addChild(cell.sprite);
			}
		}
		this.stage.addChild(this.container);
	}

    /** draws the game board with each cells */
	render () {
		//this.renderer.clear();
		this.renderer.render(this.stage);
		/*
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
		*/
	}
}
