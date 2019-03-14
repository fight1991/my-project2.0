<template>
  <div id="list" class="clearfix">
    <div id='div1' class='divItems' ref="div1">
      <board></board>
    </div>
    <div id='div2' class='divItems'>
      <report></report>
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
    report: resolve => require(['./middle/report.vue'], resolve),
    corpDisplay: resolve => require(['./middle/corpDisplay.vue'], resolve),
    news: resolve => require(['./middle/news.vue'], resolve)
  },
  data () {
    return {

    }
  },
  mounted () {
    // let h = this.$refs['middle-right'].height
    // console.log(this.$refs['div1'])
    // let h = this.$refs['div1'].$el.offsetHeight
    // console.log(h)
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#list {
  height: 100%;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: flex-start;
  padding: 10;
  overflow-y: auto;
  overflow-x: hidden;
}
.divItems {
  float: left;
  width: 49%;
  // height: 48%;
  min-width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  // overflow: auto;
  margin-bottom: 15px;
}
.divItems:nth-child(2n+1) {
  margin-right: 15px;
}
// .divItems:nth-child(3) {
//   align-self: flex-end;
// }
// .divItems:nth-child(4) {
//   align-self: flex-end;
// }
@media screen and (max-width:1060px) {
 .divItems {
   width: 100%;
 }
}
</style>
