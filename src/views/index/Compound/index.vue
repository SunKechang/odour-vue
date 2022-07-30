<template>
    <div class="compounds">
        <div class="itemTitle">
            <p>{{$t("compounds.title")}}</p>
            <img :src="line" alt="line" style="margin-bottom: 20px;width: 100%">
        </div>
        <span style="line-height: 50px">{{$t("compounds.introduction")[0]}}</span><br>
        <span style="line-height: 50px">{{$t("compounds.introduction")[1]}}</span>
        <img :src="line" alt="line" style="margin-top: 50px;margin-bottom: 50px;width: 100%">
        <compound-table
            :compound-data="compoundList"
            :current-page.sync="currentPage"
            :size="size"
            :total="total"
            @closeEditDialog="getCompoundData"
            @pageChange="getCompoundData"
        ></compound-table>
    </div>
</template>

<script>
import line from "@/assets/line.png"
import CompoundTable from '@/components/Compound/CompoundTable'
    export default {
        name: "Compound",
        component:CompoundTable,
        components:{
            "compound-table":CompoundTable
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
      },
      created() {
        this.getCompoundData()
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