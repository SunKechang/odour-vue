<template>
    <el-table
            :data="news"
            stripe
            class="update-news"
            style="width: 90%;margin: 0 auto">
        <el-table-column
                prop="content"
                :label="$t('home.compounds')">
            <template v-slot="scope">
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
            this.$api.compound.getNews()
                .then(res=>{
                    this.news=res.data;
                }).catch(err=>{
                console.log(err);
            })
        },
        methods:{
            view(row){
                request.get('/compound/'+row.compoundId)
                    .then(({state, data})=>{
                        if(state===0) {
                            this.$router.push({
                                name: 'search',
                                params: {
                                    result: data
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