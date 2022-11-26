<template>
    <div>
      <el-table
          ref="table"
          :data="baseList"
          :row-key="getRowKey" border
          style="width: 100%"
          @row-click="on_select"
          @selection-change="on_selectsion">
            <el-table-column
                label="ID"
                prop="id"
                min-width="120">
            </el-table-column>
            <el-table-column
                label="Base Name"
                prop="base"
                min-width="250">
            </el-table-column>
            <el-table-column
                label="Kind"
                min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.kind === 1">阈值基质</span>
                    <span v-else>函数基质</span>
                </template>
            </el-table-column>
            <el-table-column
                label="Importance"
                prop="importance"
                min-width="120">
            </el-table-column>
            <el-table-column
                label="Picture"
                min-width="150">
                <template slot-scope="scope">
                    <el-image
                        v-if="scope.row.imgPath !== null"
                        :preview-src-list="['/api'+scope.row.imgPath]"
                        :src="scope.row.imgPath"
                        alt="Base Image"
                        style="position: relative;width: 100px;"
                    />
                    <span v-else>无</span>
                </template>
            </el-table-column>
            <el-table-column label="Operation" min-width="250">
                <template slot-scope="scope">
                    <div style="display: inline-block;margin-left: 20px;">
                        <el-upload
                            :multiple="false"
                            :auto-upload="false"
                            :on-change="fileChange"
                            :file-list="baseList.fileList"
                            :v-model="baseList.fileList"
                            :limit="1"
                            accept="image/jpg,image/jpeg,image/png"
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
  import {convertImgToBase64} from "@/utils/image";
  export default {
    name: "base",
    data() {
      return {
        articleData: {},
        viewDialogVisible: false,
        editDialogVisible: false,
        oilInfo: {},
        size: 20,
        currentPage: 1,
        total: 0,
        baseList: [],
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
        this.baseList[this.curRowIndex].fileList = fileList
        convertImgToBase64(fileList[0].raw, (base64Str) => {
            this.baseList[this.curRowIndex].newImg = base64Str;
        }, () => {
            console.log("convert error");
        });
      },
      async submitUpload(index) {
        let that = this
        let temp = this.baseList[index]
        if (temp.fileList.length == 0) {
          this.$message("未选择图片")
            return
        }
        let x = {
            id: temp.id,
            image: temp.newImg
        }
        
        await this.$api.base.addPict(x)
            .then(({data, success}) => {
                if(success) {
                    this.$message('上传成功');
                }else {
                  this.$message('上传失败，请重试，或联系管理员')
                }
                that.getBaseData()
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
      getBaseData() {
        let v = this;
        this.$api.base.getBase(this.currentPage)
            .then(({data, success}) => {
                if (success) {
                    v.baseList = data.list;
                    v.total = data.total;
                    for(let i=0;i<v.baseList;i++) {
                        v.baseList[i].newImg = ''
                        v.baseList[i].fileList = []
                    }
                }
            }).catch(err => {
          console.log(err);
        });
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
      this.getBaseData();
    }
  }
  </script>
  
  <style scoped>
  
  </style>