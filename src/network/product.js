import request from './request'

export default {
    getAll(){
        return request.get("/product/all")
    },
    getList(param) {
        return request.get("/product/list", { param })
    },
    add(data) {
        return request.post("/product/add", data)
    },
    getNews(){
        return request.get("/product/news")
    },
}