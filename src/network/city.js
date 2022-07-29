import request from "@/network/request";

export default {
    getAll(){
        return request.get("/city/all")
    },
    add(data) {
        return request.post("/city/citySN", data)
    }
}