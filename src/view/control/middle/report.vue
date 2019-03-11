<template>
  <div class="report">
    <div class="title">报表统计</div>
    <!-- <div class="compute-content">
      <h3>单量统计</h3>
      <div class="time">统计时间:2019.03.04</div>
    </div> -->
    <div class="detail">
      <e-chart :datas="echartData"></e-chart>
    </div>
  </div>
</template>
<script>
import util from '@/common/util'
export default {
  components: {
    'e-chart': resolve => require(['../eChart/chart.vue'], resolve)
  },
  data () {
    return {
      echartData: {
        title: {
          text: '单量统计',
          subtext: '统计时间:2019.03.04',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: '35%',
          align: 'left', // 调整文字和样式的位置
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['35%', '55%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
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
.detail {
  overflow: auto;
}

</style>
