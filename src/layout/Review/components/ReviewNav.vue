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
            <span>Compounds</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/review/list">
              <i class="el-icon-edit-outline"></i>
              <span>List Compound</span>
            </el-menu-item>
          </el-menu-item-group>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  
  </template>
  
  <script>
  export default {
    name: "UploadNav"
  }
  </script>
  
  <style scoped>
  .admin-nav {
    text-align: left;
    height: 100vh;
  }
  </style>