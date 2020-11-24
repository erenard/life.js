/*
 The cell state is stored on 8 bits:
 SAAACCCC
 |  |   |
 |  |   \__4 bits: neighbourgs count, binary integer
 |  \__3 bits: age, binary integer
 \__ 1 bit: state flag, 1: alive, 0: dead
 */

export function getState (cell) {
  return (cell & 0b10000000) >> 7
}

export function setState (cell, state) {
  return (cell & 0b01111111) | ((state & 0b1) << 7)
}

export function getCount (cell) {
  return cell & 0x0f
}

export function setCount (cell, count) {
  return (cell & 0xf0) | (count & 0x0f)
}

export function getAge (cell) {
  return (cell & 0b01110000) >> 4
}

export function setAge (cell, age) {
  return (cell & 0b10001111) | ((age & 0b111) << 4)
}

export function updateCell (cell, rules) {
  const state = (getState(cell) ? rules.s : rules.b)[getCount(cell)]
  cell = setState(cell, state)
  return setAge(cell, state * Math.min(getAge(cell) + 1, 0b111))
}

export function getAlpha (cell) {
  return (getState(cell) + (getAge(cell) / 0b111)) / 2
}
