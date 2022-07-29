<template>
  <el-container direction="horizontal" style="height: 100vh">
    <el-aside style="height: 100vh" width="220px">
      <admin-nav class="admin-nav"></admin-nav>
    </el-aside>
    <el-container>
      <el-header class="admin-header">
        <span style="float:left;padding-top: 20px">Compound Information Management System</span>
        <el-dropdown class="el-dropdown-link">
          <span>Welcome,{{ account }}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="signOut">Sign Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main style="background-color: #ffffff;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
const AdminNav = () => import("../components/AdminNav")
import jwtDecode from "jwt-decode"
import store from "@/store"

export default {
  name: "Admin",
  data() {
    return {
      account: '',
      rules: {
        property: [
          {required: true, message: " ", trigger: 'blur'}
        ]
      }
    }
  },
  component: AdminNav,
  components: {
    "admin-nav": AdminNav
  },
  created() {
    let token = store.state.Authorization;
    const decode = jwtDecode(token);
    this.account = decode.account;
  },
  methods: {
    signOut() {
      sessionStorage.setItem("Authorization", '');
      store.commit('changeLogin', '');
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.el-main {
  padding: 10px 20px 10px 20px;
}

.admin-header {
  background-color: #f3f3f4;
  color: #888888;
  padding-bottom: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  float: right;
  position: relative;
  top: 50%;
  color: #888888;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>