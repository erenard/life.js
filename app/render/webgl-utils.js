import { mat4 } from 'gl-matrix'

class WebGlUtils {
  constructor (context) {
    this.gl = context
  }

  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  loadShader (type, source) {
    const shader = this.gl.createShader(type)

    // Send the source to the shader object
    this.gl.shaderSource(shader, source)

    // Compile the shader program
    this.gl.compileShader(shader)

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader))
      this.gl.deleteShader(shader)
      return null
    }

    return shader
  }

  //
  // Initialize a shader program, so WebGL knows how to draw our data
  //
  initShaderProgram (vsSource, fsSource) {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource)

    // Create the shader program

    const shaderProgram = this.gl.createProgram()
    this.gl.attachShader(shaderProgram, vertexShader)
    this.gl.attachShader(shaderProgram, fragmentShader)
    this.gl.linkProgram(shaderProgram)

    // If creating the shader program failed, alert

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram))
      return null
    }

    return shaderProgram
  }

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  initProjectionMatrix (fovInDegree) {
    const fieldOfView = fovInDegree * Math.PI / 180 // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 100.0
    const projectionMatrix = mat4.create()

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar)

    return projectionMatrix
  }

  arrayBuffer (array) {
    // Create a buffer for the square's positions.
    const positionBuffer = this.gl.createBuffer()

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(array), this.gl.STATIC_DRAW)

    return positionBuffer
  }
}

export default WebGlUtils
