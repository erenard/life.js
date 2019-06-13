import * as PIXI from 'pixi.js'

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
  constructor (width, height, viewport, grid, size) {
    this.renderer = PIXI.autoDetectRenderer(width, height) //, {antialias: false, transparent: false, resolution: 1}
    viewport.appendChild(this.renderer.view)
    this.stage = new PIXI.Container()
    this.container = new PIXI.particles.ParticleContainer(
      grid.Size.x * grid.Size.y,
      { alpha: true }
    )
    this.cellTexture = this.generateCellTexture(size)
    let i = grid.Size.length
    let cell, position
    while (i--) {
      position = grid.indexToXy(i)
      cell = grid.cells[i]
      cell.sprite = new PIXI.Sprite(this.cellTexture)
      cell.sprite.x = position.x * size
      cell.sprite.y = position.y * size
      cell.sprite.alpha = 0
      this.container.addChild(cell.sprite)
    }
    this.stage.addChild(this.container)
  }

  /**
   * Generate a cell texture.
   *
   * @param {number} size - Cell's texture size.
   */
  generateCellTexture (size) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('height', size)
    canvas.setAttribute('width', size)
    const context = canvas.getContext('2d', { alpha: false })
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, size, size)
    return PIXI.Texture.fromCanvas(canvas)
  }

  /**
   * Draws the game board with each cells.
   */
  render () {
    this.renderer.render(this.stage)
  }
}
