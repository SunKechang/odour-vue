<template>
    <div>
      <el-form :inline="true" style="float: left;position: relative;top: 30%">
        <el-form-item>
            <el-dropdown @command="searchList">
              <span class="el-dropdown-link">
                列表筛选<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">全部</el-dropdown-item>
                <el-dropdown-item command="1">已提交未审批</el-dropdown-item>
                <el-dropdown-item command="2">已审批</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-form-item>
      </el-form>
      <el-table
          ref="table"
          :data="list"
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
            label="Compound Name"
            prop="compoundName"
            width="250">
        </el-table-column>
        <el-table-column
            label="Synonym"
            prop="synonym"
            width="250">
        </el-table-column>
        <el-table-column
            label="CasNo"
            prop="casNo"
            width="250">
        </el-table-column>
        <el-table-column
            label="审核状态"
            prop="status"
            width="150">
        </el-table-column>

        <el-table-column label="Operation" width="300">
          <template slot-scope="scope">
            <div style="display: inline-block;vertical-align:middle;">
                <el-button
                    size="mini"
                    @click="handleView(scope.$index)">View
                </el-button>
                <el-button
                    v-if="list[scope.$index].status !== '通过'"
                    size="mini"
                    @click="handleEdit(scope.$index)">Edit
                </el-button>
                <el-button
                    v-if="scope.row.status != 0"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除
                </el-button>
            </div>
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
      <el-dialog title="审批列表" :visible.sync="approvalShow">
        <el-table :data="approvalList">
          <el-table-column  property="name" label="评审人"></el-table-column>
          <el-table-column  property="comment" label="意见"></el-table-column>
          <el-table-column  property="createTime" label="时间"></el-table-column>
        </el-table>
      </el-dialog>
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
import CompoundInfoView from "@/components/Compound/CompoundInfoView"
import CompoundInfoEdit from "@/components/Compound/CompoundInfoEdit"
  export default {
    name: "uploadList",
    component: [CompoundInfoView, CompoundInfoEdit],
    components: {
      "compound-info-view": CompoundInfoView,
      "compound-info-edit": CompoundInfoEdit,
    },
    data() {
      return {
        searchKind: 0,  //0-全部 1-已提交 2-已审批
        list: [],
        size: 20,
        currentPage: 1,
        total: 0,
        approvalList: [],
        token: null,
        approvalShow: false,
        viewDialogVisible: false,
        compoundInfo: {
          compoundName: '',
        },
        editDialogVisible: false,
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
        this.downloadList = val;
      },
      indexMethod(index) {
        index = (index + 1) + (this.currentPage - 1) * this.size
        return index;
      },
      handleView(index) {
        let that = this
        this.viewDialogVisible = !this.viewDialogVisible;
        if(!this.viewDialogVisible) {
          return
        }
        this.$api.compound.getOne(this.list[index].id)
            .then(({data}) => {
              that.compoundInfo = data
            }).catch(err => {
          console.error(err)
        })
      },
      handleEdit(index) {
        this.editDialogVisible = !this.editDialogVisible;
        if(!this.editDialogVisible) {
          return
        }
        this.$api.compound.getOne(this.list[index].id)
            .then(({data}) => {
              this.compoundInfo = this.addExtraParam(data)
            }).catch(err => {
          console.error(err)
        })
      },
      handleDelete(id) {
        this.$api.compound.userDelete(id)
            .then(({success}) => {
              if(success) {
                this.$message('删除成功')
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error',
                })
              }
            }).catch(err => {
          console.error(err)
        })
      },
      GetComment(index) {
        this.approvalShow = true
        let id = this.list[index].id
        let that = this
        this.$api.upload.getApproval(id)
            .then(({data, success}) => {
            if (success) {
                that.approvalList = data
            }
            }).catch(err => {
                console.log(err);
            }); 
      },
      closeEditDialog(val) {
        this.$emit('closeEditDialog', val)
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      getList() {
        let that = this;
        if(this.searchKind === '0') {
          this.$api.upload.searchAll(this.currentPage)
              .then(({data, success}) => {
              if (success) {
                for(let i=0;i<data.list.length;i++) {
                  if(data.list[i].status === 0) {
                      data.list[i].status = '通过'
                    } else if(data.list[i].status === 2) {
                      data.list[i].status = '待审批'
                    } else {
                      data.list[i].status = '不通过'
                    }
                }
                that.list = data.list
                that.total = data.total;
              }
              }).catch(err => {
                  console.log(err);
              }); 

        } else if(this.searchKind === '2') {
          this.$api.upload.searchReviewed(this.currentPage)
            .then(({data, success}) => {
            if (success) {
              for(let i=0;i<data.list.length;i++) {
                if(data.list[i].status === 0) {
                    data.list[i].status = '通过'
                  } else if(data.list[i].status === 2) {
                    data.list[i].status = '待审批'
                  } else {
                    data.list[i].status = '不通过'
                  }
              }
                that.list = data.list
                that.total = data.total;
            }
            }).catch(err => {
                console.log(err);
            }); 
        } else {
          this.$api.upload.searchCommitted(this.currentPage)
              .then(({data, success}) => {
              if (success) {
                  for(let i=0;i<data.list.length;i++) {
                    if(data.list[i].status === 0) {
                      data.list[i].status = '通过'
                    } else if(data.list[i].status === 2) {
                      data.list[i].status = '待审批'
                    } else {
                      data.list[i].status = '不通过'
                    }
                  }
                  that.list = data.list
                  that.total = data.total;
              }
              }).catch(err => {
                  console.log(err);
              }); 
        }
      },
      searchList(command) {
        this.searchKind = command
        this.getList();
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
        return data
      },
    },
    created() {
      this.getList();
    }
  }
  </script>
  
  <style scoped>
  
  </style>