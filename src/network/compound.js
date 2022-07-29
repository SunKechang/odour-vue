import request from './request'
import axios from "axios";

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
    },
    update(data) {
        return request.post("/compound/update", data)
    },
    delete(id) {
        return request.delete('/compound/delete/' + id)
    },
    download(downloadList) {
        return axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: "blob",
            baseURL: '/api',
            withCredentials: true,
            timeout: 5000
        }).post('/compound/download', downloadList)
    },
    getNews() {
        return request.get("/compound/news")
    }
}