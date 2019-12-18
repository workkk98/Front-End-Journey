import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './vuex/index.js'

Vue.config.productionTip = false

Vue.mixin({
  mounted() {
    console.log(this.$route)
  }
})

new Vue({
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  render: h => h(App),
}).$mount('#app')
