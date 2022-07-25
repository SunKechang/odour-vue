<template>
    <el-table
            :data="news"
            stripe
            class="update-news"
            style="width: 90%;margin: 0 auto">
        <el-table-column
                prop="content"
                :label="$t('home.compounds')">
            <template scope="scope">
                <div class="content" @click="view(scope.row)">{{ scope.row.content }}</div>
            </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                prop="updateTime"
                label=""
                width="180">
        </el-table-column>
    </el-table>
</template>

<script>
    import request from "@/network/request";

    export default {
        name: "UpdateNews",
        data(){
            return{
                news:[]
            }
        },
        created() {
            let v=this;
            request.get('/compound/news')
                .then(res=>{
                    v.news=res.data.data;
                }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            view(row){
                const v=this;
                request.get('/compound/'+row.compoundId)
                    .then(res=>{
                        if(res.data.state===0) {
                            v.$router.push({
                                name: 'search',
                                params: {
                                    result: res.data.data
                                }
                            });
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .update-news .content{
        cursor: pointer;
    }

</style>