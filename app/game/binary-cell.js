/**
 * The cell state is stored on 8 bits:
 * CCCCAAAS
 * CCCC: 4 bits: neighbourgs count
 * AAA: 3 bits: age
 * S: 1 bit: dead or alive state flag.
 */

export function getState (cell) {
  return cell & 0b00000001
}

export function setState (cell, state) {
  return (cell & 0b11111110) | (state & 0b1)
}

export function getCount (cell) {
  return (cell & 0xf0) >> 4
}

export function setCount (cell, count) {
  return (cell & 0x0f) | ((count & 0x0f) << 4)
}

export function getAge (cell) {
  return (cell & 0b00001110) >> 1
}

export function setAge (cell, age) {
  return (cell & 0b11110001) | ((age & 0b111) << 1)
}

export function updateCell (cell, rules) {
  const state = (getState(cell) ? rules.s : rules.b)[getCount(cell)]
  cell = setState(cell, state)
  return setAge(cell, state * Math.min(getAge(cell) + 1, 0b111))
}

export function getAlpha (cell) {
  return (getState(cell) + (getAge(cell) / 0b111)) / 2
}
