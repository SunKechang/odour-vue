<template>
  <div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo slideNav"
        router>
      <el-menu-item class="slideTitle" index="">
        <span slot="title">{{ $t("agency.title") }}</span>
      </el-menu-item>
      <el-menu-item index="/agency/tf">
        <span slot="title">{{ $t("agency.ThermoFisher.title") }}</span>
      </el-menu-item>
      <el-menu-item index="/agency/gom">
        <span slot="title">{{ $t("agency.GCOrbitrapMS.title") }}</span>
      </el-menu-item>
    </el-menu>
    <div style="display:inline-block;width: 70%;float: right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "CooperationAgency"
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
  background: url("../../../assets/slideLine.png") left bottom no-repeat;
}
</style>