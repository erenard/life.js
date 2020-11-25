import { jest } from '@jest/globals'

import Board from '../board.js'

export default function Game () {
  const obj = {
    animation: {
      mainLoop: jest.fn()
    },
    setViewportMock: jest.fn(),
    getSizeMock: jest.fn(),
    setSizeMock: jest.fn(),
    getRunningMock: jest.fn(),
    setRunningMock: jest.fn(),
    getRulesMock: jest.fn(),
    setRulesMock: jest.fn()
  }

  obj.mockReturnValues = function () {
    obj.getSizeMock.mockReturnValue(new Board())
    obj.getRunningMock.mockReturnValue(true)
    obj.getRulesMock.mockReturnValue('b0s0')
  }

  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(obj, 'viewport', {
    set: obj.setViewportMock
  })

  Object.defineProperty(obj, 'size', {
    get: obj.getSizeMock,
    set: obj.setSizeMock
  })

  Object.defineProperty(obj, 'running', {
    get: obj.getRunningMock,
    set: obj.setRunningMock
  })

  Object.defineProperty(obj, 'rules', {
    get: obj.getRulesMock,
    set: obj.setRulesMock
  })

  return obj
}
