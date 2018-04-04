/**
 * Expose the rules.
 */
export var Rules = {
  b: [false, false, false, false, false, false, false, false, false],
  s: [false, false, false, false, false, false, false, false, false]
}

/**
 * Cell
 */
export default class Cell {
  /**
   * Initialize a Cell.
   */
  constructor () {
    // 0 or 1, the cell value used to count cells
    this.state = 0
    this.age = 0
    this.sprite = null
    this.count = 0
  }

  /**
   * Update the cell state.
   */
  update () {
    if (this.state === 1 && !Rules.s[this.count]) {
      // Death
      this.age = 0
      this.state = 0
      this.age = 0
      this.sprite.alpha = 0
    } else if (this.state === 0 && Rules.b[this.count]) {
      // Newborn
      this.state = 1
      this.age = 0
      this.sprite.alpha = 0.5
    } else {
      // Staying alive
      this.age += this.state
      if (this.age === 5) {
        this.sprite.alpha = 1
      }
    }
  }
}
