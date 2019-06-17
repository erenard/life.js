precision mediump float;

varying float vAlpha;

void main(void) {
  gl_FragColor = vec4(0.0, 1.0, 0.0, vAlpha);
}
