<template>
  <section class='sys-main'>
    <!-- 查询条件 -->
    <div class="query-header">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input size="mini" v-model="productForm.keywords" placeholder="类别/目录名称/简介" maxlength="50" clearable @keyup.enter.native="search"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <!-- <el-button size="mini">重置</el-button> -->
        </el-col>
      </el-row>
    </div>
    <!-- 查询条件 end -->
    <!-- 主显示框 -->
    <div class='query-body'>
      <el-table class='sys-table-table' :data="productList" border highlight-current-row size="mini">
        <el-table-column label="序号" width="130">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{(pages.pageIndex-1)*pages.pageSize+(scope.$index+1)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="类别" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.directoryClass}}</div>
          </template>
        </el-table-column>
        <el-table-column label="目录名称" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.directoryName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="简介" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.thrcontentName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="注释" min-width="100">
          <template slot-scope="scope">
            <div class='sys-td-c'><a href="javascript:void(0)" class="list-icon-look border-0" title="查看" @click="toDetail(scope.row.thrcontentInf)"><i class='dec-i'></i></a></div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row class='sys-page-list'>
        <el-col :span="24" align="right">
          <page-box :pagination="paginationInit" @change="pageList"></page-box>
        </el-col>
      </el-row>
      <!-- 分页 end -->
    </div>
    <!-- 主显示框 end -->
    <!-- 注释弹窗 -->
    <el-dialog title="注释" :close-on-click-modal="false" :append-to-body="true" :visible.sync="explanatoryVisable" width="40%">
      <el-row class="pro-inf">
        <div v-html="thrcontentInf"></div>
      </el-row>
    </el-dialog>
    <!-- 注释弹窗 end -->
  </section>
</template>
<script>
import util from '@/common/util'
export default {
  name: 'productCate',
  data () {
    return {
      productForm: {
        keywords: ''
      },
      productList: [],
      pages: {},
      explanatoryVisable: false,
      thrcontentInf: ''
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.search()
  },
  mounted () {

  },
  methods: {
    // 查询
    search () {
      this.pageList(this.$store.state.pagination)
    },
    // 获取表格
    pageList (pagination) {
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/decParam/getComplexDirectoryList',
        data: {...this.productForm, page: pagination},
        isPageList: true,
        router: this.$router,
        success: (res) => {
          this.productList = util.isEmpty(res.result) ? [] : res.result
          this.paginationInit = res.page
          this.pages = {
            pageIndex: res.page.pageIndex,
            pageSize: res.page.pageSize
          }
        }
      })
    },
    // 跳转详情
    toDetail (data) {
      this.thrcontentInf = data.replace('"', '').replace('"', '')
      this.explanatoryVisable = true
    }
  }
}
</script>
<style scoped lang="less">
.param-td-c{
  text-align: center;
}
.pro-inf{
  max-height: 400px;
  overflow: auto;
  >div{
    word-break: break-all;
    white-space: pre-wrap;
  }
}
</style>
