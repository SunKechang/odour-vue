import request from './request'

export default {
    getList(params){
        return request.get("/compound/all",{ params })
    },
    getOne(id) {
        return request.get("/compound/"+id)
    },
    add(data){
        return request.post("/compound/add", data)
    },
    search(data){
        return request.post("/compound/search", data)
    }
}