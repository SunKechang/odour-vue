<template>
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
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>Products</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/editproduct">
          <i class="el-icon-edit-outline"></i>
          <span>Edit Product</span>
        </el-menu-item>
        <el-menu-item index="/admin/addproduct">
          <i class="el-icon-plus"></i>
          <span>Add Product</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>Oil</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/editoil">
          <i class="el-icon-edit-outline"></i>
          <span>Edit Oil</span>
        </el-menu-item>
        <el-menu-item index="/admin/addoil">
          <i class="el-icon-plus"></i>
          <span>Add Oil</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/admin/citySN">
      <i class="el-icon-location-outline"></i>
      <span slot="title">CitySN</span>
    </el-menu-item>
    <el-menu-item index="/admin/log">
      <i class="el-icon-tickets"></i>
      <span slot="title">Database Log</span>
    </el-menu-item>
    <el-menu-item index="/admin/security">
      <i class="el-icon-view"></i>
      <span slot="title">Account Security</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AdminNav",
}
</script>

<style scoped>
.admin-nav {
  width: 200px;
  text-align: left;
}
</style>