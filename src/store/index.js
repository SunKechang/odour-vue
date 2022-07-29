import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../vue.config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      host: config.devServer.proxy["/api"].target,
      Authorization:sessionStorage.getItem("Authorization")?sessionStorage.getItem("Authorization"):'',
  },
  mutations: {
      changeLogin (state,token) {
          state.Authorization = token
      }
  },
  actions: {
  },
  modules: {
  }
})
