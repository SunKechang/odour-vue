<template>
    <div>
        <el-table
                :data="logs.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
                border
                style="width: 100%">
            <el-table-column
                    prop="operateTime"
                    label="Time"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="compoundName"
                    label="Compound Name"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="Account"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="Type">
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="size"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import request from "@/network/request";
    export default {
        name: "LogTable",
        data(){
            return{
                logs:[],
                size:15,
                currentPage:1,
                total:0
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
            request.get('/log/all')
                .then(res=>{
                    if(res.data.state===0) {
                        v.logs = res.data.data;
                        v.total = res.data.data.length;
                        console.log(v.total);
                    }
                }).catch(err=>{
                console.log(err);
            });
        }
    }
</script>

<style scoped>

</style>