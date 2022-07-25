<template>
    <div>
        <span style="float: left">Total:{{total}}</span>
        <el-table
                :data="citySNData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
                border
                style="width: 100%">
            <el-table-column
                    prop="cip"
                    label="IP">
            </el-table-column>
            <el-table-column
                    prop="cid"
                    label="CID">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="City">
            </el-table-column>
            <el-table-column
                    prop="visitTime"
                    label="Time">
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
    </div>
</template>

<script>
    import request from "../../../network/request";

    export default {
        name: "CitySNTable",
        data(){
            return{
                size:10,
                currentPage:1,
                total:0,
                citySNData:[]
            }
        },
        methods:{
            handleSizeChange(val) {
                this.size = val;
            },

            handleCurrentChange(val) {
                this.currentPage = val;
            }
        },
        created() {
            let v=this;
            request.get('/city/all')
                .then(res=>{
                    if(res.data.state===0) {
                        res.data.data.reverse();
                        v.citySNData = res.data.data;
                        v.total = res.data.data.length;
                    }
                }).catch(err=>{
                console.log(err);
            });
        }
    }
</script>

<style scoped>

</style>