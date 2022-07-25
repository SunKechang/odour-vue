import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/element-#5CB87A/index.css';
import VueI18n from 'vue-i18n'
import 'lib-flexible'

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.productionTip = false

Vue.prototype.$host = 'http://localhost:8081' // 服务器路径常量

const i18n = new VueI18n({

  locale: 'zh',

  messages: {

    'zh': require('@/lang/zh.js'),

    'en': require('@/lang/en.js')

  }

});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
