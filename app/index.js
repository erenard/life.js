import Vue from 'vue'
import AppVue from './app.vue'

const vm = new Vue({
  el: '#app',
  components: {
    app: AppVue
  },
  template: '<app />'
})

export default vm
