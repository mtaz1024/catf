import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from "./api";

// axios
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8081/api'
Vue.prototype.$axios = axios

// element-ui
Vue.use(ElementUI)

// api
Vue.prototype.$api = api
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username){
      next() // 放行
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next() // 不需要登录 放行
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
