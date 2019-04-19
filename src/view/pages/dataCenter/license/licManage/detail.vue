<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row class='mg-b-15'>
        <el-col :span="18">
          <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
    </el-row>
    <el-row class = "query-condition">
      <el-row class='mg-b-15'>
        <el-col :span="12">
          委托企业:
        </el-col>
        <el-col :span="12">
          许可证数:
        </el-col>
      </el-row>
      <el-form label-width="0px" :model="detailForm" size="mini" label-position="right">
    <!-- 查询条件 -->
        <el-row :gutter="20" style="padding-top:10px">
          <el-col :span="6" :xs="12">
            <el-form-item>
            <el-input size="mini" clearable v-model="detailForm.ID" placeholder="许可证号、涉证商品编号"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8" :xs="12">
          <el-form-item label-width="100px" label="上传日期">
            <el-date-picker size="mini"
              v-model="dates"
              @change="search()"
              type="daterange"
              :editable='false'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :xs="12">
          <el-button size="mini" type="primary" @click="search()" style="padding:8px 20px 5px 20px;">查询</el-button>
          <el-button size="mini" @click="reset" style="padding:8px 20px 5px 20px;">重置</el-button>
        </el-col>
        </el-row>
      <!-- 查询条件 end-->
      </el-form>
    </el-row>
    <!-- 头部 end-->
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 列表 list -->
      <el-table class='sys-table-table'
        border highlight-current-row size="mini"
        :data="resultList">
        <el-table-column label="许可证名称" min-width="100" prop="ID"></el-table-column>
        <el-table-column label="监管证件代码" min-width="100" prop="ID"></el-table-column>
        <el-table-column label="许可证数" min-width="100" prop="ID">
          <template slot-scope="scope">
            {{scope.row.ID+''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toChild(scope.row.roleId)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <el-table-column label="最近上传时间" min-width="100">
            <template slot-scope="scope">
              {{scope.row.ID | date()}}
            </template>
          </el-table-column>
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
      detailForm: {
        ID: ''
      },
      dates: ['', ''],
      resultList: [
        {ID: 'aaaaa'},
        {ID: '111111'},
        {ID: 'bbbbbb'}

      ] // 表格数据
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
      //     ...this.detailForm,
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
