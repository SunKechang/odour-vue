import request from './request'


export default {
    getBase(_pageNum) {
        return request.get('/base/all', {params: {pageNum: _pageNum, pageSize: 20}})
    },
    getBaseAvailable() {
        return request.get('/base/all_available')
    },
    addPict(data) {
        return request.post('/base/add_pict', data)
    }
}
