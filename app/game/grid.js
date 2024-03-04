let implementation

const defaultName = typeof SharedArrayBuffer !== 'undefined' ? 'one-worker' : 'no-worker'

const Grid = {

  load: async function (name = defaultName) {
    implementation = await import(`./grids/grid-${name}`)
  },

  get: function () {
    return implementation.default
  }

}

export default Grid
