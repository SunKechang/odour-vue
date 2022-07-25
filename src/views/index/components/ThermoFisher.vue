<template>
    <div class="ThermoFisher">
        <div class="itemTitle">
            <p>{{$t("agency.ThermoFisher.title")}}</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <p>
            {{$t("agency.ThermoFisher.introduction")[0]}}
        </p>
        <p>
            {{$t("agency.ThermoFisher.introduction")[1]}}
        </p>
        <div class="ThermoFisher-img">
            <img src="../../../assets/ThermoFisher.png"  alt=""><br>
            <span>ThermoFisher</span>
        </div>

        <p>
            {{$t("agency.ThermoFisher.introduction")[2]}}：<a href="http://www.thermofisher.com">www.thermofisher.com</a>
        </p>
        <a href="resource/download/Thermofisher_Brochure_20170327-CN.pdf" download="Thermofisher_Brochure_20170327-CN.pdf">Thermofisher_Brochure_20170327-CN.pdf</a>
    </div>
</template>

<script>
    export default {
        name: "ThermoFisher"
    }
</script>

<style scoped>
    .ThermoFisher{
        text-align: left;
    }

    .ThermoFisher .ThermoFisher-img{
        text-align: center;
    }

    .ThermoFisher a{
        text-decoration: none;
        color: #529287;
    }

    .ThermoFisher span{
        display: inline-block;
        margin-top: 20px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }


</style>