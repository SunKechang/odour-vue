import request from './request'

export default {
    getAll(){
        return request.get("/product/all")
    },
    getList(param) {
        return request.get("/product/list", { param })
    }
}