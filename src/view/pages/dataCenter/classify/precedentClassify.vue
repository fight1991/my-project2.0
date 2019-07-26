<template>
  <section class='query-main sys-main' style="margin:0px">
    <!-- 查询条件 -->
    <div class = "query-condition" style="background-color:white;padding:20px;">
      <!-- -->
      <el-form :label-width="labelFormWidth.five" size="mini">
        <el-row :gutter="66">
          <el-col :span="6">
            <el-form-item label="HS编码" class="select-Color">
              <el-input v-model="queryForm.hs" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品名关键词" >
              <el-input v-model="queryForm.querykey" maxlength="70" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"  class='query-btn'>
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="queryList">查询</el-button>
             <el-button size="mini" style="padding: 8px 20px;" @click="resetFun">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table' style="margin-top:20px;background-color:white;padding:20px;">
      <!-- 列表table开始 -->
      <el-table class='sys-table-table' border highlight-current-row :header-cell-style="{'text-align':'center'}" :height='500' size="mini" :data="queryresult" ref="reference" >
        <el-table-column width="60" label="序号"  min-width="160" type="index">
        </el-table-column>
        <el-table-column label="HS编码" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid customer-table-c" :title="scope.row.hsCode">
            {{scope.row.hsCode || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品名关键词" min-width="100">
           <template slot-scope="scope">
             <div class="text-over-hid customer-table-l" :title="scope.row.dataWord">
              {{scope.row.dataWord || '-'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="出现数量" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid customer-table-r" :title="scope.row.wordCount">
            {{scope.row.wordCount || '-'}}
            </div>
          </template></el-table-column>
        <el-table-column label="同词占比" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid customer-table-r" :title="scope.row.occupationRatio">
            {{scope.row.occupationRatio + '%' || '-'}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='pagination' @change="queryList()"></page-box>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      queryForm: {
        'hs': '',
        'querykey': ''
      },
      queryresult: [],
      pagination: {
        pageIndex: 1, // 当前页
        pageSize: 10, // 每页数据条数
        total: 0 // 总条数
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    resetFun () {
      this.queryForm.hs = ''
      this.queryForm.querykey = ''
    },
    queryList () {
      if (this.queryForm.querykey.trim().length === 0) {
        this.$message({
          message: '请输入品名关键词',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/category/queryCategory',
        data: {...this.queryForm, page: this.pagination},
        isPageList: true,
        router: this.$router,
        success: (res) => {
          this.queryresult = res.result
          this.pagination = res.page
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.customer-table-c{
  text-align: center
}
.customer-table-r{
  text-align: right
}
.customer-table-l{
  text-align: left
}
.cus-i{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    background-color: #fff
}
</style>
