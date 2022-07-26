<template>
  <div>
    <el-table
        :data="logs.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
        border
        style="width: 100%">
      <el-table-column
          label="Time"
          prop="operateTime"
          width="300">
      </el-table-column>
      <el-table-column
          label="Compound Name"
          prop="compoundName"
          width="300">
      </el-table-column>
      <el-table-column
          label="Account"
          prop="account"
          width="300">
      </el-table-column>
      <el-table-column
          label="Type"
          prop="type">
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage"
        :page-size="size"
        :total="total"
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "LogTable",
  data() {
    return {
      logs: [],
      size: 15,
      currentPage: 1,
      total: 0
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
    this.$api.log.getAll()
        .then(({data, state}) => {
          if (state === 0) {
            this.logs = data;
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