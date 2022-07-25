<template>
    <div >
        <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
            <el-form-item>
                <el-select v-model="searchForm.property">
                    <el-option label="Oil Name" value="oil_name"></el-option>
                    <el-option label="Oil Type" value="oil_type"></el-option>
                    <el-option label="Oil Brand" value="oil_brand"></el-option>
                    <el-option label="Key Compound CAS" value="key_compound_cas"></el-option>
                    <el-option label="Oil Odour" value="oil_odour"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input
                        class="condition-description"
                        v-model="searchForm.propertyDescription"
                        style="width: 200px"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>

            </el-form-item>
        </el-form>
        <el-button  style="float:right"  @click="onDownload">下载食用油表单</el-button>
        <el-table
                @row-click="on_select"  @selection-change="on_selectsion"    :row-key="getRowKey"
                :data="oilData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="Index"
                    width="60"
                    :index="indexMethod">
            </el-table-column>
            <el-table-column type="selection":reserve-selection="true"></el-table-column>
            <el-table-column
                    prop="oilName"
                    label="Oil Name"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="oilType"
                    label="Oil Type"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="oilBrand"
                    label="Oil Brand"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="oilDate"
                    label="Oil Production Date"
                    width="200">
            </el-table-column>
            <el-table-column label="Operation">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index)">View</el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index)">Edit</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    layout="prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="size"
                    :total="total">
            </el-pagination>
        </div>

        <oil-info :visible.sync="viewDialogVisible" :oilInfo="oilInfo"></oil-info>
        <oil-info-edit :visible.sync="editDialogVisible" :oilInfo="oilInfo" :getOilData="getOilData" ></oil-info-edit>
    </div>
</template>

<script>
    import request from "@/network/request";
    import axios from 'axios'
    const oilInfo=()=>import("@/oils/OilInfo");
    const OilInfoEdit=()=>import("../components/OilInfoEdit")

    export default {
        name: "oilTable",
        component:[oilInfo,OilInfoEdit],
        components:{
            "oil-info":oilInfo,
            "oil-info-edit":OilInfoEdit
        },
        data(){
            return{
                oilData:[],
                viewDialogVisible:false,
                editDialogVisible:false,
                oilInfo:{},
                size:10,
                currentPage:1,
                total:0,
                searchForm: {
                    property:'oil_name',
                    propertyDescription:''
                }
            }
        },
        methods: {
            on_select(val){//点击行选中复选框
                this.$refs.table.toggleRowSelection(val);
            },
            on_selectsion(val){//选中复选框操作
                console.log(val)
                this.downloadList = val;
            },
            indexMethod(index) {
                index = (index + 1) + (this.currentPage - 1) * this.size
                return index;
            },
            handleView(index){
                this.viewDialogVisible=!this.viewDialogVisible;
                this.oilInfo=this.oilData[(this.currentPage-1)*this.size+index];
            },
            handleEdit(index) {
                this.editDialogVisible=!this.editDialogVisible;
                this.oilInfo=this.oilData[(this.currentPage-1)*this.size+index];
            },
            handleDelete(index) {
                let v=this;
                let id=v.oilData[(this.currentPage-1)*this.size+index].id;
                request.delete('/oil/delete/'+id)
                    .then(res=>{
                        if(res.data.state===0){
                            this.getOilData();
                            v.$alert("Delete "+v.oilData[index].oilName+" successfully!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        }else{
                            v.$alert("Error!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            },
            handleSizeChange(val) {
                this.size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getOilData(){
                let v=this;
                request.get('/oil/all')
                    .then(res=>{
                        if(res.data.state===0) {
                            v.oilData = res.data.data;
                            console.log(res.data.data)
                            v.total = res.data.data.length;
                        }

                    }).catch(err=>{
                    console.log(err);
                });
            },
            onDownload(){
                let v=this;
                console.log(v.downloadList)
                const request1 = axios.create({
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    responseType: "blob",
                    baseURL: '/api',
                    withCredentials: true,
                    timeout: 5000
                });
                request1.post('/oil/download',v.downloadList)
                    .then(res=>{
                        console.log(res.data)
                        let blob = new Blob([res.data], { type: 'application/ms-excel;charset=utf-8' });
                        let downloadElement = document.createElement('a');
                        let href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = '食用油分页信息表.xls'; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                        v.$alert("下载成功", "Message", {
                            confirmButtonText: 'Confirm'
                        });
                    }).catch(err=>{
                    console.log(err);
                });
            },
            onSubmit() {
                let v=this;
                let param=new FormData();
                param.append("property",v.searchForm.property);
                param.append("propertyDescription",v.searchForm.propertyDescription);
                request.post('/oil/searchoil',param)
                    .then(res=>{
                        if(res.data.state===0) {
                            v.oilData=res.data.data;
                            v.total=res.data.data.length;
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            },
        },
        created() {
            this.getOilData();
        }
    }
</script>

<style scoped>

</style>