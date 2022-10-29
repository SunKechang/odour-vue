<template>
    <div class="oil-info-form">
      <div class="itemTitle">
        <p>Add Article</p>
        <img :src="lineUrl" alt="line" style="width: 100%">
      </div>
      <el-form ref="artInfoForm" :model="artInfoForm" :rules="rules" label-width="200px">
        <el-form-item label="Article Name" prop="articleName">
          <el-input v-model="artInfoForm.articleName" clearable style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="Article File">
            <el-upload
                action="/"
                :on-change="fileChange"
                :file-list="emptyList"
                :auto-upload="false"
                :limit="1">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
  
        <div style="text-align: right;margin-top: 10px">
          <el-button type="primary" @click="submitForm()">Add</el-button>
        </div>
      </el-form>
    </div>
  </template>
  
  <script>
  import line from "@/assets/line.png"
  
  export default {
    name: "AddCompound",
    data() {
      return {
        lineUrl: line,
        artInfoForm: {
            articleName: '',
            file: null,
        },
        rules: {
            articleName: [
            {required: true, message: "Article name can't be blank", trigger: 'blur'}
            ]
        },
        emptyList: []
      }
    },
    create() {
    },
    methods: {
        submitForm() {
            if(this.artInfoForm.articleName === null || this.artInfoForm.articleName === '') {
                this.$message("文献名称不能为空")
                return
            }
            if(this.artInfoForm.file === null || this.artInfoForm.file === undefined) {
                this.$message("文献文件不能为空")
                return
            }
            let that = this
            let form = new FormData();
            form.append('name', this.artInfoForm.articleName)
            form.append('file', this.artInfoForm.file)
            this.$api.article.add(form)  
                .then(({data, state, success}) => {
                    if(success) {
                        that.$message('上传成功');
                    }else {
                        that.$message('上传失败')
                    }
                    that.emptyList = []
                    that.artInfoForm = {
                        articleName: '',
                        file: null,
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        fileChange(file, fileList) {
            if(fileList.length == 1) {
                this.artInfoForm.file = fileList[0].raw
            }
        }
    }
  }
  </script>
  
  <style scoped>
  .oil-info-form {
    text-align: left;
  }
  
  .itemTitle p {
    font-size: 30px;
    color: #529287;
  }
  
  .oil-info-form {
    text-align: left;
    background-color: #ffffff;
    padding-left: 50px;
    padding-bottom: 50px;
    border-color: #e7eaec;
    border-width: 3px 0 0;
    border-style: solid solid none;
  }
  
  .oil-info-form form {
    padding-top: 30px;
    padding-right: 30px;
  }
  
  </style>