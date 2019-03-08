<template>
  <div id="list">
    <div id='div1' class='divRec'>
      <board></board>
    </div>
    <div id='div2' class='divQuad'>
      <chart></chart>
    </div>
    <div id='div3' class='divRec'>
      <corpDisplay></corpDisplay>
    </div>
    <div id='div4' class='divCard'>
      <news></news>
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
#div1 {
  width: 50%;
  height: 50%;
  background-color: #fff;
}
</style>
