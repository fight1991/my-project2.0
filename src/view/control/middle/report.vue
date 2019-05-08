<template>
  <div class="report">
    <div class="title">报表统计</div>
    <div class="compute-content">
      <h3>单量统计</h3>
      <!-- <div class="time">统计时间 :&nbsp;{{dates.startDate+' ~ '+dates.endDate}}</div> -->
      <el-row class="dateSearch">
        <el-form label-width="70px">
          <el-form-item label="统计时间 : ">
            <el-date-picker
              v-model="dates"
              size="mini"
              type="daterange"
              @change="getEchart"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="default" v-if="echartData.series[0].data.length===0"><img src="../../../assets/img/icon/list.png" alt=""></div>
    <div class="detail" ref="chartBox" v-else>
      <e-chart :datas="echartData" :width="width + 'px'"></e-chart>
    </div>
  </div>
</template>
<script>
import util from '@/common/util'
import eventBus from './eventBus'
export default {
  components: {
    'e-chart': resolve => require(['../../../components/eChart/chart.vue'], resolve)
  },
  data () {
    return {
      width: '',
      echartData: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '64%',
          y: 'center',
          align: 'left', // 调整文字和样式的位置
          data: []
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['35%', '55%'],
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
                }
              }
            },
            data: []
          }
        ]
      },
      dates: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.getMonths()
    this.getEchart()
    eventBus.$on('getEchart', this.getEchart)
  },
  mounted () {
    this.getBoxWidth()
    // window.addEventListener('resize', this.getBoxWidth)
  },
  methods: {
    // 获取图表数据
    getEchart () {
      if (!this.dates) {
        this.echartData.series[0].data = []
        return
      }
      this.dates = [util.dateFormat(this.dates[0], 'yyyy-MM-dd'), util.dateFormat(this.dates[1], 'yyyy-MM-dd')]
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/decCount',
        data: {
          iEFlag: 'ALL',
          startDate: this.dates[0],
          endDate: this.dates[1],
          page: {
            pageSize: 10,
            pageIndex: 1
          }
        },
        isLoad: false,
        router: this.$router,
        success: (res) => {
          let pieList = []
          let legendData = []
          if (!util.isEmpty(res.result.decCountPieVO) && res.result.decCountPieVO.length > 0) {
            let leftcount = res.result.decCountPieVO[0].totalCount
            for (let item in res.result.decCountPieVO) {
              leftcount = leftcount - res.result.decCountPieVO[item].count
              pieList.push({name: res.result.decCountPieVO[item].tradeCoName,
                value: res.result.decCountPieVO[item].count})
              legendData.push(res.result.decCountPieVO[item].tradeCoName)
            }
            if (res.result.decCountPieVO.length > 9) {
              pieList.push({name: '其他企业',
                value: leftcount})
              legendData.push('其他企业')
            }
            this.echartData.series[0].data = pieList
            this.echartData.legend.data = legendData
          } else {
            this.echartData.series[0].data = []
            this.echartData.legend.data = []
          }
        }
      })
    },
    // 获取当前一个月
    getMonths () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.dates = [util.dateFormat(start, 'yyyy-MM-dd'), util.dateFormat(end, 'yyyy-MM-dd')]
    },
    getBoxWidth () {
      this.$nextTick(() => {
        // console.dir(that.$refs.chartBox)
        // let wid = that.$refs.chartBox.$el.clientWidth
        // console.log(wid)
      })
    },
    // 设置默认时间范围
    getChartData () {
      if (this.dates === '' || this.dates === null) {
        this.QueryForm.startDate = ''
        this.QueryForm.endDate = ''
      } else {
        this.QueryForm.startDate = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.QueryForm.endDate = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.report {
  padding: 10px 20px
}
.title {
  line-height: 30px;
  color: @font-color-main;
  font-weight: bold;
}
.default {
    img {
      display: block;
      margin: 35px auto 0 auto
    }
  }
.compute-content {
  color: @font-color-main;
  text-align: center;
  h3 {
    margin-bottom: 12px;
  }
  .time {
    font-size: 12px;
    color: @font-color-title;
  }
}
.dateSearch {
  display: flex;
  justify-content: center;
}

</style>
