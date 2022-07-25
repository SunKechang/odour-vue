<template>
    <div class="compounds">
        <div class="itemTitle">
            <p>{{$t("compounds.title")}}</p>
            <img src="../../assets/line.png" width="100%" alt=""  style="margin-bottom: 20px;">
        </div>
        <span style="line-height: 50px">{{$t("compounds.introduction")[0]}}</span><br>
        <span style="line-height: 50px">{{$t("compounds.introduction")[1]}}</span>
        <img src="../../assets/line.png" width="100%" alt="" style="margin-top: 50px;margin-bottom: 50px">
        <compound-table></compound-table>
    </div>
</template>

<script>
    const CompoundTable=()=>import("./components/CompoundTable")
    export default {
        name: "Database",
        component:CompoundTable,
        components:{
            "compound-table":CompoundTable
        }
    }
</script>

<style scoped>
    .compounds{
        text-align: left;
    }

    .itemTitle p{
        text-align: left;
        font-size: 30px;
        color: #529287;
    }
</style>