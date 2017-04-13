import * as PIXI from 'pixi.js';

/**
 * Do the drawings on the canvas
 */
export default class Renderer {
    /**
     * Initialize the renderer.
     *
     * @param {number} width - Width of the renderer viewport.
     * @param {number} height - Height of the renderer viewport.
     * @param {Element} viewport - DOM element to containing the viewport.
     * @param {Grid} grid - Simulation's model.
     * @param {number} size - Cell sprite's size.
     */
	constructor(width, height, viewport, grid, size) {
		this.renderer = new PIXI.autoDetectRenderer(width, height);//, {antialias: false, transparent: false, resolution: 1}
		viewport.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();
		this.container = new PIXI.particles.ParticleContainer(
			grid.Size.x * grid.Size.y,
			{ alpha: true }
		);
		this.cellTexture = this.generateCellTexture(size);
		var x, y, collumn, cell;
		x = grid.Size.x;
		while (x--) {
			collumn = grid.cells[x];
			y = grid.Size.y;
			while (y--) {
				cell = collumn[y];
				cell.sprite = new PIXI.Sprite(this.cellTexture);
				cell.sprite.x = x * size;
				cell.sprite.y = y * size;
				cell.sprite.alpha = 0;
				this.container.addChild(cell.sprite);
			}
		}
		this.stage.addChild(this.container);
	}

	/**
     * Generate a cell texture.
     *
	 * @param {number} size - Cell's texture size.
	 */
	generateCellTexture (size) {
		const graphic = new PIXI.Graphics();
		graphic.beginFill(0x7fff7f);
		graphic.drawRect(0, 0, size - 1, size - 1);
		return this.renderer.generateTexture( graphic );
	}

    /**
     * Draws the game board with each cells.
     */
	render () {
		this.renderer.render(this.stage);
	}
}
