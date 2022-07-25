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
                <el-button icon="el-icon-search" circle @click="onSearch"></el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="oilData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="oilName"
                    :label="$t('oil.oilName')"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="oilType"
                    :label="$t('oil.oilType')"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="oilBrand"
                    :label="$t('oil.oilBrand')"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="oilDate"
                    :label="$t('oil.oilDate')"
                    width="200">
            </el-table-column>

            <el-table-column label="">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index)">{{$t("view")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
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
        </div>
        <oil-info :visible.sync="viewDialogVisible" :oilInfo="oilInfo"></oil-info>
    </div>
</template>

<script>
    import request from "@/network/request";
    import jwtDecode from "jwt-decode";
    const OilInfo=()=>import("@/oils/OilInfo");

    export default {
        name: "OilTable",
        component:[OilInfo],
        components:{
            "oil-info":OilInfo
        },
        data(){
            return{
                oilData:[],
                viewDialogVisible:false,
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
            handleSizeChange(val) {
                this.size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            handleView(index){
                this.viewDialogVisible=!this.viewDialogVisible;
                this.oilInfo=this.oilData[(this.currentPage-1)*this.size+index];
            },
            getOilData(){
                let v=this;
                console.log(11111111111111)
                request.get('/oil/all')
                    .then(res=>{
                        v.oilData=res.data.data;
                        v.total=res.data.data.length;
                        console.log(res.data)
                    }).catch(err=>{
                    console.log(err);
                });
            },
            onSearch() {
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

