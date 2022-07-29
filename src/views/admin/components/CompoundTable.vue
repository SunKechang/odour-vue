<template>
  <div class="table-container flex-a" ref="container">
    <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
      <el-form-item>
        <el-select v-model="searchForm.searchProperty">
          <el-option label="Compound Name" value="compound_name"></el-option>
          <el-option label="CAS NO." value="cas_no"></el-option>
          <el-option label="Odour Description" value="odour_description"></el-option>
          <el-option label="Odour Threshold" value="odour_threshold"></el-option>
          <el-option label="RI" value="compound_ri"></el-option>
          <el-option label="NRI" value="compound_nri"></el-option>
          <el-option label="Measured" value="measured"></el-option>
          <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
          <el-option label="Product" value="product"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
            v-model="searchForm.searchValue"
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
    <div class="table-container-inner">
      <el-table
          ref="table"
          :data="compoundData"
          :row-key="getRowKey"
          height="100%"
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
            label="Compound Name"
            prop="compoundName"
            width="250">
        </el-table-column>
        <el-table-column
            label="CAS NO."
            prop="casNo"
            width="200">
        </el-table-column>

        <el-table-column label="Operation">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">View
            </el-button>
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
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
    </div>


    <compound-info :compoundInfo="compoundInfo" :visible.sync="viewDialogVisible"></compound-info>
    <compound-info-edit
        :compoundInfo="compoundInfo"
        :getCompoundData="getCompoundData"
        :visible.sync="editDialogVisible"
    ></compound-info-edit>
  </div>
</template>

<script>
import CompoundInfo from "@/components/CompoundInfo"
import CompoundInfoEdit from "../components/CompoundInfoEdit"

export default {
  name: "CompoundTable",
  component: [CompoundInfo, CompoundInfoEdit],
  components: {
    "compound-info": CompoundInfo,
    "compound-info-edit": CompoundInfoEdit
  },
  data() {
    return {
      tableHeight: 0,
      compoundData: [],
      viewDialogVisible: false,
      editDialogVisible: false,
      compoundInfo: {},
      size: 10,
      currentPage: 1,
      total: 0,
      searchForm: {
        searchProperty: 'compound_name',
        searchValue: ''
      }
    }
  },
  methods: {
    calHeight () {
      this.$nextTick(() => {
        const rect = this.$refs.container.getBoundingClientRect()
        this.tableHeight = rect.height
        console.log(rect.height)
      })
    },
    getRowKey(val) {
      return val.id;
    },
    //点击行选中复选框
    on_select(val) {
      this.$refs.table.toggleRowSelection(val);
    },
    //选中复选框操作
    on_selectsion(val) {
      this.downloadList = val;
    },
    indexMethod(index) {
      index = (index + 1) + (this.currentPage - 1) * this.size
      return index;
    },
    handleView(index, row) {
      this.viewDialogVisible = !this.viewDialogVisible;
      this.$api.compound.getOne(row.id)
          .then(({data}) => {
            this.compoundInfo = data
          }).catch(err => {
        console.error(err)
      })
    },
    handleEdit(index, row) {
      this.editDialogVisible = !this.editDialogVisible;
      this.$api.compound.getOne(row.id)
          .then(({data}) => {
            this.compoundInfo = data
          }).catch(err => {
        console.error(err)
      })
    },
    handleDelete(index, row) {
      this.$api.compound.delete(row.id)
          .then(({state}) => {
            if (state === 0) {
              this.getCompoundData();
              this.$alert("Delete " + " successfully!", "Message", {
                confirmButtonText: 'Confirm'
              });
            } else {
              this.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              });
            }
          }).catch(err => {
        console.log(err);
      });
    },
    onDownload() {
      this.$api.compound.download(this.downloadList)
          .then(res => {
            let blob = new Blob([res.data], {type: 'application/ms-excel;charset=utf-8'});
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
        console.log(err);
      });
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getCompoundData() {
      this.$api.compound.getList({
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.compoundData = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.$api.compound.search({
        ...this.searchForm,
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.compoundData = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    this.getCompoundData()
    this.calHeight()
  }
}
</script>

<style scoped>
.table-container {
  position: relative;
}

.table-container-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 55px;
}
</style>