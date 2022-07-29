<template>
    <el-table
            :data="news"
            stripe
            class="team-news"
            style="width: 90%;margin: 0 auto">
        <el-table-column
                prop="content"
                :label="$t('home.teamNews')">
            <template v-slot="scope">
                <a  :href="scope.row.link" target="_blank">{{ scope.row.title }}</a>
            </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                prop="time"
                label=""
                width="180">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "TeamNews",
        data(){
            return{
                news:[]
            }
        },
        created() {
            this.$api.team.getTeamNews()
                .then(res=>{
                  this.news=res.data
                }).catch(err=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .team-news a{
        text-decoration: none;
        color: black;
    }

    .team-news a:hover{
        color: #529287;
    }
</style>