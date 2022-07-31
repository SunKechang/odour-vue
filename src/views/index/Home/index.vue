<template>
  <div>
    <h2>{{ $t("home.title") }}</h2>
    <el-row :gutter="20">
      <el-col :lg="24">
        <div class="compound-info-list">
          <div class="itemTitle">
            <p>{{ $t("home.summary") }}</p>
            <el-image :src="lineUrl" alt="" width="100%"></el-image>
          </div>
          <div style="text-align: left;margin-bottom: 20px">
            <span style="line-height: 25px">{{ $t("compounds.introduction")[0] }}</span><br>
            <span style="line-height: 25px">{{ $t("compounds.introduction")[1] }}</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="12">
        <!--通知公告-->
        <announcement/>
      </el-col>
      <el-col :lg="12">
        <!--产品总览-->
        <product-overview/>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import ProductOverview from "@/components/Home/ProductOverview"
import Announcement from "@/components/Home/Announcement"
import line from "@/assets/line.png"

export default {
  name: "Home",
  component: [Announcement, ProductOverview],
  components: {
    "announcement": Announcement,
    "product-overview": ProductOverview
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