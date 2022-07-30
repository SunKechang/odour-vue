import request from './request'


export const login = (loginForm) => {
    return request.post("/admin/login", loginForm)
}
export const password = (param) => {
    return  request.post('/admin/password',param)
}

export default {
    login,
    password
}
