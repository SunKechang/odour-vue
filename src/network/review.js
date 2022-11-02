import request from './request'

export default {
    getUnreviewed(_pageNum) {
        return request.get("/user/review/get_unreviewed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    getReviewed(_pageNum) {
        return request.get("/user/review/get_reviewed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    approve(data) {
        return request.post("/user/review/approve", data)
    },
    simpleApprove(_id, _status) {
        return request.post("/user/review/set_status", {id: _id, status: _status})
    }
}
