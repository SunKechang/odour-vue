<template>
    <div>
        <h2>{{$t("home.title")}}</h2>
        <div class="compound-info-list">
            <div class="itemTitle">
                <p>{{$t("home.summary")}}</p>
                <el-image :src="lineUrl" width="100%" alt=""></el-image>
            </div>
            <div style="text-align: left;margin-bottom: 20px">
                <span style="line-height: 25px">{{$t("compounds.introduction")[0]}}</span><br>
                <span style="line-height: 25px">{{$t("compounds.introduction")[1]}}</span>
            </div>
        </div>
      <el-row>
        <el-col :lg="12">
          <div class="compound-info-list">
            <div class="itemTitle">
              <p>{{$t("home.notice")}}</p>
              <el-image :src="lineUrl" width="100%" alt=""></el-image>
            </div>
          </div>
          <el-carousel indicator-position="outside" :interval="5000">
            <el-carousel-item >
              <update-news></update-news>
            </el-carousel-item>
            <el-carousel-item >
              <team-news></team-news>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :lg="12">
          <div class="compound-info-list">
            <div class="itemTitle">
              <p>{{$t("home.product")}}</p>
              <el-image :src="lineUrl" width="100%" alt=""></el-image>
            </div>
            <el-row gutter="20">
              <el-col v-for="(item, index) in productList" :key="index" :span="12">
                <el-image :src="$store.state.host + item.productPicture" width="100%" :alt="item.productName"/>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    import UpdateNews from  "./components/UpdateNews"
    import TeamNews from "./components/TeamNews"
    import line from "@/assets/line.png"
    export default {
        name: "Home",
        data() {
          return {
            productList: [],
            lineUrl: line
          }
        },
        methods: {},
        component:[UpdateNews,TeamNews],
        components:{
            "update-news":UpdateNews,
            "team-news":TeamNews
        },
      created() {
          this.$api.product.getNews().then(res=> {
            this.productList = res.data
          })
      }
    }
</script>

<style scoped>
    .compound-info-list{
        margin: 0 auto;
        width: 90%;
    }

    .compound-info-list .itemTitle {
        text-align: left;
    }
    .compound-info-list .itemTitle p{
        margin-block-start: 0;
        margin-block-end: 0;
        font-size: 30px;
        color: #529287;
    }
</style>