<template>
  <section class='sys-main'>
     <!-- 主显示框 -->
    <div class='content'>
      <div class='regist-panel' :model="QueryForm">
        <el-form label-width="100px">
        <el-row class='sys-search mg-b-30' :gutter="5">
          <!-- 查询条件 -->
          <el-col :span="4">
            <el-form-item size="mini" label="操作员">
              <el-input v-model="QueryForm.operateUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item size="mini" label="时间">
              <el-date-picker  v-model="dates" style="width:100%"
              @change="doInit()"
              type="daterange"
              :clearable = 'false'
              :editable='false'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
            <el-button type="primary" size="mini" @click="getTableData($store.state.pagination)">查询</el-button>
        </el-row>
        <el-row>
          <el-col :span="7" :offset="17">
        <el-radio-group v-model="QueryForm.type" size="mini" @change="getTableData($store.state.pagination)" style="display:block;margin-right:0;">
          <el-radio-button label="1">单证接单数</el-radio-button>
          <el-radio-button label="2">单证录入数</el-radio-button>
          <el-radio-button label="3">单证审核数</el-radio-button>
          <el-radio-button label="4">单证申报数</el-radio-button>
          <el-radio-button label="5">录入差错率</el-radio-button>
          <!--<el-radio-button label="6">审核差错率</el-radio-button> -->
        </el-radio-group>
          </el-col>
        </el-row>
        </el-form>
        <!-- 查询条件 end-->
         <div class='mg-b-30'>
          <e-chart :datas='resultChartData' :height="'300px'" :reset='resetChartData'></e-chart>
        </div>
        <!-- 列表 list -->
        <el-row class='mg-b-30'>
          <div class='mg-lr-30 sys-main-table' style="margin-bottom:100px">
            <el-table class='sys-table-table' :data="tableData" border highlight-current-row>
              <el-table-column label="序号" width="100">
                <template slot-scope="scope">
                  <div class='sys-td-c'>{{(paginationInit.pageIndex-1)*paginationInit.pageSize+(scope.$index+1)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作员" min-width="100">
                <template slot-scope="scope">
                    <div class='sys-td-l'>{{scope.row.auditUser}}</div>
                </template>
              </el-table-column>
              <el-table-column label="单证接单数" min-width="100">
                <template slot-scope="scope">
                    <div class='sys-td-r'>{{scope.row.acceptCount}}</div>
                </template>
              </el-table-column>
              <el-table-column label="单证录入数" min-width="100">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.inputCount}}</div>
                </template>
              </el-table-column>
              <el-table-column label="单证审核数" min-width="100">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.verityCount}}</div>
                </template>
              </el-table-column>
              <el-table-column label="单证申报数" min-width="100">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.decCount}}</div>
                </template>
              </el-table-column>
              <el-table-column label="录入差错率" min-width="100">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.iFailCount}}%</div>
                </template>
              </el-table-column>
              <!--<el-table-column label="审核差错率" width="150" >
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.vFailCount}}%</div>
                </template>
              </el-table-column>-->
            </el-table>
            <!--分页-->
            <el-row class='sys-page-list'>
              <el-col :span="24" align="right">
                  <page-box :pagination='paginationInit' @change="getTableData"></page-box>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </div>
    <!-- 主显示框 end-->
  </section>
</template>
<script>
import util from '../../../../common/util'
export default {
  data () {
    return {
      // 存放查询检索表单数据
      dates: ['', ''],
      QueryForm: {
        startDate: '',
        endDate: '',
        operateUser: '',
        type: '1'
      },
      paginationInit: {},
      tableData: [],
      graininess: [
        {
          label: '日',
          value: 1
        },
        {
          label: '月',
          value: 2
        },
        {
          label: '周',
          value: 0
        }],
      ports: [{
        label: '进口',
        value: 'I'
      }, {
        label: '出口',
        value: 'E'
      }, {
        label: '全部',
        value: 'ALL'
      }],
      dateConfig: '30',
      chartType: '1',
      resultChartData: {},
      resetChartData: '',
      resultList: [], // 存放列表数据
      pages: {} // 存放后台返回的页码
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.dates = [util.getNdayDate(new Date(), -29), new Date()]
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.resetChartData = Math.random()
      })()
    }
    this.doInit()
  },
  methods: {
    // 加载缓存数据
    loadData () {
      this.$store.commit('pageCacheInit', this.pagination)
    },
    // 缓存数据
    cacheData () {
      this.pagination = {
        currentPage: this.$store.state.pagination.currentPage, // 当前页
        pageSize: this.$store.state.pagination.pageSize, // 每页数据条数
        total: this.$store.state.pagination.total // 总条数
      }
    },
    doInit () {
      this.getTableData(this.$store.state.pagination)
    },
    gettype (type) {
      if (type === '1') {
        return ['acceptCount', '单证接单数']
      }
      if (type === '2') {
        return ['inputCount', '单证录入数']
      }
      if (type === '3') {
        return ['verityCount', '单证审核数']
      }
      if (type === '4') {
        return ['decCount', '单证申报数']
      }
      if (type === '5') {
        return ['iFailCount', '录入差错率']
      }
      if (type === '6') {
        return ['vFailCount', '审核差错率']
      }
    },
    getCharData () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/statisticsOrderList',
        data: this.QueryForm,
        router: this.$router,
        success: (res) => {
          let charname = this.gettype(this.QueryForm.type)
          let showdata = []
          let showydata = []
          for (let a = 0; a < res.result.length; a++) {
            showdata.push(res.result[a][charname[0]])
            showydata.push(res.result[a].auditUser)
          }
          this.resultChartData = {
            title: {
              text: charname[1],
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: showydata
            },
            series: [
              {
                type: 'bar',
                data: showdata
              }
            ]
          }
        }
      })
    },
    // 获取图表数据
    getTableData (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.QueryForm.startDate = ''
        this.QueryForm.endDate = ''
      } else {
        this.QueryForm.startDate = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.QueryForm.endDate = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/statisticsWork',
        data: {...this.QueryForm, page: pagination},
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.tableData = res.result
          this.paginationInit = res.page
          this.getCharData()
          if (!res.result || res.result.length === 0) {
            this.$message({
              message: '未查询到相关记录',
              type: 'warning'
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.regist-panel{
  padding: 20px;
  background-color: #fff;
}
.temperature-div-s {
  float: right;
}
@media only screen and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  .sys-fr{
    float: none;
  }
}
</style>
