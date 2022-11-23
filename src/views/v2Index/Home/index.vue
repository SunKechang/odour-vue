<template>
    <div>
        <div class="searchPart">
            <h1 style="font-size: 30px; color: #ffffff;">{{ $t("home.title") }}</h1>
            <div style="margin-top: 40px; width: 70%;" class="flexContainer">
                <el-input placeholder="请输入化合物名称" v-model="searchText" style="width: 60%;">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <div class="rowFlexContainer">
                <div
                v-for="(base, index) in baseList"
                :key="index"
                class="baseContainer"
                :style="{'background': 'url(/api' + base.imgPath + ') no-repeat', 'background-position': 'center', 'background-size': 'cover'}"
                @click="toCompound(base)">
                    <span style="color: #ffffff; font-size: 22px;font-weight: 550;">
                        {{base.base}}
                    </span>
                </div>
            </div>
        </div>
        <!-- <div style="padding: 80px 0 200px 0;">
            <h1 style="font-size: 30px">{{ $t("compounds.title") }}</h1>
            <div class="introductionPart">
                {{ $t("compounds.introduction[0]") }}
            </div>
            <div class="introductionPart">
                {{ $t("compounds.introduction[1]") }}
            </div>
        </div> -->
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
            baseList: []
        }
    },
    methods: {
        search() {
            this.$router.push('/v2/compound?search=' + this.searchText)
        },
        toCompound(base) {
            this.$router.push('/v2/compound?kind=' + base.kind + '&base=' + base.base + '&baseImg=' + base.imgPath)
        }
    },
    created() {
        let that = this
        this.$api.base.getBaseAvailable().then(({data, success}) => {
            that.baseList = data
        })
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
        padding: 100px 0 200px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .introductionPart {
        margin: 20px 15% 0 15%;
        font-size: 15px;
        font-family: "Helvetica Neue";
        text-align: left;
        line-height: 26px;
    }
    .rowFlexContainer {
        margin-top: 100px;
        width: 60%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-content: center;
        flex-direction: row;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .baseContainer {
        padding: 50px;
        width: 200px;
        margin-right: 50px;
        border-radius: 15px;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #aaa;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
    }
    
    ::-webkit-scrollbar-thumb:active {
        background-color: #aaa;
    }
</style>