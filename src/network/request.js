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
    if (store.state.user.Authorization) {
        config.headers.Authorization = store.state.user.Authorization;
    }
    return config;
    },
    error => {
    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(
    res => {
        return Promise.resolve(res.data)
    },
    err => {
        //响应错误
        console.log(err);
        console.log("响应错误", err.response)
        return Promise.reject(err)
    })

export default request