import request from "@/network/request";

export default {
    getAll(){
        return request.get("/log/all")
    }
}