import Vue from 'vue'
import AppVue from './app.vue'

const vm = new Vue({
  el: '#app',
  components: {
    app: AppVue
  },
  render (h) {
    return h('app')
  }
})

export default vm
