<template>
  <section class='sys-main'>
    <!-- 查询条件 -->
    <div class="query-header">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input size="mini" v-model="checkForm.keywords" placeholder="商品编码/商品名称" maxlength="50" clearable @keyup.enter.native="search"></el-input>
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
      <el-table class='sys-table-table' :data="checkList" border highlight-current-row size="mini">
        <el-table-column label="序号" width="130">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{(pages.pageIndex-1)*pages.pageSize+(scope.$index+1)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-c'>{{scope.row.codeTS}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.gName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="类别" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.ciqFlag}}</div>
          </template>
        </el-table-column>
        <el-table-column label="监管条件" min-width="150">
          <template slot-scope="scope">
            <div class='sys-td-l'>{{scope.row.controlMa}}</div>
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
  </section>
</template>
<script>
import util from '@/common/util'
export default {
  name: 'checkCate',
  data () {
    return {
      checkForm: {
        keywords: ''
      },
      checkList: [],
      pages: {}
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
        url: 'API@/saas-dictionary/decParam/getCiqList',
        data: {...this.checkForm, page: pagination},
        isPageList: true,
        router: this.$router,
        success: (res) => {
          this.checkList = util.isEmpty(res.result) ? [] : res.result
          this.paginationInit = res.page
          this.pages = {
            pageIndex: res.page.pageIndex,
            pageSize: res.page.pageSize
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
