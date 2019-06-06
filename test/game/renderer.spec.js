import { describe, it, before } from 'mocha'
// eslint-disable-next-line
import injectRenderer from 'inject-loader!game/renderer'
import assert from 'assert'
import sinon from 'sinon'
import PixiMock from 'pixi-mock'
import CanvasMock from 'canvas-mock'
import Grid from 'game/grid'

describe('Renderer', () => {
  describe('new ()', () => {
    var Renderer

    before(() => {
      // create mocked module
      Renderer = injectRenderer({
        'pixi.js': PixiMock
      }).default
    })

    it('should call new pixi renderer', () => {
      var width = 123
      var height = 456
      var canvas = new CanvasMock()
      // eslint-disable-next-line
      new Renderer(width, height, canvas, new Grid(1, 1), 4)
      assert(PixiMock.autoDetectRenderer.calledOnce)
    })
  })

  describe('render ()', () => {
    var renderer, Renderer

    before(() => {
      // create mocked module
      Renderer = injectRenderer({
        'pixi.js': PixiMock
      }).default
      renderer = new Renderer(123, 456, new CanvasMock(), new Grid(1, 1), 4)
    })

    it('should call renderer.render(stage)', function () {
      renderer.renderer.render = sinon.spy()
      renderer.render()
      assert(renderer.renderer.render.calledOnce)
      assert(renderer.renderer.render.calledWith(renderer.stage))
    })
  })
})
