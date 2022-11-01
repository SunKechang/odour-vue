<template>
    <div>
      <el-form :inline="true" style="float: left;position: relative;top: 30%">
        <el-form-item>
          <el-select v-model="chosen">
            <el-option label="Article Name" value="article_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
                v-model="searchName"
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
          :data="articleData.list"
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
            label="Article Name"
            prop="name"
            width="250">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <div style="display: inline-block;vertical-align:middle;">
                <el-button
                    size="mini"
                    @click="handleView(scope.$index)">View
                </el-button>
            </div>
            <div style="display: inline-block;margin-left: 20px;">
                <el-upload
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="fileChange"
                    :file-list="articleData.list[scope.$index].fileList"
                    :v-model="articleData.list[scope.$index].fileList"
                    :limit="1"
                    action="/upload">
                    <el-button slot="trigger" size="small" type="primary" @click="curRowIndex=scope.$index">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(scope.$index)">上传到服务器</el-button>
                </el-upload>
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
    name: "articleEdit",
    data() {
      return {
        articleData: {},
        viewDialogVisible: false,
        editDialogVisible: false,
        oilInfo: {},
        size: 20,
        currentPage: 1,
        total: 0,
        searchName: "",
        chosen: 'article_name',
        fileList: [],
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
      handleView(index) {
        let _pk = this.articleData.list[index].pk
         window.open(this.$target + '/article/getFile?pk='+_pk, '_blank');
      },
      fileChange(file, fileList) {
        this.articleData.list[this.curRowIndex].fileList = fileList
      },
      submitUpload(index) {
        let that = this
        let temp = this.articleData.list[index]
        if (temp.fileList.length == 0) {
          this.$message("未选择更新后的文件")
            return
        }
        let form = new FormData();
        form.append('pk', temp.pk)
        form.append('file', temp.fileList[0].raw)
        this.$api.article.update(form)
            .then(({data, state, success}) => {
                if(success) {
                    this.$message('上传成功');
                }else {
                  this.$message('上传失败，请重试，或联系管理员')
                }
                that.getArticleData()
            }).catch(err => {
                console.log(err)
            })
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getArticleData()
      },
      getArticleData() {
        let v = this;
        this.$api.article.search(this.currentPage, this.searchName)
            .then(({data, state}) => {
              if (state === 0) {
                v.articleData = data;
                for(let i=0;i<v.articleData.list.length;i++) {
                    v.articleData.list[i].fileList = []
                }
                v.total = data.total;
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
        this.$api.article.search(1, v.searchName)
            .then(({data, state}) => {
              if (state === 0) {
                v.articleData = data;
                v.total = data.length;
              }
            }).catch(err => {
          console.log(err);
        });
      },
    },
    created() {
      this.getArticleData();
    }
  }
  </script>
  
  <style scoped>
  
  </style>