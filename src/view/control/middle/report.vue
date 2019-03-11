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
          y: 'center',
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
            center: ['40%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
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
