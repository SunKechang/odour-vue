<template>
  <div>
    <el-backtop></el-backtop>
    <top-nav></top-nav>
    <div class=background style="width: 100%;overflow: hidden">
      <img alt="" src="../../assets/oil.jpg">
    </div>
    <el-container>
      <el-main>
        <router-view class="content"></router-view>
      </el-main>
      <el-footer class="footer">
        <router-link class="admin-link" to="/login"><i class="el-icon-user"></i>{{ $t("footer.admin") }}</router-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopNav from "@/layout/Home/components/TopNav";
export default {
  name: "index",
  component: [TopNav],
  components: {
    "top-nav": TopNav,
  },
  methods: {},
  created() {
    this.$api.city.add(returnCitySN)
        .then(() => {
          console.log("Welcome！");
        }).catch(err => {
      console.log(err);
    });
    console.log(this.$store.state.footer)
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