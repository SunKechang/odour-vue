<template>
    <div>
      <el-form :inline="true" style="float: left;position: relative;top: 30%">
        <el-form-item>
          <el-select v-model="search.role">
            <el-option label="normal" value="0"></el-option>
            <el-option label="uploader" value="1"></el-option>
            <el-option label="reviewer" value="2"></el-option>
            <el-option label="uploader&reviewer" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-input
            v-model="search.name"
            placeholder="userName"
            class="condition-description"
            clearable
            style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="search.email"
            placeholder="email"
              class="condition-description"
              clearable
              style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button circle icon="el-icon-search" @click="onSubmit"></el-button>
        </el-form-item>
      </el-form>
      <el-table
          ref="table"
          :data="userList"
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
        <el-table-column
            label="User Name"
            prop="name"
            width="250">
        </el-table-column>
        <el-table-column
            label="User Email"
            prop="userEmail"
            width="250">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <div style="display: inline-block;vertical-align:middle;">
                <el-button
                    v-if="userList[scope.$index].role !== 0"
                    size="mini"
                    @click="setNormal(scope.$index)">??????????????????
                </el-button>
                <el-button
                    v-if="userList[scope.$index].role !== 1 && userList[scope.$index].role !== 3"
                    size="mini"
                    @click="setUploader(scope.$index)">???????????????
                </el-button>
                <el-button
                    v-if="userList[scope.$index].role !== 2 && userList[scope.$index].role !== 3"
                    size="mini"
                    @click="setReviewer(scope.$index)">???????????????
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
    </div>
  </template>
  
  <script>
  export default {
    name: "user",
    data() {
      return {
        size: 20,
        currentPage: 1,
        total: 0,
        search: {
            name: '',
            email: '',
            role: '0'
        },
        userList: [],
        curRowIndex: -1,
      }
    },
    methods: {
      getRowKey(val) {
        return val.id;
      },
      on_select(val) {//????????????????????????
        this.$refs.table.toggleRowSelection(val);
      },
      on_selectsion(val) {//?????????????????????
        this.downloadList = val;
      },
      indexMethod(index) {
        index = (index + 1) + (this.currentPage - 1) * this.size
        return index;
      },
      handleView(index) {
        let _pk = this.articleData.list[index].pk
         window.open('/article/getFile?pk='+_pk, '_blank');
      },
      fileChange(file, fileList) {
        this.articleData.list[this.curRowIndex].fileList = fileList
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getArticleData()
      },
      getUserData() {
        let that = this;
        this.$api.admin.userSearch(this.currentPage, this.search.email, this.search.name, this.search.role)
            .then(({data, state}) => {
              if (state === 0) {
                that.userList = data.list;
                that.total = data.total;
              }
            }).catch(err => {
          console.log(err);
        });
      },
      onSubmit() {
        this.currentPage = 1
        this.getUserData()
      },
      setNormal(index) {
        console.log(this.userList[index])
        let x = {
            email: this.userList[index].userEmail,
            role: 0
        }
        let that = this
        this.$api.admin.setRole(x)
            .then(({success}) => {
              if (success) {
                that.$message('????????????')
              } else{
                that.$message('????????????')
              }
            }).catch(err => {
          console.log(err);
        });
      },
      setUploader(index) {
        let originRole = this.userList[index].role
        let nextRole = 0
        if(originRole == 0) {
          nextRole = 1
        } else if(originRole == 1) {
          return
        } else if(originRole == 2) {
          nextRole = 3
        } else {
          return
        }
        let x = {
            email: this.userList[index].userEmail,
            role: nextRole
        }
        let that = this
        this.$api.admin.setRole(x)
            .then(({success}) => {
              if (success) {
                that.$message('????????????')
              } else{
                that.$message('????????????')
              }
            }).catch(err => {
          console.log(err);
        });
      },
      setReviewer(index) {
        let originRole = this.userList[index].role
        let nextRole = 0
        if(originRole == 0) {
          nextRole = 2
        } else if(originRole == 1) {
          nextRole = 3
        } else if(originRole == 2) {
          return
        } else {
          return
        }
        let x = {
            email: this.userList[index].userEmail,
            role: nextRole
        }
        let that = this
        this.$api.admin.setRole(x)
            .then(({success}) => {
              if (success) {
                that.$message('????????????')
              } else{
                that.$message('????????????')
              }
            }).catch(err => {
          console.log(err);
        });
      }
    },
    created() {
      this.getUserData();
    }
  }
  </script>
  
  <style scoped>
  
  </style>