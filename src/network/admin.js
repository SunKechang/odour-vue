import request from './request'


export const login = (loginForm) => {
    return request.post("/admin/login", loginForm)
}
export const password = (param) => {
    return  request.post('/admin/password',param)
}

export const userLogin = (account, password) => {
    return request.post("/user/login?userEmail="+account+"&userPassword="+password)
}

export default {
    login,
    userLogin,
    password,
}
