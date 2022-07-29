export default {
    install(Vue) {
        // 服务器路径常量
        Vue.prototype.$host = 'http://localhost:8081'
    }
};