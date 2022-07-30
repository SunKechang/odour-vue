<template>
  <div ref="container">
    <compound-table
      :compound-data="compoundList"
      :current-page.sync="currentPage"
      :size="size"
      :total="total"
      @closeEditDialog="getCompoundData"
      @pageChange="getCompoundData"
    />
  </div>
</template>

<script>
import CompoundTable from "@/components/Compound/CompoundTable"
export default {
  name: "EditCompound",
  component: [CompoundTable],
  components: {
    "compound-table": CompoundTable
  },
  data() {
    return {
      compoundList: [],
      currentPage: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    getCompoundData() {
      this.$api.compound.getList({
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.total = totalSize
          this.compoundList = content
        }
      }).catch(err => {
        console.error(err)
      })
    },
  },
  created() {
    this.getCompoundData()
  }
}
</script>

<style scoped>
>>> .el-input-group__prepend {
  background-color: transparent;
  width: 170px;
}

>>> .el-form-item {
  margin-bottom: 10px;
}
</style>