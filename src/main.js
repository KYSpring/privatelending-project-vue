// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios // 全局注册使用axios
// Vue.prototype.$axios.default.baseURL = process.env.BASE_API
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
