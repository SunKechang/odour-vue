<template>
    <div >
        <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
            <el-form-item>
                <el-select v-model="searchForm.property">
                    <el-option label="Compound Name" value="compound_name"></el-option>
                    <el-option label="CAS NO." value="cas_no"></el-option>
                    <el-option label="Odour Description" value="odour_description"></el-option>
                    <el-option label="Odour Threshold" value="odour_threshold"></el-option>
                    <el-option label="RI" value="compound_ri"></el-option>
                    <el-option label="NRI" value="compound_nri"></el-option>
                    <el-option label="Measured" value="measured"></el-option>
                    <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
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
                <el-button  circle icon="el-icon-search" @click="onSubmit"></el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="compoundData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
                stripe
                style="width: 100%">

            <el-table-column
                    prop="compoundName"
                    :label="$t('compound.compoundName')"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="casNo"
                    :label="$t('compound.casNo')"
                    width="200">
            </el-table-column>

            <el-table-column label="Operation">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index)">{{$t("view")}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="text-align: center">
<!--            请勾选需要下载的信息：-->
<!--            <input type="checkbox" id="ri" value="ri" v-model="checkList">-->
<!--            <label for="ri">极性柱</label>-->
<!--            <input type="checkbox" id="nri" value="nri" v-model="checkList">-->
<!--            <label for="nri">非极性柱</label>-->
<!--            <input type="checkbox" id="od" value="od" v-model="checkList">-->
<!--            <label for="od">香气描述</label>-->
<!--            <input type="checkbox" id="ot" value="ot" v-model="checkList">-->
<!--            <label for="ot">香气阈值</label>-->

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
        <compound-info :visible.sync="viewDialogVisible" :compoundInfo="compoundInfo"></compound-info>
    </div>
</template>

<script>
    import request from "@/network/request";
    const CompoundInfo=()=>import("@/components/CompoundInfo");

    export default {
        name: "CompoundTable",
        component:[CompoundInfo],
        components:{
            "compound-info":CompoundInfo
        },
        data(){

            return{
                downloadList:[],
                compoundData:[],
                viewDialogVisible:false,
                compoundInfo:{},
                size:10,
                currentPage:1,
                total:0,
                searchForm: {
                    property:'compound_name',
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
            handleSizeChange(val) {
                this.size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            handleView(index){
                this.viewDialogVisible=!this.viewDialogVisible;
                this.compoundInfo=this.compoundData[(this.currentPage-1)*this.size+index];
            },
            getCompoundData(){
              console.log(this)
              this.$api.compound.getList({
                page: this.currentPage,
                size: this.size
              }).then(res => {
                console.log(res)
                this.compoundData = res.data
              }).catch(err=>{
                console.log(err)
              })
            },

            onSubmit() {

                let v=this;
                let param=new FormData();
                param.append("property",v.searchForm.property);
                param.append("propertyDescription",v.searchForm.propertyDescription);
                request.post('/compound/search',param)
                    .then(res=>{
                        if(res.data.state===0) {
                            v.compoundData=res.data.data;
                            v.total=res.data.data.length;
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            }
        },

        created() {
          console.log("text")
          this.getCompoundData();

        }
    }
</script>

<style scoped>
</style>