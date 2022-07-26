<template>
  <div>
    <span style="float: left">Total:{{ total }}</span>
    <el-table
        :data="citySNData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
        border
        style="width: 100%">
      <el-table-column
          label="IP"
          prop="cip">
      </el-table-column>
      <el-table-column
          label="CID"
          prop="cid">
      </el-table-column>
      <el-table-column
          label="City"
          prop="cname">
      </el-table-column>
      <el-table-column
          label="Time"
          prop="visitTime">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          :current-page="currentPage"
          :page-size="size"
          :total="total"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitySNTable",
  data() {
    return {
      size: 10,
      currentPage: 1,
      total: 0,
      citySNData: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  created() {
    this.$api.city.getAll()
        .then(({state, data}) => {
          if (state === 0) {
            data.reverse();
            this.citySNData = data;
            this.total = data.length;
          }
        }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>

</style>