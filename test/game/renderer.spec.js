import {describe, it, beforeEach, afterEach} from 'mocha'
import assert from 'assert'
import sinon from 'sinon'
import PixiMock from 'pixi-mock'
import CanvasMock from 'canvas-mock'

// eslint-disable-next-line
import injectLoaderGrid from 'inject-loader!game/grid'
const Grid = injectLoaderGrid({
  './grid.worker': require('./grid.worker.wrapper').default
}).default

// eslint-disable-next-line
import injectRenderer from 'inject-loader!game/renderer'
const Renderer = injectRenderer({
  'pixi.js': PixiMock
}).default

describe('Renderer', () => {
  let grid

  beforeEach(() => {
    grid = new Grid(1, 1)
  })

  afterEach(() => {
    grid.worker.terminate()
  })

  describe('new ()', () => {
    it('should call new pixi renderer', () => {
      var width = 123
      var height = 456
      var canvas = new CanvasMock()
      // eslint-disable-next-line
      new Renderer(width, height, canvas, grid, 4)
      assert(PixiMock.autoDetectRenderer.calledOnce)
    })
  })

  describe('render ()', () => {
    it('should call renderer.render(stage)', function () {
      const renderer = new Renderer(123, 456, new CanvasMock(), grid, 4)
      renderer.renderer.render = sinon.spy()
      renderer.render()
      assert(renderer.renderer.render.calledOnce)
      assert(renderer.renderer.render.calledWith(renderer.stage))
    })
  })
})
