import request from './request'

export default {
    getAll(){
        return request.get("/product/all")
    }
}