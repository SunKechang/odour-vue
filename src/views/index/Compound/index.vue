<template>
  <div class="compounds">
    <div class="itemTitle">
      <p>{{ $t("compounds.title") }}</p>
      <el-image :src="line" alt="line" style="margin-bottom: 20px;width: 100%"></el-image>
    </div>
    <span style="line-height: 50px">{{ $t("compounds.introduction")[0] }}</span><br>
    <span style="line-height: 50px">{{ $t("compounds.introduction")[1] }}</span>
    <el-image :src="line" alt="line" style="margin: 50px 0;width: 100%"></el-image>
    <search-form @onSubmit="onSearch"/>
    <compound-table
        :permission="false"
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
import line from "@/assets/line.png"
import CompoundTable from '@/components/Compound/CompoundTable'
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
      line: line,
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
    }
  },
  created() {
    this.getCompoundData()
  }
}
</script>

<style scoped>
.compounds {
  text-align: left;
}

.itemTitle p {
  text-align: left;
  font-size: 30px;
  color: #529287;
}
</style>
