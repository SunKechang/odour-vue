<template>
  <div>
    <el-menu
        class="el-menu-vertical-demo slideNav">
      <el-menu-item class="slideTitle" index="0">
        <span slot="title">{{ $t("contact.title") }}</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span slot="title">{{ $t("contact.weChat") }}</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">{{ $t("contact.email") }}</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">{{ $t("contact.developer") }}</span>
      </el-menu-item>
    </el-menu>
    <div style="display:inline-block;width: 70%;float: right">
      <div class="contact">
        <div class="itemTitle">
          <p>{{ $t("contact.weChat") }}</p>
          <el-image :src="lineUrl" alt="" style="width: 100%"></el-image>
        </div>
        <span>微信公众号：BFU林果品质与加工研究小组</span><br>
        <img alt="qrcode" src="../../../assets/qrcode_for_gh_84b8b3acb5ad_430.jpg">

        <div class="itemTitle">
          <p>{{ $t("contact.email") }}</p>
          <el-image :src="lineUrl" alt="" style="width: 100%"></el-image>
        </div>
        <span>朱老师邮箱：zhubaoqing@bjfu.edu.cn</span>
        <div class="itemTitle">
          <p>{{ $t("contact.developer") }}</p>
          <el-image :src="lineUrl" alt="" style="width: 100%"></el-image>
        </div>
        <span>微信公众号：BJFU文本挖掘与智能信息处理团</span><br>
        <img alt="" src="../../../assets/developerQRCode.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import line from "@/assets/line.png"

export default {
  name: "Contact",
  data() {
    return {
      lineUrl: line,
    }
  }
}
</script>

<style scoped>
.slideNav {
  width: 240px;
  float: right;
  margin-top: -50px;
  position: absolute;
  text-align: left;
}

.slideNav span {
  padding-right: 80px;
  padding-top: 25px;
}

.slideTitle {
  height: 100px;
  background-image: url("../../../assets/slideNavBg.png");
}

.slideTitle span {
  font-size: 32px;
  color: #ffffff;
  font-weight: normal;
  line-height: 64px;
  background: url(../../../assets/slideLine.png) left bottom no-repeat;
}

.contact {
  float: left;
}

.contact span {
  display: inline-block;
  margin-top: 20px;
}

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

.contact {
  text-align: left;
}

.contact span {
  display: inline-block;
  margin-top: 20px;
}

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

</style>