import sinon from 'sinon';

class autoDetectRenderer {
	generateTexture() {}
}

class Container {
	addChild() {}
}

class ParticleContainer extends Container {}

class Graphics {
	beginFill() {}
	drawRect() {}
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
};
