import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import './assets/js/font-size.js'
import './assets/css/reset.css'

// vant 
import vantUI from './vantUI/index.js'
vantUI.init()

Vue.prototype.$eventBus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

