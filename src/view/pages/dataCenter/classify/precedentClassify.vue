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
        </el-row>
        <el-row :gutter="50">
          <el-col :span="14" :offset="10" class='query-btn' style='margin-top:20px'>
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="queryList">查询</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table' style="margin-top:20px;background-color:white;padding:20px;">
      <!-- 列表table开始 -->
      <el-table class='sys-table-table' border highlight-current-row :header-cell-style="{'text-align':'center'}" :height='500' size="mini" :data="queryresult" ref="reference" >
        <el-table-column label="序号" min-width="130"  type="index">
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
             <div class="text-over-hid customer-table-c" :title="scope.row.dataWord">
              {{scope.row.dataWord || '-'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="出现数量" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid customer-table-c" :title="scope.row.wordCount">
            {{scope.row.wordCount || '-'}}
            </div>
          </template></el-table-column>
        <el-table-column label="同词占比" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid customer-table-c" :title="scope.row.occupationRatio">
            {{scope.row.occupationRatio + '%' || '-'}}
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      queryresult: []
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
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
        data: {...this.queryForm},
        router: this.$router,
        success: (res) => {
          this.queryresult = res.result
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
.cus-i{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    background-color: #fff
}
</style>
