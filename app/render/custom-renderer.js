import * as twgl from 'twgl.js'
import chroma from 'chroma-js'

const vertexShaderGLSL = `uniform mat4 u_matrix;
uniform vec4 u_offsets;
uniform vec4 u_centers;
uniform vec4 u_mult;
attribute vec2 a_position;
attribute vec4 a_color;
varying vec4 v_color;
#define PI 3.14159
void main() {
  vec2 offset = mix(u_offsets.xz, u_offsets.yw, a_position.y);
  float a = u_mult.x * a_position.x * PI * 2.0 + offset.x;//mix(u_offsets.x, u_offsets.y, a_position.y);
  float c = cos(a * u_mult.y);
  vec2 xy = vec2(
    cos(a),
    sin(a)) * c * offset.y +
    mix(u_centers.xy, u_centers.zw, a_position.y);
  gl_Position = u_matrix * vec4(xy, 0, 1);
  v_color = a_color;
}`
const fragmentShaderGLSL = `
precision mediump float;
varying vec4 v_color;
void main() {
  gl_FragColor = v_color;
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

  const gl = canvas.getContext('webgl')

  const m4 = twgl.m4
  twgl.setDefaults({ attribPrefix: 'a_' })
  const programInfo = twgl.createProgramInfo(gl, [vertexShaderGLSL, fragmentShaderGLSL])
  const numLines = 100
  const arrays = {
    position: twgl.primitives.createAugmentedTypedArray(2, numLines * 2),
    color: twgl.primitives.createAugmentedTypedArray(3, numLines * 2, Uint8Array)
  }
  function rand (min, max) {
    return min + Math.random() * (max - min)
  }
  const hue = rand(0, 360)
  for (let ii = 0; ii < numLines; ++ii) {
    const u = ii / numLines
    const h = (360 + hue + (Math.abs(u - 0.5) * 100)) % 360
    const s = Math.sin(u * Math.PI * 2) * 0.25 + 0.75
    const v = 1
    const color = chroma.hsv(h, s, v)
    arrays.position.push(u, 1)
    arrays.color.push(color.rgb())
    arrays.position.push(u, 0)
    arrays.color.push(color.brighten().desaturate().rgb())
  }
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
  const offsets = [0, 0, 0, 1]
  const centers = [0, 0, 0, 0]
  const mult = [1, 2, 0, 0]
  const uniforms = {
    u_matrix: m4.identity(),
    u_offsets: offsets,
    u_centers: centers,
    u_mult: mult
  }

  return {
    /**
     * Draws the game board with each cells.
     */
    render () {
      let time = 1
      time *= 0.001
      twgl.resizeCanvasToDisplaySize(gl.canvas)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.enable(gl.DEPTH_TEST)
      gl.enable(gl.CULL_FACE)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      offsets[0] = Math.sin(time)
      offsets[1] = Math.sin(time * 0.13) * Math.PI * 2
      offsets[2] = Math.sin(time * 0.43) * 0.5 + 1.0
      offsets[3] = Math.cos(time * 0.17) * 0.5 + 0.5
      centers[0] = Math.sin(time * 0.163) * 0.5
      centers[1] = Math.cos(time * 0.267) * 0.5
      centers[2] = Math.sin(time * 0.367) * 0.5
      centers[3] = Math.cos(time * 0.497) * 0.5
      mult[1] = (Math.sin(time * 0.1) * 0.5 + 0.5) * 3
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
      m4.ortho(-aspect, aspect, 1, -1, -1, 1, uniforms.u_matrix)
      gl.useProgram(programInfo.program)
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
      twgl.setUniforms(programInfo, uniforms)
      twgl.drawBufferInfo(gl, bufferInfo, gl.LINES)
    }
  }
}
