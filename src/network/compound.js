import request from './request'
import axios from "axios";
import Vue from "vue";

export default {
    getList(params) {
        return request.get("/compound/all", {params})
    },
    getOne(id) {
        return request.get("/compound/" + id)
    },
    add(data) {
        return request.post("/compound/add", data)
    },
    search(data) {
        return request.post("/compound/search", data)
    },
    update(data) {
        return request.post("/compound/update", data)
    },
    delete(id) {
        return request.delete('/compound/delete/' + id)
    },
    advanced(param) {
        return request.post('/compound/advanced',param)
    },
    downloadpro(data) {
        const request = axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: "blob",
            baseURL: '/api',
            withCredentials: true,
            timeout: 5000
        })
        request.post('/compound/downloadpro', data)
            .then(res => {
                console.log(res.data)
                let blob = new Blob([res.data], {type: 'application/ms-excel;charset=utf-8'});
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = '化合物信息表.xls'; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
                Vue.prototype.$alert("下载成功", "Message", {
                    confirmButtonText: 'Confirm'
                });
                // }else{
                //     v.$alert("Failed!", "Message", {
                //         confirmButtonText: 'Confirm'
                //     });
                // }
            }).catch(err => {
            console.error(err)
        })
    },
    downloadTemplate() {
        return request.get('/compound/downloadTemplate', {
            params: {},
            responseType: 'blob',
        })
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
            .then(res => {
                let blob = new Blob(
                    [res.data],
                    {type: 'application/ms-excel;charset=utf-8'}
                );
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = '化合物分页信息表.xls'; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
                Vue.prototype.$alert("下载成功", "Message", {
                    confirmButtonText: 'Confirm'
                });
            }).catch(err => {
                console.log(err)
            })
    },
    getNews() {
        return request.get("/compound/news")
    },
    allSearch(_name) {
        if (_name === undefined) {
            _name = ""
        }
        return request.get("/article/search", {params: {name: _name, pageNum: 1, pageSize: 99}})
    },
    userUpdate(data) {
        return request.post("/user/compound/update", data)
    },
    userAddCompound(data) {
        return request.post("/user/compound/add", data)
    },
    searchReviewer(_name) {
        return request.get("/user/review/get_reviewers", {params: {name: _name}})
    }
}