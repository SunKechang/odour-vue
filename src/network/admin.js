import request from './request'

export default {
    login(loginForm){
        return request.post("/admin/login",loginForm)
    }
}