<template>
  <div>
    <el-backtop></el-backtop>
    <top-nav></top-nav>
    <div class=background style="width: 100%;overflow: hidden;">
      <el-image alt="oil" :src="oil"></el-image>
    </div>
    <el-container>
      <el-main>
        <router-view class="content"></router-view>
      </el-main>
      <el-footer class="footer">
        <router-link class="admin-link" to="/login"><i class="el-icon-user"></i>{{ $t("footer.admin") }}</router-link>
        <router-link class="admin-link" to="/Register" style="margin-right: 10px;"><i class="el-icon-edit-outline"></i>{{ $t("footer.regist") }}</router-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopNav from "@/layout/index/components/TopNav"
import oil from "@/assets/oil.jpg"
export default {
  name: "index",
  component: [TopNav],
  components: {
    "top-nav": TopNav,
  },
  data() {
    return{
      oil: oil
    }
  },
  methods: {},
  created() {
    this.$api.city.add(returnCitySN)
        .then(() => {
        }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.content {
  width: 80%;
  height: 100%;
  min-height: 400px;
  margin: 0 auto;
}

.footer {
  background-color: #529287;
  margin-top: 100px;
}

.admin-link {
  float: right;
  position: relative;
  top: 40%;
  text-decoration: none;
  color: #ffd04b;
}
</style>