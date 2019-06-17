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
}
