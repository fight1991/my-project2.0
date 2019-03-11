<template>
  <div id="list">
    <div id='div1' class='divItems'>
      <board></board>
    </div>
    <div id='div2' class='divItems'>
      <chart></chart>
    </div>
    <div id='div4' class='divItems'>
      <news></news>
    </div>
    <div id='div3' class='divItems'>
      <corpDisplay></corpDisplay>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    board: resolve => require(['./middle/board.vue'], resolve),
    chart: resolve => require(['./middle/chart.vue'], resolve),
    corpDisplay: resolve => require(['./middle/corpDisplay.vue'], resolve),
    news: resolve => require(['./middle/news.vue'], resolve)
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#list {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.divItems {
  width: 49.5%;
  height: 49.3%;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
}
.divItems:nth-child(1) {
  align-self: flex-start;
}
.divItems:nth-child(2) {
  align-self: flex-start;
}
.divItems:nth-child(3) {
  align-self: flex-end;
}
.divItems:nth-child(4) {
  align-self: flex-end;
}
</style>
