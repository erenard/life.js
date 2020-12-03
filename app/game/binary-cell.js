/*
 * The cell state Even and Odd are stored on 8 bits:
 * BBBbAAAa
 * AAA: 3 bits: age Even
 * a: 1 bit: state Even
 * BBB: 3 bits: age Odd
 * b: 1 bit: state Odd.
 */
function HelloWorld (stdlib, foreign, heap) {
  'use asm'

  // Globals

  // Functions
  function getEvenState (cell) {
    cell = cell | 0
    return (cell & 0b1) | 0
  }

  function getOddState (cell) {
    cell = cell | 0
    return ((cell >> 4) & 0b1) | 0
  }

  function setEvenState (cell, state) {
    cell = cell | 0
    state = state | 0
    return (cell & 0b11111110) | (state & 0b1) | 0
  }

  function setOddState (cell, state) {
    cell = cell | 0
    state = state | 0
    return (cell & 0b11101111) | ((state & 0b1) << 4) | 0
  }

  function getEvenAge (cell) {
    cell = cell | 0
    return (cell >> 1) & 0b111 | 0
  }

  function getOddAge (cell) {
    cell = cell | 0
    return (cell >> 5) & 0b111 | 0
  }

  function setEvenAge (cell, age) {
    cell = cell | 0
    age = age | 0
    return (cell & 0b11110001) | (age << 1) | 0
  }

  function setOddAge (cell, age) {
    cell = cell | 0
    age = age | 0
    return (cell & 0b00011111) | (age << 5) | 0
  }

  function applyRules (state, count, rules) {
    state = state | 0
    count = count | 0
    rules = rules | 0
    return ((rules >> ((state * 9) + count)) & 0b1) | 0
  }

  function updateEven (cell, count, rules) {
    cell = cell | 0
    count = count | 0
    rules = rules | 0

    // Set even state
    cell = setEvenState(
      cell,
      applyRules(
        getOddState(cell) | 0,
        count,
        rules
      ) | 0
    ) | 0

    // Set age state
    return setEvenAge(cell,
      (getEvenState(cell) | 0)
        ? ((getOddAge(cell) | 0) + 1) & 7
        : 0
    ) | 0
  }

  function updateOdd (cell, count, rules) {
    cell = cell | 0
    count = count | 0
    rules = rules | 0

    // Set even state
    cell = setOddState(
      cell,
      applyRules(
        getEvenState(cell) | 0,
        count,
        rules
      ) | 0
    ) | 0

    // Set age state
    return setOddAge(cell,
      (getOddState(cell) | 0)
        ? ((getEvenAge(cell) | 0) + 1) & 7
        : 0
    ) | 0
  }

  function getEvenAlpha (cell) {
    cell = cell | 0
    return (+(getEvenState(cell) | 0) + (+(getEvenAge(cell) | 0) / 7.0)) / 2.0
  }

  function getOddAlpha (cell) {
    cell = cell | 0
    return (+(getOddState(cell) | 0) + (+(getOddAge(cell) | 0) / 7.0)) / 2.0
  }

  // Functions tables
  // const f_table = [getEvenState, getOddState]

  // Exports
  return {
    getEvenState: getEvenState,
    getOddState: getOddState,
    setEvenState: setEvenState,
    setOddState: setOddState,
    getEvenAge: getEvenAge,
    getOddAge: getOddAge,
    setEvenAge: setEvenAge,
    setOddAge: setOddAge,
    getEvenAlpha: getEvenAlpha,
    getOddAlpha: getOddAlpha,
    updateEven: updateEven,
    updateOdd: updateOdd
  }
}

module.exports = HelloWorld
