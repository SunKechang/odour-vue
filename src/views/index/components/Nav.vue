<template>
    <el-menu
            :default-active="$route.path"
            router
            class="el-menu-demo"
            mode="horizontal"
            background-color="#529287"
            text-color="#ffffff"
            active-text-color="#ffd04b">
        <el-menu-item index=""><a href="http://www.bjfu.edu.cn/"><img src="../../../assets/bjfu.png" width="200" height="60" alt=""></a></el-menu-item>
        <el-menu-item index="/home">{{$t("nav.home")}}</el-menu-item>

        <el-menu-item index="/database" >{{$t("nav.compounds")}}</el-menu-item>
        <el-menu-item index="/downloadpro" >{{$t("nav.downloadpro")}}</el-menu-item>
        <el-menu-item index="/oildatabase" >{{$t("nav.oils")}}</el-menu-item>
        <el-menu-item index="/about">{{$t("nav.about")}}</el-menu-item>
        <el-menu-item index="/agency">{{$t("nav.agency")}}</el-menu-item>
        <el-menu-item index="/contact" >{{$t("nav.contact")}}</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "Nav"

    }
</script>

<style scoped>
</style>