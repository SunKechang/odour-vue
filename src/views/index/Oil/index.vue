<template>
  <div class="oils">
    <div class="itemTitle">
      <p>{{ $t("oils.title") }}</p>
      <el-image :src="lineUrl" alt="" style="width: 100%;margin-bottom: 20px;"></el-image>
    </div>
    <span style="line-height: 25px">{{ $t("oils.introduction")[0] }}</span><br>

    <el-image :src="lineUrl" alt="" style="width: 100%;margin-top: 50px;margin-bottom: 50px;"></el-image>
    <oil-table></oil-table>
  </div>
</template>

<script>
import OilTable from "@/components/Oil/OilTable"
import line from "@/assets/line.png"
export default {
  name: "OilDatabase",
  component: OilTable,
  components: {
    "oil-table": OilTable
  },
  data() {
    return {
      lineUrl: line,
    }
  }
}
</script>

<style scoped>
.oils {
  text-align: left;
}

.itemTitle p {
  text-align: left;
  font-size: 30px;
  color: #529287;
}
</style>