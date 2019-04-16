<template>
  <div id="list">
    <div id='div1' class='divItems' v-permissions="'CCBA20101000000'">
      <board></board>
    </div>
    <div id='div2' class='divItems' v-permissions="'CCBA20102000000'">
      <report></report>
    </div>
    <div id='div4' class='divItems' v-permissions="'CCBA20103000000'">
      <news></news>
    </div>
    <div id='div3' class='divItems' v-permissions="'CCBA20104000000'">
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
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#list {
  height: 100%;
  width: calc(~"(100% + 17px)");
  display: flex;
  flex-wrap: wrap;
  // align-items: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
}
// .divItems:nth-child(2n) {
//   align-self: flex-end;
// }
.divItems {
  // float: left;
  width: calc(~"(50% - 15px)");
  // width: 49%;
  // height: 48%;
  margin-right: 15px;
  min-width: 400px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  // overflow: auto;
  margin-bottom: 15px;
}
@media screen and (max-width:1090px) {
 .divItems {
   width: 100%;
   margin-left: 0px!important;
 }
}
</style>
