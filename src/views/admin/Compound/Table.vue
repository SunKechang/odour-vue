<template>
  <div ref="container">
    <compound-table/>
  </div>
</template>

<script>
import CompoundTable from "@/components/Compound/CompoundTable"
export default {
  name: "EditCompound",
  component: [CompoundTable],
  components: {
    "compound-table": CompoundTable
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