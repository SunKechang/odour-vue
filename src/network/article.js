import request from './request'

export default {
    search(_pageNum, _name) {
        if(_name === undefined) {
            _name = ""
        }
        return request.get("/article/search", {params: {name: _name, pageNum: _pageNum, pageSize: 20}})
    },
    update(data) {
        return request.post("/article/update", data, {'Content-Type': 'multipart/form-data'})
    },
    add(data) {
        return request.post("/article/add", data, {'Content-Type': 'multipart/form-data'})
    },
    view(pk) {
        return request.get("/article/getFile", pk)
    },
    allSearch(_name) {
        if (_name === undefined) {
            _name = ""
        }
        return request.get("/article/search", {params: {name: _name, pageNum: 1, pageSize: 99}})
    }
}
