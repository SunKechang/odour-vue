<template>
    <div>
        <el-backtop></el-backtop>
        <top-nav></top-nav>
        <div class="lang">
            <el-link  @click="ch">中文</el-link>&nbsp;|
            <el-link  @click="en">ENG</el-link>
        </div>
        <div class=background style="width: 100%;overflow: hidden"><img src="../../assets/oil.jpg" alt=""></div>
        <el-container>
            <el-main>
                <router-view class="content"></router-view>
            </el-main>

            <el-footer class="footer">
                <router-link class="admin-link" to="/login"><i class="el-icon-user"></i>{{$t("footer.admin")}}</router-link>
            </el-footer>

        </el-container>
    </div>
</template>

<script>
    import Nav from "./components/Nav";
    export default {
        name: "index",
        component:Nav,
        components:{
            "top-nav":Nav
        },
        methods:{
            ch(){
                this.$i18n.locale='zh'
            },
            en(){
                this.$i18n.locale='en'
            }
        },
        created() {
            this.$api.city.add(returnCitySN)
                .then(()=>{
                    console.log("Welcome！");
                }).catch(err=>{
                console.log(err);
            });
            console.log(this.$store.state.footer)
        }
    }
</script>

<style scoped>
    .lang{
        position: absolute;
        right: 50px;
        top:20px;
        color: #ffffff;
    }

    .lang a{
        color: #ffffff;
        text-decoration: none;
    }

    .content{
        width: 80%;
        height: 100%;
        min-height: 400px;
        margin:0 auto;
    }

    .footer{
        background-color: #529287;
        margin-top: 100px;
    }

    .admin-link{
        float:right;
        position: relative;
        top:40%;
        text-decoration: none;
        color:#ffd04b;
    }
</style>