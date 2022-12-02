<template>
    <div style="display: flex; justify-content: space-between; background-color: #529287;">
        <span style="font-size: 20px;line-height: 60px;color: #ffffff;margin-left: 20px;">BFU 食品风味数据库2.0</span>
        <!-- <a :href="url">
          <el-image alt="bjfu" style="height: 60px;width: 200px" :src="bjfu"/>
        </a> -->
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
                    <el-menu-item index="/v2/compound?kind=0&base=">{{ $t("nav.allSearch") }}</el-menu-item>
                    <el-submenu index="threshold" v-if="thresholdBases.length > 0">
                      <template slot="title">阈值基质</template>
                      <el-menu-item v-for="(threshold, index) in thresholdBases" 
                      :key="'threshold' + index"
                      :index="'/v2/compound?kind=1&base=' + threshold">{{threshold}}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="func" v-if="functionBases.length > 0">
                      <template slot="title">函数基质</template>
                      <el-menu-item v-for="(func, index2) in functionBases"
                      :key="'function' + index2"
                      :index="'/v2/compound?kind=2&base=' + func">{{func}}</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="/v2/download" class="singleTab">{{ $t("nav.download") }}</el-menu-item>
                <el-menu-item index="/v2/about" class="singleTab">{{ $t("nav.about") }}</el-menu-item>
            </el-menu>
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
              <language></language>
                <div v-if="account !== ''" style="margin-right: 20px;">
                    <span style="color: #ffffff; font-size: 16px; line-height: 60px;">Welcome,{{ account }}</span>
                </div>
                
            </div>
        </div>
    </div>
  
  </template>
  
  <script>
  import Language from "@/layout/v2Index/components/Language";
  import bjfu from "@/assets/bjfu.png"
  import jwtDecode from "jwt-decode"
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
        baseList: [],
        thresholdBases: [],
        functionBases: [],
        account: '',
      }
    },
    created() {
        let that = this
        this.$api.compound.getBases()
        .then(({data, success}) => {
            // that.thresholdBases = data.thresholdBase
            that.functionBases = data.functionBase
        })
        let token=this.$store.state.user.Authorization;
        if (token !== 'null') {
          let decode=jwtDecode(token);
          this.account = decode.account
        }
    }
  }
  </script>
  
  <style scoped>
  .singleTab {
    padding: 0 50px 0 50px;
  }
  </style>