<template>
  <section class='sys-main'>
     <!-- 头部 -->
      <el-row class = "query-condition">
        <el-row>
          <el-col :span="8">
              委托企业:{{resultTopData.id}}
            </el-col>
            <el-col :span="8">
              报关单系统编号:{{resultTopData.id + ''}}
            </el-col>
            <el-col :span="8">
              接单编号:{{resultTopData.id + ''}}
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="8">
              统一编号:{{resultTopData.id}}
            </el-col>
            <el-col :span="8">
              报关单号:{{resultTopData.id + ''}}
            </el-col>
          </el-row>
      </el-row>
      <!-- 头部 end-->
      <!-- 主显示框 -->
      <div class='query-table'>
        <!-- 列表 list -->
        <el-table class='sys-table-table'
          border highlight-current-row size="mini"
          :data="resultList">
          <el-table-column label="委托企业" min-width="100" prop="ID"></el-table-column>
          <el-table-column label="许可证数" min-width="100" prop="ID">
            <template slot-scope="scope">
              {{scope.row.ID+''}}
            </template>
          </el-table-column>
          <el-table-column label="最近上传时间" min-width="100">
            <template slot-scope="scope">
              {{scope.row.lastFireTime | date() || '-'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="toChild(scope.row.roleId)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box :pagination='paginationInit' @change="queryList"></page-box>
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
        ID: ''
      },
      dates: ['', ''],
      resultList: [] // 表格数据
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.search()
  },
  methods: {
    // 新建
    add () {
      this.$router.push({
        name: '许可证新增'
      })
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 列表
    queryList (pagination) {
      // this.paginationInit = pagination
      // this.$store.dispatch('ajax', {
      //   url: 'API@/dec-common/decParam/common/getPriceList',
      //   data: {
      //     ...this.queryForm,
      //     page: pagination
      //   },
      //   router: this.$router,
      //   isPageList: true,
      //   success: (res) => {
      //     this.priceList = res.result.list
      //     this.paginationInit = res.page
      //   }
      // })
    },
    // 重置
    reset () {
      this.dates = ['', '']
    },
    // 跳转到详情页面
    toChild (id) {
      // this.$router.push({
      //   name: '业务单证信息',
      //   params: {
      //     id: id
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
  .query-condition {
    background-color: #fff;
    padding: 20px;
  }
  .query-table {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
  }
</style>
