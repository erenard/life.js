import { jest } from '@jest/globals'

export default function Game () {
  const obj = {
    getAnimationMock: jest.fn(),
    setViewportMock: jest.fn(),
    getSizeMock: jest.fn(),
    setSizeMock: jest.fn(),
    getRunningMock: jest.fn(),
    setRunningMock: jest.fn(),
    getRulesMock: jest.fn(),
    setRulesMock: jest.fn()
  }

  obj.mockReturnValues = function () {
    obj.getAnimationMock.mockReturnValue({})
    obj.getSizeMock.mockReturnValue({})
    obj.getRunningMock.mockReturnValue(true)
    obj.getRulesMock.mockReturnValue('b0s0')
  }

  Object.defineProperty(obj, 'animation', {
    get: obj.getAnimationMock
  })

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
