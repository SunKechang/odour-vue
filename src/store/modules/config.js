import config from '../../../vue.config'

const state = () => ({
    host: config.devServer.proxy["/api"].target,
})
const getters = {}
const mutations = {}
const actions = {}

export default { state, getters, mutations, actions }