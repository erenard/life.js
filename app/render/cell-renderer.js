import * as twgl from 'twgl.js'
import vertex from './cell-vertex.glsl'
import fragment from './cell-fragment.glsl'
import { getAlpha } from '../game/binary-cell.js'

function createPoints (width, height, cellSize) {
  const columnCount = width / cellSize
  const rowCount = height / cellSize
  const pointPositions = new Float32Array(rowCount * columnCount * 2)
  const pointAlphas = new Float32Array(rowCount * columnCount)
  let positionIndex = 0
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      pointPositions[positionIndex++] = column
      pointPositions[positionIndex++] = row
      pointAlphas[row * columnCount + column] = (column + row) % 2
    }
  }
  return {
    aVertexPosition: { data: pointPositions, numComponents: 2 },
    aVertexAlpha: { data: pointAlphas, numComponents: 1 }
  }
}

function createScene (gl, width, height, cellSize) {
  gl.clearColor(0, 0, 0, 1)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.DST_COLOR)

  const drawParticle = twgl.createProgramInfo(gl, [vertex, fragment])

  const pointsObject = createPoints(width, height, cellSize)

  const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject)
  twgl.setBuffersAndAttributes(gl, drawParticle, pointsBuffer)

  gl.useProgram(drawParticle.program)

  const translationMatrix = twgl.m4.identity()
  twgl.m4.translate(translationMatrix, [-1, 1, 0], translationMatrix)
  twgl.m4.scale(translationMatrix, [(2 * cellSize / width), (-2 * cellSize / height), 1.0], translationMatrix)
  twgl.m4.translate(translationMatrix, [0.5, 0.5, 0], translationMatrix)

  twgl.setUniforms(drawParticle, {
    uPointSize: cellSize,
    uTranslationMatrix: translationMatrix
  })

  return {
    pointsObject,
    pointsBuffer
  }
}

/**
 * Initialize the renderer.
 *
 * @param {Element} viewport - DOM element to containing the viewport.
 * @param {Grid} grid - Simulation's model.
 * @param {Board} board - The game's board.
 */
export default function CellRenderer (viewport, grid, board) {
  const width = board.pixelWidth
  const height = board.pixelHeight

  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width
  viewport.appendChild(canvas)

  const gl = twgl.getContext(canvas, { depth: false, antialiasing: false })

  const {
    pointsObject,
    pointsBuffer
  } = createScene(gl, width, height, board.cellRadius)

  function copyPointAlphas () {
    const pointAlphas = pointsObject.aVertexAlpha.data
    for (let i = 0, len = pointAlphas.length; i < len; i++) {
      pointAlphas[i] = getAlpha(grid.cells[i])
    }
  }

  return {
    /**
     * Draws the game board with each cells.
     */
    render () {
      gl.clear(gl.COLOR_BUFFER_BIT)
      // twgl.resizeCanvasToDisplaySize(gl.canvas)
      // console.log(gl.canvas.width, gl.canvas.height)
      // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      copyPointAlphas()
      // updates the particles alpha
      twgl.setAttribInfoBufferFromArray(gl, pointsBuffer.attribs.aVertexAlpha, pointsObject.aVertexAlpha.data)
      // drawing particles
      twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS)
    },
    /**
     * Destroys the object, and remove the canvas from the DOM.
     */
    destroy () {
      viewport.removeChild(canvas)
    }
  }
}
