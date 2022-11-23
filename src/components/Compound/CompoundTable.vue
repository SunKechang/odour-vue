<template>
  <div>
    <el-scrollbar>
      <el-table
          ref="table"
          id="compoundTable"
          :data="compoundList"
          :max-height="$store.state.user.Authorization ? tableHeight : null"
          :row-key="getRowKey"
          style="width: 100%;"
          @row-click="on_select"
          @selection-change="on_selectsion">
        <el-table-column
            v-if="$store.state.user.Authorization"
            :reserve-selection="true"
            type="selection"
        />
        <el-table-column
            label="Compound Name"
            min-width="150"
            prop="compoundName"
        />
        <el-table-column
            :width="getColumnWidth('casNo', 'CAS NO.')"
            label="CAS NO."
            prop="casNo"
        />
        <el-table-column
            min-width="200"
            v-if="descriptionShow"
            label="Odor Description"
            prop="description"
        />
        <el-table-column
            min-width="200"
            v-if="thresholdShow"
            label="Odor Base"
            prop="odourBase"
        />
        <el-table-column
            min-width="120"
            v-if="thresholdShow"
            label="Odor Threshold"
            prop="odourThreshold"
        />
        <el-table-column
            :width="$store.state.user.Authorization ? 220 : 90"
            fixed="right"
            label="Operation"
            align="center"
        >
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">View
            </el-button>
            <el-button
                v-if="$store.state.user.Authorization && permission"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                v-if="$store.state.user.Authorization && permission"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div style="text-align: center">
      <el-pagination
          :current-page="currentPage"
          :page-size="size"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
      />
    </div>
    <compound-info-view
        :compoundInfo="compoundInfo"
        :visible.sync="viewDialogVisible"
    />
    <compound-info-edit
        @close="closeEditDialog"
        :compoundInfo="compoundInfo"
        :visible.sync="editDialogVisible"
    />
  </div>
</template>

<script>
import {flexColumnWidth, flexTableHeight} from "@/utils/table";
import CompoundInfoView from "@/components/Compound/CompoundInfoView"
import CompoundInfoEdit from "@/components/Compound/CompoundInfoEdit"
import { exportTable2 } from "@/utils/tableTool";

export default {
  name: "CompoundTable",
  component: [CompoundInfoView, CompoundInfoEdit],
  components: {
    "compound-info-view": CompoundInfoView,
    "compound-info-edit": CompoundInfoEdit,
  },
  props: {
    compoundData: {
      type: Array,
      default: ()=> {
        return []
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    permission: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      compoundList: [],
      compoundInfo: {},
      viewDialogVisible: false,
      editDialogVisible: false,
      tableHeight: flexTableHeight(),
      descriptionShow: false,
      thresholdShow: false,
    }
  },
  methods: {
    closeEditDialog(val) {
      this.$emit('closeEditDialog', val)
    },
    handleCurrentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('pageChange', val)
    },
    onDownload() {
      this.$api.compound.download(this.downloadList)
    },
    getColumnWidth(prop, label) {
      return flexColumnWidth(prop, this.compoundList, label)
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
      this.$emit('select', val)
    },
    getIndex(index) {
      index = (index + 1) + (this.currentPage - 1) * this.size
      return index;
    },
    handleView(index, row) {
      let that = this
      this.viewDialogVisible = !this.viewDialogVisible;
      this.$api.compound.getOne(row.id)
          .then(({data}) => {
            data = that.addExtraParam(data)
            that.compoundInfo = data
          }).catch(err => {
        console.error(err)
      })
    },
    handleEdit(index, row) {
      let that = this
      this.editDialogVisible = !this.editDialogVisible;
      this.$api.compound.getOne(row.id)
          .then(({data}) => {          
            data = that.addExtraParam(data)
            that.compoundInfo = data
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
        console.error(err);
      })
    },
    addExtraParam(data) {
      for(let i=0;i<data.otList.length;i++) {
        data.otList[i].article = {
          pk: '0',
          name: '',
          file: null,
          useExist: true,
          judgeName: false,
          articleChanged: false,
          originParam: true
        }
      }
      for(let i=0;i<data.odList.length;i++) {
        data.odList[i].article = 
        {
          pk: '0',
          name: '',
          file: null,
          useExist: true,
          judgeName: false,
          articleChanged: false,
          originParam: true
        }
      }
      for(let i=0;i<data.functionList.length;i++) {
        data.functionList[i].newImg = ''
        data.functionList[i].article = 
        {
          pk: '0',
          name: '',
          file: null,
          useExist: true,
          judgeName: false,
          articleChanged: false,
          originParam: true
        }
      }
      for(let i=0;i<data.productList.length;i++) {
        for(let j=0;j<data.productList[i].otList.length;j++) {
          data.productList[i].otList[j].article = 
          {
            pk: '0',
            name: '',
            file: null,
            useExist: true,
            judgeName: false,
            articleChanged: false,
            originParam: true
          }
        }

        for(let j=0;j<data.productList[i].odList.length;j++) {
          data.productList[i].odList[j].article = 
          {
            pk: '0',
            name: '',
            file: null,
            useExist: true,
            judgeName: false,
            articleChanged: false,
            originParam: true
          }
        }
      }
      return data
    },
    downloadTable() {
      exportTable2('compoundTable')
    },
  },
  watch: {
    compoundData: {
      handler(val) {
        this.compoundList = val
      }
    },
    compoundList(val) {
      if(val.length === 0) {
        return
      }else {
        if(val[0].description !== null) {
          this.descriptionShow = true
        } else {
          this.descriptionShow = false
        }
        if(val[0].odourBase !== null) {
          this.thresholdShow = true
        } else {
          this.thresholdShow = false
        }
      }
    }
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
>>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

>>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

>>> .el-table th.gutter {
  display: none;
  background-color: rgb(232, 232, 232);
}

>>> .el-table__body {
  width: 100% !important;
}
</style>
