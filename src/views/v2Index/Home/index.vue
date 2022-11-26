<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div class="searchPart">
            <h1 style="font-size: 30px; color: #ffffff;">{{ $t("home.title") }}</h1>
            <div style="margin-top: 40px; width: 70%;" class="flexContainer">
                <el-input placeholder="请输入化合物名称" v-model="searchText" style="width: 60%;">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
            <!-- <div style="padding-bottom: 40px; margin-right: 10px;">
                <el-button 
                icon="el-icon-caret-left" 
                style="font-size: 30px; border: none;padding: 20px 0 20px 0;"></el-button>
            </div> -->
            <swiper 
            :options="swiperOptions"
            :modules="modules"
            :pagination="{
              clickable: true,
            }"
            style="width: 60%; height: 200px; margin: 50px 0 100px 0;">
                <swiper-slide
                v-for="(base, index) in baseList"
                :key="index"
                :id="'base' + index"
                >
                <div
                class="baseContainer"
                :style="{'background': 'url(/api' + base.imgPath + ') no-repeat', 'background-position': 'center', 'background-size': 'cover'}"
                @click="toCompound(base)">
                    <span style="color: #ffffff; font-size: 22px;font-weight: 550;">
                        {{base.base}}
                    </span>
                </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    
</template>

<script>
import indexBack from "@/assets/index_back.jpg"

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Pagination } from "swiper";
import 'swiper/swiper-bundle.css'; 
// import "swiper/css/pagination";

export default {
    name: "home",
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            searchText: '',
            indexBack: indexBack,
            baseList: [],
            currentBase: 0,
            swiperOptions: {
                autoplay: true, // 自动轮播  
                speed: 1000,   // 轮播速度
                slidesPerView: 4,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                on: {
                    slideChangeTransitionEnd: function() {
                        // ...
                    }
                }
            },
            modules: [Pagination]
        }
    },
    methods: {
        search() {
            this.$router.push('/v2/compound?search=' + this.searchText)
        },
        toCompound(base) {
            this.$router.push('/v2/compound?kind=' + base.kind + '&base=' + base.base + '&baseImg=' + base.imgPath)
        },

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
        padding: 100px 0 50px 0;
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
        margin: 50px 0 100px 0;
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

    .swiper {
        width: 600px;
        height: 300px;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

</style>