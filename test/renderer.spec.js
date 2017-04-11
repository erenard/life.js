import {describe, it, before} from 'mocha';
import {expect} from 'chai';
import injectRenderer from 'inject-loader!renderer';
import sinon from 'sinon';
import assert from 'assert';

describe('Renderer', () => {
	describe('new ()', () => {
		var SpriteMock = sinon.spy(class {
			constructor() {}
			createCellSprite () {}
            }),
			canvasMock = {
				getContext: function () { return {};}
			},
			gridMock = {
				Size: {x: 0, y: 0}
			},
			Renderer;

		before(() => {
            // create mocked module
			Renderer = injectRenderer({
				'sprite': SpriteMock
			}).default;
		});

		it('should call sprite constructor one time', () => {
			new Renderer(canvasMock, 4, gridMock);
			//new SpriteMock(4);
			console.log(SpriteMock.calledWithNew());
			console.log(SpriteMock.calledOnce);
			assert(SpriteMock.calledWithNew());
			assert(SpriteMock.calledOnce);
		});

		it('should call getContext one time', () => {
			sinon.spy(canvasMock, 'getContext');
			new Renderer(canvasMock, 4, gridMock);
			expect(canvasMock.getContext.calledOnce).to.be.true;
		});
	});
});
