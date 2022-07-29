<template>
    <div class="compounds">
        <div class="itemTitle">
            <p>{{$t("compounds.title")}}</p>
            <img :src="line" alt="line" style="margin-bottom: 20px;width: 100%">
        </div>
        <span style="line-height: 50px">{{$t("compounds.introduction")[0]}}</span><br>
        <span style="line-height: 50px">{{$t("compounds.introduction")[1]}}</span>
        <img :src="line" alt="line" style="margin-top: 50px;margin-bottom: 50px;width: 100%">
        <compound-table></compound-table>
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
            line: line
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