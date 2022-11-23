<template>
    <div>
        <el-row>
            <el-col :span="6" style="position: fixed; z-index: 9;">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="toWebsite">
                    <i class="el-icon-thumb"></i>
                    <span slot="title">{{ $t("about.website.title") }}</span>
                </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-cold-drink"></i>
                            <span>{{ $t("about.labTeam.bigTitle") }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="toTeam">{{ $t("about.labTeam.introduction.title") }}</el-menu-item>
                            <el-menu-item index="2-2" @click="toMember">{{ $t("about.labTeam.member.title") }}</el-menu-item>
                            <el-menu-item index="2-3" @click="toField">{{ $t("about.labTeam.field.title") }}</el-menu-item>
                            <el-menu-item index="2-4" @click="toPaper">{{ $t("about.labTeam.papers.title") }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-brush"></i>
                        <span slot="title" @click="toWorkTeam">{{ $t("about.workTeam.title") }}</span>
                    </el-menu-item>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-bangzhu"></i>
                            <span>{{ $t("about.agency.bigTitle") }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="toThermoFisher">{{ $t("about.agency.company.title") }}</el-menu-item>
                            <el-menu-item index="2-2" @click="toGCOrbitrapMS">{{ $t("about.agency.tech.title") }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="13" :offset="7">
                <div id="websitePart">
                    <div class="itemTitle">
                        <p>{{$t("about.website.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{ $t("about.website.content[0]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.website.content[1]") }}
                    </div>
                </div>
                <div id="teamPart">
                    <div class="itemTitle">
                        <p>{{$t("about.labTeam.introduction.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.introduction.content") }}
                    </div>
                </div>
                <div id="memberPart">
                    <div class="itemTitle">
                        <p>{{$t("about.labTeam.member.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.member.content[0]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.member.content[1]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.member.content[2]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.member.content[3]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.labTeam.member.content[4]") }}
                    </div>
                </div>
                <div id="fieldPart">
                    <div class="itemTitle">
                        <p>{{$t("about.labTeam.field.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{$t("about.labTeam.field.content[0]")}}
                    </div>
                    <div class="contentPart">
                        {{$t("about.labTeam.field.content[1]")}}
                    </div>
                    <div class="contentPart">
                        {{$t("about.labTeam.field.content[2]")}}
                    </div>
                    <div class="contentPart">
                        {{$t("about.labTeam.field.content[3]")}}
                    </div>
                </div>
                <div id="paperPart">
                    <div class="itemTitle">
                        <p>{{$t("about.labTeam.papers.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div v-for="(item,index) in papers.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)" v-bind:key="index">
                        <span>{{item.paper}}</span><br>
                        <b>{{item.doi}}</b>
                        <el-divider></el-divider>
                    </div>
                    <el-pagination
                            layout="prev, pager, next"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="size"
                            :total="total">
                    </el-pagination>
                </div>
                <div id="workTeamPart">
                    <div class="itemTitle">
                        <p>{{$t("about.workTeam.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{ $t("about.workTeam.content") }}
                    </div>
                </div>
                <div id="thermoFisherPart">
                    <div class="itemTitle">
                        <p>{{$t("about.agency.bigTitle")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <h1>{{ $t("about.agency.company.title") }}</h1>
                    <div class="contentPart">
                        {{ $t("about.agency.company.content[0]") }}
                    </div>
                    <div class="contentPart">
                        {{ $t("about.agency.company.content[1]") }}
                    </div>
                </div>
                <div id="gCOrbitrapMSPart">
                    <div class="itemTitle">
                        <p>{{$t("about.agency.tech.title")}}</p>
                        <img src="../../../assets/line.png" width="100%" alt="">
                    </div>
                    <div class="contentPart">
                        {{ $t("about.agency.tech.introduction[0]") }}
                    </div>
                    <div class="GCOrbitrapMS-img">
                        <img style="margin:0 auto" src="../../../assets/GCOrbitrapMS.png" alt=""><br>
                        <span>Q Exactive™ GC Orbitrap™ GC-MSMS</span>
                    </div>
                    <div class="contentPart">
                        {{ $t("about.agency.tech.introduction[1]") }}
                        <a  href="http://www.thermofisher.com" class="hrefPart">www.thermofisher.com</a><br/>
                        <a href="resource/download/BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf" 
                        class="hrefPart"
                        download="BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf">BR10445 Q Exactive GC Orbitrap GC-MS_MS Brochure 2015-05-15.pdf</a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'about',
    data() {
        return {
            size:5,
            currentPage:1,
            total:0,
            papers:[
                {
                    paper:"[1] WANG S-Y, ZHU H-Z, LAN Y-B, et al. Modifications of Phenolic Compounds, Biogenic Amines, and Volatile Compounds in Cabernet [J]. Fermentation, 2020, 6(1): 15. ",
                    doi:"DOI：10.3390/fermentation6010015"
                },
                {
                    paper:"[2] XU M, FU L, ZHANG J, et al. Potential of Inactivated Bifidobacterium Strain in Attenuating Benzo(A)Pyrene Exposure-Induced Damage in Colon Epithelial Cells In Vitro [J]. Toxics, 2020, 8(1).",
                    doi:"DOI：10.3390/toxics8010012"
                },
                {
                    paper: "[3] LIU S, LI S, LIN G, et al. Anthocyanin copigmentation and color attributes of bog bilberry syrup wine during bottle aging: Effect of tannic acid and gallic acid extracted from Chinese gallnut [J]. Journal of Food Processing and Preservation, 2019, 0(0): e14041.",
                    doi:"DOI：10.1111/jfpp.14041"
                },
                {
                    paper: "[4] ZHAO L, REN J, WANG L, et al. Evolution of sensory attributes and physicochemical indexes of Gouqi fermented wine under different aging treatments and their correlations [J]. Journal of Food Processing and Preservation, 2019, 43(3): e13873. ",
                    doi:"DOI：10.1111/jfpp.13873"
                },
                {
                    paper: "[5] CHEN Y, OUYANG X, LAAKSONEN O, et al. Effect of Lactobacillus acidophilus, Oenococcus oeni, and Lactobacillus brevis on Composition of Bog Bilberry Juice [J]. Foods, 2019, 8(10): 430. ",
                    doi:"DOI：10.3390/foods8100430"
                },
                {
                    paper: "[6] ZHANG Z, PENG S, SUN X, et al. A novel insight to screen the optimal spray-drying protectants and parameters for manufacturing lactic acid bacteria preparations [J]. Drying Technology, 2019, 1-14. ",
                    doi:"DOI：10.1080/07373937.2019.1674323"
                },
                {
                    paper: "[7] QIAN X , LIU Y-R , ZHANG G , et al. Alcohol acyltransferase gene and ester precursors differentiate composition of volatile esters in three interspecific hybrids of × during berry development period[J]. Food Chemistry, 2019, 295(OCT.15):234-246. ",
                    doi:"DOI：10.1016/j.foodchem.2019.05.104"
                },
                {
                    paper: "[8] LIU Y-R, WANG S-Y, REN J, et al. Characterization of free and bound volatile compounds in six Ribes nigrum L. blackcurrant cultivars [J]. Food Research International, 2018, 103.301-315. ",
                    doi:"DOI：10.1016/j.foodres.2017.10.038"
                },
                {
                    paper: "[9] WANG S-Y, LI Y-Q, REN J, et al. Comparison on evolution of volatile compounds and aroma attributes in different pH-adjusted fermented bog bilberry syrup wines during bottle-aging period [J]. Food Bioscience, 2018, 22.121-128. ",
                    doi:"DOI：10.1016/j.fbio.2018.01.003"
                },
                {
                    paper: "[10] WANG S , LI S , ZHAO H , et al. Acetaldehyde released by Lactobacillus plantarum enhances accumulation of pyranoanthocyanins in wine during malolactic fermentation[J]. Food Research International, 2018, 108(JUN.):254. ",
                    doi:"DOI：10.1016/j.foodres.2018.03.032"
                },
                {
                    paper: "[11] WEI M, WANG S-Y, GU P, et al. Comparison of physicochemical indexes, amino acids, phenolic compounds and volatile compounds in bog bilberry juice fermented by Lactobacillus plantarum under different pH conditions [J]. Journal of Food Science and Technology, 2018, 55(6): 2240-2250.",
                    doi:"DOI：10.1007/s13197-018-3141-y"
                },
                {
                    paper: "[12] REN J, WANG S-Y, NING Y, et al. The impact of over‐maturation on the sensory and nutritional quality of Gouqi (Chinese wolfberry) wine [J]. Journal of the Institute of Brewing, 2017, 124(1): 57-67.",
                    doi:"DOI：10.1002/jib.469"
                },
                {
                    paper: "[13] ZHAO L-L, WEI J-Y, ZHAO H-F, et al. Detoxification of cancerogenic compounds by lactic acid bacteria strains [J]. Critical Reviews in Food Science and Nutrition, 2017, (5): 1-16.",
                    doi:"DOI：10.1080/10408398.2017.1339665"
                },
                {
                    paper: "[14] LI Y-C, GU P, WANG L-W, et al. Comparison of amino acid profile in the juice of six pomegranate cultivars from two cultivation regions in China [J]. Journal of Food Processing and Preservation, 2017, 41(5): e13197.",
                    doi:"DOI：10.1111/jfpp.13197"
                },
                {
                    paper: "[15] OUYANG X-Y, YUAN G-S, REN J, et al. Aromatic compounds and organoleptic features of fermented wolfberry wine: Effects of maceration time [J]. International Journal of Food Properties, 2017, 20(10): 2234-2248.",
                    doi:"DOI：10.1080/10942912.2016.1233435"
                },
                {
                    paper: "[16] OUYANG X-Y, ZHU B-Q, LIU R-J, et al. Comparison of volatile composition and color attributes of mulberry wine fermented by different commercial yeasts [J]. Journal of Food Processing and Preservation, 2017, 42(2): e13432.",
                    doi:"DOI：10.1111/jfpp.13432"
                },
                {
                    paper: "[17] WANG S-Y, LI Y-Q, LI T, et al. Dibasic Ammonium Phosphate Application Enhances Aromatic Compound Concentration in Bog Bilberry Syrup Wine [J]. Molecules, 2017, 22(1): 52.",
                    doi:"DOI：10.3390/molecules22010052"
                },
                {
                    paper: "[18] OUYANG X-Y, WANG S-Y, YUAN G-S, et al. Comparison of amino acids, biogenic amines and ammonium ion of wines made of different types of fruits [J]. International Journal of Food Science and Technology, 2017, 52(2): 448-456.",
                    doi:"DOI：10.1111/ijfs.13300"
                },
                {
                    paper: "[19] QIAN X, SUN L, XU X-J, et al. Differential Expression of VvLOXA Diversifies C6 Volatile Profiles in Some Vitis vinifera Table Grape Cultivars [J]. International Journal of Molecular Sciences, 2017, 18(12): 2705.",
                    doi:"DOI：10.3390/ijms18122705"
                },
                {
                    paper: "[20] ZHU W-Q, ZHU B-Q, YAO-LI, et al. Acidic electrolyzed water efficiently improves the flavour of persimmon (Diospyros kaki L. cv. Mopan) wine [J]. Food chemistry, 2016, 197:141-149.",
                    doi:"DOI：10.1016/j.foodchem.2015.10.106"
                },
                {
                    paper: "[21] LIU S-X, WANG S-Y, YUAN G-S, et al. Effect of Oak Chips on Evolution of Phenolic Compounds and Color Attributes of Bog Bilberry Syrup Wine During Bottle‐Aging [J]. Journal of Food Science, 2016, 81(11): C2697-C707.",
                    doi:"DOI：10.1111/1750-3841.13532"
                },
                {
                    paper: "[22] YUAN G-S, REN J, OUYANG X-Y, et al. Effect of Raw Material, Pressing and Glycosidase on the Volatile Compound Composition of Wine Made From Goji Berries [J]. Molecules, 2016, 21(10): 1324.",
                    doi:"DOI：10.3390/molecules21101324"
                },
                {
                    paper: "[23] 陈卓君, 魏铭, 林果, et al. PMA-qPCR技术在发酵食品活菌计数中的应用 [J]. 食品与发酵工业, 2019,45(12): 242-248. ",
                    doi:"DOI：10.13995/j.cnki.11-1802/ts.020207"
                },
                {
                    paper: "[24] 陈晨, 刘树勋, 王绍阳, et al. PET瓶储条件对蓝莓酒颜色和酚类物质含量的影响 [J]. 食品工业科技, 2017, 38(1): 322-327.",
                    doi:"DOI：10.13386/j.issn1002-0306.2017.01.057"
                },
                {
                    paper: "[25] 鲍杰, 李莹灿, 刘雅冉, et al. 笃斯越橘果酱特征香气成分分析 [J]. 食品与发酵工业, 2017, 43(6): 255-262.",
                    doi:"DOI：10.13995/j.cnki.11-1802/ts.201706044"
                },
                {
                    paper: "[26] 刘树勋, 杨航宇, 王绍阳, et al. 野生蓝莓酒皮渣花色苷及其抗氧化活性研究 [J]. 中国酿造, 2016, 35(2): 115-118.",
                    doi:"DOI：10.11882/j.issn.0254-5071.2016.02.026"
                },
                {
                    paper: "[27] 刘树勋, 刘恩超, 陈晨, et al. 橡木片对笃斯越橘果酒颜色和酚类物质含量的影响 [J]. 食品工业科技, 2016, 37(9): 150-154.",
                    doi:"DOI：10.13386/j.issn1002-0306.2016.09.021"
                },
                {
                    paper: "[28] 任迪峰, 郑佳慧, 朱保庆. “功能性食品”课程的教学改革探讨 [J]. 中国林业教育, 2016, 34(2): 68-71.",
                    doi:"DOI：10.3969/j.issn.1001-7232.2016.02.017"
                },
                {
                    paper: "[29] 万山, 杨喆, 朱保庆, et al. 响应面法优化红树莓花色苷超声辅助提取工艺的研究 [J]. 食品工业科技, 2016, 3): 220-228.",
                    doi:"DOI：10.13386/j.issn1002-0306.2016.03.038"
                }
            ]
        }
    },
    methods: {
        toTeam() {
            document.getElementById('teamPart').scrollIntoView({ behavior: 'smooth' })
        },
        toField() {
            document.getElementById('fieldPart').scrollIntoView({ behavior: 'smooth' })
        },
        toPaper() {
            document.getElementById('paperPart').scrollIntoView({ behavior: 'smooth' })
        },
        toThermoFisher() {
            document.getElementById('thermoFisherPart').scrollIntoView({ behavior: 'smooth' })
        },
        toGCOrbitrapMS() {
            document.getElementById('gCOrbitrapMSPart').scrollIntoView({ behavior: 'smooth' })
        },
        toWebsite() {
            document.getElementById('websitePart').scrollIntoView({ behavior: 'smooth' })
        },
        toMember() {
            document.getElementById('memberPart').scrollIntoView({ behavior: 'smooth' })
        },
        toWorkTeam() {
            document.getElementById('workTeamPart').scrollIntoView({ behavior: 'smooth' })
        },
        // 修改页大小
        handleSizeChange(val) {
            this.size = val;
        },

        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    created() {
        this.total=this.papers.length;
    }
}
</script>


<style scoped>
    .contentPart {
        font-size: 15px;
        font-family: "Hiragino Sans GB";
        text-align: left;
        line-height: 26px;
    }
    .hrefPart {
        color: #529287;
    }
    .GCOrbitrapMS .GCOrbitrapMS-img{
        text-align: center;
    }
    .itemTitle p{
        font-size: 30px;
        color: #529287;
        float: left;
    }
    .titlePart {
        font-size: 30px;
        color: #529287;
        float: left
    }
</style>