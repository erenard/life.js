import { jest } from '@jest/globals'

import Board from '../board.js'

export default function Game () {
  const obj = {
    step: jest.fn(),
    setViewportMock: jest.fn(),
    getBoardMock: jest.fn(),
    setBoardMock: jest.fn(),
    getRunningMock: jest.fn(),
    setRunningMock: jest.fn(),
    getRulesMock: jest.fn(),
    setRulesMock: jest.fn()
  }

  obj.mockReturnValues = function () {
    obj.getBoardMock.mockReturnValue(new Board())
    obj.getRunningMock.mockReturnValue(true)
    obj.getRulesMock.mockReturnValue('b0s0')
  }

  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(obj, 'viewport', {
    set: obj.setViewportMock
  })

  Object.defineProperty(obj, 'board', {
    get: obj.getBoardMock,
    set: obj.setBoardMock
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
