// vue套件
import Vue from 'vue'

// Ajax套件
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'

// Loading套件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import $ from 'jquery'

import App from './App.vue'
import router from './router'
import './bus'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('Loading',Loading)

axios.defaults.withCredentials = true
window.$ = $

new Vue({
  render: function (h) { return h(App) },
  router
}).$mount('#app')


router.beforeEach((to, from, next) => {
  
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_API}/api/user/check`

    axios.post(api).then((response)=>{
      console.log(response.data)
      if(response.data.success){  
        next()
      } else{
        next({
          path:'/login'
        })
      }
    })
  } else{
    next()
  }
})