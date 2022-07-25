<template>
    <div class="field">
        <div class="itemTitle">
            <p>{{$t("about.field.title")}}</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <span>{{$t("about.field.fields[0]")}}</span><br>
        <span>{{$t("about.field.fields[1]")}}</span><br>
        <span>{{$t("about.field.fields[2]")}}</span><br>
        <span>{{$t("about.field.fields[3]")}}</span><br>
    </div>
</template>

<script>
    export default {
        name: "ResearchField"
    }
</script>

<style scoped>
    .field{
        text-align: left;
    }

    .field span{
        display: inline-block;
        margin-top: 20px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }
</style>