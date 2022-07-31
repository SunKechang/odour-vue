import request from './request'
import axios from "axios";

export default {
    getAll(){
        return request.get("/product/all")
    },
    getList(param) {
        console.log(param)
        return request.get("/product/list?size=" + param.size + "&page=" + param.page)
    },
    search(data) {
        return request.post("/product/search", data)
    },
    searchCompound(data) {
        return request.post("/product/searchcompound", data)
    },
    getOne(id) {
        return request.get("/product/" + id)
    },
    add(data) {
        return request.post("/product/add", data)
    },
    update(data) {
        return request.put("/product/update", data)
    },
    getNews(){
        return request.get("/product/news")
    },
    delete(id) {
        return request.delete('/product/delete/' + id)
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
        }).post('/product/download', downloadList)
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
                this.$alert("下载成功", "Message", {
                    confirmButtonText: 'Confirm'
                });
            }).catch(err => {
                console.log(err)
            })
    },
}