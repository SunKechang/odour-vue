import {login} from '@/network/admin'
import Vue from "vue";

const state = () => ({
    Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : ''
})
const getters = {
    Authorization: (state) => state.Authorization,
}
const mutations = {
    setAccessToken(state, accessToken) {
        state.Authorization = accessToken
        localStorage.setItem("Authorization",accessToken);
    },
    signOut(state) {
        state.Authorization = null
    }
}
const actions = {
    signOut({ commit }) {
        commit('signOut')
    },
    async login({ commit }, userInfo) {
        const { data, state } = await login(userInfo)
        if (state === 0 && data) {
            commit('setAccessToken', data)
        } else {
            await Vue.prototype.$alert("Incorrect account or password", "Message", {
                confirmButtonText: 'Confirm'
            });
        }
    }
}

export default { state, getters, mutations, actions }