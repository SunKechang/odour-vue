<template>
  <div>
    <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
      <el-form-item>
        <el-select v-model="searchForm.property">
          <el-option label="Compound Name" value="compound_name"></el-option>
          <el-option label="CAS NO." value="cas_no"></el-option>
          <el-option label="Odour Description" value="odour_description"></el-option>
          <el-option label="Odour Threshold" value="odour_threshold"></el-option>
          <el-option label="RI" value="compound_ri"></el-option>
          <el-option label="NRI" value="compound_nri"></el-option>
          <el-option label="Measured" value="measured"></el-option>
          <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
            v-model="searchForm.propertyDescription"
            class="condition-description"
            clearable
            style="width: 200px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button circle icon="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item>
    </el-form>
    <el-button style="float:right" @click="onDownload">下载化合物表单</el-button>
    <el-table ref="table"
              :data="productData"
              :row-key="getRowKey"
              border
              style="width: 100%"
              @row-click="on_select"
              @selection-change="on_selectsion">
      <el-table-column
          :index="indexMethod"
          label="Index"
          type="index"
          width="60">
      </el-table-column>
      <el-table-column :reserve-selection="true" type="selection"></el-table-column>

      <el-table-column
          label="Product Name"
          prop="productName"
          width="200">
      </el-table-column>
      <el-table-column
          label="Picture"
          width="200">
        <template v-slot="scope">
          <img :src="$host + scope.row['productPicture']" width="150" :alt="scope.row['productName']"/>
        </template>
      </el-table-column>
      <el-table-column
          label="Description"
          prop="productDescription"
          width="250">
      </el-table-column>
      <el-table-column label="Operation">
        <template v-slot="scope">
          <el-button
              size="mini"
              @click="handleView(scope.$index)">View
          </el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index)">Edit
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          :current-page="currentPage"
          :page-size="size"
          :total="total"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>


    <compound-info :compoundInfo="compoundInfo" :visible.sync="viewDialogVisible"></compound-info>
    <compound-info-edit :compoundInfo="compoundInfo" :getCompoundData="getProductData"
                        :visible.sync="editDialogVisible"></compound-info-edit>
  </div>
</template>

<script>
import axios from 'axios'
import request from "@/network/request";

const CompoundInfo = () => import("@/components/CompoundInfo");
const CompoundInfoEdit = () => import("../components/CompoundInfoEdit")

export default {
  name: "CompoundTable",
  component: [CompoundInfo, CompoundInfoEdit],
  components: {
    "compound-info": CompoundInfo,
    "compound-info-edit": CompoundInfoEdit
  },
  data() {
    return {
      productData: [],
      viewDialogVisible: false,
      editDialogVisible: false,
      compoundInfo: {},
      size: 10,
      currentPage: 1,
      total: 0,
      searchForm: {
        property: 'compound_name',
        propertyDescription: ''
      }
    }
  },
  methods: {
    getRowKey(val) {
      return val.id;
    },
    on_select(val) {
      //点击行选中复选框
      this.$refs.table.toggleRowSelection(val);
    },
    on_selectsion(val) {//选中复选框操作
      console.log(val)
      this.downloadList = val;
    },
    indexMethod(index) {
      index = (index + 1) + (this.currentPage - 1) * this.size
      return index;
    },
    handleView(index) {
      this.viewDialogVisible = !this.viewDialogVisible;
      this.compoundInfo = this.productData[(this.currentPage - 1) * this.size + index];
    },
    handleEdit(index) {
      this.editDialogVisible = !this.editDialogVisible;
      this.compoundInfo = this.productData[(this.currentPage - 1) * this.size + index];
    },
    handleDelete(index) {
      let v = this;
      let id = v.compoundData[(this.currentPage - 1) * this.size + index].id;
      request.delete('/compound/delete/' + id)
          .then(res => {
            if (res.data.state === 0) {
              this.getProductData();
              v.$alert("Delete " + " successfully!", "Message", {
                confirmButtonText: 'Confirm'
              });
            } else {
              v.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              });
            }
          }).catch(err => {
        console.log(err);
      });
    },
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
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getProductData() {
      this.$api.product.getList({
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.productData = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err)
      })
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
    // onSubmit() {
    //     const _this = this;
    //     console.log(_this.productData[0].compoundName);
    //     _this.productData =_this.productData.filter(item => item.compoundName.toLowerCase().includes(_this.searchForm.propertyDescription))
    // },
  },
  created() {
    this.getProductData();
  }
}
</script>

<style scoped>

</style>