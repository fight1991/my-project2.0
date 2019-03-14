<template>
  <div class="report">
    <div class="title">报表统计</div>
    <div class="compute-content" v-if="!echartData.series[0].data.length===0">
      <h3>单量统计</h3>
      <div class="time">统计时间:2019.03.04</div>
    </div>
    <div class="detail" ref="chartBox" v-if="!echartData.series[0].data.length===0">
      <e-chart :datas="echartData" :width="width + 'px'"></e-chart>
    </div>
    <div class="default" v-if="echartData.series[0].data.length===0"><img src="../../../assets/img/icon/list.png" alt=""></div>
  </div>
</template>
<script>
import util from '@/common/util'
export default {
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
          x: '75%',
          y: '35%',
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
            data: []
          }
        ]
      },
      dates: {
        startDate: '',
        endDate: ''
      }
    }
  },
  created () {
    this.computeWeek()
    this.getEchart()
  },
  mounted () {
    this.getBoxWidth()
    // window.addEventListener('resize', this.getBoxWidth)
  },
  methods: {
    getEchart () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/decCount',
        data: {
          iEFlag: 'ALL',
          startDate: this.dates.startDate,
          endDate: this.dates.endDate
        },
        router: this.$router,
        success: (res) => {
          console.log(res)
        }
      })
    },
    computeWeek () { // 计算最近一周
      let end = new Date()
      let start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.dates.startDate = util.dateFormat(start, 'yyyy-MM-dd')
      this.dates.endDate = util.dateFormat(end, 'yyyy-MM-dd')
    },
    getBoxWidth () {
      this.$nextTick(() => {
        // console.dir(that.$refs.chartBox)
        // let wid = that.$refs.chartBox.$el.clientWidth
        // console.log(wid)
      })
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
</style>
