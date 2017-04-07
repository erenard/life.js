import * as PIXI from 'pixi.js';

export const CellTextures = {
	youngCell: null,
	oldCell: null,
	deadCell: null
};

export default class TextureLoader {
	constructor (size) {
		this.size = size;
	}

	generateCellTextures(renderer) {
		this.renderer = renderer.renderer;
		CellTextures.youngCell = this.generateCellTexture(renderer.renderer, 0x007f00);
		CellTextures.oldCell = this.generateCellTexture(renderer.renderer, 0x7fff7f);
		CellTextures.deadCell = this.generateCellTexture(renderer.renderer, 0x000000);
	}

  /**
   * prepare a cell's sprite and store it for a later use
   * @param {String} color : fill style
   */
	generateCellTexture (renderer, color) {
		const graphic = new PIXI.Graphics();
		graphic.beginFill(color);
		graphic.drawRect(0, 0, this.size - 1, this.size - 1);
		return renderer.generateTexture( graphic );
	}
}
