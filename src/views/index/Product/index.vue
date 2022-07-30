<template>
<div>
  <div class="itemTitle">
    <p>{{productInfo.productName}}</p>
    <img :src="line" alt="line" style="margin-bottom: 20px;width: 100%">
  </div>
  <compound-table
      :compound-data="compoundList"
      :size="size"
      :total="total"
      :currentPage.sync="currentPage"
      @pageChange="getCompoundData"
  />
</div>
</template>

<script>
import line from "@/assets/line.png"
import CompoundTable from '@/components/Compound/CompoundTable'
export default {
  name: "Product",
  component:CompoundTable,
  components:{
    "compound-table":CompoundTable
  },
  data() {
    return {
      line: line,
      productInfo: {},
      compoundList: [],
      currentPage: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    getCompoundData(productId) {
      this.$api.product.getOne(productId)
          .then(res=> {
            this.productInfo = res.data
            this.compoundList = res.data.compoundList
            console.log(res)
          })
    }
  },
  created() {
    let param = this.$route.query
    this.getCompoundData(param.product)
  },
//监听参数的变化，如监听路由中id值的变化：
  watch: {
    $route: {
      handler(newVal) {
        //判断newVal有没有值监听路由变化
        this.getCompoundData(newVal.query.product)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.compounds{
  text-align: left;
}

.itemTitle p{
  text-align: left;
  font-size: 30px;
  color: #529287;
}
</style>