import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/element-#5CB87A/index.css'
import VueI18n from 'vue-i18n'
import 'lib-flexible'
import './network'
import Plugin from 'v-fit-columns';

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

Vue.use(Plugin);

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({

  locale: 'v2zh',

  messages: {

    'zh': require('@/lang/zh.js'),

    'en': require('@/lang/en.js'),

    'v2zh': require('@/lang/v2zh.js'),

    'v2en': require('@/lang/v2en.js')

  }

});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
