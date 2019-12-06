<template>
  <section class='sys-main'>
     <!-- 主显示框 -->
    <div class='content'>
      <div class='regist-panel'>
        <el-form label-width="0px" size="mini">
          <el-row class='sys-search' :gutter="20">
            <!-- 查询条件 -->
            <el-col :span="8" :xs="24">
              <el-form-item>
                <el-date-picker  v-model="dates" style="width:100%;vertical-align:middle;"
                  @change="getChartData()"
                  type="daterange"
                  :clearable = 'false'
                  :editable='false'
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="16" :xs="24">
              <el-form-item>
                <el-radio-group size='mini'  v-model="dateConfig"  @change="datesChange" style="width: auto;margin-top: -2px;">
                  <el-radio-button label="7">最近7天</el-radio-button>
                  <el-radio-button label="30">最近30天</el-radio-button>
                  <el-radio-button label="180">最近180天</el-radio-button>
                </el-radio-group>
                <el-button size="mini" type="primary" class="mg-l-20" @click="doInit()">统计</el-button>
                <el-button size="mini" type="primary" class="mg-l-20 fr" @click="exportFun()">导出</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 查询条件 end-->
        <el-form size="mini" label-width="110px" class="mg-t-10">
          <el-row>
            <el-col :span="8">
              <el-form-item label="进口总申报票数:">
                <div class="blue-txt fontWB fontS-16">2000</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前申报票数:">
                <div class="blue-txt fontWB fontS-16">1000</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前申报率:">
                <div class="org-txt fontWB fontS-16">50%</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="申报列表" name="list">
              <el-row class='mg-b-30'>
                <div class='mg-lr-30 sys-main-table'>
                  <el-table class='sys-table-table' :data="resultList" border highlight-current-row height="450">
                    <el-table-column label="序号" width="100" align="left">
                      <template slot-scope="scope">
                        <div>{{(paginationInit.pageIndex-1)*paginationInit.pageSize+(scope.$index+1)}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="报关单号" prop="date" min-width="120" align="left">
                      <template slot-scope="scope">
                        <div>{{scope.row.money1 || '-'}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="收发货人" prop="date" min-width="150" align="left">
                      <template slot-scope="scope">
                        <div>{{scope.row.money1 || '-'}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="提单号" prop="date" min-width="120" align="left">
                      <template slot-scope="scope">
                        <div>{{scope.row.money1 || '-'}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="进出境关别" min-width="120" align="left">
                      <template slot-scope="scope">
                        <div>{{scope.row.money1 || '-'}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="进境日期" min-width="120" align="center">
                      <template slot-scope="scope">
                        <div>{{scope.row.money2 || '-'}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="申报日期" min-width="120" align="center">
                      <template slot-scope="scope">
                        <div>{{scope.row.money2 || '-'}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!--分页-->
                  <el-row class='sys-page-list'>
                    <el-col :span="24" align="right">
                      <page-box @change="getTableData()" :pagination.sync='paginationInit' key="advanceSt"></page-box>
                    </el-col>
                  </el-row>
                </div>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="申报统计" name="chart">
              <el-row class='mg-t-20'>
                <el-col :span="12">
                  <div class="pd-r-20 left-panel">
                    <e-chart :datas='resultChartData' :reset='resetChartData'></e-chart>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="pd-l-20">
                    <el-table class='sys-table-table nocolor-table' :data="chartList" border height="300">
                      <el-table-column label="企业" prop="date" min-width="150" align="left">
                        <template slot-scope="scope">
                          <div>{{scope.row.money1 || '-'}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="进口总申报票数" prop="date" min-width="120" align="right">
                        <template slot-scope="scope">
                          <div>{{scope.row.money1 || '-'}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="提前申报票数" min-width="120" align="right">
                        <template slot-scope="scope">
                          <div>{{scope.row.money1 || '-'}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="提前申报率" min-width="120" align="right">
                        <template slot-scope="scope">
                          <div>{{scope.row.money2 || '-'}}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
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
      dates: ['', ''],
      QueryForm: {
        startDate: '',
        endDate: ''
      },
      dateConfig: '30',
      resultChartData: {},
      resetChartData: '',
      activeName: 'list',
      resultList: [], // 存放列表数据
      chartList: []
    }
  },
  created () {
    this.dates = [util.getNdayDate(new Date(), -29), new Date()]
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.resetChartData = Math.random()
      })()
    }
    // this.doInit()
  },
  methods: {
    // 初始化 或查询
    doInit () {

    },
    handleClick () {

    },
    // 获取表格数据
    getTableData () {

    },
    // 获取图表数据
    getChartData () {

    },
    // 日期切换
    datesChange (value) {
      let days = -(parseInt(value) - 1)
      this.dates = [util.getNdayDate(new Date(), days), new Date()]
    },
    // 导出
    exportFun () {

    }
  }
}
</script>
<style scoped lang="less">
.sys-main{
  height: calc(100% - 40px);
  overflow: auto;
  padding: 20px;
}
.regist-panel{
  padding: 20px;
  background-color: #fff;
}
.fontWB{
  font-weight: bold;
}
.fontS-16{
  font-size: 16px;
}
.blue-txt{
  color: #49ABD9;
}
.org-txt{
  color: #f08800;
}
.pd-r-20{
  padding-right: 20px;
}
.pd-l-20{
  padding-left: 20px;
}
.left-panel{
  border-right: 1px solid #d8d8d8;
}
</style>
