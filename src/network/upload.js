import request from './request'

export default {
    searchCommitted(_pageNum) {
        return request.get("/user/review/get_committed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    searchReviewed(_pageNum) {
        return request.get("/user/review/get_my_reviewed", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    searchAll(_pageNum) {
        return request.get("/user/review/get_all", {params: {pageNum: _pageNum, pageSize: 20}})
    },
    getApproval(id) {
        return request.get("/user/review/get_approval", {params: {comId: id}})
    },
    sendEmail(_email) {
        return request.post("/user/send_email/" + _email)
    },
    updatePassword(_email, _password, _code) {
        return request.post("/user/update/password", {email: _email, password: _password, code: _code})
    }
}
