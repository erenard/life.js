import { jest } from '@jest/globals'

export default function CellRenderer (width, height, viewport, grid, cellSize) {
  return {
    render: jest.fn(),
    destroy: jest.fn()
  }
}
