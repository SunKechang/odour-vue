import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Global from './Global'
import ElementUI from 'element-ui'
import './assets/element-#5CB87A/index.css'
import VueI18n from 'vue-i18n'
import 'lib-flexible'
import './network'

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(Global)
Vue.config.productionTip = false



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
