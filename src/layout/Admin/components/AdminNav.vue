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
          <el-menu-item index="/admin/edit">
            <i class="el-icon-edit-outline"></i>
            <span>Edit Compound</span>
          </el-menu-item>
          <el-menu-item index="/admin/add">
            <i class="el-icon-plus"></i>
            <span>Add Compound</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>Article</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/editarticle">
            <i class="el-icon-edit-outline"></i>
            <span>Edit Article</span>
          </el-menu-item>
          <el-menu-item index="/admin/addarticle">
            <i class="el-icon-plus"></i>
            <span>Add Article</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/admin/base">
        <i class="el-icon-view"></i>
        <span slot="title">Base</span>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <i class="el-icon-view"></i>
        <span slot="title">User</span>
      </el-menu-item>
      <el-menu-item index="/admin/citySN">
        <i class="el-icon-location-outline"></i>
        <span slot="title">CitySN</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>Log</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/log">
            <i class="el-icon-data-line"></i>
            <span>Admin Log</span>
          </el-menu-item>
          <el-menu-item index="/admin/userlog">
            <i class="el-icon-data-analysis"></i>
            <span>User Log</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/admin/security">
        <i class="el-icon-view"></i>
        <span slot="title">Account Security</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>

</template>

<script>
export default {
  name: "AdminNav"
}
</script>

<style scoped>
.admin-nav {
  text-align: left;
  height: 100vh;
}
>>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>