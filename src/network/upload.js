import request from './request'

export default {
    searchCommitted(_pageNum) {
        return request.get("/user/review/get_committed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    searchReviewed(_pageNum) {
        return request.get("/user/review/get_my_reviewed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    getApproval(id) {
        return request.get("/user/review/get_approval", {params: {comId: id}})
    }
}
