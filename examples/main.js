import Vue from 'vue'
import App from './App'
import router from './router'
import XcUI from '../src/index'
import demoBlock from './components/demo-block.vue'
import '../packages/theme-default/lib/index.css'
import Ajax from '../packages/ajax/v1.0.0/index'
import Loading from '../packages/loading/index.js'

Vue.component('demo-block', demoBlock)
Vue.prototype.$http = Ajax
Vue.prototype.$loading = Loading
Vue.use(XcUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
