import * as PIXI from 'pixi.js';

/**
 * Do the drawings on the canvas
 */
export default class Renderer {
  /**
   * Constructor
	 * @param {Number} size Cell sprite's size
	 * @param {Number} size Cell sprite's size
   * @param {Element} viewport dom element to use
	 * @param {Grid} grid
   */
	constructor(width, height, viewport, grid, size) {
		this.renderer = new PIXI.autoDetectRenderer(width, height);
		viewport.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();
		this.container = new PIXI.particles.ParticleContainer(
			grid.Size.x * grid.Size.y,
			{ alpha: true }
		);
		this.cellTexture = this.generateCellTexture();
		this.initStage(grid, size);
	}

	/**
	 * @param {Grid} grid
	 * @param {Number} size Cell sprite's size
	 */
	initStage(grid, size) {
		var x, y, collumn, cell, texture = this.generateCellTexture(size);
		x = grid.Size.x;
		while (x--) {
			collumn = grid.cells[x];
			y = grid.Size.y;
			while (y--) {
				cell = collumn[y];
				cell.sprite = new PIXI.Sprite(texture);
				cell.sprite.x = x * size;
				cell.sprite.y = y * size;
				cell.sprite.alpha = 0;
				this.container.addChild(cell.sprite);
			}
		}
		this.stage.addChild(this.container);
	}

	/**
	 * @param {Number} size Cell sprite's size
	 */
	generateCellTexture (size) {
		const graphic = new PIXI.Graphics();
		graphic.beginFill(0x7fff7f);
		graphic.drawRect(0, 0, size - 1, size - 1);
		return this.renderer.generateTexture( graphic );
	}

  /** draws the game board with each cells */
	render () {
		this.renderer.render(this.stage);
	}
}
