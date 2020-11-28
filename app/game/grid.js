
let implementation

const Grid = {

  load: async function (name = 'no-worker') {
    implementation = await import(`./grid-${name}`)
  },

  get: function () {
    return implementation.default
  }

}

export default Grid
