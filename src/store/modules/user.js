import {login} from '@/network/admin'
import {userLogin} from '@/network/admin'
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
        localStorage.setItem("Authorization",accessToken)
    },
    signOut(state) {
        state.Authorization = null
        localStorage.setItem("Authorization",null)
    }
}
const actions = {
    signOut({ commit }) {
        commit('signOut')
    },
    async login({ commit }, userInfo) {
        const { data, state } = await login(userInfo)
        if (state === 0 && data.length > 2) {
            commit('setAccessToken', data)
            return true
        } else {
            return false
        }
    },
    async userLogin({ commit }, userInfo) {
        const { data, state } = await userLogin(userInfo.account, userInfo.password)
        if (state === 0 && data.length > 2) {
            commit('setAccessToken', data)
            return true
        } else {
            return false
        }
    }
}

export default { state, getters, mutations, actions }