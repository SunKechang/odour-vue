<template>
    <el-scrollbar>
      <el-menu
          :default-active="$route.path"
          active-text-color="#ffd04b"
          background-color="#2f4050"
          class="el-menu-vertical-demo admin-nav"
          router
          text-color="#ffffff">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Upload Compounds</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/upload/list">
              <i class="el-icon-edit-outline"></i>
              <span>List Compound</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/upload/add">
              <i class="el-icon-edit-outline"></i>
              <span>Add Compound</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" v-if="role === '3'">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Review Compounds</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/upload/review">
              <i class="el-icon-edit-outline"></i>
              <span>List Compound</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  
  </template>
  
  <script>
    import jwtDecode from "jwt-decode"
  export default {
    name: "UploadNav",
    data() {
      return {
        role: '1',
      }
    },
    created() {
      let token =this.$store.state.user.Authorization;
      let decode = jwtDecode(token);
      this.role = decode.role
    }
  }
  </script>
  
  <style scoped>
  .admin-nav {
    text-align: left;
    height: 100vh;
  }
  </style>