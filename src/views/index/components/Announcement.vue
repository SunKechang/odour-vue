<template>
<div>
  <div class="compound-info-list">
    <div class="itemTitle">
      <p>{{ $t("home.notice") }}</p>
      <el-image :src="lineUrl" alt="" width="100%"></el-image>
    </div>
  </div>
  <el-carousel :interval="5000" indicator-position="outside">
    <el-carousel-item>
      <update-news></update-news>
    </el-carousel-item>
    <el-carousel-item>
      <team-news></team-news>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import UpdateNews from "@/views/index/components/UpdateNews"
import TeamNews from "@/views/index/components/TeamNews"
import line from "@/assets/line.png"
export default {
  name: "Announcement",
  component: [UpdateNews, TeamNews],
  components: {
    "update-news": UpdateNews,
    "team-news": TeamNews
  },
  data() {
    return{
      lineUrl: line
    }
  }
}
</script>

<style scoped>
.compound-info-list {
  margin: 0 auto;
  width: 90%;
}

.compound-info-list .itemTitle {
  text-align: left;
}

.compound-info-list .itemTitle p {
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 30px;
  color: #529287;
}
</style>