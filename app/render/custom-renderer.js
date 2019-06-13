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
   * @param {number} cellSize - Cell sprite's size.
   */
  constructor (width, height, viewport, grid, cellSize) {
    this.canvas = document.createElement('canvas')
    this.canvas.height = height
    this.canvas.width = width
    viewport.appendChild(this.canvas)

    this.gl = this.canvas.getContext('webgl')
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.viewport(0, 0, width, height)
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
