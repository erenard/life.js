import { jest } from '@jest/globals'

const Renderer = jest.fn()

Renderer.mockImplementation(() => ({
  render: jest.fn(),
  destroy: jest.fn()
}))

export default Renderer
