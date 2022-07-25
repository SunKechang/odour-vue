<template>
    <div>
        <el-menu
                :default-active="$route.path"
                router
                class="el-menu-vertical-demo slideNav">
            <el-menu-item index="" class="slideTitle">
                <span slot="title">{{$t("about.title")}}</span>
            </el-menu-item>
            <el-menu-item index="/about/team">
                <span slot="title">{{$t("about.team.title")}}</span>
            </el-menu-item>
            <el-menu-item index="/about/field" >
                <span slot="title">{{$t("about.field.title")}}</span>
            </el-menu-item>
            <el-menu-item index="/about/paper">
                <span slot="title">{{$t("about.papers")}}</span>
            </el-menu-item>
        </el-menu>
        <div style="display:inline-block;width: 30%;"></div>
        <div style="display:inline-block;width: 70%;float: right">
            <router-view ></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About",
    }
</script>

<style scoped>
    .slideNav{
        width: 240px;
        float: right;
        margin-top: -50px;
        position:absolute;
        text-align:left;
    }

    .slideNav span{
        padding-right: 80px;
        padding-top: 25px;
    }

    .slideTitle{
        height: 100px;
        background-image: url("../../assets/slideNavBg.png");
    }

    .slideTitle span{
        font-size: 32px;
        color: #ffffff;
        font-weight: normal;
        line-height: 64px;
        background: url("../../assets/slideLine.png") left bottom no-repeat;
    }
</style>