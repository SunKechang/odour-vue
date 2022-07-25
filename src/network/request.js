import axios from 'axios'
import store from "@/store/index";

const request = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },

    baseURL: '/api',
    withCredentials: true,
    timeout: 5000
});

// 添加请求拦截器
request.interceptors.request.use(config => {
    if (store.state.Authorization) {
        config.headers.Authorization = store.state.Authorization;
    }
    return config;
    },
    error => {
    return Promise.reject(error);
});


export default request