<template>
  <div>
    <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#529287"
        class="el-menu-demo"
        mode="horizontal"
        router
        text-color="#ffffff">
      <el-menu-item index="">
        <a :href="url">
          <el-image alt="bjfu" style="height: 60px;width: 200px" :src="bjfu"/>
        </a>
      </el-menu-item>
      <el-menu-item index="/home">{{ $t("nav.home") }}</el-menu-item>
      <el-submenu index="2">
        <template slot="title">{{ $t("nav.compounds") }}</template>
        <el-menu-item index="/compound">所有化合物</el-menu-item>
        <el-menu-item v-for="(item, indexx) in productList" :index="'/product?product='+item.id" :key="indexx">
          {{item.productName}}
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/downloadpro">{{ $t("nav.downloadpro") }}</el-menu-item>
      <el-menu-item index="/oildatabase">{{ $t("nav.oils") }}</el-menu-item>
      <el-menu-item index="/about">{{ $t("nav.about") }}</el-menu-item>
      <el-menu-item index="/agency">{{ $t("nav.agency") }}</el-menu-item>
      <el-menu-item index="/contact">{{ $t("nav.contact") }}</el-menu-item>
    </el-menu>
    <language></language>
  </div>

</template>

<script>
import Language from "@/layout/index/components/Language";
import bjfu from "@/assets/bjfu.png"
export default {
  name: "TopNav",
  component: [Language],
  components: {
    "language": Language
  },
  data() {
    return {
      url: 'http://www.bjfu.edu.cn/',
      bjfu: bjfu,
      productList: []
    }
  },
  created() {
    this.$api.product.getAll()
        .then(res => {
          this.productList = res.data
        })
  }
}
</script>

<style scoped>
</style>