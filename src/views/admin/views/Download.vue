<template>
    <div class="download">
        <div class="itemTitle">
            <p>Download</p>
            <img src="../../../assets/line.png" width="60%" alt="">
        </div>
        <div v-for="(item,index) in files" v-bind:key="index">
            <span>Download 【 <a :href="item.path" :download="item.fileName">{{item.fileName}}</a> 】</span>
        </div>

    </div>
</template>

<script>
    import request from "../../../network/request";

    export default {
        name: "Download",
        data(){
            return{
                files:[]
            }
        },
        created() {
            let v=this;
            request.get('/admin/file')
                .then(res=>{
                    if(res.data.state===0){
                        v.files=res.data.data;
                    }
                }).catch(err=>{
                console.log(err);
            });
        }
    }
</script>

<style scoped>
    .download{
        text-align: left;
        background-color: #ffffff;
        padding-left: 50px;
        padding-bottom: 50px;
        border-color: #e7eaec;
        border-width:3px 0 0;
        border-style:solid solid none;
    }

    .download a{
        font-size: 20px;
        color: #529287;
    }

    .download span{
        display: inline-block;
        margin-top: 20px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }
</style>