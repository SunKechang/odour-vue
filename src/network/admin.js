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
    userSearch(_pageNum, _email, _name, _role) {
        return request.get('/user/get_users', {params: {pageNum: _pageNum, pageSize: 20, email: _email, name: _name, role: _role}})
    },
    setRole(data) {
        return request.post('/user/set_role', data)
    },
    userLogSearch(_pageNum, _email, _operation) {
        return request.get('/log/user', {params: {pageNum: _pageNum, pageSize: 20, email: _email, operation: _operation}})
    }
}
