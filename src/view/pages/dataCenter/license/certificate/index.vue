<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class = "query-condition">
      <el-row class='mg-b-15'>
        <el-button type="primary" size="mini" @click="add">新建</el-button>
      </el-row>
      <el-form label-width="0px" :model="queryForm" size="mini" label-position="right">
    <!-- 查询条件 -->
        <el-row :gutter="20" style="padding-top:10px">
          <el-col :span="6" :xs="24">
            <el-form-item>
              <el-autocomplete
                size='mini' style="width:100%"
                placeholder="请输入委托企业(输入2个字后搜索)"
                :maxlength="20"
                v-model="queryForm.input"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false">
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="9" :xs="24">
            <el-form-item label-width="100px" label="最近上传时间">
              <el-date-picker size="mini"
                v-model="dates"
                type="datetimerange"
                :editable='false'
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :xs="24">
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
          <el-table-column label="委托企业" min-width="100" prop="corpName"></el-table-column>
          <el-table-column label="许可证数" min-width="100">
            <template slot-scope="scope">
              {{scope.row.count+''}}
            </template>
          </el-table-column>
          <el-table-column label="最近上传时间" min-width="100">
            <template slot-scope="scope">
              {{scope.row.updateTime || '-'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetailList(scope.row.corpSccCode,scope.row.corpName,scope.row.count)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
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
import util from '../../../../../common/util'
export default {
  data () {
    return {
      queryForm: {
        input: '',
        startTime: '',
        endTime: ''
      },
      corpListOptions: [], // 委托企业
      dates: ['', ''],
      resultList: [] // 表格数据
    }
  },
  created () {
    this.reset()
    this.paginationInit = this.$store.state.pagination
    this.corpList()
    this.search()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path === '/dataCenter/licenses/certificate') {
        this.corpList()
        this.search()
      }
    }
  },
  methods: {
    // 新建
    add () {
      this.$router.push({
        name: 'addCertificate'
      })
    },
    // 委托企业
    corpList () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/dccommon/queryCorps',
        data: {},
        router: this.$router,
        success: (res) => {
          if (res.success) {
            let json = JSON.stringify(res.result)
            json = json.replace(/ownerName/g, 'value')
            this.corpListOptions = JSON.parse(json)
          }
        }
      })
    },
    // 输入2个字后搜索
    querySearch (queryString, cb) {
      if (this.queryForm.input.length < 2) {
        return
      }
      let restaurants = this.corpListOptions
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results.slice(0, 10))
    },
    createFilter (queryString) {
      return (restaurant) => {
        if (util.isEmpty(restaurant.value)) {
          return false
        } else {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      }
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 列表
    queryList (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.queryForm.startTime = ''
        this.queryForm.endTime = ''
      } else {
        this.queryForm.startTime = util.dateFormat(this.dates[0], 'yyyy-MM-dd hh:mm:ss')
        this.queryForm.endTime = util.dateFormat(this.dates[1], 'yyyy-MM-dd hh:mm:ss')
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/certificate/queryCorpList',
        data: {
          ...this.queryForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.resultList = util.isEmpty(res.result) ? [] : res.result
          this.paginationInit = res.page
        }
      })
    },
    // 重置
    reset () {
      this.dates = ['', '']
      this.queryForm = {
        serviceName: '',
        startTime: '',
        endTime: ''
      }
      this.search()
    },
    // 跳转到详情页面
    toDetailList (corpSccCode, corpName, count) {
      this.$router.push({
        path: '/dataCenter/licenses/certificate/detailListCertificate',
        query: {
          corpSccCode: corpSccCode,
          corpName: corpName,
          count: count
        }
      })
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
