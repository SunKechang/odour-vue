<template>
    <el-container direction="horizontal" style="height: 100vh">
      <el-aside style="height: 100vh" width="220px">
        <upload-nav class="admin-nav"></upload-nav>
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
  const UploadNav = () => import("./components/UploadNav")
  import jwtDecode from "jwt-decode"
  
  export default {
    name: "Upload",
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
    component: UploadNav,
    components: {
      "upload-nav": UploadNav
    },
    created() {
    },
    methods: {
      signOut() {
        this.$store.dispatch('user/signOut', '');
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