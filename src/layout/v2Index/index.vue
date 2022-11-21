<template>
    <div>
      <el-backtop></el-backtop>
      <top-nav></top-nav>
      <el-container>
        <el-main style="padding: 0;">
          <router-view class="content"></router-view>
        </el-main>
        <el-footer class="footer" height="300px">
            <el-row>
                <el-col :span="8">
                    <div class="footerUrl">
                        <h3 class="contentText">{{ $t("footer.developer") }}</h3>
                        <div class="demo-image singleFooter flexContainer">
                            <el-image
                            style="width: 100px; height: 100px"
                            :src="tianQr"></el-image>
                            <span class="contentText" style="margin-top: 10px;">{{ $t("footer.tianQr") }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="footerUrl">
                        <h3 class="contentText">{{ $t("footer.contact") }}</h3>
                        <div class="singleFooter">
                            <el-link icon="el-icon-message" href="mailto:zhubaoqing@bjfu.edu.cn" class="contentText">zhubaoqing@bjfu.edu.cn</el-link>
                        </div>
                        <div class="demo-image singleFooter flexContainer">
                            <el-image
                            style="width: 100px; height: 100px"
                            :src="zhuQr"></el-image>
                            <span class="contentText" style="margin-top: 10px;">{{ $t("footer.zhuQr") }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="footerUrl">
                        <h3 class="contentText">{{ $t("footer.links") }}</h3>
                        <router-link to="/login" class="contentText singleFooter"><i class="el-icon-user"></i>{{ $t("footer.admin") }}</router-link>
                        <router-link to="/Register" class="contentText singleFooter"><i class="el-icon-edit-outline"></i>{{ $t("footer.regist") }}</router-link>
                    </div>
                </el-col>
            </el-row>
        </el-footer>
      </el-container>
    </div>
  </template>
  
  <script>
  import v2TopNav from "@/layout/v2Index/components/TopNav"
  import oil from "@/assets/oil.jpg"
  import zhuQr from "@/assets/qrcode_for_gh_84b8b3acb5ad_430.jpg"
  import tianQr from "@/assets/developerQRCode.jpg"
  export default {
    name: "index",
    component: [v2TopNav],
    components: {
      "top-nav": v2TopNav,
    },
    data() {
      return{
        oil: oil,
        zhuQr: zhuQr,
        tianQr: tianQr
      }
    },
    methods: {},
    created() {
    }
  }
  </script>
  
  <style scoped>
  .content {
    width: 100%;
    height: 100%;
    min-height: 400px;
    margin: 0 auto;
  }
  
  .footer {
    background-color: #2f4056;
  }
  
  .admin-link {
    float: right;
    position: relative;
    top: 40%;
    text-decoration: none;
    color: #ffd04b;
  }
  .footerUrl {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .contentText {
    color: #ffffff;
  }
  .singleFooter {
    margin-top: 15px;
  }
  .flexContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  </style>