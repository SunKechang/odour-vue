<template>
  <div class="products">
    <div class="itemTitle">
      <p>{{ productInfo.productName }}</p>
      <el-image :src="line" alt="line" style="margin-bottom: 20px;width: 100%"/>
    </div>
    <span style="line-height: 50px">{{ productInfo.productDescription }}</span>
    <el-image :src="line" alt="line" style="width: 100%;margin: 50px 0;"/>
    <search-form
        :product="false"
        @onSubmit="onSearch"
    />
    <compound-table
        :compound-data="compoundList"
        :currentPage.sync="currentPage"
        :size="size"
        :total="total"
        @pageChange="getCompoundData"
    />
  </div>
</template>

<script>
import line from "@/assets/line.png"
import CompoundTable from '@/components/Compound/CompoundTable'
import CompoundSearchForm from "@/components/Compound/CompoundSearchForm"
export default {
  name: "Product",
  component: [CompoundTable, CompoundSearchForm],
  components: {
    "compound-table": CompoundTable,
    "search-form": CompoundSearchForm
  },
  data() {
    return {
      line: line,
      productInfo: {},
      compoundList: [],
      currentPage: 1,
      size: 10,
      total: 0,
      productId: 0,
    }
  },
  methods: {
    onSearch(searchForm) {
      this.$api.product.searchCompound({
        ...searchForm,
        productId: this.productId,
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
      this.$api.product.getOne(this.productId)
          .then(res => {
            this.productInfo = res.data
            this.compoundList = res.data.compoundList
          })
    }
  },
  created() {
    this.productId = this.$route.query.product
    this.getCompoundData()
  },
//监听参数的变化，如监听路由中id值的变化：
  watch: {
    $route: {
      handler(newVal) {
        //判断newVal有没有值监听路由变化
        this.productId = newVal.query.product
        this.getCompoundData()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.products {
  text-align: left;
}

.itemTitle p {
  text-align: left;
  font-size: 30px;
  color: #529287;
}
</style>