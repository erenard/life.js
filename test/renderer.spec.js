import {describe, it, before} from 'mocha';
import {expect} from 'chai';
import injectRenderer from 'inject-loader!renderer';
import sinon from 'sinon';
import assert from 'assert';

import PixiMock from 'pixi-mock';
import CanvasMock from 'canvas-mock';
import Grid from 'grid';

describe('Renderer', () => {
	describe('new ()', () => {
		var Renderer;

		before(() => {
            // create mocked module
			Renderer = injectRenderer({
				'pixi.js': PixiMock
			}).default;
		});

		it('should call new pixi renderer', () => {
			var width = 123,
				height = 456,
				canvas = new CanvasMock();
			new Renderer(width, height, canvas, new Grid(1, 1), 4);
			assert(PixiMock.autoDetectRenderer.calledWithNew());
			assert(PixiMock.autoDetectRenderer.calledOnce);
		});

		it('should call getContext one time', () => {
			var width = 123,
				height = 456,
				canvas = new CanvasMock();
			sinon.spy(canvas, 'getContext');
			new Renderer(width, height, canvas, new Grid(1, 1), 4);
			expect(canvas.getContext.calledOnce).to.be.true;
		});
	});
});
