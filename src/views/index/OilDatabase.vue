<template>
    <div class="oils">
        <div class="itemTitle">
            <p>{{$t("oils.title")}}</p>
            <img src="../../assets/line.png" width="100%" alt=""  style="margin-bottom: 20px;">
        </div>
        <span style="line-height: 25px">{{$t("oils.introduction")[0]}}</span><br>

        <img src="../../assets/line.png" width="100%" alt="" style="margin-top: 50px;margin-bottom: 50px">
        <oil-table></oil-table>
    </div>
</template>

<script>
    const OilTable=()=>import("../../components/Oil/OilTable")
    export default {
        name: "OilDatabase",
        component:OilTable,
        components:{
            "oil-table":OilTable
        }
    }
</script>

<style scoped>
    .oils{
        text-align: left;
    }

    .itemTitle p{
        text-align: left;
        font-size: 30px;
        color: #529287;
    }
</style>