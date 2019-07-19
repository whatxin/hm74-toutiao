import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import axios from '@/api/axios'

import bread from '@/components'

// 导入全局样式
import '@/styles/index.less'

Vue.prototype.axios = axios
Vue.use(bread)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
