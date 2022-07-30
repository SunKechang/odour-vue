<template>
    <log-table></log-table>
</template>

<script>
    const LogTable=()=>import("./LogTable")
    export default {
        name: "DatabaseLog",
        component:LogTable,
        components:{
            "log-table":LogTable
        }

    }
</script>

<style scoped>

</style>