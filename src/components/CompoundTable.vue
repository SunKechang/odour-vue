<template>
  <div style="text-align: center">
    <el-scrollbar>
      <el-table
          ref="table"
          :data="compoundData"
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
            :index="getIndex"
            label="Index"
            type="index"
            width="60"
            align="center"
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
            :width="getColumnWidth('updateTime', 'UpdateTime')"
            label="UpdateTime"
            prop="updateTime"
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
                v-if="$store.state.user.Authorization"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                v-if="$store.state.user.Authorization"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-pagination
        :current-page="currentPage"
        :page-size="size"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
    />
    <compound-info-edit
        :compoundInfo="compoundInfo"
        :getCompoundData="getCompoundData"
        :visible.sync="editDialogVisible"
    />
  </div>
</template>

<script>
import {flexColumnWidth, flexTableHeight} from "@/utils/table";
import CompoundInfo from "@/components/CompoundInfo"
import CompoundInfoEdit from "@/views/admin/components/CompoundInfoEdit"

export default {
  name: "CompoundTable",
  component: [CompoundInfo, CompoundInfoEdit],
  components: {
    "compound-info": CompoundInfo,
    "compound-info-edit": CompoundInfoEdit
  },
  data() {
    return {
      size: 10,
      total: 0,
      currentPage: 1,
      compoundData: [],
      compoundInfo: {},
      viewDialogVisible: false,
      editDialogVisible: false,
      tableHeight: flexTableHeight(),
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCompoundData()
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
        console.error(err)
      })
    },
    getColumnWidth(prop, label) {
      return flexColumnWidth(prop, this.compoundData, label)
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
    getIndex(index) {
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
        console.error(err);
      })
    }
  },
  created() {
    this.getCompoundData()
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