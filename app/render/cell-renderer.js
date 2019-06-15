import * as twgl from 'twgl.js'

// https://github.com/pixijs/pixi.js/tree/master/packages/particles/src
const vDraw = `
precision mediump float;

attribute vec2 aVertexPosition;
attribute float aVertexAlpha;

uniform float uPointSize;
uniform mat4 uTranslationMatrix;

varying float vAlpha;

void main(void) {
  vAlpha = aVertexAlpha;
  gl_Position = uTranslationMatrix * vec4(aVertexPosition, 0.0, 1.0);
  gl_PointSize = uPointSize;
}`
const fDraw = `
precision mediump float;

varying float vAlpha;

void main(void) {
  gl_FragColor = vec4(0.0, 1.0, 0.0, vAlpha);
}`

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
  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width
  viewport.appendChild(canvas)

  const gl = twgl.getContext(canvas, { depth: false, antialiasing: false })
  const drawParticle = twgl.createProgramInfo(gl, [vDraw, fDraw])
  const columnCount = Math.floor(width / cellSize)
  const rowCount = Math.floor(height / cellSize)
  const pointPosition = []
  const pointAlpha = []
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      pointPosition.push(column)
      pointPosition.push(row)
      pointAlpha.push((column + row) % 2)
    }
  }
  // pointPosition.push(1, 0)
  const pointsObject = {
    aVertexPosition: { data: pointPosition, numComponents: 2 },
    aVertexAlpha: { data: pointAlpha, numComponents: 1 }
  }
  const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject)

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
      // drawing particles
      twgl.setBuffersAndAttributes(gl, drawParticle, pointsBuffer)
      twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS)
    }
  }
}
