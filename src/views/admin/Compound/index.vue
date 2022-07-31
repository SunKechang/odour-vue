<template>
  <div ref="container">
    <search-form @onSubmit="onSearch"/>
    <compound-table
      :compound-data="compoundList"
      :current-page.sync="currentPage"
      :size="size"
      :total="total"
      @closeEditDialog="getCompoundData"
      @pageChange="getCompoundData"
      @select="onSelect"
    />
  </div>
</template>

<script>
import CompoundTable from "@/components/Compound/CompoundTable"
import CompoundSearchForm from "@/components/Compound/CompoundSearchForm"
export default {
  name: "Compound",
  component: [CompoundTable, CompoundSearchForm],
  components: {
    "compound-table": CompoundTable,
    "search-form": CompoundSearchForm
  },
  data() {
    return {
      downloadList: [],
      compoundList: [],
      currentPage: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    onSelect(val) {
      this.downloadList = val
    },
    onSearch(searchForm) {
      this.$api.compound.search({
        ...searchForm,
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.compoundList = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err)
      })
    },
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