import request from "@/network/request";

export default {
    getTeamNews(){
        return request.get("/team/news")
    }
}