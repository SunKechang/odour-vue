<template>
    <div class="team">
        <div class="itemTitle">
            <p>{{$t("about.team.title")}}</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <span style="line-height: 25px">{{$t("about.team.introduction")}}</span>
        <div class="itemTitle">
            <p>{{$t("about.team.teamMembersTitle")}}</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <img src="../../../assets/members.jpg" alt="">
    </div>
</template>

<script>
    export default {
        name: "AboutTeam"
    }
</script>

<style scoped>
    .team{
        text-align: left;
        height: 100%;
    }

    .team span{
        display: inline-block;
        margin-top: 20px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }
</style>