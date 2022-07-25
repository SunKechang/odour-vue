<template>
    <div class="GCOrbitrapMS">
        <div class="itemTitle">
            <p>{{$t("agency.GCOrbitrapMS.title")}}</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <p>
            {{$t("agency.GCOrbitrapMS.introduction")[0]}}
        </p>
        <div class="GCOrbitrapMS-img">
            <img style="margin:0 auto" src="../../../assets/GCOrbitrapMS.png" alt=""><br>
            <span>Q Exactive™ GC Orbitrap™ GC-MSMS</span>
        </div>
        <p>{{$t("agency.GCOrbitrapMS.introduction")[1]}}：<a  href="http://www.thermofisher.com" >www.thermofisher.com</a></p>
        <a href="resource/download/BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf" download="BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf">BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf</a>
    </div>
</template>

<script>
    export default {
        name: "GCOrbitrapMS",
    }
</script>

<style scoped>
    .GCOrbitrapMS{
        width: 100%;
        text-align: left;
    }

    .GCOrbitrapMS .GCOrbitrapMS-img{
        text-align: center;
    }

    .GCOrbitrapMS a{
        text-decoration: none;
        color: #529287;
    }

    .GCOrbitrapMS span{
        display: inline-block;
        margin-top: 20px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }
</style>