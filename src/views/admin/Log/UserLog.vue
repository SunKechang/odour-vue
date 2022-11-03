<template>
    <div>
      <el-form :inline="true" style="float: left;position: relative;top: 30%">
        <el-form-item>
            <el-input
            v-model="search.operation"
            placeholder="operation"
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
          :data="logList"
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
            width="150">
        </el-table-column>
        <el-table-column
            label="User Email"
            prop="email"
            width="200">
        </el-table-column>
        <el-table-column
            label="Operation"
            prop="operation"
            width="250">
        </el-table-column>
        <el-table-column
            label="Ip"
            prop="ip"
            width="250">
        </el-table-column>
        <el-table-column
            label="Time"
            prop="time"
            width="250">
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
            operation: '',
            email: ''
        },
        logList: [],
        curRowIndex: -1,
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
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserLogData()
      },
      getUserLogData() {
        let that = this;
        this.$api.admin.userLogSearch(this.currentPage, this.search.email, this.search.operation)
            .then(({data, success}) => {
                console.log(data)
              if (success) {
                that.logList = data.list;
                that.total = data.total;
              }
            }).catch(err => {
          console.log(err);
        });
      },
      onSubmit() {
        this.currentPage = 1
        this.getUserLogData()
      },
    },
    created() {
      this.getUserLogData();
    }
  }
  </script>
  
  <style scoped>
  
  </style>