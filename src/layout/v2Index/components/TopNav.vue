<template>
    <div style="display: flex; justify-content: space-between; background-color: #529287;">
        <a :href="url">
          <el-image alt="bjfu" style="height: 60px;width: 200px" :src="bjfu"/>
        </a>
        <div style="display: flex; flex-direction: row;">
            <el-menu
                :default-active="$route.path" 
                class="tab"
                :router="true"
                mode="horizontal"
                active-text-color="#ffd04b"
                background-color="#529287"
                text-color="#ffffff">
                <el-menu-item index="/v2/home" class="singleTab">{{ $t("nav.home") }}</el-menu-item>
                <el-submenu index="">
                    <template slot="title" class="singleTab">{{ $t("nav.search") }}</template>
                    <el-menu-item index="/v2/compound">{{ $t("nav.allSearch") }}</el-menu-item>
                    <el-menu-item v-for="(base, index) in baseList" :key="index">{{base}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="/v2/oil" class="singleTab">{{ $t("nav.oils") }}</el-menu-item>
                <el-menu-item index="/v2/download" class="singleTab">{{ $t("nav.download") }}</el-menu-item>
                <el-menu-item index="/v2/about" class="singleTab">{{ $t("nav.about") }}</el-menu-item>
            </el-menu>
            <div>
                <language></language>
            </div>
        </div>
    </div>
  
  </template>
  
  <script>
  import Language from "@/layout/v2Index/components/Language";
  import bjfu from "@/assets/bjfu.png"
  export default {
    name: "v2TopNav",
    component: [Language],
    components: {
      "language": Language
    },
    data() {
      return {
        url: 'http://www.bjfu.edu.cn/',
        bjfu: bjfu,
        baseList: []
      }
    },
    created() {
        let that = this
        this.$api.compound.getBases()
        .then(({data, success}) => {
            that.baseList = data
        })
    }
  }
  </script>
  
  <style scoped>
  .singleTab {
    padding: 0 50px 0 50px;
  }
  </style>