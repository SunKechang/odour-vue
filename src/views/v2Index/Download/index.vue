<template>
    <div>
      <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
      <h1>上传含有一列CAS号的表格来获取化合物详细信息</h1>
  
      <el-upload
          :auto-upload="false"
          :limit="1"
          drag
          :multiple="false"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action=""
          style="text-align: center;"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只 能 上 传 xlsx / xls 文 件</div>
      </el-upload>
      <el-button size="small" @click="downloadTemplate">下载模板</el-button>
      <h2>请勾选需要下载的信息：</h2>
      <input id="ri" v-model="checkList" type="checkbox" value="ri">
      <label for="ri">极性柱</label>
      <input id="nri" v-model="checkList" type="checkbox" value="nri">
      <label for="nri">非极性柱</label>
      <input id="od" v-model="checkList" type="checkbox" value="od">
      <label for="od">香气描述</label>
      <input id="ot" v-model="checkList" type="checkbox" value="ot">
      <label for="ot">香气阈值</label>
      <div>
        <el-button @click="onDownloadpro">下载化合物详细信息</el-button>
      </div>
  
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        cassList: '',
        checkList: [],
        checksList: '',
        downloadList: {},
        fileTemp: null,
        file: null,
        da: [],
        dalen: 0
      };
    },
    methods: {
      downloadTemplate() {
        this.$api.compound.downloadTemplate().then((res) => {
          let url = URL.createObjectURL(res)
          let a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.setAttribute('download', 'CAS上传模板.xlsx') // 设置下载的文件名
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a) //下载完成移除dom元素
          URL.revokeObjectURL(url) //释放掉blob对象
        })
      },
      handleChange(file) {
        this.fileTemp = file.raw;
        if (this.fileTemp) {
          if ((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
              || (this.fileTemp.type === 'application/vnd.ms-excel')) {
            this.importfxx(this.fileTemp)
          } else {
            this.$message({
              type: 'warning',
              message: '附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传附件！'
          })
        }
      },
      handleExceed() {
        this.$message({
          type: 'warning',
          message: '超出最大上传文件数量的限制！'
        })
      },
      handleRemove() {
        this.fileTemp = null
      },
      importfxx() {
        let _this = this;
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        let rABS = false; //是否将文件读取为二进制字符串
        let f = this.file;
        let reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          let binary = "";
          let rABS = false; //是否将文件读取为二进制字符串
          let wb; //读取完成的数据
          let exdata;
          let reader = new FileReader();
          reader.onload = function () {
            let bytes = new Uint8Array(reader.result);
            let length = bytes.byteLength;
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            let XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            exdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            console.log('原始数据如下：');
            console.log(exdata);
            _this.downloadList = exdata
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      onDownloadpro() {
        let v = this;
        const cass = [];
        for (const item of v.downloadList) {
          cass.push(item.CAS)
        }
        const checks = [];
        for (const item of v.checkList) {
          checks.push(item)
        }
        this.form = {
          cassList: cass.join(','),// 主键如果有多个使用逗号拼接，如果只有一个则不需要拼接，直接赋值即可
          checksList: checks.join(',')
        }
        this.$api.compound.downloadpro({
          "cas": cass,
          "check": checks
        })
      }
    }
  }
  </script>
  
  
  <style scoped>
  
  </style>