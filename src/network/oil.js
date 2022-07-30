import request from "@/network/request";
import axios from "axios";
import Vue from "vue";

export default {
    getAll(){
        return request.get("/oil/all")
    },
    add(data) {
        return request.post('/oil/add', data)
    },
    delete(id) {
        return request.delete('/oil/delete/' + id)
    },
    search(param) {
        return request.post('/oil/searchoil', param)
    },
    download(downloadList) {
        const request = axios.create({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: "blob",
            baseURL: '/api',
            withCredentials: true,
            timeout: 5000
        });
        request.post('/oil/download', downloadList)
            .then(res => {
                console.log(res.data)
                let blob = new Blob([res.data], {type: 'application/ms-excel;charset=utf-8'});
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = '食用油分页信息表.xls'; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
                Vue.prototype.$alert("下载成功", "Message", {
                    confirmButtonText: 'Confirm'
                });
            }).catch(err => {
            console.error(err);
        });
    }
}