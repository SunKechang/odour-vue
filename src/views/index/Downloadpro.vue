<template>
    <div>
        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <h1>上传含有一列CAS号的表格来获取化合物详细信息</h1>

        <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
            <el-button style="float:left" size="small" type="primary" >点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div> -->
        </el-upload>

        <h2 >请勾选需要下载的信息：</h2>
        <input type="checkbox" id="ri" value="ri" v-model="checkList">
        <label for="ri">极性柱</label>
        <input type="checkbox" id="nri" value="nri" v-model="checkList">
        <label for="nri">非极性柱</label>
        <input type="checkbox" id="od" value="od" v-model="checkList">
        <label for="od">香气描述</label>
        <input type="checkbox" id="ot" value="ot" v-model="checkList">
        <label for="ot">香气阈值</label>
        <div>
        <el-button    @click="onDownloadpro">下载化合物详细信息</el-button>
        </div>

    </div>
</template>

<script>
    import request from "@/network/request";
    import axios from 'axios'
    export default {
        data() {
            return {
                cassList:'',
                checkList:[],
                checksList:'',
                downloadList:{},
                limitUpload:1,
                fileTemp:null,
                file:null,
                da:[],
                dalen:0
            };
        },
        methods:{

            handleChange(file, fileList){
                this.fileTemp = file.raw;
                if(this.fileTemp){
                    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        || (this.fileTemp.type == 'application/vnd.ms-excel')){
                        this.importfxx(this.fileTemp);

                    } else {
                        this.$message({
                            type:'warning',
                            message:'附件格式错误，请删除后重新上传！'
                        })
                    }
                } else {
                    this.$message({
                        type:'warning',
                        message:'请上传附件！'
                    })
                }
            },

            handleExceed(){
                this.$message({
                    type:'warning',
                    message:'超出最大上传文件数量的限制！'
                })
                return;
            },
            handleRemove(file,fileList){
                this.fileTemp = null
            },
            importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据

                this.file = event.currentTarget.files[0];

                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;

                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var exdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require("xlsx");
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
                        _this.downloadList= exdata


                    };
                    reader.readAsArrayBuffer(f);
                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            onDownloadpro(){
                let v=this;

                console.log(v.downloadList,v.checkList)


                const cass=[];
                for (const item of v.downloadList) {
                    cass.push(item.CAS)
                }
                const checks=[];
                for (const item of v.checkList) {
                    checks.push(item)
                }

                this.form = {
                    cassList: cass.join(',') ,// 主键如果有多个使用逗号拼接，如果只有一个则不需要拼接，直接赋值即可
                    checksList: checks.join(',')
                }
                console.log(cass)
                console.log(checks)
                let data={
                    "cas":cass,
                    "check":checks
                }

                const request1 = axios.create({
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    responseType: "blob",
                    baseURL: '/api',
                    withCredentials: true,
                    timeout: 5000
                });
                request1.post('/compound/downloadpro',data)
                    .then(res=>{

                            console.log(res.data)
                            let blob = new Blob([res.data], { type: 'application/ms-excel;charset=utf-8' });
                            let downloadElement = document.createElement('a');
                            let href = window.URL.createObjectURL(blob); //创建下载的链接
                            downloadElement.href = href;
                            downloadElement.download = '化合物信息表.xls'; //下载后文件名
                            document.body.appendChild(downloadElement);
                            downloadElement.click(); //点击下载
                            document.body.removeChild(downloadElement); //下载完成移除元素
                            window.URL.revokeObjectURL(href); //释放掉blob对象
                            v.$alert("下载成功", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        // }else{
                        //     v.$alert("Failed!", "Message", {
                        //         confirmButtonText: 'Confirm'
                        //     });
                        // }
                    }).catch(err=>{
                    console.log(err);
                });
            },


        }
    }
</script>


<style scoped>

</style>