/* global it, describe */
import assert from 'assert'
import sinon from 'sinon'
import CanvasMock from '../mock/canvas-mock'
import Grid from 'game/grid'
import Renderer from 'game/pixi-renderer'

describe('Renderer', () => {
  describe('render ()', () => {
    it('should call renderer.render(stage)', function () {
      const renderer = new Renderer(123, 456, new CanvasMock(), new Grid(1, 1), 4)
      renderer.renderer.render = sinon.spy()
      renderer.render()
      assert(renderer.renderer.render.calledOnce)
      assert(renderer.renderer.render.calledWith(renderer.stage))
    })
  })
})
