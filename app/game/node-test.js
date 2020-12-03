const BinaryCell = require('./binary-cell.js')

const binaryCell = BinaryCell()

const getEvenState = binaryCell.getEvenState
const getOddState = binaryCell.getOddState
const setEvenState = binaryCell.setEvenState
const setOddState = binaryCell.setOddState
const getEvenAge = binaryCell.getEvenAge
const getOddAge = binaryCell.getOddAge
const setEvenAge = binaryCell.setEvenAge
const setOddAge = binaryCell.setOddAge
const updateEven = binaryCell.updateEven
const updateOdd = binaryCell.updateOdd
const getEvenAlpha = binaryCell.getEvenAlpha
const getOddAlpha = binaryCell.getOddAlpha

const cell = 0b00110000

const updated = updateEven(cell, 3, 0b000100000001100000)
console.log(cell, updated, 0b00110101)
