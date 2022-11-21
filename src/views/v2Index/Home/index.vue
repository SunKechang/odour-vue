<template>
    <div>
        <div class="searchPart">
            <h1 style="font-size: 30px; color: #ffffff;">{{ $t("home.title") }}</h1>
            <div style="margin-top: 40px;" class="flexContainer">
                <el-input placeholder="请输入搜索内容" v-model="searchText" style="width: 60%;">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <div style="padding: 80px 0 200px 0;">
            <h1 style="font-size: 30px">{{ $t("compounds.title") }}</h1>
            <div class="introductionPart">
                {{ $t("compounds.introduction[0]") }}
            </div>
            <div class="introductionPart">
                {{ $t("compounds.introduction[1]") }}
            </div>
        </div>
    </div>
    
</template>

<script>
import indexBack from "@/assets/index_back.jpg"
export default {
    name: "home",
    data() {
        return {
            searchText: '',
            indexBack: indexBack,
        }
    },
    methods: {
        search() {
            this.$router.push('/v2/compound?search=' + this.searchText)
        }
    }
}
</script>

<style scoped>
.flexContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
    .background{
        width:100%;  
        height:100%;
        z-index:-1;
        position: absolute;
    }
    .searchPart {
        background: url("../../../assets/index_back.jpg") no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 140px 0 300px 0;
    }

    .introductionPart {
        margin: 20px 15% 0 15%;
        font-size: 15px;
        font-family: "Helvetica Neue";
        text-align: left;
        line-height: 26px;
    }

</style>