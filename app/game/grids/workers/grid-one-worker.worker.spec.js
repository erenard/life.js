import { jest, describe, beforeEach, test, expect } from '@jest/globals'
import update from '../../grid-updater.js'
import { GridWebWorker } from './grid-one-worker.worker.js'

jest.mock('../../grid-updater.js')

describe('GridWebWorker', () => {
  let worker

  beforeEach(() => {
    jest.resetAllMocks()
    worker = new GridWebWorker()
  })

  describe('onMessage', () => {
    test('init', () => {
      const onInitSpy = jest.spyOn(worker, 'onInit')
      onInitSpy.mockImplementation()
      worker.onMessage({ data: { type: 'init' } })
      expect(onInitSpy).toBeCalledWith({ type: 'init' })
    })
    test('update', () => {
      const onUpdateSpy = jest.spyOn(worker, 'onUpdate')
      onUpdateSpy.mockImplementation()
      worker.onMessage({ data: { type: 'update' } })
      expect(onUpdateSpy).toBeCalledWith({ type: 'update' })
    })
    test('rules', () => {
      const onRulesSpy = jest.spyOn(worker, 'onRules')
      onRulesSpy.mockImplementation()
      worker.onMessage({ data: { type: 'rules' } })
      expect(onRulesSpy).toBeCalledWith({ type: 'rules' })
    })
  })

  describe('onInit', () => {
    beforeEach(() => {
      worker.onInit({
        buffer: new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT * 10),
        board: {
          gridWidth: 5,
          gridHeight: 2
        },
        rules: { foo: 'bar' }
      })
    })
    test('set cells', () => {
      expect(worker.cells).toEqual(new Uint8Array(10))
    })
    test('set sizeX', () => {
      expect(worker.sizeX).toEqual(5)
    })
    test('set length', () => {
      expect(worker.length).toEqual(10)
    })
    test('set rules', () => {
      expect(worker.rules).toEqual({ foo: 'bar' })
    })

    describe('onUpdate', () => {
      beforeEach(() => {
        global.postMessage = jest.fn()
        worker.onUpdate()
      })
      test('should call update', () => {
        expect(update).toBeCalledWith(new Uint8Array(10), 10, 5, { foo: 'bar' })
      })
      test('should post render', () => {
        expect(global.postMessage).toBeCalledWith({ type: 'render' })
      })
    })

    describe('onRules', () => {
      beforeEach(() => {
        global.postMessage = jest.fn()
        worker.onRules({ rules: { dummy: 'rules' } })
      })
      test('should update the rules', () => {
        expect(worker.rules).toEqual({ dummy: 'rules' })
      })
    })
  })
})
