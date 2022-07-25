import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      Authorization:sessionStorage.getItem("Authorization")?sessionStorage.getItem("Authorization"):''
  },
  mutations: {
      changeLogin (state,token) {
          state.Authorization = token;
      }
  },
  actions: {
  },
  modules: {
  }
})
