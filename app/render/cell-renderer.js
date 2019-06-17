import * as twgl from 'twgl.js'
import vertex from './cell-vertex.glsl'
import fragment from './cell-fragment.glsl'

/**
 * Initialize the renderer.
 *
 * @param {number} width - Width of the renderer viewport.
 * @param {number} height - Height of the renderer viewport.
 * @param {Element} viewport - DOM element to containing the viewport.
 * @param {Grid} grid - Simulation's model.
 * @param {number} cellSize - Cell sprite's size.
 */
export default function CellRenderer (width, height, viewport, grid, cellSize) {
  width = Math.floor(width / cellSize) * cellSize
  height = Math.floor(height / cellSize) * cellSize

  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width
  viewport.appendChild(canvas)

  const gl = twgl.getContext(canvas, { depth: false, antialiasing: false })
  const drawParticle = twgl.createProgramInfo(gl, [vertex, fragment])
  const columnCount = width / cellSize
  const rowCount = height / cellSize
  const pointPosition = []
  const pointAlpha = []
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      pointPosition.push(column)
      pointPosition.push(row)
      pointAlpha.push((column + row) % 2)
    }
  }
  const pointsObject = {
    aVertexPosition: { data: pointPosition, numComponents: 2 },
    aVertexAlpha: { data: pointAlpha, numComponents: 1 }
  }
  const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject)
  twgl.setBuffersAndAttributes(gl, drawParticle, pointsBuffer)

  const translationMatrix = twgl.m4.identity()
  twgl.m4.translate(translationMatrix, [-1, 1, 0], translationMatrix)
  twgl.m4.scale(translationMatrix, [(2 * cellSize / width), (-2 * cellSize / height), 1.0], translationMatrix)
  twgl.m4.translate(translationMatrix, [0.5, 0.5, 0], translationMatrix)

  gl.clearColor(0, 0, 0, 1)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.DST_COLOR)
  gl.useProgram(drawParticle.program)
  twgl.setUniforms(drawParticle, {
    uPointSize: cellSize,
    uTranslationMatrix: translationMatrix
  })

  return {
    /**
     * Draws the game board with each cells.
     */
    render () {
      gl.clear(gl.COLOR_BUFFER_BIT)
      // twgl.resizeCanvasToDisplaySize(gl.canvas)
      // console.log(gl.canvas.width, gl.canvas.height)
      // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      // updates the particles alpha
      twgl.setAttribInfoBufferFromArray(gl, pointsBuffer.attribs.aVertexAlpha, grid.cells.map(cell => cell.sprite.alpha))
      // drawing particles
      twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS)
    }
  }
}
