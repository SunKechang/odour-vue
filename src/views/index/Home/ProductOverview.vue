<template>
  <div>
    <div class="compound-info-list">
      <div class="itemTitle">
        <p>{{$t("home.product")}}</p>
        <el-image :src="lineUrl" alt="" style="width: 100%"></el-image>
      </div>
    </div>
    <el-carousel indicator-position="outside" :interval="5000">
      <el-carousel-item v-for="(carItem, carIndex) in carouselData" :key="carIndex">
        <el-row :gutter="20">
          <el-col v-for="(proItem, proIndex) in carItem" :key="proIndex" :span="12">
            <el-image
                :src="$store.state.config.host + proItem.productPicture"
                :alt="proItem.productName"
                style="height: 150px"
            />
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import line from "@/assets/line.png"
export default {
  name: "ProductOverview",
  data() {
    return {
      lineUrl: line,
      carouselData: []
    }
  },
  created() {
    this.$api.product.getNews().then(res=> {
      for (let i = 0; i<Math.ceil(res.data.length/4); i++) {
        this.carouselData.push(res.data.slice(i*4, (i+1)*4))
      }
    })
  }
}
</script>

<style scoped>
.compound-info-list {
  margin: 0 auto;
  width: 90%;
}

.compound-info-list .itemTitle {
  text-align: left;
}

.compound-info-list .itemTitle p {
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 30px;
  color: #529287;
}
</style>