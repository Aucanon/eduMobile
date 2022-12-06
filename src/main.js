import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 lib-flexiable 可伸缩布局方案
import 'amfe-flexible'

// 引入 Vant 组件库
// import Vant from 'vant'
// import 'vant/lib/index.css'

Vue.config.productionTip = false

// 注册 Vant 插件
// Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
