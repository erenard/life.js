import sinon from 'sinon'

class Renderer {
  generateTexture () {}

  render () {}
}

function autoDetectRenderer () {
  return new Renderer()
}

class Container {
  addChild () {}
}

class ParticleContainer extends Container {}

class Graphics {
  beginFill () {}

  drawRect () {}
}

class Sprite {}

export default {
  autoDetectRenderer: sinon.spy(autoDetectRenderer),
  Container: sinon.spy(Container),
  Graphics: sinon.spy(Graphics),
  Sprite: sinon.spy(Sprite),
  particles: {
    ParticleContainer: sinon.spy(ParticleContainer)
  }
}
