import request from './request'

export default {
    getAll(){
        return request.get("/product/all")
    },
    getList(param) {
        console.log(param)
        return request.get("/product/list?size=" + param.size + "&page=" + param.page)
    },
    getOne(id) {
        return request.get("/product/" + id)
    },
    add(data) {
        return request.post("/product/add", data)
    },
    getNews(){
        return request.get("/product/news")
    },
}