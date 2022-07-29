<template>
  <div>
    <div style="text-align: left;">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input
              v-model="searchForm.propertyDescription"
              clearable
          >
            <el-select slot="prepend" v-model="searchForm.property">
              <el-option label="Compound Name" value="compound_name"></el-option>
              <el-option label="CAS NO." value="cas_no"></el-option>
              <el-option label="Odour Description" value="odour_description"></el-option>
              <el-option label="Odour Threshold" value="odour_threshold"></el-option>
              <el-option label="RI" value="compound_ri"></el-option>
              <el-option label="NRI" value="compound_nri"></el-option>
              <el-option label="Measured" value="measured"></el-option>
              <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button circle icon="el-icon-search" @click="onSubmit"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="float:right" @click="onDownload">Download</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-scrollbar>
      <el-table
          ref="table"
          :data="productData"
          :row-key="getRowKey"
          :max-height="tableHeight"
          style="width: 100%;"
          @row-click="on_select"
          @selection-change="on_selectsion">
        <el-table-column :reserve-selection="true" type="selection"></el-table-column>
        <el-table-column
            :index="indexMethod"
            label="Index"
            type="index"
            width="60"
            align="center"
        />
        <el-table-column
            label="Product Name"
            prop="productName"
            :width="getColumnWidth('productName', 'Product Name')"
        >
        </el-table-column>
        <el-table-column
            label="Picture"
            width="200"
        >
          <template v-slot="scope">
            <el-image
                :alt="scope.row['productName']"
                :src="$store.state.host + scope.row['productPicture']"
                style="width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
            label="Description"
            prop="productDescription"
        />
        <el-table-column label="Operation" fixed="right" :width="220">
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
    </el-scrollbar>

    <div class="block">
      <el-pagination
          :current-page="currentPage"
          :page-size="size"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>


    <compound-info
        :compoundInfo="compoundInfo"
        :visible.sync="viewDialogVisible"
    />
    <compound-info-edit
        :compoundInfo="compoundInfo"
        :getCompoundData="getProductData"
        :visible.sync="editDialogVisible"
    />
  </div>
</template>

<script>
import axios from 'axios'
import request from "@/network/request";
import { flexColumnWidth, flexTableHeight } from '@/utils/table'
const CompoundInfo = () => import("@/components/Compound/CompoundInfoView");
const CompoundInfoEdit = () => import("../../../components/Compound/CompoundInfoEdit")

export default {
  name: "CompoundTable",
  component: [CompoundInfo, CompoundInfoEdit],
  components: {
    "compound-info": CompoundInfo,
    "compound-info-edit": CompoundInfoEdit
  },
  data() {
    return {
      tableHeight: flexTableHeight(),
      productData: [],
      viewDialogVisible: false,
      editDialogVisible: false,
      compoundInfo: {},
      size: 5,
      currentPage: 1,
      total: 0,
      searchForm: {
        property: 'compound_name',
        propertyDescription: ''
      }
    }
  },
  methods: {
    getColumnWidth(prop, label) {
      return flexColumnWidth(prop, this.compoundData, label)
    },
    getRowKey(val) {
      return val.id;
    },
    on_select(val) {
      //点击行选中复选框
      this.$refs.table.toggleRowSelection(val);
    },
    on_selectsion(val) {//选中复选框操作
      this.downloadList = val;
    },
    indexMethod(index) {
      return (index + 1) + (this.currentPage - 1) * this.size
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
  },
  created() {
    this.getProductData()
  },
  mounted() {
    //挂载window.onresize事件(动态设置table高度)
    window.onresize = () => {
      if (this.resizeFlag) {
        clearTimeout(this.resizeFlag)
      }
      this.resizeFlag = setTimeout(() => {
        this.tableHeight = flexTableHeight()
        this.resizeFlag = null
      }, 100)
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