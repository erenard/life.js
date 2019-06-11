import 'normalize.css'
import Vue from 'vue'
import AppVue from './components/App.vue'

const vm = new Vue({
  el: '#app',
  components: {
    'app': AppVue
  },
  template: '<app />'
})

export default vm
