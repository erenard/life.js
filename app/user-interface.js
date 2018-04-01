import { Rules } from 'game/cell'

export default class {
  constructor ({ grid, mainLoop, animation }) {
    this.grid = grid
    this.mainLoop = mainLoop
    this.animation = animation
    this.birthElements = [
      document.getElementById('b0'),
      document.getElementById('b1'),
      document.getElementById('b2'),
      document.getElementById('b3'),
      document.getElementById('b4'),
      document.getElementById('b5'),
      document.getElementById('b6'),
      document.getElementById('b7'),
      document.getElementById('b8')
    ]
    this.survivalElements = [
      document.getElementById('s0'),
      document.getElementById('s1'),
      document.getElementById('s2'),
      document.getElementById('s3'),
      document.getElementById('s4'),
      document.getElementById('s5'),
      document.getElementById('s6'),
      document.getElementById('s7'),
      document.getElementById('s8')
    ]
    this.presetsElement = document.getElementById('presets')
    this.stopButtonElement = document.getElementById('stop')
    this.startButtonElement = document.getElementById('start')
    this.stepButtonElement = document.getElementById('step')
    this.randomButtonElement = document.getElementById('random')
    this.clearButtonElement = document.getElementById('clear')
    this.ratioElement = document.getElementById('ratio')
    this.registerEventListeners()
  }

  loadPreset (preset) {
    var start = preset.indexOf('b')
    var stop = preset.indexOf('s')
    var length = preset.length
    if (length !== 0 && preset !== 'custom' && start !== -1 && stop !== -1 && start < stop) {
      for (let index = 0; index < 9; index += 1) {
        Rules.b[index] = false
        Rules.s[index] = false
        this.birthElements[index].checked = false
        this.survivalElements[index].checked = false
      }
      for (let index = start + 1; index < stop; index += 1) {
        this.birthElements[preset.charAt(index)].checked = true
        Rules.b[preset.charAt(index)] = true
      }
      for (let index = stop + 1; index < length; index += 1) {
        this.survivalElements[preset.charAt(index)].checked = true
        Rules.s[preset.charAt(index)] = true
      }
    }
  }

  registerEventListeners () {
    var updateRules = function () {
      for (let index = 0; index < 9; index += 1) {
        Rules.b[index] = this.birthElements[index].checked
        Rules.s[index] = this.survivalElements[index].checked
      }
      this.presetsElement.value = 'custom'
    }.bind(this)

    var changePreset = function () {
      this.loadPreset(this.presetsElement.value)
    }.bind(this)

    for (let index = 0; index < 9; index += 1) {
      this.birthElements[index].addEventListener('change', updateRules)
      this.survivalElements[index].addEventListener('change', updateRules)
    }

    this.presetsElement.addEventListener('change', changePreset)
    this.stopButtonElement.addEventListener('click', () => {
      this.animation.stop()
      this.stopButtonElement.style.display = 'none'
      this.startButtonElement.style.display = ''
    })
    this.startButtonElement.addEventListener('click', () => {
      this.animation.start()
      this.startButtonElement.style.display = 'none'
      this.stopButtonElement.style.display = ''
    })
    this.stepButtonElement.addEventListener('click', () => {
      this.mainLoop()
    })
    this.randomButtonElement.addEventListener('click', () => {
      var ratioValue = this.ratioElement.value
      if (isNaN(ratioValue) || ratioValue < 0 || ratioValue > 100) {
        ratioValue = 30
        this.ratioElement.value = ratioValue
      }
      this.grid.random(ratioValue / 100)
      this.mainLoop()
    })
    this.clearButtonElement.addEventListener('click', () => {
      this.grid.clear()
      this.mainLoop()
    })
    this.presetsElement.addEventListener('change', changePreset)
  }
}
