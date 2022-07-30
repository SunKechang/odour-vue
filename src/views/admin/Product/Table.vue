<template>
  <div>
    <product-table/>
  </div>
</template>

<script>
import axios from 'axios'
import request from "@/network/request";
import ProductTable from "@/components/Product/ProductTable";
export default {
  name: "CompoundTable",
  component: [ProductTable],
  components: {
    "product-table": ProductTable
  },
  methods: {



    onDownload() {
      let v = this;
      console.log(v.downloadList)
      const request1 = axios.create({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: "blob",
        baseURL: '/api',
        withCredentials: true,
        timeout: 5000
      });
      request1.post('/compound/download', v.downloadList)
          .then(res => {
            console.log(res.data)
            let blob = new Blob([res.data], {type: 'application/ms-excel;charset=utf-8'});
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '化合物分页信息表.xls'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
            v.$alert("下载成功", "Message", {
              confirmButtonText: 'Confirm'
            });
          }).catch(err => {
        console.log(err);
      });
    },


    onSubmit() {
      let v = this;
      let param = new FormData();
      param.append("property", v.searchForm.property);
      param.append("propertyDescription", v.searchForm.propertyDescription);
      request.post('/compound/search', param)
          .then(res => {
            if (res.data.state === 0) {
              v.compoundData = res.data.data;
              v.total = res.data.data.length;
            }
          }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
>>>.el-input-group__prepend {
  background-color: transparent;
  width: 120px;
}
>>>.el-form-item{
  margin-bottom: 10px;
}
>>>.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

>>>.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

>>>.el-table th.gutter {
  display: none;
  background-color: rgb(232, 232, 232);
}

>>>.el-table__body {
  width: 100% !important;
}
</style>