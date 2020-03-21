export default class Rules {
  constructor () {
    this.b = [false, false, false, false, false, false, false, false, false]
    this.s = [false, false, false, false, false, false, false, false, false]
    this.preset = 'b3s23'
  }

  get preset () {
    let birthPart = 'b'
    let survivalPart = 's'
    for (let index = 0; index < 9; index++) {
      birthPart += this.b[index] ? index : ''
      survivalPart += this.s[index] ? index : ''
    }
    return birthPart + survivalPart
  }

  set preset (rules) {
    const birthRegExp = new RegExp('b([0-9]*)', 'g')
    const birthMatch = birthRegExp.exec(rules)
    const birthPart = birthMatch ? birthMatch[1] : ''

    const survivalRegExp = new RegExp('s([0-9]*)', 'g')
    const survivalMatch = survivalRegExp.exec(rules)
    const survivalPart = survivalMatch ? survivalMatch[1] : ''

    for (let index = 0; index < 9; index++) {
      const bValue = birthPart.indexOf(index) >= 0
      const sValue = survivalPart.indexOf(index) >= 0
      this.b[index] = bValue
      this.s[index] = sValue
    }
  }
}
