<template>
    <el-container>
        <change-password></change-password>
    </el-container>
</template>

<script>
    const ChangePassword=()=>import("../components/ChangePassword")
    export default {
        name:'Security',
        component:ChangePassword,
        components:{
            "change-password":ChangePassword
        }
    }
</script>

<style scoped>

</style>