<template>
  <div>
    <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
      <el-form-item>
        <el-select v-model="searchForm.property">
          <el-option label="Oil Name" value="oil_name"></el-option>
          <el-option label="Oil Type" value="oil_type"></el-option>
          <el-option label="Oil Brand" value="oil_brand"></el-option>
          <el-option label="Key Compound CAS" value="key_compound_cas"></el-option>
          <el-option label="Oil Odour" value="oil_odour"></el-option>
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
    <el-button style="float:right" @click="onDownload">下载食用油表单</el-button>
    <el-table
        ref="table"
        :data="oilData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
        :row-key="getRowKey" border
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
          label="Oil Name"
          prop="oilName"
          width="250">
      </el-table-column>
      <el-table-column
          label="Oil Type"
          prop="oilType"
          width="200">
      </el-table-column>
      <el-table-column
          label="Oil Brand"
          prop="oilBrand"
          width="200">
      </el-table-column>
      <el-table-column
          label="Oil Production Date"
          prop="oilDate"
          width="200">
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

    <oil-info :oilInfo="oilInfo" :visible.sync="viewDialogVisible"></oil-info>
    <oil-info-edit :getOilData="getOilData" :oilInfo="oilInfo" :visible.sync="editDialogVisible"></oil-info-edit>
  </div>
</template>

<script>
const oilInfo = () => import("@/components/Oil/OilInfoView");
const OilInfoEdit = () => import("../../../components/Oil/OilInfoEdit")

export default {
  name: "oilTable",
  component: [oilInfo, OilInfoEdit],
  components: {
    "oil-info": oilInfo,
    "oil-info-edit": OilInfoEdit
  },
  data() {
    return {
      oilData: [],
      viewDialogVisible: false,
      editDialogVisible: false,
      oilInfo: {},
      size: 10,
      currentPage: 1,
      total: 0,
      searchForm: {
        property: 'oil_name',
        propertyDescription: ''
      }
    }
  },
  methods: {
    getRowKey(val) {
      return val.id;
    },
    on_select(val) {//点击行选中复选框
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
      this.oilInfo = this.oilData[(this.currentPage - 1) * this.size + index];
    },
    handleEdit(index) {
      this.editDialogVisible = !this.editDialogVisible;
      this.oilInfo = this.oilData[(this.currentPage - 1) * this.size + index];
    },
    handleDelete(index) {
      let v = this;
      let id = v.oilData[(this.currentPage - 1) * this.size + index].id;
      this.$api.oil.delete(id)
          .then(({state}) => {
            if (state === 0) {
              this.getOilData();
              v.$alert("Delete " + v.oilData[index].oilName + " successfully!", "Message", {
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
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getOilData() {
      let v = this;
      this.$api.oil.getAll()
          .then(({data, state}) => {
            if (state === 0) {
              v.oilData = data;
              v.total = data.length;
            }
          }).catch(err => {
        console.log(err);
      });
    },
    onDownload() {
      this.$api.oil.download(this.downloadList)
    },
    onSubmit() {
      let v = this;
      let param = new FormData();
      param.append("property", v.searchForm.property);
      param.append("propertyDescription", v.searchForm.propertyDescription);
      this.$api.oil.search(param)
          .then(({data, state}) => {
            if (state === 0) {
              v.oilData = data;
              v.total = data.length;
            }
          }).catch(err => {
        console.log(err);
      });
    },
  },
  created() {
    this.getOilData();
  }
}
</script>

<style scoped>

</style>