<template>
  <div class="lang">
    <el-link @click="ch">中文</el-link>&nbsp;|
    <el-link @click="en">ENG</el-link>
  </div>
</template>

<script>
export default {
  name: "Language",
  methods: {
    ch() {
      this.$i18n.locale = 'zh'
    },
    en() {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style scoped>
.lang {
  position: absolute;
  right: 50px;
  top: 20px;
  color: #ffffff;
}

.lang a {
  color: #ffffff;
  text-decoration: none;
}
</style>