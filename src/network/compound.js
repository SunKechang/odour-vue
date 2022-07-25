import request from './request'

export default {
    getList(params){
        return request.get("/compound/all",{ params })
    },
    add(data){
        return request.post("/compound/add", data)
    }
}