<template>
    <div class="compounds">
      <div class="searchPart"
      >
        <div class="searchForm">
          <div style="margin-bottom: 20px;">
            <span v-if="searchForm.searchKind == 0" class="searchTitle">全局检索</span>
            <span v-else-if="searchForm.searchKind == 1" class="searchTitle">阈值基质检索-{{searchForm.base}}</span>
            <span v-else class="searchTitle">函数基质检索-{{searchForm.base}}</span>
          </div>
          <search-form 
          @onSubmit="onSearch" 
          @onDownload='onDownload'/>
        </div>
      </div>
      <div style="width: 80%; margin-top: 80px;">
        <compound-table
            ref="dataTable"
            :permission="false"
            :compound-data="compoundList"
            :current-page.sync="currentPage"
            :size="size"
            :total="total"
            @closeEditDialog="getCompoundData"
            @pageChange="getCompoundData"
        />
      </div>
    </div>
  </template>
  
  <script>
  import line from "@/assets/line.png"
  import CompoundTable from '@/components/Compound/CompoundTable'
  import CompoundSearchForm from "@/components/Compound/CompoundSearchForm"

  export default {
    name: "Compound",
    component: [CompoundTable, CompoundSearchForm],
    components: {
      "compound-table": CompoundTable,
      "search-form": CompoundSearchForm
    },
    data() {
      return {
        line: line,
        compoundList: [],
        currentPage: 1,
        size: 10,
        total: 0,
        searchForm: {
          searchProperty: 'compound_name',
          searchValue: '',
          searchKind: 0,
          base: ''
        },
        baseImg: "../../../assets/search_back.jpg",
      }
    },
    methods: {
      getCompoundData() {
        this.onSearch(this.searchForm)
      },
      onSearch(searchForm) {
        this.searchForm = searchForm
        this.$api.compound.search({
          ...searchForm,
          page: this.currentPage,
          size: this.size,
        }).then(({state, data: {content, totalSize}}) => {
          if (state === 0) {
            this.compoundList = content
            this.total = totalSize
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onDownload() {
        this.$refs.dataTable.downloadTable()
      },
    },
    watch: {
      '$route.query.baseImg': {
        handler(newVal, oldVal) {
          if(newVal !== undefined) {
            this.baseImg = 'api/' + newVal
          } else {
            this.baseImg = "../../../assets/search_back.jpg"
          }
        }
      },
    },
    created() {
      if(this.$route.query.baseImg !== undefined) {
        this.baseImg = 'api/' + this.$route.query.baseImg
      } else {
        this.baseImg = "../../../assets/search_back.jpg"
      }
      console.log(this.baseImg)
    }
  }
  </script>
  
  <style scoped>
  .compounds {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .itemTitle p {
    text-align: left;
    font-size: 30px;
    color: #529287;
  }

  .searchPart {
        background: url("../../../assets/search_back.jpg") no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 50px 0 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .searchForm {
      background-color: rgba(226,226,226,0.5);
      padding: 30px 20px 50px 20px;
      border-radius: 5px;
    }

    .searchTitle {
      font-size: 26px;
      color: #ffffff;
    }
  </style>
  