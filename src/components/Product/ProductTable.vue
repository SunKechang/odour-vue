<template>
  <div>
    <search-form @onSubmit="onSubmit" @onDownload="onDownload"></search-form>
    <el-scrollbar>
      <el-table
          ref="table"
          :data="productList"
          :max-height="tableHeight"
          :row-key="getRowKey"
          style="width: 100%;"
          @row-click="on_select"
          @selection-change="on_selectsion">
        <el-table-column :reserve-selection="true" type="selection"></el-table-column>
        <el-table-column
            :index="getIndex"
            align="center"
            label="Index"
            type="index"
            width="60"
        />
        <el-table-column
            :width="getColumnWidth('productName', 'Product Name')"
            label="Product Name"
            prop="productName"
        >
        </el-table-column>
        <el-table-column
            label="Picture"
            width="200"
        >
          <template v-slot="scope">
            <el-image
                :alt="scope.row['productName']"
                :src="$store.state.config.host + scope.row['productPicture']"
                style="width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
            label="Description"
            prop="productDescription"
        />
        <el-table-column :width="220" fixed="right" label="Operation">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">View
            </el-button>
            <el-button
                v-if="$store.state.user.Authorization"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                v-if="$store.state.user.Authorization"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-pagination
        :current-page="currentPage"
        :page-size="size"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange">
    </el-pagination>
    <product-info-view
        :productInfo="productInfo"
        :visible.sync="viewDialogVisible"
    />
    <product-info-edit
        :productInfo="productInfo"
        :getProductData="getProductList"
        :visible.sync="editDialogVisible"
    />
  </div>
</template>

<script>
import ProductInfoView from "@/components/Product/ProductInfoView"
import ProductInfoEdit from "@/components/Product/ProductInfoEdit"
import {flexColumnWidth, flexTableHeight} from "@/utils/table";
import SearchForm from "@/components/Product/ProductSearchForm";

export default {
  name: "ProductTable",
  component: [ProductInfoView, ProductInfoEdit, SearchForm],
  components: {
    "product-info-view": ProductInfoView,
    "product-info-edit": ProductInfoEdit,
    "search-form": SearchForm
  },
  data() {
    return {
      size: 5,
      total: 0,
      currentPage: 1,
      productInfo: {},
      productList: [],
      viewDialogVisible: false,
      editDialogVisible: false,
      tableHeight: flexTableHeight(),
    }
  },
  methods: {
    getProductList() {
      this.$api.product.getList({
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.productList = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getProductList()
    },
    getColumnWidth(prop, label) {
      return flexColumnWidth(prop, this.compoundData, label)
    },
    getRowKey(val) {
      return val.id;
    },

    on_select(val) {
      //点击行选中复选框
      this.$refs.table.toggleRowSelection(val);
    },
    on_selectsion(val) {
      //选中复选框操作
      this.downloadList = val;
    },
    getIndex(index) {
      return (index + 1) + (this.currentPage - 1) * this.size
    },
    handleView(index, row) {
      this.viewDialogVisible = !this.viewDialogVisible
      this.$api.product
          .getOne(row.id)
          .then(({data}) => {
            this.productInfo = data
          }).catch(err => {
        console.error(err)
      })
    },
    handleEdit(index, row) {
      this.editDialogVisible = !this.editDialogVisible;
      this.$api.product
          .getOne(row.id)
          .then(({data}) => {
            this.productInfo = data
          }).catch(err => {
        console.error(err)
      })
    },
    handleDelete(index, row) {
      this.$api.product.delete(row.id)
          .then(res => {
            if (res.data.state === 0) {
              this.getProductList();
              this.$alert("Delete " + " successfully!", "Message", {
                confirmButtonText: 'Confirm'
              });
            } else {
              this.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              });
            }
          }).catch(err => {
        console.log(err);
      });
    },
    onSubmit(searchForm) {
      this.$api.product.search({
        ...searchForm,
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.productList = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err);
      });
    },
    onDownload() {
      this.$api.product.download(this.downloadList)
    }
  },
  created() {
    this.getProductList()
  },
  mounted() {
    //挂载window.onresize事件(动态设置table高度)
    window.onresize = () => {
      if (this.resizeFlag) {
        clearTimeout(this.resizeFlag)
      }
      this.resizeFlag = setTimeout(() => {
        this.tableHeight = flexTableHeight()
        this.resizeFlag = null
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>