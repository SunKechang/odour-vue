import request from './request'


export const login = (loginForm) => {
    return request.post("/admin/login", loginForm)
}

export default {
    login
}
