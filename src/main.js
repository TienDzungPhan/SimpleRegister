import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { firestorePlugin } from 'vuefire'

import App from './App.vue'
import router from './router'
import store from './store'

// Install BootstrapVue
Vue.use(BootstrapVue)

// Install Google Firebase
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
