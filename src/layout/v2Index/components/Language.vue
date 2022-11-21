<template>
    <div class="langTab">
      <el-link @click="ch">中文</el-link>&nbsp;|&nbsp;
      <el-link @click="en">ENG</el-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "Language",
    methods: {
      ch() {
        this.$i18n.locale = 'v2zh'
      },
      en() {
        this.$i18n.locale = 'v2en'
      }
    }
  }
  </script>
  
  <style scoped>
  .langTab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ffffff;
    margin: 0 20px 0 20px;
  }

  .langTab a {
    color: #ffffff;
  }
  </style>