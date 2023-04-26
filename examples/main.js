import Vue from 'vue'
import App from './App.vue'
import Html2Image from '../packages/index'

Vue.use(Html2Image)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
