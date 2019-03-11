<template>
  <div class="chart">
    <div class="title">报表统计</div>
    <div class="compute-content">
      <h3>单量统计</h3>
      <div class="time">统计时间:2019.03.04</div>
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.chart {
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

</style>
